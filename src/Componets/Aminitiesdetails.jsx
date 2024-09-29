
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
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
import Carousel, { Pagination } from 'react-native-snap-carousel';


const ButtonModal = ({ visible, onClose, onPlayOnline, onDownloadAndPlay }) => {
    return (
        <View style={{ flex: 1 }}>
            <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Choose an Option</Text>
                        <TouchableOpacity style={styles.button1} onPress={() => onPlayOnline()}>
                            <Text style={styles.buttonText}>Play Online</Text>
                            <Icon name="play-arrow" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button1} onPress={() => onDownloadAndPlay()}>
                            <Text style={styles.buttonText}>Play Offline</Text>
                            <Icon name="file-download" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>

                            <Icon name="close" size={30} color="#01595A" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal></View>

    );
};

const Aminitiesdetails = ({ route, navigation }) => {
    const data = route.params;
    const [audioModalVisible, setAudioModalVisible] = useState(false);
    const [videoModalVisible, setvideoModalVisible] = useState(false);
    const { SelectedLanguage1 } = globalvariavle();
    const [about, setaboutData] = useState([]);
    const [playMode, setPlayMode] = useState(null);
    const [buttonmodal, setbuttonmodal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    console.log(about);

    useEffect(() => {

        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');

            try {

                const response = await axios.post(`${config.API_URL}auth/get-amenities-list`, {

                    amenities_id: data.id,
                    language: SelectedLanguage1
                }, {
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
        setbuttonmodal(true);
    };


    const goOnMap = () => {

        navigation.navigate('Mainmap', about);
    }

    const stripHtmlTags = (str) => {
        if (!str) return '';
        let result = str.replace(/<\/?[^>]+(>|$)/g, "");
        result = result.replace(/&nbsp;/g, " ");
        result = result.replace(/wikipedia/gi, "");
        return result;
    };
    const handlePlayOnline = () => {
        // Handle playing video online

        setbuttonmodal(false);
        setPlayMode('online');
        setvideoModalVisible(true)
    };

    const handleDownloadAndPlay = () => {
        // Handle downloading and playing video
        setbuttonmodal(false);
        setPlayMode('offline');
        setvideoModalVisible(true)

    };
    const carouselData = [
        { image: source = { uri: about.image } },
        { image: source = { uri: about.image_two } },
        { image: source = { uri: about.image_three } },
        { image: source = { uri: about.image_four } },
        { image: source = { uri: about.image_five } },

    ];
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.carouselItem}>
                <Image style={styles.carouselImage} source={item.image} />
            </View>
        );
    };
    return (

        <View style={styles.maincontainer}>

            <View style={styles.subcontainer1}>
                <View style={styles.bgImage}>
                    <Image style={styles.image} source={{ uri: about.image }} />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={styles.carouselwrap}>
                        <Carousel
                            data={carouselData}
                            renderItem={renderItem}
                            sliderWidth={wp(100)}
                            autoplay={true}
                            itemWidth={wp(90)} // Set item width to full width
                            onSnapToItem={(index) => setActiveIndex(index)}
                            autoplayInterval={5000}
                            loop={true}
                        />
                        <View style={styles.paginationContainer}>
                            <Pagination
                                dotsLength={carouselData.length}
                                activeDotIndex={activeIndex}
                                dotStyle={styles.paginationDot}
                                inactiveDotStyle={styles.paginationInactiveDot}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                            />
                        </View>
                    </View>

                    <View style={styles.headingwrap}>

                        <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-between" }}>
                            <Text style={styles.headtext}>{about.name}</Text>
                            <TouchableOpacity style={styles.dibtn} ><Text style={{ color: '#fff', fontWeight: "400", fontSize: 15 }} onPress={() => goOnMap(about)}>Show On Map</Text></TouchableOpacity>
                        </View>

                        <Text style={{ color: '#000', textAlign: 'justify' }}>{stripHtmlTags(about.description)}</Text>

                        <View style={styles.headtext2wrap}>
                            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: "500" }}>Time Slot 1</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.headtext2}>OPEN TIME:&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{about.open_time_first}</Text></Text>
                                <Text style={styles.headtext2}>CLOSE TIME :&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{about.close_time_first}</Text></Text>
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: "500" }}>Time Slot 2</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.headtext2}>OPEN TIME :&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{about.open_time_second}</Text></Text>
                                <Text style={styles.headtext2}>CLOSE TIME :&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{about.close_time_second}</Text></Text>
                            </View>



                        </View>




                        <View  >
                            <View style={styles.buttonview}>

                                {
                                    about.audio_link && about.audio_link.length > 0 ? <TouchableOpacity style={styles.button} onPress={openAudioModal}>
                                        <Text style={styles.buttonText}>Audio</Text>
                                        <Icon name="multitrack-audio" size={24} color="#fff" />
                                    </TouchableOpacity> : null
                                }

                                {
                                    about.video_upload && about.video_upload.length > 0 ? <TouchableOpacity style={styles.button} onPress={openvideoModal}>
                                        <Text style={styles.buttonText}>Video</Text>
                                        <Icon name="ondemand-video" size={24} color="#fff" />
                                    </TouchableOpacity> : null
                                }

                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>

            <View>
                <AudioModal data={about} visible={audioModalVisible} onClose={() => setAudioModalVisible(false)} />
                <ButtonModal
                    visible={buttonmodal}
                    onClose={() => setbuttonmodal(false)}
                    onPlayOnline={handlePlayOnline}
                    onDownloadAndPlay={handleDownloadAndPlay}
                />
            </View>
            <VideoModal
                visible={videoModalVisible}
                onClose={() => setvideoModalVisible(false)}
                videoUri={about.video_upload}
                playMode={playMode}
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
        top: 0,
        marginHorizontal: 13,
    },
    headtext: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        marginVertical: 10,
    },
    buttonview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20,
        alignSelf: 'center',
        justifyContent: 'space-between',
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
    headtext2wrap: {
        marginVertical: 10,
        alignItems: "center"
    },
    headtext2: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        padding: 5,
        color: '#01595A'

    },
    carouselItem: {
        width: '100%', // Set width to full width
        height: hp(28),
        borderRadius: 10,
        overflow: 'hidden',
        // marginBottom: 10,

    },
    carouselImage: {
        // flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    paginationContainer: {
        position: 'absolute',
        top: hp(20), // Adjust top position as needed

    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 12,
        backgroundColor: '#ffff',
        marginHorizontal: 4,

    },
    paginationInactiveDot: {
        backgroundColor: '#C4C4C4',

    },
    carouselwrap: {
        alignItems: "center",
        justifyContent: 'center',
        height: '35%',
        marginVertical: wp(4)

    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: wp(80),
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button1: {
        width: '80%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#01595A',
        margin: 10,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    dibtn: {
        width: '34%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#01595A',
        alignSelf: 'center'
    },
});

export default Aminitiesdetails;

