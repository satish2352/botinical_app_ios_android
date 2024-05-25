import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View ,Modal,TouchableOpacity,Text} from 'react-native';
import config from '../../config/config';
import Slider from "@react-native-community/slider";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
const AudioModal = ({data,visible ,onClose}) => { 
    
   
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);

 
    useEffect(() => {
        const id = data.id
      
        // console.log(id);
        // const fetchData = async () => {
        //     const token = await AsyncStorage.getItem('token');

        //     try {

        //         const response = await axios.post(`${config.API_URL}auth/get-tress-list`,
        //             {
        //                 tress_id: id
        //             },
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`
        //                 }
        //             });

        //         setTreedeatils(response.data.data);

        //     } catch (error) {
        //         console.error('Error fetching tree data:', error);
        //     }
        // };
        // fetchData();

        if (sound) {
            sound.getCurrentTime((seconds, isPlaying) => {
                setCurrentTime(seconds);
                setIsPlaying(isPlaying);
                setSliderValue(seconds);
            });
            const timer = setInterval(() => {
                sound.getCurrentTime((seconds, isPlaying) => {
                    setCurrentTime(seconds);
                    setIsPlaying(isPlaying);
                    setSliderValue(seconds);
                });
            }, 1000);
            return () => clearInterval(timer);
        };
        
        return () => {
          
            console.log('Component will unmount');
        };
    }, [sound]);



 

    const openAudioModal = () => {
        setAudioModalVisible(true);
    };

    const closeAudioModal = () => {
        if (sound) {
            sound.stop(); // Stop the audio when closing the modal
        }
        // setAudioModalVisible(false);
        onClose()
    };

    const playAudio = () => {
        if (!sound) {
            const newSound = new Sound(data.audio_link, '', (error) => {
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }
                setSound(newSound);
                newSound.play(() => {
                    newSound.release(); // Release the audio player resource when finished playing
                    setSound(null);
                    setIsPlaying(false);
                });
                setIsPlaying(true);
                newSound.setVolume(1);
                newSound.setNumberOfLoops(-1); // Loop indefinitely
                newSound.getCurrentTime((seconds) => {
                    setDuration(seconds);
                });
            });
        } else {
            sound.play(() => setIsPlaying(true));
        }
    };

    const pauseAudio = () => {
        if (sound) {
            sound.pause(() => setIsPlaying(false));
        }
    };

    const seekForward = () => {
        if (sound) {
            sound.getCurrentTime((seconds) => {
                sound.setCurrentTime(seconds + 5);
            });
        }
    };

    const seekBackward = () => {
        if (sound) {
            sound.getCurrentTime((seconds) => {
                sound.setCurrentTime(seconds - 5);
            });
        }
    };

    const onSliderValueChange = (value) => {
        setSliderValue(value);
        if (sound) {
            sound.setCurrentTime(value);
            setCurrentTime(value);
        }
    };

    return (
        <View style={styles.maincontainer}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => onClose()}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>

           
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
                    <Text style={styles.modalButtonText}><Icon name="close" size={30} color="#01595A" /></Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,


    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20,
    },
    modalButton: {
        marginTop: 10,
        // backgroundColor: "#01595A",
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
        marginHorizontal: 20,
    },
    controlButton1: {
        // marginTop: 20,
        backgroundColor: "#01595A",
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
})

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