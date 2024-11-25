import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Langchange from './Langchange';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../config/config';
import AudioModal from './AudioModal';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
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

const PlatsDetails = ({ route, navigation }) => {
  const data = route.params;
  const [audioModalVisible, setAudioModalVisible] = useState(false);

  const { SelectedLanguage1 } = globalvariavle();
  const [videoModalVisible, setvideoModalVisible] = useState(false);
  const [buttonmodal, setbuttonmodal] = useState(false);
  const [treeData, setTreedeatils] = useState([]);
  const [playMode, setPlayMode] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    const id = data.id;
    console.log(id);
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await axios.post(
          `${config.API_URL}auth/get-tress-list`,
          {
            tress_id: id,
            language: SelectedLanguage1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTreedeatils(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching tree data:', error);
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

  const stripHtmlTags = (str) => {
    if (!str) return '';
    let result = str.replace(/<\/?[^>]+(>|$)/g, '');
    result = result.replace(/&nbsp;/g, ' ');
    result = result.replace(/wikipedia/gi, '');
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
    { image: source = { uri: treeData.image } },
    { image: source = { uri: treeData.image_two } },
    { image: source = { uri: treeData.image_three } },
    { image: source = { uri: treeData.image_four } },
    { image: source = { uri: treeData.image_five } },

  ];
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <Image style={styles.carouselImage} source={item.image} />
      </View>
    );
  };

  const goOnMap = () => {

    navigation.navigate('Mainmap', treeData);
  }
  return (
    <View style={styles.maincontainer}>
      <View style={styles.subcontainer1}>
        <View style={styles.bgImage}>
          <Image style={styles.image} source={{ uri: treeData.image }} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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
            <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-between", width: '95%' }}>
              <Text style={styles.headtext}>{treeData.name}</Text>

              <TouchableOpacity style={styles.dibtn} ><Text style={{ color: '#fff', fontWeight: "400", fontSize: 15 }} onPress={() => goOnMap()}>Show On Map</Text></TouchableOpacity>

            </View>

            <Text style={{ color: '#000', textAlign: 'justify' }}>{stripHtmlTags(treeData.description)}</Text>
            <View style={styles.headtext2wrap}>
              <Text style={styles.headtext2}>
                BOTANICAL NAME:&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: '400' }}>{treeData.botnical_name}</Text>
              </Text>
              <Text style={styles.headtext2}>
                COMMON NAME:&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: '400' }}>{treeData.common_name}</Text>
              </Text>
              <Text style={styles.headtext2}>
                HEIGHT:&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: '400' }}>{treeData.height}&nbsp;{treeData.height_type}</Text>
              </Text>
              <Text style={styles.headtext2}>
                CANOPY:&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: '400' }}>{treeData.canopy}&nbsp;{treeData.canopy_type}</Text>
              </Text>
              <Text style={styles.headtext2}>
                GIRTH:&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: '400' }}>{treeData.girth}&nbsp;{treeData.girth_type}</Text>
              </Text>
            </View>
            <View style={styles.buttonview}>
              <TouchableOpacity style={styles.button} onPress={openAudioModal}>
                <Text style={styles.buttonText}>Audio</Text>
                <Icon name="multitrack-audio" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={openvideoModal}>
                <Text style={styles.buttonText}>Video</Text>
                <Icon name="ondemand-video" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
        <View />
        <AudioModal data={treeData} visible={audioModalVisible} onClose={() => setAudioModalVisible(false)} />
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
        videoUri={treeData.video_upload}
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
    backgroundColor: '#ffff',
  },
  image: {
    height: '95%',
    width: '100%',
    resizeMode: 'cover',
  },
  subcontainer1: {
    flex: 1,
  },
  contentContainer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    padding: 10,
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

    top: 0,
    marginHorizontal: 13,
  },
  headtext: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: '#000000',
    paddingVertical: 0,
  },
  headtext2: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: '#01595A',
    padding: 5,
  },
  buttonview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    alignSelf: 'center',
    // marginBottom:wp(10)
  },
  headtext2wrap: {
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
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
    height: '90%',
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
  dibtn: {
   width: '30%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#01595A',
    marginLeft: 0
  },
});

export default PlatsDetails;

