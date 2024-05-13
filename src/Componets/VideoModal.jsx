import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VideoModal = ({ data, visible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(currentTime => currentTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const onSliderValueChange = value => {
    setSliderValue(value);
  };

  const onSliderSlidingComplete = value => {
    setSliderValue(value);
    setCurrentTime(value);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Video
            source={{ uri: data.video_upload }}
            paused={!isPlaying}
            onEnd={() => setIsPlaying(false)}
            onLoad={data => setDuration(data.duration)}
          />
          <Slider
            style={{ width: '90%', marginTop: 20 }}
            minimumValue={0}
            maximumValue={duration}
            value={sliderValue}
            onValueChange={onSliderValueChange}
            onSlidingComplete={onSliderSlidingComplete}
            thumbTintColor="#01595A"
            minimumTrackTintColor="#01595A"
            maximumTrackTintColor="red"
          />
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={togglePlay}>
              <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}><Icon name="close" size={30} color="#01595A" /></Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalButton: {
    marginTop: 20,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: "#01595A",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default VideoModal;
