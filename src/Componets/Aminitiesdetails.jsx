// import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity,Modal } from 'react-native'
// import React, { useState } from 'react'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Sound from 'react-native-sound';


// const Aminitiesdetails = ({ route }) => {
//     const data = route.params;
//     const [audioModalVisible, setAudioModalVisible] = useState(false);
//     const [sound, setSound] = useState(null);

//     const openAudioModal = () => {
//         setAudioModalVisible(true);
//     };

//     const closeAudioModal = () => {
//         if (sound) {
//             sound.stop(); // Stop the audio when closing the modal
//         }
//         setAudioModalVisible(false);
//     };

//     const playAudio = () => {
//         if (!sound) {
//             const newSound = new Sound('ram.mp3', '', (error) => {
//                 if (error) {
//                     console.log('Failed to load the sound', error);
//                     return;
//                 }
//                 setSound(newSound);
//                 newSound.play(() => {
//                     newSound.release(); // Release the audio player resource when finished playing
//                     setSound(null);
//                 });
//             });
//         } else {
//             sound.play();
//         }
//     };
//     return (
//         <View style={styles.maincontainer}>
//             <View style={styles.subcontainer1}>
//                 <View style={styles.bgImage}
//                 >

//                     <Image style={styles.image} source={data.image} />
//                 </View>
//             </View>
//             <View

//                 style={styles.contentContainer}>

//                 <View style={styles.headingwrap}>
//                     <Text style={styles.headtext}>{data.title}</Text>
//                     <Text style={{ color: '#000', textAlign: 'justify' }} >{data.description}</Text>
//                     <View style={{top:350}}>
//                         <View style={styles.buttonview}>
//                             <TouchableOpacity style={styles.button} >

//                                 <Text style={styles.buttonText} onPress={openAudioModal}>Audio</Text>
//                                 <Icon name="multitrack-audio" size={24} color="#fff" />
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.button} >
//                                 <Text style={styles.buttonText}>Video</Text>
//                                 <Icon name="ondemand-video" size={24} color="#fff" />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//             <Modal
//             animationType="slide"
//             transparent={true}
//             visible={audioModalVisible}
//             onRequestClose={closeAudioModal}
//         >
//             <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                     <Text style={styles.modalText}>Audio Player</Text>
//                     <TouchableOpacity style={styles.modalButton} onPress={playAudio}>
//                         <Text style={styles.modalButtonText}>Play</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.modalButton} onPress={closeAudioModal}>
//                         <Text style={styles.modalButtonText}>Close</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     maincontainer: {
//         flex: 1,

//     },
//     bgImage: {
//         height: hp(40),
//         width: '100%',
//         alignItems: 'center',
//         // justifyContent: 'center',
//     },
//     image: {
//         height: '100%',
//         width: '100%',
//         resizeMode: 'stretch',
//         // marginVertical: 50

//     },
//     subcontainer1: {
//         flex: 1,
//         // alignItems: "center"
//     },
//     contentContainer: {
//         flex: 2,
//         backgroundColor: 'white',
//         borderTopRightRadius: 50,
//         borderTopLeftRadius: 50,
//         // justifyContent: 'flex-start',
//         alignItems: 'center',
//         padding: 2

//     },

//     button: {
//         width: '40%',
//         height: 45,
//         borderRadius: 40,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row',
//         backgroundColor: '#01595A',
//         margin: 10,

//     },
//     buttonText: {
//         color: '#ffffff',
//         fontSize: 18,
//         fontWeight: '500',
//         margin: 10
//     },
//     headingwrap: {
//         alignItems: 'flex-start',
//         top: 20,
//         // position: "absolute",
//         marginHorizontal: 13,





//     },
//     headtext: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         fontFamily: 'Century Gothic',
//         color: '#000000',
//         // margin: 20,
//         marginVertical: 20
//     },
//     buttonview: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginVertical: 20,
//         position: 'absolute',
//         justifyContent: "flex-end",
//         // alignSelf:"flex-end"
//     },


//     subcontainer1: {
//         flex: 1,
//         alignItems: 'center',

//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalView: {
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         elevation: 5,
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: "center",
//         fontWeight: 'bold',
//         fontSize: 20,
//     },
//     modalButton: {
//         marginTop: 10,
//         backgroundColor: "#01595A",
//         borderRadius: 20,
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//     },
//     modalButtonText: {
//         color: "white",
//         fontWeight: "bold",
//         textAlign: "center",
//         fontSize: 16,
//     },
// })
// export default Aminitiesdetails







import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import Slider from "@react-native-community/slider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import axios from 'axios';
import AudioModal from './AudioModal';
import VideoModal from './VideoModal';

const Aminitiesdetails = ({ route }) => {
    const data = route.params;
    const [audioModalVisible, setAudioModalVisible] = useState(false);
    const [videoModalVisible, setvideoModalVisible] = useState(false);
    const { SelectedLanguage1 } = globalvariavle();
    const [about, setaboutData] = useState([]);
    console.log(about);

    useEffect(() => {
       
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');

            try {

                const response = await axios.post(`${config.API_URL}auth/get-amenities-list`, {

                    aminities_id:data.id,
                    language: SelectedLanguage1
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setaboutData(response.data.data[0]);

            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };
        fetchData();
        return () => {
          
            console.log('Component will unmount');
        };
    }, [SelectedLanguage1]);

    const openAudioModal = () => {
        setAudioModalVisible(true);
    };

  

    const openvideoModal = () => {
        setvideoModalVisible(true);
    };

  

   
   

    return (
        <View style={styles.maincontainer}>
            <View style={styles.subcontainer1}>
                <View style={styles.bgImage}>
                    <Image style={styles.image} source={{uri:about.image}} />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.headingwrap}>
                    <Text style={styles.headtext}>{about.name}</Text>
                    <Text style={{ color: '#000', textAlign: 'justify' }}>{about.description}</Text>
                    <View style={{ top: 350 }}>
                        <View style={styles.buttonview}>
                            <TouchableOpacity style={styles.button} onPress={openAudioModal}>
                                <Text style={styles.buttonText}>Audio</Text>
                                <Icon name="multitrack-audio" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText} onPress={openvideoModal}>Video</Text>
                                <Icon name="ondemand-video" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View>
            <AudioModal data={about} visible={audioModalVisible} onClose={() => setAudioModalVisible(false)}/>
            </View>
            <VideoModal
            visible={videoModalVisible}
            onClose={() => setvideoModalVisible(false)}
            videoUri={about.video_upload}
          />
        </View>
    );
};

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
    },
    bgImage: {
        height: hp(40),
        width: '100%',
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
    },
    subcontainer1: {
        flex: 1,
    },
    contentContainer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: 'center',
        padding: 2,
    },
    button: {
        width: '40%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#01595A',
        margin: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
        margin: 10,
    },
    headingwrap: {
        alignItems: 'flex-start',
        top: 20,
        marginHorizontal: 13,
    },
    headtext: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        marginVertical: 20,
    },
    buttonview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20,
        justifyContent: "flex-end",
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
        padding: 35,
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
        marginTop: 20,
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
});

export default Aminitiesdetails;

