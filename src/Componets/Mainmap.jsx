import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View, StyleSheet, Image, Modal, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { Polyline, Marker, Polygon, AnimatedRegion, Circle, Callout } from 'react-native-maps';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import VideoModal from './VideoModal';
import AudioModal from './AudioModal';
import ListModal from './ListModal';

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
// const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
// <kml xmlns="http://www.opengis.net/kml/2.2">
// <Document>

//     <!-- A to Z TREE GARDEN -->
//     <Style id="A_to_Z_TREE_GARDEN_Style">
//         <IconStyle>
//             <Icon>
//                 <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
//             </Icon>
//             <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
//         </IconStyle>
//         <LineStyle>
//             <color>#000000</color>
//         </LineStyle>
//         <PolyStyle>
//             <color>#00FFFF</color>
//             <fill>0</fill>
//         </PolyStyle>
//     </Style>
//     <Placemark>
//         <name>A to Z TREE GARDEN</name>
//         <styleUrl>#A_to_Z_TREE_GARDEN_Style</styleUrl>
//         <Polygon>
//             <tessellate>1</tessellate>
//             <outerBoundaryIs>
//                 <LinearRing>
//                     <coordinates>
//                         78.35375866636836,17.45358045622673,0 78.35373578284967,17.45352007451892,0 78.35383223036396,17.45353254022781,0 78.35380525339978,17.45336627526691,0 78.35398976660993,17.45341875603849,0 78.35401973626071,17.45364069485796,0 78.35375866636836,17.45358045622673,0 
//                     </coordinates>
//                 </LinearRing>
//             </outerBoundaryIs>
//         </Polygon>
//     </Placemark>

//     <!-- Vinayaka Vanam -->
//     <Style id="Vinayaka_Vanam_Style">
//         <IconStyle>
//             <Icon>
//                 <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
//             </Icon>
//             <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
//         </IconStyle>
//         <LineStyle>
//             <color>#000000</color>
//         </LineStyle>
//         <PolyStyle>
//             <color>ff00ffff</color>
//             <fill>0</fill>
//         </PolyStyle>
//     </Style>
//     <Placemark>
//         <name>Vinayaka Vanam</name>
//         <styleUrl>#Vinayaka_Vanam_Style</styleUrl>
//         <Polygon>
//             <tessellate>1</tessellate>
//             <outerBoundaryIs>
//                 <LinearRing>
//                     <coordinates>
//                         78.35635879323716,17.45120989853262,0 78.35637224046927,17.45123235637246,0 78.35638362332287,17.45125082072417,0 78.35639715627198,17.45128661138697,0 78.35640577680556,17.45130392698512,0 78.35640645556393,17.45132201061298,0 78.35640205904161,17.45133737255708,0 78.35639692388648,17.45135138628613,0 78.3563866869486,17.45136192692712,0 78.35637428035488,17.451365446269,0 78.35634943642381,17.45137249367734,0 78.35634419295229,17.45138662348624,0 78.35633893209922,17.45140080012649,0 78.3563256325634,17.45141146348266,0 78.35631017688438,17.45141644880288,0 78.35629769150879,17.45141787424987,0 78.35627722184049,17.45141431152167,0 78.35626321333227,17.45141858713773,0 78.35624851662743,17.4514200132835,0 78.35622811191388,17.45141431150551,0 78.35621601978296,17.45139938030987,0 78.35621595408153,17.45137249362539,0 78.35619805987918,17.45135981663677,0 78.35618522966368,17.45134998274355,0 78.35618058469103,17.45133457524157,0 78.35618258077066,17.45131574205518,0 78.35619228957671,17.45130531519094,0 78.35621003196016,17.45129076057353,0 78.35620104787061,17.45127556639218,0 78.35620027353102,17.45125082060485,0 78.35621389409218,17.45122417585531,0 78.35624514322549,17.45120447220358,0 78.35627382027997,17.45120040715127,0 78.35630683904407,17.45120594857112,0 78.35635879323716,17.45120989853262,0 
//                     </coordinates>
//                 </LinearRing>
//             </outerBoundaryIs>
//         </Polygon>
//     </Placemark>

//     <!-- Bathukamma Vanam -->
//     <Style id="Bathukamma_Vanam_Style">
//         <IconStyle>
//             <Icon>
//                 <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
//             </Icon>
//             <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
//         </IconStyle>
//         <LineStyle>
//             <color>#000000</color>
//         </LineStyle>
//         <PolyStyle>
//             <color>#FFC0CB</color>
//             <fill>0</fill>
//         </PolyStyle>
//     </Style>
//     <Placemark>
//         <name>Bathukamma Vanam</name>
//         <styleUrl>#Bathukamma_Vanam_Style</styleUrl>
//         <Polygon>
//             <tessellate>1</tessellate>
//             <outerBoundaryIs>
//                 <LinearRing>
//                     <coordinates>
//                         78.35665753995669,17.4520033241264,0 78.35663453820703,17.45200595727123,0 78.35659727536954,17.45200376297292,0 78.35657289352018,17.45199542464308,0 78.35655081184171,17.45198445315697,0 78.35652827013142,17.45196426563568,0 78.35651308899057,17.4519392506616,0 78.35650848867688,17.45191423569467,0 78.35650756862425,17.45188614871953,0 78.35651354912228,17.45185762289292,0 78.35652735018196,17.45183041364699,0 78.35654483152041,17.45180890957496,0 78.35656691319689,17.45179311067441,0 78.35659819555688,17.4517825780835,0 78.35662855783748,17.45177775066018,0 78.35665523983583,17.45178213926862,0 78.35668100176272,17.45179267188389,0 78.35670446351736,17.45180803195612,0 78.35671964465426,17.45183216919507,0 78.35673022544887,17.45185455099168,0 78.35673528583088,17.4518738607784,0 78.35673850607709,17.4519001923048,0 78.35673620590757,17.45191994094898,0 78.35672608514986,17.45195241649825,0 78.356708143796,17.45197128742927,0 78.35667318114622,17.45199542466509,0 78.35665753995669,17.4520033241264,0 
//                     </coordinates>
//                 </LinearRing>
//             </outerBoundaryIs>
//         </Polygon>
//     </Placemark>

//     <!-- GREEN MANURE TREE GARDEN -->
//     <Style id="GREEN_MANURE_TREE_GARDEN_Style">
//        <IconStyle>
//     <Icon>
//         <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
//     </Icon>
//     <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
// </IconStyle>
// <LineStyle>
//     <color>#000000</color>
// </LineStyle>
// <PolyStyle>
//     <color>#A52A2A</color>
//     <fill>0</fill>
// </PolyStyle>
// </Style>
// <Placemark>
//     <name>GREEN MANURE TREE GARDEN</name>
//     <styleUrl>#GREEN_MANURE_TREE_GARDEN_Style</styleUrl>
//     <Polygon>
//         <tessellate>1</tessellate>
//         <outerBoundaryIs>
//             <LinearRing>
//                 <coordinates>
//                     78.35595488788563,17.45050546391223,0 78.35593324939858,17.45050677418611,0 78.355911531225,17.45050977764195,0 78.35588795311897,17.45051907273784,0 78.35586999876643,17.45053697762777,0 78.35586113931942,17.45055693707234,0 78.35586241449608,17.45057518479998,0 78.35587083578884,17.4505907393996,0 78.35588662320858,17.45060130401145,0 78.3559100450277,17.45060904856038,0 78.35593151122053,17.45061354950812,0 78.355956325735,17.45061691819533,0 78.35598117002936,17.45061437541792,0 78.35600379866143,17.45060684856135,0 78.35602275684022,17.4505960798329,0 78.35603539287854,17.45058263120022,0 78.35604011905245,17.45056707861896,0 78.35603677636768,17.45055154713747,0 78.35602578060717,17.45053561428567,0 78.35601101619483,17.45052120867007,0 78.35599543774622,17.45051037731745,0 78.35597672019949,17.45050401029263,0 78.35595488788563,17.45050546391223,0 
//                 </coordinates>
//             </LinearRing>
//         </outerBoundaryIs>
//     </Polygon>
// </Placemark>

// </Document>
// </kml>

// `;
const ButtonModal = ({ visible, onClose, onPlayOnline, onDownloadAndPlay }) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer1}>
            <Text style={styles.title}>Choose an Option</Text>
            <TouchableOpacity style={styles.button1} onPress={() => onPlayOnline()}>
              <Text style={styles.buttonText}>Play Online</Text>
              <Icon2 name="play-arrow" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={() => onDownloadAndPlay()}>
              <Text style={styles.buttonText}>Play Offline</Text>
              <Icon2 name="file-download" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>

              <Icon2 name="close" size={30} color="#01595A" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal></View>

  );
};
const stripHtmlTags = (str) => {
  if (!str) return '';
  let result = str.replace(/<\/?[^>]+(>|$)/g, "");
  result = result.replace(/&nbsp;/g, " ");
  result = result.replace(/wikipedia/gi, "");
  return result;
}
const Mainmap = ({ route, navigation }) => {
  const deatils = route.params;
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [start, setStart] = useState(1);
  const [userLocation, setUserLocation] = useState(null);
  const [transportMode, setTransportMode] = useState('driving');
  const [showDirections, setShowDirections] = useState(false);
  const [directionsDestination, setDirectionsDestination] = useState(null);
  const [treesData, setTreesData] = useState([]);
  const [flowersData, setFlowersData] = useState([]);
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { SelectedLanguage1, isLoggedIn, showLoginPrompt } = globalvariavle();
  const [playMode, setPlayMode] = useState(null);
  const [buttonmodal, setbuttonmodal] = useState(false);
  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [videoModalVisible, setvideoModalVisible] = useState(false);
  const [audiovideodata, setaudiovideodata] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [nearbyEntities, setNearbyEntities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const markerRef = useRef()
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
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const mapRef = useRef();
  const GOOGLE_MAPS_APIKEY = "AIzaSyCIEHb7JkyL1mwS8R24pSdVO4p2Yi_8v98"

  useEffect(() => {
    requestlocationPermission();
    livelocation();
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      if (!isLoggedIn) {
        showLoginPrompt(navigation);
      }
    });
    return unsubscribe;
  }, [navigation, isLoggedIn,start]);


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
  useEffect(() => {

    const timer = setTimeout(() => {
      livelocation();

    }, 10000); // 60000 milliseconds = 1 minute

    return () => {
      clearTimeout(timer); // Cleanup timer on unmount
    };
  }, [userLocation]);
  const livelocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude ,accuracy } = position.coords;
        // console.log("after every 6 second call live location function");
        animate(latitude, longitude);
        setUserLocation({ latitude, longitude });
        findNearbyEntities(latitude, longitude);

        updateState({

          coordinateanimated: new AnimatedRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }),
        })


      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const findNearbyEntities = (latitude, longitude) => {
    const radius = 0.1; // 100 meters
    const nearby = combinedData
      .map(entity => ({
        ...entity,
        distance: haversineDistance(latitude, longitude, entity.latitude, entity.longitude),
      }))
      .filter(entity => entity.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4); // Get only the closest 4 entities

    if (nearby.length > 0) {
      setNearbyEntities(nearby);
      setModalVisible(true); // Automatically open the modal if nearby entities are found
    } else {
      setModalVisible(false); // Close the modal if no nearby entities are found
    }
  };
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };
  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}auth/get-map-data-new`, {
        language: SelectedLanguage1,
        start
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTreesData(response.data.treesData);
      setFlowersData(response.data.flowersData);
      setAmenitiesData(response.data.amenitiesData);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error('Error fetching map data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const combinedData = useMemo(() => {
    return [
      ...treesData.map((item) => ({ ...item, type: 'Tree' })),
      ...flowersData.map((item) => ({ ...item, type: 'Flower' })),
      ...amenitiesData.map((item) => ({ ...item, type: 'Amenity' })),
    ];
  }, [treesData, flowersData, amenitiesData]);
  // useEffect(() => {
  //   requestlocationPermission();
  //   livelocation();
  //   fetchData();

  //   {/*
      
  //         if (markerRef.current) {
  //     markerRef.current.showCallout();
  //   }
  //   const timer = setTimeout(() => {
  //     fetchData();
  //     // data() 
  //   }, 60000); // 60000 milliseconds = 1 minute

  //   return () => {
  //     clearTimeout(timer); // Cleanup timer on unmount
  //   };
  //     */}
  //   return () => {
  //   };
  // }, [start, kmlContent]);
  useEffect(() => {
    if (deatils) {
      const newCarouselData = [
        { image: { uri: deatils.image } },
        { image: { uri: deatils.image_two } },
        { image: { uri: deatils.image_three } },
        { image: { uri: deatils.image_four } },
        { image: { uri: deatils.image_five } },
      ];
      setCarouselData(newCarouselData);
      setSelectedAmenity(deatils)
      setModalVisible(false);
    }
    return () => {
    };
  }, [deatils])
  const handleRefresh = () => {
    fetchData();
    livelocation();
    Canceldirection();
    // data()
  }
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
    const newCarouselData = [
      { image: { uri: amenity.image } },
      { image: { uri: amenity.image_two } },
      { image: { uri: amenity.image_three } },
      { image: { uri: amenity.image_four } },
      { image: { uri: amenity.image_five } },
    ];
    setCarouselData(newCarouselData);
    setSelectedAmenity(amenity);
    setaudiovideodata(amenity)
    setShowDirections(false);
    setModalVisible(false);
  };
  const closeModal = () => {
    setSelectedAmenity(null);
    setShowDirections(false);
  };
  const handleDirectionPress = () => {
    if (selectedAmenity.latitude == null) {
      Alert.alert("Location", "Not Found")
    } else {

      setDirectionsDestination({
        latitude: parseFloat(selectedAmenity.latitude),
        longitude: parseFloat(selectedAmenity.longitude),
      });
      setShowDirections(true);
      setSelectedAmenity(null);
      setIsTracking(false);
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
  const openAudioModal = () => {
    setAudioModalVisible(true);
  };
  const openvideoModal = () => {
    setbuttonmodal(true);
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
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <Image style={styles.carouselImage} source={item.image} />
      </View>
    );
  };
  const Canceldirection = () => {
    setShowDirections(false)
    setSelectedAmenity(null);
    setIsTracking(false);
    if (mapRef.current) {
      // Example: animate to a specific region
      mapRef.current.animateToRegion({
        latitude: 17.45407013149723,
        longitude: 78.35728537719703,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000); // 1000 is the duration in milliseconds
    }
  }
  const Trackdirection = () => {
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      setShowDirections(false)
      setSelectedAmenity(null);
      setIsTracking(true);


      if (mapRef.current) {
        // Example: animate to a specific region
        mapRef.current.animateToRegion({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }, 1000); // 1000 is the duration in milliseconds
      }
    }
    else {
      console.log("trun on location");
      requestlocationPermission();
    }

  }
  const handleItemSelect = (item) => {
    if (item) {
      const newCarouselData = [
        { image: { uri: item.image } },
        { image: { uri: item.image_two } },
        { image: { uri: item.image_three } },
        { image: { uri: item.image_four } },
        { image: { uri: item.image_five } },
      ];
      setCarouselData(newCarouselData);
      setSelectedAmenity(item);
      setModalVisible(false);

    }
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#01595A" />;
  }
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
        {/*
        <Circle
          center={{
            latitude: 17.451283262312813,
            longitude: 78.35628277855845,
          }}
          radius={50}
          strokeWidth={2}
          strokeColor="rgba(255,0,0,0.5)"
          fillColor="rgba(255,0,0,0.2)"
        />
        */}
        {combinedData.map((amenity, index) => (
          <React.Fragment key={index}>
            <Marker
              coordinate={{
                latitude: parseFloat(amenity.latitude),
                longitude: parseFloat(amenity.longitude),
              }}
              title={amenity.name}
              onPress={() => handleMarkerPress(amenity)}
            >
              <Image style={{ height: 30, width: 30 }} source={{ uri: amenity.icon_image }} />
            </Marker>
            <Circle
              center={{
                latitude: parseFloat(amenity.latitude),
                longitude: parseFloat(amenity.longitude),
              }}
              radius={20} // Radius in meters
              strokeColor="rgba(0,0,0,0)"
              fillColor="rgba(0,0,0,0)"
            />
          </React.Fragment>
        ))}
        {userLocation && (
          <View>
            <Marker.Animated
              ref={markerRef}
              coordinate={coordinateanimated}
              title="Current Location"
              pinColor="red"

            >
              <Image
                source={require('../Assets/man-avatar.png')}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />

            </Marker.Animated>
            <Circle
              center={{
                latitude: parseFloat(userLocation.latitude),
                longitude: parseFloat(userLocation.longitude),
              }}
              radius={10} // Radius in meters
              strokeColor="rgba(0,0,0,0)"
              fillColor="rgba(0,0,0,0)"
            />
          </View>
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
      {
        showDirections ? <TouchableOpacity style={styles.directioncloseButton} onPress={() => Canceldirection()}>
          <Text style={styles.btntext}>Cancel Direction</Text>
        </TouchableOpacity> :
          <View style={{ justifyContent: 'space-evenly', marginHorizontal: 5 }}>
            {
              isTracking ?
                <TouchableOpacity style={styles.trackButton1} onPress={() => Canceldirection()}>
                  <Text style={styles.btntext}>Exit Location</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.trackButton} onPress={() => Trackdirection()}>
                  <Text style={styles.btntext}>Track Location</Text>
                </TouchableOpacity>
            }
          </View>
      }
      {selectedAmenity && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon name="close" size={34} color="#01595A" />
              </TouchableOpacity>
              <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-between" }}>
                  <Text style={styles.title}>{selectedAmenity.name}</Text>
                  <TouchableOpacity style={styles.dibtn} onPress={handleDirectionPress}><Text style={{ color: '#fff', fontWeight: "400", fontSize: 15 }}>Direction</Text></TouchableOpacity>
                </View>
                <Text style={styles.description}> {stripHtmlTags(selectedAmenity.description)}</Text>
                {
                  selectedAmenity.height ? <View >
                    <Text style={styles.headtext2}>HIGHT :&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{selectedAmenity.height}&nbsp;{selectedAmenity.height_type}</Text></Text>
                    <Text style={styles.headtext2}>CANOPY :&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{selectedAmenity.canopy}&nbsp;{selectedAmenity.canopy_type}</Text></Text>
                    <Text style={styles.headtext2}>GIRTH :&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{selectedAmenity.girth}&nbsp;{selectedAmenity.girth_type}</Text></Text>
                  </View> : <View style={styles.headtext2wrap}>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: "500" }}>Time Slot 1</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.headtext2}>OPEN TIME:&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{selectedAmenity.open_time_first}</Text></Text>
                      <Text style={styles.headtext2}>CLOSE TIME :&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{selectedAmenity.close_time_first}</Text></Text>
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: "500" }}>Time Slot 2</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.headtext2}>OPEN TIME :&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{selectedAmenity.open_time_second}</Text></Text>
                      <Text style={styles.headtext2}>CLOSE TIME :&nbsp;&nbsp;<Text style={{ color: '#000', fontWeight: "400", }}>{selectedAmenity.close_time_second}</Text></Text>
                    </View>
                  </View>
                }
                <View style={styles.buttonview}>
                  {
                    selectedAmenity.audio_link && selectedAmenity.audio_link.length > 0 ? <TouchableOpacity style={styles.button} onPress={openAudioModal}>
                      <Text style={styles.buttonText}>Audio</Text>
                      <Icon2 name="multitrack-audio" size={24} color="#fff" />
                    </TouchableOpacity> : null
                  }
                  {
                    selectedAmenity.video_upload && selectedAmenity.video_upload.length > 0 ? <TouchableOpacity style={styles.button} onPress={openvideoModal}>
                      <Text style={styles.buttonText}>Video</Text>
                      <Icon2 name="ondemand-video" size={24} color="#fff" />
                    </TouchableOpacity> : null
                  }
                  <View>
                    <AudioModal data={audiovideodata} visible={audioModalVisible} onClose={() => setAudioModalVisible(false)} />
                  </View>
                  <ButtonModal
                    visible={buttonmodal}
                    onClose={() => setbuttonmodal(false)}
                    onPlayOnline={handlePlayOnline}
                    onDownloadAndPlay={handleDownloadAndPlay}
                  />
                  <VideoModal
                    visible={videoModalVisible}
                    onClose={() => setvideoModalVisible(false)}
                    videoUri={audiovideodata.video_upload}
                    playMode={playMode}
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
      <View>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Icon2 name="refresh" size={35} color="white" />
        </TouchableOpacity>
      </View>
      {
        isTracking ?
          <ListModal visible={modalVisible} nearbyEntities={nearbyEntities} onItemSelect={handleItemSelect} onClose={() => setModalVisible(false)} />
          :
          null
      }

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    // alignItems: 'center',
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
    color: 'black'
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 10,
  },
  closeButton: {
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
    width: '100%',
    height: hp(28),
    borderRadius: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    // flex: 1,
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  paginationContainer: {
    position: 'absolute',
    top: hp(17),
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
    alignSelf: 'center',
  },
  headtext2: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: '#000000',
    padding: 5,
    color: '#01595A'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer1: {
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
  carouselItem: {
    width: '100%',
    height: hp(28),
    borderRadius: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  paginationContainer: {
    position: 'absolute',
    top: hp(20),
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
    height: '50%',
    padding: 10
  },
  headtext2wrap: {
    marginVertical: 10,
    alignItems: "center"
  },
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#01595A',
    borderRadius: 30,
    padding: 5,
    alignSelf: 'center',
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"

  },
  directioncloseButton: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: '#01595A',
    borderRadius: 25,
    padding: 11,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'

  },
  trackButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#01595A',
    borderRadius: 25,
    padding: 11,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  trackButton1: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#01595A',
    borderRadius: 25,
    padding: 11,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-end"
  },
  btntext: {
    fontSize: 16,
    color: "#ffff",
    fontWeight: "500"
  }
});
export default Mainmap;






// show zones code

// {polygons.map((item, index) => {
//   if (item.type === 'Polygon') {
//     return (
//       <Polygon
//         key={index}
//         coordinates={item.coordinates}
//         strokeColor={item.strokeColor}
//         strokeWidth={item.strokeWidth}
//         fillColor={item.fillColor}
//         tappable
//         onPress={() => console.log(`Pressed ${item.name}`)}

//       >
//         <Callout tooltip>
//           <View>
//             <Text style={{ fontSize: 30, color: 'red' }}>{item.name}</Text>
//           </View>
//         </Callout>
//       </Polygon>

//     );
//   } else if (item.type === 'Point') {
//     return (
//       <Marker
//         key={index}
//         coordinate={item.coordinates}
//         pinColor={item.color}
//         title={item.name}
//       />
//     );
//   }
//   return null;
// })}
// const data = () => {
//   const kmlDocument = new DOMParser().parseFromString(kmlContent, 'text/xml');
//   const geoJson = kml(kmlDocument);

//   const convertedData = geoJson.features.map((feature, index) => {
//     if (feature.geometry.type === 'Polygon') {
//       return {
//         type: 'Polygon',
//         coordinates: feature.geometry.coordinates[0].map(coord => ({
//           latitude: coord[1],
//           longitude: coord[0],
//         })),
//         strokeColor: feature.properties.stroke || '#000',
//         strokeWidth: parseInt(feature.properties['stroke-width'], 10) || 1,
//         fillColor: feature.properties.fill || 'transparent',
//         name: feature.properties.name || `Polygon ${index + 1}`,
//       };
//     } else if (feature.geometry.type === 'Point') {
//       return {
//         type: 'Point',
//         coordinates: {
//           latitude: feature.geometry.coordinates[1],
//           longitude: feature.geometry.coordinates[0],
//         },
//         color: feature.properties.color || '#000',
//         name: feature.properties.name || `Point ${index + 1}`,
//       };
//     }
//     return null;
//   }).filter(item => item !== null);

//   setPolygons(convertedData);
// }



