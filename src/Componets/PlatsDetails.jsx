import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity,Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Langchange from './Langchange';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../config/config';
import AudioModal from './AudioModal';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import VideoModal from './VideoModal';

const PlatsDetails = ({ route }) => {
    const data = route.params;
    const [audioModalVisible, setAudioModalVisible] = useState(false);
 
    const { SelectedLanguage1 } = globalvariavle();
    const [videoModalVisible, setvideoModalVisible] = useState(false);
    const [treeData, setTreedeatils] = useState([]);
    const details = treeData;
    useEffect(() => {
        const id = data.id
        console.log(id);
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');

            try {

                const response = await axios.post(`${config.API_URL}auth/get-tress-list`,
                    {
                        tress_id: id,
                        language: SelectedLanguage1,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                setTreedeatils(response.data.data[0]);

            } catch (error) {
                console.error('Error fetching tree data:', error);
            }
        };
        fetchData();

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
                <View style={styles.bgImage}
                >

                    <Image style={styles.image} source={{ uri: treeData.image }} />
                </View>
            </View>
            <View

                style={styles.contentContainer}>

                <View style={styles.headingwrap}>
                    <Text style={styles.headtext}>{treeData.name}</Text>
                    <Text style={{ color: '#000', textAlign: 'justify' }}>{treeData.description}</Text>
                    <View style={styles.headtext2wrap}>
                        <Text style={styles.headtext2}>BOTNICAL NAME-<Text style={{ color: '#000', }}>{treeData.title}</Text></Text>
                        <Text style={styles.headtext2}>COMMON NAME-<Text style={{ color: '#000', }}>{treeData.title}</Text></Text>
                    </View>
                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.button} >

                            <Text style={styles.buttonText} onPress={openAudioModal}>Audio</Text>
                            <Icon name="multitrack-audio" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText} onPress={openvideoModal}>Video</Text>
                            <Icon name="ondemand-video" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
            <AudioModal data={treeData} visible={audioModalVisible} onClose={() => setAudioModalVisible(false)}/>
            </View>
           
            <VideoModal
            visible={videoModalVisible}
            onClose={() => setvideoModalVisible(false)}
            videoUri={treeData.video_upload}
          />
          
          
            
     
        </View>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,


    },
    bgImage: {
        height: hp(40),
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: "#ffff"
    },
    image: {
        height: '90%',
        width: '100%',
        resizeMode: 'contain',
        // marginVertical: 50

    },
    subcontainer1: {
        flex: 1,
        // alignItems: "center"
    },
    contentContainer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 20, // Add elevation for Android shadow

        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        padding: 10
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
        margin: 10
    },
    headingwrap: {
        alignItems: 'flex-start',
        top: 30,
        // position: "absolute",
        marginHorizontal: 15,




    },
    headtext: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        // margin: 15,
        paddingVertical: 10

    },
    headtext2: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        padding: 5,
        color: '#01595A'

    },
    buttonview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20,
        alignSelf: 'center'
    },


    subcontainer1: {
        flex: 1,
        alignItems: 'center',

    },
    headtext2wrap: {
        marginVertical: 10
    },
    
})
export default PlatsDetails
