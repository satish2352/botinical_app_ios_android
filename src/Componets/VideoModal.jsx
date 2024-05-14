// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
// import Video from 'react-native-video';
// import Slider from '@react-native-community/slider';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const VideoModal = ({ data, visible, onClose }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [sliderValue, setSliderValue] = useState(0);

//   useEffect(() => {
//     if (isPlaying) {
//       const interval = setInterval(() => {
//         setCurrentTime(currentTime => currentTime + 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [isPlaying]);

//   const onSliderValueChange = value => {
//     setSliderValue(value);
//   };

//   const onSliderSlidingComplete = value => {
//     setSliderValue(value);
//     setCurrentTime(value);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>
//           <Video
//             source={{ uri: 'https://botinical.com.sumagotest.in/storage/all_web_data/images/tress/file_example_MP4_480_1_5MG.mp4'}}
//             paused={!isPlaying}
//             onEnd={() => setIsPlaying(false)}
//             onLoad={data => setDuration(data.duration)}
//           />
//           <Slider
//             style={{ width: '90%', marginTop: 20 }}
//             minimumValue={0}
//             maximumValue={duration}
//             value={sliderValue}
//             onValueChange={onSliderValueChange}
//             onSlidingComplete={onSliderSlidingComplete}
//             thumbTintColor="#01595A"
//             minimumTrackTintColor="#01595A"
//             maximumTrackTintColor="red"
//           />
//           <View style={styles.controls}>
//             <TouchableOpacity style={styles.controlButton} onPress={togglePlay}>
//               <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={30} color="#fff" />
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity style={styles.modalButton} onPress={onClose}>
//             <Text style={styles.modalButtonText}><Icon name="close" size={30} color="#01595A" /></Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalView: {
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     elevation: 5,
//   },
//   modalButton: {
//     marginTop: 20,
//     borderRadius: 50,
//     paddingVertical: 5,
//     paddingHorizontal: 5,
//   },
//   modalButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 16,
//   },
//   controls: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   controlButton: {
//     backgroundColor: "#01595A",
//     borderRadius: 50,
//     paddingVertical: 5,
//     paddingHorizontal: 5,
//   },
// });

// export default VideoModal;




import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

const VideoModal = ({ visible, onClose, videoUri }) => {
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();

  const formatTime = (seconds) => {
    const mins = parseInt(seconds / 60, 10).toString().padStart(2, '0');
    const secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSeek = (value) => {
    ref.current.seek(value);
    setProgress({ ...progress, currentTime: value });
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
          <TouchableOpacity
            style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
            onPress={() => setPaused(!paused)}
          >
            <Video
              paused={paused}
              source={{ uri: videoUri }}
              ref={ref}
              onProgress={(x) => setProgress(x)}
              style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
              resizeMode="contain"
            />
            {progress && (
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  backgroundColor: 'rgba(0,0,0,.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
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
                  <TouchableOpacity onPress={() => setPaused(!paused)}>
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
                    value={progress.currentTime}
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
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VideoModal;










// import React, { useState, useRef } from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
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
//     <View style={{ flex: 1 }}>
//       {visible && (
//         <TouchableOpacity
//           style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
//           onPress={() => setPaused(!paused)}
//         >
//           <Video
//             paused={paused}
//             source={{ uri: videoUri }}
//             ref={ref}
//             onProgress={(x) => setProgress(x)}
//             style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
//             resizeMode="contain"
//           />
//           {progress && (
//             <TouchableOpacity
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'absolute',
//                 backgroundColor: 'rgba(0,0,0,.5)',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <View style={{ flexDirection: 'row' }}>
//                 <TouchableOpacity
//                   onPress={() => handleSeek(progress.currentTime - 10)}
//                   disabled={progress.currentTime <= 10}
//                 >
//                   <Image
//                     source={require('../Assets/videoplayer/backward.png')}
//                     style={{ width: 30, height: 30, tintColor: 'white' }}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setPaused(!paused)}>
//                   <Image
//                     source={
//                       paused
//                         ? require('../Assets/videoplayer/play-button.png')
//                         : require('../Assets/videoplayer/pause.png')
//                     }
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor: 'white',
//                       marginLeft: 50,
//                     }}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => handleSeek(progress.currentTime + 10)}
//                   disabled={progress.currentTime >= progress.seekableDuration - 10}
//                 >
//                   <Image
//                     source={require('../Assets/videoplayer/forward.png')}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor: 'white',
//                       marginLeft: 50,
//                     }}
//                   />
//                 </TouchableOpacity>
//               </View>
//               <View
//                 style={{
//                   width: '100%',
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   position: 'absolute',
//                   bottom: 0,
//                   paddingLeft: 20,
//                   paddingRight: 20,
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text style={{ color: 'white' }}>{formatTime(progress.currentTime)}</Text>
//                 <Slider
//                   style={{ width: '80%', height: 40 }}
//                   minimumValue={0}
//                   maximumValue={progress.seekableDuration}
//                   minimumTrackTintColor="#FFFFFF"
//                   maximumTrackTintColor="#fff"
//                   value={progress.currentTime}
//                   onSlidingComplete={(value) => handleSeek(value)}
//                 />
//                 <Text style={{ color: 'white' }}>{formatTime(progress.seekableDuration)}</Text>
//               </View>
//               <View
//                 style={{
//                   width: '100%',
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   position: 'absolute',
//                   top: 10,
//                   paddingLeft: 20,
//                   paddingRight: 20,
//                   alignItems: 'center',
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={() => {
//                     if (fullScreen) {
//                       Orientation.lockToPortrait();
//                     } else {
//                       Orientation.lockToLandscape();
//                     }
//                     setFullScreen(!fullScreen);
//                   }}
//                 >
//                   <Image
//                     source={
//                       fullScreen
//                         ? require('../Assets/videoplayer/minimize.png')
//                         : require('../Assets/videoplayer/full-size.png')
//                     }
//                     style={{ width: 24, height: 24, tintColor: 'white' }}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </TouchableOpacity>
//           )}
//         </TouchableOpacity>
//       )}
//       <TouchableOpacity
//         onPress={onClose}
//         style={{
//           position: 'absolute',
//           top: 10,
//           right: 10,
//           backgroundColor: 'rgba(0,0,0,.5)',
//           padding: 10,
//           borderRadius: 20,
//         }}
//       >
//         <Text style={{ color: 'white' }}>Close</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default VideoModal;







