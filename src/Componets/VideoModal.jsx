import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, ActivityIndicator, Alert } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import RNFS from 'react-native-fs';

const VideoModal = ({ visible, onClose, videoUri, videoId, playMode }) => {
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [offlinePath, setOfflinePath] = useState(null);
  const [loading, setLoading] = useState(false); // For offline download
  const [loadingOnline, setLoadingOnline] = useState(false); // For online playback
  const ref = useRef();

  useEffect(() => {
    let timer;
    if (!paused && progress && progress.currentTime > 0) {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide controls after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [paused, progress]);

  // useEffect(() => {
  //   if (!visible) {
  //     Orientation.lockToPortrait(); // Lock to portrait mode when modal is closed
  //   }
  //   return () => {};
  // }, [visible]);

  useEffect(() => {
    if (playMode === 'offline') {
      downloadVideo(videoUri, `${videoId}.mp4`);
    } else {
      setLoadingOnline(true); // Start loading indicator for online playback
    }
    return () => { };
  }, [playMode]);

  const formatTime = (seconds) => {
    const mins = parseInt(seconds / 60, 10).toString().padStart(2, '0');
    const secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSeek = (value) => {
    ref.current.seek(value);
    setProgress({ ...progress, currentTime: value });
  };

  const toggleControls = () => {
    setShowControls(!showControls);
    clearTimeout(); // Clear any existing timeout
    if (!showControls) {
      // Reset timer when controls are shown
      setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide controls after 3 seconds
    }
  };

  const handlePlayPause = () => {
    setPaused(!paused);
    setShowControls(!paused); // Show controls when paused
  };

  const downloadVideo = async (url, filename) => {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${filename}`;

    try {
      setLoading(true);
      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadDest,
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        console.log('Download succeeded:', downloadDest);
        setOfflinePath(downloadDest);
      } else {
        Alert.alert("Warning", "This video is unavailable")

        console.error('Download failed:', result.statusCode);

      }
    } catch (error) {

      console.error('Download error:', error);
    } finally {
      setLoading(false);
    }
  };

  const videoSource = offlinePath ? { uri: `file://${offlinePath}` } : { uri: videoUri };

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(0,0,0,.5)',
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', height: fullScreen ? '100%' : 200 }}>
            <Video
              paused={paused}
              source={videoSource}
              ref={ref}
              onProgress={(x) => setProgress(x)}
              style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
              resizeMode="contain"
              onTouchStart={toggleControls} // Toggle controls visibility on touch
              onEnd={onClose}
              onLoad={() => setLoadingOnline(false)} // Hide loading indicator on load
            />
            {showControls && progress && (
              <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={toggleControls} // Toggle controls visibility on touch
                >
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => handleSeek(progress.currentTime - 10)}
                      disabled={progress.currentTime <= 10}
                    >
                      <Image
                        source={require('../Assets/videoplayer/backward.png')}
                        style={{ width: 30, height: 30, tintColor: 'white' }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause}>
                      <Image
                        source={
                          paused
                            ? require('../Assets/videoplayer/play-button.png')
                            : require('../Assets/videoplayer/pause.png')
                        }
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: 'white',
                          marginLeft: 50,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleSeek(progress.currentTime + 10)}
                      disabled={progress.currentTime >= progress.seekableDuration - 10}
                    >
                      <Image
                        source={require('../Assets/videoplayer/forward.png')}
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: 'white',
                          marginLeft: 50,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      position: 'absolute',
                      bottom: 0,
                      paddingLeft: 20,
                      paddingRight: 20,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white' }}>{formatTime(progress.currentTime)}</Text>
                    <Slider
                      style={{ width: '80%', height: 40 }}
                      minimumValue={0}
                      maximumValue={progress.seekableDuration}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#fff"
                      value={Math.min(progress.currentTime, progress.seekableDuration)}
                      onSlidingComplete={(value) => handleSeek(value)}
                    />
                    <Text style={{ color: 'white' }}>{formatTime(progress.seekableDuration)}</Text>
                  </View>
                 {/* <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      position: 'absolute',
                      top: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (fullScreen) {
                          Orientation.lockToPortrait();
                        } else {
                          Orientation.lockToLandscape();
                        }
                        setFullScreen(!fullScreen);
                      }}
                    >
                      <Image
                        source={
                          fullScreen
                            ? require('../Assets/videoplayer/minimize.png')
                            : require('../Assets/videoplayer/full-size.png')
                        }
                        style={{ width: 24, height: 24, tintColor: 'white' }}
                      />
                    </TouchableOpacity>
                  </View>*/}
                </TouchableOpacity>
              </View>
            )}
          </View>
          {playMode === 'offline' && loading && (
            <ActivityIndicator size="large" color="#fff" />
          )}
          {playMode === 'online' && loadingOnline && (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default VideoModal;
