import React, { useState, useEffect, useRef } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
const AudioModal = ({ data, visible, onClose, SelectedLanguage1 }) => {
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [audioData, setaudioData] = useState({});
    const soundRef = useRef(null);
    console.log('SelectedLanguage1', SelectedLanguage1);
    useEffect(() => {
        if (data && data.id) {
            loadJsonData(data.id); // Call loadJsonData when data changes
        }
    }, [data]);



    const loadJsonData = async (dataId) => {
        try {
            // Path to the raw folder inside Android resources
            const videoData = require('../../android/app/src/main/res/raw/data.json');


            // Log the loaded JSON data
            console.log('audioData:', audioData);

            // Find the video data that matches the provided dataId
            const matchedData = videoData.find((item) => item.id === dataId);

            if (matchedData) {
                console.log('MatchedData', matchedData);
                if (SelectedLanguage1 === 'hindi') {
                    setaudioData(matchedData.audio_hindi_link || null); // Pass null if no Hindi audio
                } else {
                    setaudioData(matchedData.audio_link || null); // Pass null if no English audio
                }
                return matchedData;
            } else {
                console.log('No matching data found for id:', dataId);
                return null;
            }

        } catch (error) {
            console.error('Error reading JSON file:', error);
        }
    };

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.release();
                soundRef.current = null;
            }
        };
    }, []);

    const closeAudioModal = () => {
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.release();
            soundRef.current = null;
            setIsPlaying(false);
        }
        onClose();
    };

    const playAudio = () => {

        setLoading(true);
        if (!soundRef.current) {
            const newSound = new Sound(audioData, '', (error) => {
                setLoading(false);
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }
                soundRef.current = newSound;
                newSound.play(() => {
                    newSound.release();
                    soundRef.current = null;
                    setIsPlaying(false);
                });
                setIsPlaying(true);
                newSound.setVolume(1);
                // newSound.setNumberOfLoops(-1); // Loop indefinitely
                newSound.getCurrentTime((seconds) => {
                    setDuration(seconds);
                });
            });
        } else {
            soundRef.current.play(() => setIsPlaying(true));
        }
    };

    const pauseAudio = () => {
        if (soundRef.current) {
            soundRef.current.pause(() => setIsPlaying(false));
        }
    };

    const seekForward = () => {
        if (soundRef.current) {
            soundRef.current.getCurrentTime((seconds) => {
                soundRef.current.setCurrentTime(seconds + 5);
            });
        }
    };

    const seekBackward = () => {
        if (soundRef.current) {
            soundRef.current.getCurrentTime((seconds) => {
                soundRef.current.setCurrentTime(seconds - 5);
            });
        }
    };

    const onSliderValueChange = (value) => {
        setSliderValue(value);
        if (soundRef.current) {
            soundRef.current.setCurrentTime(value);
            setCurrentTime(value);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (soundRef.current) {
                soundRef.current.getCurrentTime((seconds, isPlaying) => {
                    setCurrentTime(seconds);
                    setIsPlaying(isPlaying);
                    setSliderValue(seconds);
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeAudioModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#01595A" />
                    ) : (
                        <View>
                            <View style={styles.controls}>
                                <TouchableOpacity style={styles.controlButton} onPress={seekBackward}>
                                    <Icon name="replay-5" size={30} color="#01595A" />
                                </TouchableOpacity>
                                {isPlaying ? (
                                    <TouchableOpacity style={styles.controlButton1} onPress={pauseAudio}>
                                        <Icon name="pause" size={30} color="#fff" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.controlButton1} onPress={playAudio}>
                                        <Icon name="play-arrow" size={30} color="#fff" />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity style={styles.controlButton} onPress={seekForward}>
                                    <Icon name="forward-5" size={30} color="#01595A" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.modalButton} onPress={closeAudioModal}>
                                <Text style={styles.modalButtonText}>
                                    <Icon name="close" size={30} color="#01595A" />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        elevation: 5,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    controlButton: {
        marginHorizontal: 20,
    },
    controlButton1: {
        backgroundColor: '#01595A',
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    modalButton: {
        marginTop: 10,
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default AudioModal;




// <Slider
// style={{ width: '90%', marginTop: 20 }}
// minimumValue={0}
// maximumValue={duration}
// value={sliderValue}
// onValueChange={onSliderValueChange}
// thumbTintColor="#01595A"
// minimumTrackTintColor="#01595A"
// maximumTrackTintColor="red"
// />