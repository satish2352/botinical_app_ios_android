
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Modal, Text, TouchableOpacity, ScrollView, Dimensions, Button, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Polyline, Marker, Polygon, AnimatedRegion } from 'react-native-maps';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { requestLocationAccuracy, checkLocationAccuracy, LocationAccuracy } from 'react-native-location-enabler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

import VideoModal from './VideoModal';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import AudioModal from './AudioModal';

const kmlData = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
	<name>Botanical Garden.kmz</name>
	<Style id="s_ylw-pushpin_hl">
		<IconStyle>
			<scale>1.3</scale>
			<Icon>
				<href>https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
			</Icon>
			<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
		</IconStyle>
		<LineStyle>
			<color>ff00ffff</color>
		</LineStyle>
		<PolyStyle>
			<fill>0</fill>
		</PolyStyle>
	</Style>
	<Style id="s_ylw-pushpin">
		<IconStyle>
			<scale>1.1</scale>
			<Icon>
				<href>https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
			</Icon>
			<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
		</IconStyle>
		<LineStyle>
			<color>ff00ffff</color>
		</LineStyle>
		<PolyStyle>
			<fill>0</fill>
		</PolyStyle>
	</Style>
	<StyleMap id="m_ylw-pushpin">
		<Pair>
			<key>normal</key>
			<styleUrl>#s_ylw-pushpin</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#s_ylw-pushpin_hl</styleUrl>
		</Pair>
	</StyleMap>
	<Placemark>
		<name>Botanical Garden</name>
		<LookAt>
			<longitude>78.35728537719703</longitude>
			<latitude>17.45407013149723</latitude>
			<altitude>0</altitude>
			<heading>2.067360542951285e-14</heading>
			<tilt>45.00000000000001</tilt>
			<range>1360.410508856907</range>
			<gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode>
		</LookAt>
		<styleUrl>#m_ylw-pushpin</styleUrl>
		<Polygon>
			<tessellate>1</tessellate>
			<outerBoundaryIs>
				<LinearRing>
					<coordinates>
						78.35099653865082,17.45258830380859,0 78.35116790053983,17.45232961342451,0 78.35266334368971,17.45153770712911,0 78.35371782118027,17.45107491551616,0 78.35499268769874,17.45065400267217,0 78.35572124770651,17.45064130685334,0 78.35656914064103,17.45099100479441,0 78.35712279169209,17.45097994196231,0 78.35759540877359,17.45094883785035,0 78.35851433440141,17.45097665421504,0 78.35913552257284,17.45097292433351,0 78.35930663851239,17.4510608401952,0 78.35988824145373,17.45131880236901,0 78.3606271257956,17.45166195783192,0 78.361917959089,17.45232117145466,0 78.36285919294649,17.45287356459466,0 78.36348944382391,17.4533023248711,0 78.36350986625452,17.45380132178829,0 78.36353400306359,17.45431843019696,0 78.36356307253274,17.45476908116544,0 78.36360285292459,17.45508787676559,0 78.36367866663961,17.45532785829392,0 78.36369984871322,17.45545839009273,0 78.36366699725954,17.45552258886455,0 78.36358939690169,17.45558324815694,0 78.3627213805627,17.45597428087079,0 78.36165039026709,17.45637600963586,0 78.36109269709588,17.45668562029861,0 78.35961602206781,17.45749895614112,0 78.35948447473288,17.4552270968703,0 78.35851133340692,17.45440917849551,0 78.35787350501812,17.45408332123594,0 78.3576323636177,17.45396881728725,0 78.35659500323349,17.45383342257061,0 78.35640260266234,17.45375546622433,0 78.35619874374818,17.45373103185598,0 78.35594226249596,17.45378818688738,0 78.3558080563414,17.45379228850712,0 78.35567443046696,17.45386651547782,0 78.35545269663639,17.45393735164832,0 78.35528976073213,17.45403009825355,0 78.3551017326219,17.45409832342855,0 78.35488794141962,17.45408334227464,0 78.35470480045224,17.4539448208536,0 78.35415875363074,17.45381467819875,0 78.35404639758548,17.45372040003664,0 78.35348175553288,17.45359339051824,0 78.35265538045066,17.45341301534266,0 78.35178764208352,17.45319588787392,0 78.35087090568076,17.45293436174352,0 78.35099653865082,17.45258830380859,0 
					</coordinates>
				</LinearRing>
			</outerBoundaryIs>
		</Polygon>
	</Placemark>
</Document>
</kml>
`;

const amenities = [
  {
    coordinate: { latitude: 17.45361843537005, longitude: 78.35391183141539 },
    title: 'Washroom',
    description: 'The washroom is a clean and well-maintained space designed for comfort and hygiene. It features modern fixtures, including a sleek sink, a spacious countertop, and a well-lit mirror. The environment is welcoming, with fresh towels, fragrant soap, and a soothing color palette, ensuring a pleasant and refreshing experience for every visitor. ',
    image: require('../Assets/amenities/washroom.png')
  },
  {
    coordinate: { latitude: 17.45322502795336, longitude: 78.35348263668773 },
    title: 'Drinking Water',
    description: 'Drinking water is essential for maintaining good health and well-being. Clean and safe to consume, it keeps our bodies hydrated, aids in digestion, and helps regulate body temperature. Accessible through various sources like taps, fountains, and bottled options, drinking water is a vital part of our daily routine, ensuring we stay refreshed and energized.',
    image: require('../Assets/amenities/drinkingwater.png')
  },


];


const renderItem = ({ item, index }) => {
  return (
    <View style={styles.carouselItem}>
      <Image style={styles.carouselImage} source={item.image} />
    </View>
  );
};


const stripHtmlTags = (str) => {
  if (!str) return '';
  let result = str.replace(/<\/?[^>]+(>|$)/g, "");
  result = result.replace(/&nbsp;/g, " ");
  result = result.replace(/wikipedia/gi, "");
  return result;
}

const Mainmap = () => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [amenities, setamenities] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [start, setStart] = useState(1);
  const [userLocation, setUserLocation] = useState(null);
  const [transportMode, setTransportMode] = useState('driving');
  const [showDirections, setShowDirections] = useState(false);
  const [directionsDestination, setDirectionsDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { SelectedLanguage1 } = globalvariavle();
  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [videoModalVisible, setvideoModalVisible] = useState(false);
  const [audiovideodata, setaudiovideodata] = useState([]);
  console.log("!!!!!!!!!!!!!!!!!!!!",audiovideodata);
  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const markerRef = useRef()
  console.log("55555555555555555555555555555",amenities);
  // console.log("77777777777777777777",directionsDestination);
  const [state, setState] = useState({

    coordinateanimated: new AnimatedRegion({
      // latitude: 30.7046,
      // longitude: 77.1025,
      coordinate: { userLocation },
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }),


  })

  const { coordinateanimated } = state
  // const updateState = (data) => setState((state) => ({ ...state, ...data }));


  const mapRef = useRef();

  const GOOGLE_MAPS_APIKEY = "AIzaSyCIEHb7JkyL1mwS8R24pSdVO4p2Yi_8v98"

  const carouselData = [
    { image: require('../Assets/s1.jpg') },
    { image: require('../Assets/s2.jpg') },
    { image: require('../Assets/s3.jpg') },

  ];

  const requestlocationPermission = async () => {
    try {
      let permission;

      if (Platform.OS === 'android') {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      } else if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      }

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const livelocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("after every 6 second call live location function");
        animate(latitude, longitude);
        setUserLocation({ latitude, longitude });
        // updateState({

        //   coordinateanimated: new AnimatedRegion({
        //     latitude: latitude,
        //     longitude: longitude,
        //     // coordinate: { userLocation },
        //     latitudeDelta: LATITUDE_DELTA,
        //     longitudeDelta: LONGITUDE_DELTA
        //   }),
        // })


      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}auth/get-map-data`, {
        language: SelectedLanguage1,
        start
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setamenities(response.data.data);
 
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching map data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  useEffect(() => {
    requestlocationPermission();

    livelocation();
  }, []);
  useEffect(() => {
    fetchData();
  }, [start]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     livelocation()

  //   }, 6000);
  //   return () => clearInterval(interval)
  // }, []);


  const parseCoordinates = (kml) => {
    const coordinates = [];
    const regex = /<coordinates>([\s\S]*?)<\/coordinates>/g;
    let match;
    while ((match = regex.exec(kml))) {
      const coordString = match[1].trim();
      const coordPairs = coordString.split(/\s+/);
      coordPairs.forEach(pair => {
        const [longitude, latitude] = pair.split(',').map(parseFloat);
        coordinates.push({ latitude, longitude });
      });
    }
    return coordinates;
  };
  const handleMarkerPress = (amenity) => {
    setSelectedAmenity(amenity);
    setaudiovideodata(amenity)
    setShowDirections(false);
  };

  const closeModal = () => {
    setSelectedAmenity(null);
    setShowDirections(false);
  };
  const handleDirectionPress = () => {
    if (selectedAmenity) {
      
      setDirectionsDestination({
        latitude: parseFloat(selectedAmenity.latitude),
        longitude: parseFloat(selectedAmenity.longitude),
      });
      setShowDirections(true);
      setSelectedAmenity(null);
    }
  };
  const coordinates = parseCoordinates(kmlData);

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
      else {
        coordinateanimated.timing(newCoordinate).start();
      }
    }
  }

  // const onCenter = () => {
  //   mapRef.current.animateToRegion({
  //     latitude: userLocation.latitude,
  //     longitude: userLocation.longitude,
  //     latitudeDelta: 0.004,
  //     longitudeDelta: 0.004
  //   })
  // }
  
  const openAudioModal = () => {
    setAudioModalVisible(true);
};

const openvideoModal = () => {
    setvideoModalVisible(true);
};
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 17.45407013149723,
          longitude: 78.35728537719703,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Polyline
          coordinates={coordinates}
          strokeColor="#FF0000"
          fillColor='red'
          strokeWidth={3}
        />
        <Polygon
          coordinates={coordinates}
          fillColor="rgba(0, 200, 0, 0.5)"
          strokeColor="rgba(0,0,0,0.5)"
          strokeWidth={2}
        />
        {amenities.map((amenity, index) => (
         
          <Marker

            key={index}
            // coordinate={amenity.coordinate}
            coordinate={{
              latitude: parseFloat(amenity.latitude),
              longitude: parseFloat(amenity.longitude),
            }}
            title={amenity.name}

            onPress={() => handleMarkerPress(amenity)}
          >

            <Image style={{ height: 50, width: 50 }} source={{ uri: amenity.icon_image }} />
            
          </Marker>
         
        ) )}
        {userLocation && (
          <Marker.Animated
            ref={markerRef}
            coordinate={coordinateanimated}
            title="User Location"
            pinColor="red"

          />
        )}
        {showDirections && userLocation && directionsDestination && (
          <MapViewDirections
            origin={userLocation}
            destination={directionsDestination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="blue"
            mode={transportMode}
            lineDashPattern={transportMode === 'walking' ? [1, 10] : null}
            optimizeWaypoints={true}
            onReady={(result) => {

              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100
                }
              })
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);

            }}
            onError={(errorMessage) => {
              console.error('Error with directions:', errorMessage);
            }}
          />
        )}

      </MapView>
      {/*<TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor:'#01595A',
        borderRadius:20,
        padding:10
      }}
      onPress={onCenter}
    >
      <Text style={{color:'#fff'}}>Re-Center</Text>
    </TouchableOpacity>*/}

      {selectedAmenity && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.bgImage}
              >

                <Image style={styles.image1} source={{ uri: selectedAmenity.image }} />
              </View>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon name="close" size={34} color="#01595A" />
              </TouchableOpacity>
              <ScrollView>

                <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-between" }}>
                  <Text style={styles.title}>{selectedAmenity.name}</Text>
                  <TouchableOpacity style={styles.dibtn} onPress={handleDirectionPress}><Text style={{ color: '#fff', fontWeight: "400", fontSize: 15 }}>Direction</Text></TouchableOpacity>
                </View>
                <Text style={styles.description}> {stripHtmlTags(selectedAmenity.description)}</Text>
                <View >  
                <Text style={styles.headtext2}>COMMON NAME:&nbsp;&nbsp;<Text style={{ color: '#000',fontWeight:"400", }}>{selectedAmenity.common_name}</Text></Text>
                <Text style={styles.headtext2}>HIGHT :&nbsp;&nbsp;<Text style={{ color: '#000',fontWeight:"400", }}>{selectedAmenity.height}&nbsp;{selectedAmenity.height_type}</Text></Text>
                <Text style={styles.headtext2}>CANOPY :&nbsp;&nbsp;<Text style={{ color: '#000' ,fontWeight:"400",}}>{selectedAmenity.canopy}&nbsp;{selectedAmenity.canopy_type}</Text></Text>
                <Text style={styles.headtext2}>GIRTH :&nbsp;&nbsp;<Text style={{ color: '#000',fontWeight:"400", }}>{selectedAmenity.girth}&nbsp;{selectedAmenity.girth_type}</Text></Text>
                </View>
                <View style={styles.buttonview}>
                <TouchableOpacity style={styles.button} >

                    <Text style={styles.buttonText} onPress={openAudioModal}>Audio</Text>
                    <Icon1 name="multitrack-audio" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText} onPress={openvideoModal}>Video</Text>
                    <Icon1 name="ondemand-video" size={24} color="#fff" />
                </TouchableOpacity>
                <View>
                <AudioModal data={audiovideodata} visible={audioModalVisible} onClose={() => setAudioModalVisible(false)} />
            </View>

            <VideoModal
                visible={videoModalVisible}
                onClose={() => setvideoModalVisible(false)}
                videoUri={audiovideodata.video_upload}
            />
            </View>
              </ScrollView>
              {/* Add buttons to select transportation mode */}
              <View style={styles.transportModeContainer}>
                <TouchableOpacity
                  style={[styles.transportModeButton, transportMode === 'driving' && styles.selectedTransportMode]}
                  onPress={() => setTransportMode('driving')}
                >
                  <Text>Car</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.transportModeButton, transportMode === 'walking' && styles.selectedTransportMode]}
                  onPress={() => setTransportMode('walking')}
                >
                  <Text>Walk</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.transportModeButton, transportMode === 'bike' && styles.selectedTransportMode]}
                  onPress={() => setTransportMode('bike')}
                >
                  <Text>Bike</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingVertical: 0,

    alignItems: 'center',
    height: '70%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    // textAlign: 'center',
    color: 'black'
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    // height: '100%',
    marginBottom: 10,
  },
  closeButton: {
    // padding: 15,


    position: 'absolute',
    alignSelf: 'flex-end',
    right: 20
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  carouselwrap: {
    alignItems: "center",
    justifyContent: 'center',
    height: '40%',
    padding: 10,
    resizeMode: "center"

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
    top: hp(17), // Adjust top position as needed

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
  dibtn: {
    width: '25 %',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#01595A',
  },
  transportModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  transportModeButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedTransportMode: {
    backgroundColor: '#01595A',
    color: '#fff',
  },
  bgImage: {
    height: hp(40),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ffff",
    // backgroundColor: "black"

  },
  image1: {
    height: '70%',
    width: '95%',
    resizeMode: 'cover',
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: "red"

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    margin: 10
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
buttonview: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginVertical: 20,
  alignSelf: 'center'
},
headtext2: {
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: 'Century Gothic',
  color: '#000000',
  padding: 5,
  color: '#01595A'

},

});

export default Mainmap;






// <View style={styles.carouselwrap}>
// <Carousel
//   data={carouselData}
//   renderItem={renderItem}
//   sliderWidth={wp(100)}
//   autoplay={true}
//   itemWidth={wp(90)} // Set item width to full width
//   onSnapToItem={(index) => setActiveIndex(index)}
//   autoplayInterval={5000}
//   loop={true}
// />
// <View style={styles.paginationContainer}>
//   <Pagination
//     dotsLength={carouselData.length}
//     activeDotIndex={activeIndex}
//     dotStyle={styles.paginationDot}
//     inactiveDotStyle={styles.paginationInactiveDot}
//     inactiveDotOpacity={0.4}
//     inactiveDotScale={0.6}
//   />
// </View>
// </View>



