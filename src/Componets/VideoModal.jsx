import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [loading, setLoading] = useState(false);

  const [videoData1, setVideoData] = useState('');
  
  
  const ref = useRef();
  console.log('videoUri',videoUri);


  // Ensure videoUri is a valid string before checking startsWith
  const videoSource = videoData1 ;

  useEffect(() => {
    let timer;
    if (!paused && progress && progress.currentTime > 0) {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide controls after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [paused, progress]);

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
  useEffect(() => {
    if (videoUri && videoUri.id) {
      loadJsonData(videoUri.id); // Call loadJsonData when videoUri changes
    }
  }, [videoUri]);



  const loadJsonData = async (dataId) => {
    try {
      // Path to the raw folder inside Android resources
      const videoData = require('../../android/app/src/main/res/raw/data.json');
    
      
      // Log the loaded JSON data
      console.log('videoData:', videoData);
  
      // Find the video data that matches the provided dataId
      const matchedData = videoData.find((item) => item.id === dataId);
  
      if (matchedData) {
        console.log('MatchedData:', matchedData);

        setVideoData(matchedData.video_upload)
        return matchedData;
      } else {
        console.log('No matching data found for id', dataId);
        return null;
      }
  
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
  };
  
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
          <View style={{ width: '100%', height: fullScreen ? '100%' : 200 }}>
          
            {videoSource ? (
              <Video
                paused={paused}
                source={{uri: videoSource}} // Using re                ref={ref}
                onProgress={(x) => setProgress(x)}
                style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
                resizeMode="contain"
                onTouchStart={toggleControls} // Toggle controls visibility on touch
                onEnd={onClose}
              />
            ) : (
              <Text style={{ color: 'white', textAlign: 'center' }}>Invalid video source</Text>
            )}
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
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VideoModal;
