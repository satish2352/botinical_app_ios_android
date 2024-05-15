



// import React, { useState, useRef } from 'react';
// import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
// import Video from 'react-native-video';
// import Slider from '@react-native-community/slider';
// import Orientation from 'react-native-orientation-locker';

// const VideoModal = ({ visible, onClose, videoUri }) => {
//   const [paused, setPaused] = useState(false);
//   const [progress, setProgress] = useState(null);
//   const [fullScreen, setFullScreen] = useState(false);
//   const ref = useRef();

//   const formatTime = (seconds) => {
//     const mins = parseInt(seconds / 60, 10).toString().padStart(2, '0');
//     const secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
//     return `${mins}:${secs}`;
//   };

//   const handleSeek = (value) => {
//     ref.current.seek(value);
//     setProgress({ ...progress, currentTime: value });
//   };

//   return (
//     <Modal visible={visible} transparent={true} onRequestClose={onClose}>
//       <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <TouchableOpacity
//             onPress={onClose}
//             style={{
//               position: 'absolute',
//               top: 10,
//               right: 10,
//               backgroundColor: 'rgba(0,0,0,.5)',
//               padding: 10,
//               borderRadius: 20,
//             }}
//           >
//             <Text style={{ color: 'white' }}>Close</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
//             onPress={() => setPaused(!paused)}
//           >
//             <Video
//               paused={paused}
//               source={{ uri: videoUri }}
//               ref={ref}
//               onProgress={(x) => setProgress(x)}
//               style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
//               resizeMode="contain"
//             />
//             {progress && (
//               <TouchableOpacity
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   position: 'absolute',
//                   backgroundColor: 'rgba(0,0,0,.5)',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <View style={{ flexDirection: 'row' }}>
//                   <TouchableOpacity
//                     onPress={() => handleSeek(progress.currentTime - 10)}
//                     disabled={progress.currentTime <= 10}
//                   >
//                     <Image
//                       source={require('../Assets/videoplayer/backward.png')}
//                       style={{ width: 30, height: 30, tintColor: 'white' }}
//                     />
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => setPaused(!paused)}>
//                     <Image
//                       source={
//                         paused
//                           ? require('../Assets/videoplayer/play-button.png')
//                           : require('../Assets/videoplayer/pause.png')
//                       }
//                       style={{
//                         width: 30,
//                         height: 30,
//                         tintColor: 'white',
//                         marginLeft: 50,
//                       }}
//                     />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => handleSeek(progress.currentTime + 10)}
//                     disabled={progress.currentTime >= progress.seekableDuration - 10}
//                   >
//                     <Image
//                       source={require('../Assets/videoplayer/forward.png')}
//                       style={{
//                         width: 30,
//                         height: 30,
//                         tintColor: 'white',
//                         marginLeft: 50,
//                       }}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View
//                   style={{
//                     width: '100%',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     position: 'absolute',
//                     bottom: 0,
//                     paddingLeft: 20,
//                     paddingRight: 20,
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text style={{ color: 'white' }}>{formatTime(progress.currentTime)}</Text>
//                   <Slider
//                     style={{ width: '80%', height: 40 }}
//                     minimumValue={0}
//                     maximumValue={progress.seekableDuration}
//                     minimumTrackTintColor="#FFFFFF"
//                     maximumTrackTintColor="#fff"
//                     value={progress.currentTime}
//                     onSlidingComplete={(value) => handleSeek(value)}
//                   />
//                   <Text style={{ color: 'white' }}>{formatTime(progress.seekableDuration)}</Text>
//                 </View>
//                 <View
//                   style={{
//                     width: '100%',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     position: 'absolute',
//                     top: 10,
//                     paddingLeft: 20,
//                     paddingRight: 20,
//                     alignItems: 'center',
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={() => {
//                       if (fullScreen) {
//                         Orientation.lockToPortrait();
//                       } else {
//                         Orientation.lockToLandscape();
//                       }
//                       setFullScreen(!fullScreen);
//                     }}
//                   >
//                     <Image
//                       source={
//                         fullScreen
//                           ? require('../Assets/videoplayer/minimize.png')
//                           : require('../Assets/videoplayer/full-size.png')
//                       }
//                       style={{ width: 24, height: 24, tintColor: 'white' }}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default VideoModal;





// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
// import Video from 'react-native-video';
// import Slider from '@react-native-community/slider';
// import Orientation from 'react-native-orientation-locker';

// const VideoModal = ({ visible, onClose, videoUri }) => {
//   const [paused, setPaused] = useState(false);
//   const [progress, setProgress] = useState(null);
//   const [fullScreen, setFullScreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const ref = useRef();

//   useEffect(() => {
//     let timer;
//     if (!paused && progress && progress.currentTime > 0) {
//       timer = setTimeout(() => {
//         setShowControls(false);
//       }, 3000); // Hide controls after 3 seconds
//     }
//     return () => clearTimeout(timer);
//   }, [paused, progress]);

//   useEffect(() => {
//     if (!visible) {
//       Orientation.lockToPortrait(); // Lock to portrait mode when modal is closed
//     }
//   }, [visible]);

//   const formatTime = (seconds) => {
//     const mins = parseInt(seconds / 60, 10).toString().padStart(2, '0');
//     const secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
//     return `${mins}:${secs}`;
//   };

//   const handleSeek = (value) => {
//     ref.current.seek(value);
//     setProgress({ ...progress, currentTime: value });
//   };

//   const toggleControls = () => {
//     setShowControls(!showControls);
//     clearTimeout(); // Clear any existing timeout
//     if (!showControls) {
//       // Reset timer when controls are shown
//       setTimeout(() => {
//         setShowControls(false);
//       }, 3000); // Hide controls after 3 seconds
//     }
//   };

//   return (
//     <Modal visible={visible} transparent={true} onRequestClose={onClose}>
//       <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <TouchableOpacity
//             onPress={onClose}
//             style={{
//               position: 'absolute',
//               top: 10,
//               right: 10,
//               backgroundColor: 'rgba(0,0,0,.5)',
//               padding: 10,
//               borderRadius: 20,
//             }}
//           >
//             <Text style={{ color: 'white' }}>Close</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
//             onPress={toggleControls} // Toggle controls visibility on touch
//           >
//             <Video
//               paused={paused}
//               source={{ uri: videoUri }}
//               ref={ref}
//               onProgress={(x) => setProgress(x)}
//               style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
//               resizeMode="contain"
//             />
//             {showControls && progress && (
//               <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
//                 <TouchableOpacity
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     position: 'absolute',
//                     backgroundColor: 'rgba(0,0,0,.5)',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                   onPress={toggleControls} // Toggle controls visibility on touch
//                 >
//                   <View style={{ flexDirection: 'row' }}>
//                     <TouchableOpacity
//                       onPress={() => handleSeek(progress.currentTime - 10)}
//                       disabled={progress.currentTime <= 10}
//                     >
//                       <Image
//                         source={require('../Assets/videoplayer/backward.png')}
//                         style={{ width: 30, height: 30, tintColor: 'white' }}
//                       />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => setPaused(!paused)}>
//                       <Image
//                         source={
//                           paused
//                             ? require('../Assets/videoplayer/play-button.png')
//                             : require('../Assets/videoplayer/pause.png')
//                         }
//                         style={{
//                           width: 30,
//                           height: 30,
//                           tintColor: 'white',
//                           marginLeft: 50,
//                         }}
//                       />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() => handleSeek(progress.currentTime + 10)}
//                       disabled={progress.currentTime >= progress.seekableDuration - 10}
//                     >
//                       <Image
//                         source={require('../Assets/videoplayer/forward.png')}
//                         style={{
//                           width: 30,
//                           height: 30,
//                           tintColor: 'white',
//                           marginLeft: 50,
//                         }}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                   <View
//                     style={{
//                       width: '100%',
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       position: 'absolute',
//                       bottom: 0,
//                       paddingLeft: 20,
//                       paddingRight: 20,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Text style={{ color: 'white' }}>{formatTime(progress.currentTime)}</Text>
//                     <Slider
//                       style={{ width: '80%', height: 40 }}
//                       minimumValue={0}
//                       maximumValue={progress.seekableDuration}
//                       minimumTrackTintColor="#FFFFFF"
//                       maximumTrackTintColor="#fff"
//                       value={Math.min(progress.currentTime, progress.seekableDuration)}
//                       onSlidingComplete={(value) => handleSeek(value)}
//                     />
//                     <Text style={{ color: 'white' }}>{formatTime(progress.seekableDuration)}</Text>
//                   </View>
//                   <View
//                     style={{
//                       width: '100%',
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       position: 'absolute',
//                       top: 10,
//                       paddingLeft: 20,
//                       paddingRight: 20,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <TouchableOpacity
//                       onPress={() => {
//                         if (fullScreen) {
//                           Orientation.lockToPortrait();
//                         } else {
//                           Orientation.lockToLandscape();
//                         }
//                         setFullScreen(!fullScreen);
//                       }}
//                     >
//                       <Image
//                         source={
//                           fullScreen
//                             ? require('../Assets/videoplayer/minimize.png')
//                             : require('../Assets/videoplayer/full-size.png')
//                         }
//                         style={{ width: 24, height: 24, tintColor: 'white' }}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default VideoModal;

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

const VideoModal = ({ visible, onClose, videoUri }) => {
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
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

  useEffect(() => {
    if (!visible) {
      Orientation.lockToPortrait(); // Lock to portrait mode when modal is closed
    }
  }, [visible]);

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
              source={{ uri: videoUri }}
              ref={ref}
              onProgress={(x) => setProgress(x)}
              style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
              resizeMode="contain"
              onTouchStart={toggleControls} // Toggle controls visibility on touch
              onEnd={onClose}
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
                  <View
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
