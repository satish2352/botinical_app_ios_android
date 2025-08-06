import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
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
import { DOMParser } from 'xmldom';
import { kml } from '@tmcw/togeojson';
import SearchBar from '../Reusablecompoent/SearchBar';
import LocationPermissionModal from './LocationPermissionModal';

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
  let result = str.replace(/<\/?[^>]+(>|$)/g, "");  // Remove HTML tags
  result = result.replace(/&nbsp;/g, " ");          // Replace &nbsp; with a space
  result = result.replace(/wikipedia/gi, "");       // Remove "wikipedia"
  result = result.replace(/\s+/g, " ");             // Collapse multiple spaces
  return result.trim();                             // Trim spaces from start/end
};
const Mainmap = ({ route, navigation }) => {
  const deatils = route.params;
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [start, setStart] = useState(1);
  const [userLocation, setUserLocation] = useState(null);
  const [userLocation2, setUserLocation2] = useState(null);
  const [transportMode, setTransportMode] = useState('driving');
  const [showDirections, setShowDirections] = useState(false);
  const [directionsDestination, setDirectionsDestination] = useState(null);
  const [treesData, setTreesData] = useState([]);
  const [flowersData, setFlowersData] = useState([]);
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [polycoordinates, setCoordinates] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { SelectedLanguage1, isLoggedIn, showLoginPrompt, roleid,checkGPSStatus } = globalvariavle();
  const [playMode, setPlayMode] = useState(null);
  const [buttonmodal, setbuttonmodal] = useState(false);
  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [videoModalVisible, setvideoModalVisible] = useState(false);
  const [audiovideodata, setaudiovideodata] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [nearbyEntities, setNearbyEntities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const markerRef = useRef()
  const [directions, setDirections] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [state, setState] = useState({
    coordinateanimated: new AnimatedRegion({
      // latitude: 30.7046,
      // longitude: 77.1025,
      coordinate: { userLocation2 },
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }),
  })
  const { coordinateanimated } = state
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const mapRef = useRef();

  console.log('bbbbb', currentStep);

  const GOOGLE_MAPS_APIKEY = "AIzaSyAiM1P7Z6YRNVl8b4vTszyFBURAvuI05FA"

  const handleDirectionsReady = (result) => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(result.coordinates, {
        edgePadding: { right: 30, bottom: 300, left: 30, top: 100 },
      });
    }

    // Log distance and duration
    console.log(`Distance: ${result.distance} km`);
    console.log(`Duration: ${result.duration} min`);
    fetchDirections()

  };

  const hasReachedDestination = useCallback(
    (userLocation, destination) => {
      const distance = calculateDistance(userLocation, destination);

      if (distance < 20 && isTracking) {
        // Trigger state updates or alerts only if showDirections is still true
        if (showDirections) {
          Alert.alert('Arrived', 'You have reached your destination!');
          setCurrentStep(null);
          setDirectionsDestination(null);
          setDirections([]);
          setShowDirections(false);
          setIsTracking(false);

        }
        return true; // Destination reached
      }

      return false; // Destination not reached
    },
    [calculateDistance, setCurrentStep, setDirections, setShowDirections, setIsTracking, showDirections]
  );

  useEffect(() => {
    let intervalId;

    if (showDirections && userLocation2 && directionsDestination) {
      // // Call fetchDirections immediately
      // fetchDirections();

      // Set an interval to call fetchDirections every 10 seconds
      intervalId = setInterval(() => {
        if (hasReachedDestination(userLocation2, directionsDestination)) {
          clearInterval(intervalId); // Stop the interval
          console.log('stop');
        } else {
          fetchDirections(); // Fetch directions if not reached
          console.log('start');
        }
      }, 5000); // 10 seconds
    }

    // Cleanup function to clear the interval when dependencies change or component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [showDirections, userLocation2, directionsDestination, fetchDirections, hasReachedDestination]);
  const fetchDirections = async () => {
    // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation2.latitude},${userLocation2.longitude}&destination=${directionsDestination.latitude},${directionsDestination.longitude}&key=${GOOGLE_MAPS_APIKEY}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation2.latitude},${userLocation2.longitude}&destination=${directionsDestination.latitude},${directionsDestination.longitude}&mode=${transportMode}&key=${GOOGLE_MAPS_APIKEY}`;
    try {
      const response = await axios.get(url);

      if (response.data.status === "OK") {
        const steps = response.data.routes[0].legs[0].steps;
        const formattedSteps = steps.map((step) => ({
          instruction: step.html_instructions.replace(/<[^>]*>?/gm, ""), // Remove HTML tags
          maneuver: step.maneuver ? step.maneuver.replace(/_/g, " ") : "Continue straight",
          distance: step.distance.value, // Distance in meters
          duration: step.duration.text,
          latitude: step.end_location.lat,
          longitude: step.end_location.lng,
        }));

        setDirections(formattedSteps);
        console.log("Directions fetched:", formattedSteps);
      } else {
        console.error("No routes found or invalid response.");
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate distance between two coordinates
  const calculateDistance = (location1, location2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371000; // Radius of the Earth in meters
    const dLat = toRad(location2.latitude - location1.latitude);
    const dLon = toRad(location2.longitude - location1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(location1.latitude)) *
      Math.cos(toRad(location2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  // Monitor user location and check proximity to the next step

  useEffect(() => {
    if (directions.length > 0 && userLocation2 && showDirections) {
      const checkProximity = () => {
        let nearestStep = null;
        let shortestDistance = Infinity;
  
        // Find the nearest step
        directions.forEach((step) => {
          const distance = calculateDistance(userLocation2, {
            latitude: step.latitude,
            longitude: step.longitude,
          });
  
          if (distance < shortestDistance) {
            shortestDistance = distance;
            nearestStep = step;
          }
        });
  
        console.log(`Nearest turn at distance: ${shortestDistance} meters`);
  
        // Show popup if near the closest step (e.g., within 50 meters)
        if (nearestStep && shortestDistance < 100) {
          setCurrentStep(nearestStep); // Update the UI for the nearest turn
          setDirections((prev) =>
            prev.filter((step) => step !== nearestStep) // Remove the completed step
          );
  
          // Show popup for the next turn
          Alert.alert(
            'Next Turn',
            `Turn ${nearestStep.maneuver || ''} in ${Math.round(shortestDistance)} meters.`,
            [{ text: 'OK' }] // Dismiss button
          );
        }
      };
  
      // Check proximity every 10 seconds
      const interval = setInterval(checkProximity, 10000);
  
      return () => clearInterval(interval); // Clean up on unmount or dependency change
    }
  }, [userLocation2, directions, showDirections, setCurrentStep, setDirections, calculateDistance]);
  
  useEffect(async () => {
    // data();

    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}auth/get-zone-co-ordinate`, {
        language: SelectedLanguage1,
        start
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('polygoan fetch from api', response.data.data[0].polygons);
      setPolygons(response.data.data[0].polygons);

    } catch (error) {
      console.error('Error fetching map data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);

    };
    return () => {
    }
  }, [])
  useEffect(() => {
    // requestlocationPermission();
    checkGPSStatus()
    livelocation();
    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      if (!isLoggedIn) {
        showLoginPrompt(navigation);
      }
    });
    return unsubscribe;
  }, [navigation, isLoggedIn, start, SelectedLanguage1]);
  // useEffect(() => {

  //   fetchData();

  // }, [searchText]);


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
        const { latitude, longitude, accuracy } = position.coords;
        // console.log("after every 6 second call live location function");
        // animate(latitude, longitude);
        setUserLocation({ latitude, longitude });
        setUserLocation2({ latitude, longitude });
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


    const nearby = combinedData.map(entity => ({
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
      // setNearbyEntities(null);

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
    // setLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}auth/get-map-data-new`, {
        language: SelectedLanguage1,
        start,
        // name:searchText
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
      // setLoading(false);
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
      setaudiovideodata(deatils)
      setModalVisible(false);
    }
    return () => {
    };
  }, [deatils])
  const handleRefresh = () => {
    fetchData();
    livelocation();
    Canceldirection();
    // data();
    setSearchText('')
    setCurrentStep(null);
    setDirections([])
    setShowDirections(false);
    setIsTracking(false);
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
  console.log('coordinatesravi', coordinates);

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 3000);
      }
      else {
        coordinateanimated.timing(newCoordinate).start();
      }
    }
  }
  // const animateMarker = (latitude, longitude) => {
  //   const newCoordinate = { latitude, longitude };

  //   // Update the polyline coordinates
  //   setCoordinates((prev) => [...prev, newCoordinate]);

  //   // Smooth marker animation
  //   if (Platform.OS === 'android') {
  //     if (markerRef.current) {
  //       markerRef.current.animateMarkerToCoordinate(newCoordinate, 3000); // 3-second animation
  //     }
  //   } else {
  //     markerRef.current?.coordinate?.tween(newCoordinate);
  //   }
  // };


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
  // const Canceldirection = () => {
  //   setShowDirections(false)
  //  
  //   setSelectedAmenity(null);
  //   setIsTracking(false);
  //   if (mapRef.current) {
  //     // Example: animate to a specific region
  //     mapRef.current.animateToRegion({
  //       latitude: 17.45407013149723,
  //       longitude: 78.35728537719703,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //     }, 2000); // 1000 is the duration in milliseconds
  //   }
  // }
  const Canceldirection = () => {
    setIsTracking(false);
    setShowDirections(false);
    setSelectedAmenity(null);
    setCurrentStep(null);
    setDirections([])
    setShowDirections(false);
    setIsTracking(false);

    if (mapRef.current) {
      // Animate back to a default region or the user's location
      mapRef.current.animateToRegion({
        latitude: 17.45407013149723,
        longitude: 78.35728537719703,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000); // 1-second animation duration
    }

    // Do not set mapRef.current to null
  };

  useEffect(() => {
    let watchId;

    const startTracking = () => {
      watchId = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          animate(latitude, longitude);
          findNearbyEntities(latitude, longitude);
          setUserLocation2({ latitude, longitude });

          if (isTracking && mapRef.current) {
            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }, 2000); // 2-second animation duration
          }
        },
        (error) => {
          console.error('Error tracking location:', error);
        },
        { enableHighAccuracy: true, distanceFilter: 6, interval: 2000 }
      );
    };

    if (isTracking) {
      startTracking();
    }

    return () => {
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking]);

  const Trackdirection = () => {
    if (userLocation2 && userLocation2.latitude && userLocation2.longitude) {

      setSelectedAmenity(null);
      setIsTracking(true);


      if (mapRef.current) {
        // Example: animate to a specific region
        mapRef.current.animateToRegion({
          latitude: userLocation2.latitude,
          longitude: userLocation2.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }); // 1000 is the duration in milliseconds
      }
    }
    else {
      console.log("trun on location");
      // requestlocationPermission();
      checkGPSStatus()
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
      setaudiovideodata(item)
      setModalVisible(false);

    }
  };
  const handleSearchChange = (text) => {
    setSearchText(text);
    setStart(1); // Set start to 1 when text changes
  };

  const handleSearchFocus = () => {
    setStart(1); // Set start to 1 when search bar is clicked
  };

  const handleSearchPress = () => {
    console.log('Search button pressed');
    setStart(1); // Set start to 1 when search icon is clicked
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#01595A" />;
  }
  return (
    <View style={styles.container}>

      <MapView
        ref={mapRef}
        style={styles.map}
        followUserLocation={true}

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
              radius={10} // Radius in meters
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
        {polygons.map((item, index) => {
          if (item.type === 'Polygon') {
            return (
              <Polygon
                key={index}
                coordinates={item.coordinates}
                strokeColor={item.strokeColor}
                strokeWidth={item.strokeWidth}
                fillColor={item.fillColor}
                tappable
                onPress={() => console.log(`Pressed ${item.name}`)}

              >
                <Callout tooltip>
                  <View>
                    <Text style={{ fontSize: 30, color: 'red' }}>{item.name}</Text>
                  </View>
                </Callout>
              </Polygon>

            );
          } else if (item.type === 'Point') {
            return (
              <Marker
                key={index}
                coordinate={item.coordinates}
                pinColor={item.color}
                title={item.name}
              />
            );
          }
          return null;
        })}

        {/* {showDirections && userLocation && directionsDestination && (
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
          */}
        {/* Render directions if enabled */}
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
            onReady={handleDirectionsReady}
            onError={(errorMessage) => {
              console.error('Error with directions:', errorMessage);
            }}
          />
        )}


      </MapView>
      {/*
      {currentStep && (
        <View style={styles.turnInfo}>
          <Text style={styles.turnText}>Next Turn:</Text>
          <Text style={styles.instruction}>{currentStep.instruction}</Text>
          <Text style={styles.maneuver}>{`Turn: ${currentStep.maneuver}`}</Text>
          <Text style={styles.distance}>{`Distance: ${currentStep.distance} meters`}</Text>
        </View>
      )}
        */}
      {
        showDirections ? <View >
          {isTracking ?
            <TouchableOpacity style={styles.trackButton1} onPress={() => Canceldirection()}>
              <Text style={styles.btntext}>Cancel Direction</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.trackButton} onPress={() => Trackdirection()}>
              <Text style={styles.btntext}>Start direction</Text>
            </TouchableOpacity>
          }
        </View>
          :

          <View style={{ justifyContent: 'space-evenly', marginHorizontal: 5 }}>
            {roleid === '2' || roleid == '1' ?
              <View>
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
              : null}

          </View>
      }
      {/*
      <View style={styles.searchContainer}>
      <SearchBar
      value={searchText}
      onChange={handleSearchChange}
      onFocus={handleSearchFocus}
      onSearch={handleSearchPress}
      placeholder="Search here..."
    />
    </View>
    */}
      {selectedAmenity && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Icon name="close" size={34} color="#01595A" />
                </TouchableOpacity>
                <View style={styles.headingwrap}>
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
                  <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-between", width: '95%' }}>
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
    justifyContent: "center",
    alignSelf: "center"
  },
  headingwrap: {
    // alignItems: 'flex-start',
    top: 0,
    marginHorizontal: 13,
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
    color: 'black',
    paddingVertical: 5
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    // alignSelf: 'flex-end',
    right: 20
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  carouselwrap: {
    // alignItems: "center",
    // justifyContent: 'center',
    // height: '35%',
    // // padding: 10,
    // resizeMode: "center"
    alignItems: "center",
    justifyContent: 'center',
    height: '25%',
    marginVertical: wp(4)
    // resizeMode: "center"
    // backgroundColor:'red'
  },

  carouselImage: {
    // flex: 1,
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  // paginationContainer: {
  //   position: 'absolute',
  //   top: hp(17),
  // },
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
    width: '25%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#01595A',
    marginLeft: wp(2),
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
    alignSelf: 'center',
  },
  buttonview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    alignSelf: 'center',
    alignItems: "center",
    left: wp(5)
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
  directioncloseButton1: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#01595A',
    borderRadius: 25,
    padding: 11,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start'

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
  },
  searchContainer: {
    position: 'absolute',
    top: 20,

    alignSelf: 'center',
    width: '70%'

  },
  turnInfo: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  turnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 14,
    color: 'black',
  },
  maneuver: {
    fontSize: 14,
    color: 'blue',
  },
  distance: {
    fontSize: 14,
    color: 'gray',
  },
  loading: {
    position: 'absolute',
    bottom: 100,
    fontSize: 16,
    color: 'gray',
  },
});
export default Mainmap;






// show zones code


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
//   console.log("kmlDocument", convertedData);
// }



