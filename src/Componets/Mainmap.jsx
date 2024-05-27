

// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Image, Modal, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
// import MapView, { Polyline, Marker } from 'react-native-maps';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/AntDesign';
// import Geolocation from 'react-native-geolocation-service';
// import MapViewDirections from 'react-native-maps-directions';


// const kmlData = `<?xml version="1.0" encoding="UTF-8"?>
// <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
// <Document>
//     <name>mum219.kml</name>
//     <StyleMap id="m_ylw-pushpin">
//         <Pair>
//             <key>normal</key>
//             <styleUrl>#s_ylw-pushpin</styleUrl>
//         </Pair>
//         <Pair>
//             <key>highlight</key>
//             <styleUrl>#s_ylw-pushpin_hl</styleUrl>
//         </Pair>
//     </StyleMap>
//     <Style id="s_ylw-pushpin">
//         <IconStyle>
//             <scale>1.1</scale>
//             <Icon>
//                 <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
//             </Icon>
//             <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
//         </IconStyle>
//         <LineStyle>
//             <color>ff0000ff</color>
//         </LineStyle>
//     </Style>
//     <Style id="s_ylw-pushpin_hl">
//         <IconStyle>
//             <scale>1.3</scale>
//             <Icon>
//                 <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
//             </Icon>
//             <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
//         </IconStyle>
//         <LineStyle>
//             <color>ff0000ff</color>
//         </LineStyle>
//     </Style>
//     <Placemark>
//         <name>Untitled Path</name>
//         <styleUrl>#m_ylw-pushpin</styleUrl>
//         <LineString>
//             <tessellate>1</tessellate>
//             <coordinates>
//                 73.78163209258453,19.98398598405316,0 73.7816321295435,19.98397836952064,0 73.78140022186813,19.98403568584315,0 73.78126116098484,19.98409342835519,0 73.78111093447403,19.98413599279547,0 73.78097572675269,19.98417916205889,0 73.78082732637102,19.98423462074464,0 73.78062844703553,19.98428552006987,0 73.78051250493874,19.98433286566392,0 73.7804556986088,19.98423730627376,0 73.78039650116907,19.98418886671168,0 73.78030195862448,19.98406029878652,0 73.78023733305695,19.98399271081001,0 73.78015640824729,19.98389206783411,0 73.78006883588228,19.98378637267189,0 73.77998724479211,19.98367990718262,0 73.77993140835335,19.98361734454905,0 73.77982595509029,19.9835080332333,0 73.77975111819735,19.98341795070108,0 73.77970930733349,19.98331956750258,0 73.7796555068964,19.9832166925749,0 73.77961863332477,19.98311890041287,0 73.77962942061136,19.98308167351762,0 73.77977069882967,19.98303724069224,0 73.77987567606544,19.98303046282984,0 73.78007010482426,19.98299465876448,0 73.78026346890373,19.98295632018158,0 73.78052387144977,19.98290068949542,0 73.78081672422,19.98282254207567,0 73.78103028645828,19.98275720203063,0 73.78110889569126,19.98289311589633,0 73.78115834182785,19.9830077180395,0 73.7812424845384,19.98312876605446,0 73.78131317971769,19.98326784833735,0 73.78140099689828,19.98342750134641,0 73.78148553807721,19.98359679937998,0 73.78155421553855,19.98375124498569,0 73.78166271375008,19.98393427130611,0 73.78163209258453,19.98398598405316,0 
//             </coordinates>
//         </LineString>
//     </Placemark>
   
   
// </Document>
// </kml>`;

// const amenities = [
//   {
//     coordinate: { latitude: 19.983889, longitude: 73.781463 },
//     title: 'Amenity1',
//     description: 'Details about Amenity1 Details about Amenity1  Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 ',
//     image: require('../Assets/Trees/b3.png')
//   },
//   {
//     coordinate: { latitude: 19.98413361586103, longitude: 73.78068925317841 },
//     title: 'Amenity2',
//     description: 'Details about Amenity2 Details about Amenity1  Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1',
//     image: require('../Assets/Trees/b2.png')
//   },
//   {
//     coordinate: { latitude: 19.983401500044838, longitude: 73.78004973895017 },
//     title: 'Amenity3',
//     description: 'Details about Amenity3 Details about Amenity1  Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1',
//     image: require('../Assets/Trees/b5.png')
//   },
//   {
//     coordinate: { latitude: 19.983179849115512, longitude: 73.78100750040255 },
//     title: 'Amenity4',
//     description: 'Details about Amenity4 Details about Amenity1  Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1 Details about Amenity1',
//     image: require('../Assets/Trees/b4.png')
//   }
// ];


// const renderItem = ({ item, index }) => {
//   return (
//     <View style={styles.carouselItem}>
//       <Image style={styles.carouselImage} source={item.image} />
//     </View>
//   );
// };

// const Mainmap = () => {
//   const [selectedAmenity, setSelectedAmenity] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const carouselData = [
//     { image: require('../Assets/butter.png') },
//     { image: require('../Assets/tiger.png') },
//     { image: require('../Assets/tiger.png') },
//   ];

//   const parseCoordinates = (kml) => {
//     const coordinates = [];
//     const regex = /<coordinates>([\s\S]*?)<\/coordinates>/g;
//     let match;
//     while ((match = regex.exec(kml))) {
//       const coordString = match[1].trim();
//       const coordPairs = coordString.split(/\s+/);
//       coordPairs.forEach(pair => {
//         const [longitude, latitude] = pair.split(',').map(parseFloat);
//         coordinates.push({ latitude, longitude });
//       });
//     }
//     return coordinates;
//   };
//   const handleMarkerPress = (amenity) => {
//     setSelectedAmenity(amenity);
//   };

//   const closeModal = () => {
//     setSelectedAmenity(null);
//   };
//   const coordinates = parseCoordinates(kmlData);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 19.9836752199088,
//           longitude: 73.7806615225102,
//           latitudeDelta: 0.001,
//           longitudeDelta: 0.001,
//         }}
//       >
//         <Polyline
//           coordinates={coordinates}
//           strokeColor="#FF0000"
//           fillColor='red'
//           strokeWidth={3}
//         />
//         {amenities.map((amenity, index) => (
//           <Marker
//             key={index}
//             coordinate={amenity.coordinate}
//             title={amenity.title}

//             onPress={() => handleMarkerPress(amenity)}
//           >
//             <Image style={{ height: 50, width: 50 }} source={amenity.image} />
//           </Marker>
//         ))}
//       </MapView>
//       {selectedAmenity && (
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={true}
//           onRequestClose={closeModal}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <View style={styles.carouselwrap}>
//                 <Carousel
//                   data={carouselData}
//                   renderItem={renderItem}
//                   sliderWidth={wp(100)}
//                   autoplay={true}
//                   itemWidth={wp(90)} // Set item width to full width
//                   onSnapToItem={(index) => setActiveIndex(index)}
//                   autoplayInterval={5000}
//                   loop={true}
//                 />
//                 <View style={styles.paginationContainer}>
//                   <Pagination
//                     dotsLength={carouselData.length}
//                     activeDotIndex={activeIndex}
//                     dotStyle={styles.paginationDot}
//                     inactiveDotStyle={styles.paginationInactiveDot}
//                     inactiveDotOpacity={0.4}
//                     inactiveDotScale={0.6}
//                   />
//                 </View>
//               </View>
//               <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
//                 <Icon name="close" size={34} color="#01595A" />
//               </TouchableOpacity>
//               <ScrollView>

//                 <Image style={styles.image} source={selectedAmenity.image} />
//                 <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-between" }}>
//                   <Text style={styles.title}>{selectedAmenity.title}</Text>
//                   <TouchableOpacity style={styles.dibtn}><Text style={{ color: '#fff', fontWeight: "400", fontSize: 15 }}>Direction</Text></TouchableOpacity>
//                 </View>
//                 <Text style={styles.description}>{selectedAmenity.description}</Text>

//               </ScrollView>

//             </View>
//           </View>
//         </Modal >
//       )}
//     </View >
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '100%',
//     padding: 10,
//     backgroundColor: 'white',
//     paddingTop: 15,
//     paddingVertical: 0,

//     alignItems: 'center',
//     height: '70%',
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//     // textAlign: 'center',
//   },
//   image: {
//     alignSelf: 'center',
//     width: '100%',
//     // height: '100%',
//     marginBottom: 10,
//   },
//   closeButton: {
//     // padding: 15,


//     position: 'absolute',
//     alignSelf: 'flex-end',
//     right: 20
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   carouselwrap: {
//     alignItems: "center",
//     justifyContent: 'center',
//     height: '40%',
//     padding: 10,
//     resizeMode: "center"

//   },
//   carouselItem: {
//     width: '100%', // Set width to full width
//     height: hp(28),
//     borderRadius: 10,
//     overflow: 'hidden',
//     // marginBottom: 10,

//   },
//   carouselImage: {
//     // flex: 1,
//     width: '100%',
//     height: '90%',
//     resizeMode: 'contain',
//   },
//   paginationContainer: {
//     position: 'absolute',
//     top: hp(17), // Adjust top position as needed

//   },
//   paginationDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 12,
//     backgroundColor: '#ffff',
//     marginHorizontal: 4,

//   },
//   paginationInactiveDot: {
//     backgroundColor: '#C4C4C4',

//   },
//   dibtn: {
//     width: '25 %',
//     height: 40,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     backgroundColor: '#01595A',
//   }


// });

// export default Mainmap;


import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Modal, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';


const kmlData = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
    <name>mum219.kml</name>
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
    <Style id="s_ylw-pushpin">
        <IconStyle>
            <scale>1.1</scale>
            <Icon>
                <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
            </Icon>
            <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
        </IconStyle>
        <LineStyle>
            <color>ff0000ff</color>
        </LineStyle>
    </Style>
    <Style id="s_ylw-pushpin_hl">
        <IconStyle>
            <scale>1.3</scale>
            <Icon>
                <href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
            </Icon>
            <hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
        </IconStyle>
        <LineStyle>
            <color>ff0000ff</color>
        </LineStyle>
    </Style>
    <Placemark>
        <name>Untitled Path</name>
        <styleUrl>#m_ylw-pushpin</styleUrl>
        <LineString>
            <tessellate>1</tessellate>
            <coordinates>
                73.78163209258453,19.98398598405316,0 73.7816321295435,19.98397836952064,0 73.78140022186813,19.98403568584315,0 73.78126116098484,19.98409342835519,0 73.78111093447403,19.98413599279547,0 73.78097572675269,19.98417916205889,0 73.78082732637102,19.98423462074464,0 73.78062844703553,19.98428552006987,0 73.78051250493874,19.98433286566392,0 73.7804556986088,19.98423730627376,0 73.78039650116907,19.98418886671168,0 73.78030195862448,19.98406029878652,0 73.78023733305695,19.98399271081001,0 73.78015640824729,19.98389206783411,0 73.78006883588228,19.98378637267189,0 73.77998724479211,19.98367990718262,0 73.77993140835335,19.98361734454905,0 73.77982595509029,19.9835080332333,0 73.77975111819735,19.98341795070108,0 73.77970930733349,19.98331956750258,0 73.7796555068964,19.9832166925749,0 73.77961863332477,19.98311890041287,0 73.77962942061136,19.98308167351762,0 73.77977069882967,19.98303724069224,0 73.77987567606544,19.98303046282984,0 73.78007010482426,19.98299465876448,0 73.78026346890373,19.98295632018158,0 73.78052387144977,19.98290068949542,0 73.78081672422,19.98282254207567,0 73.78103028645828,19.98275720203063,0 73.78110889569126,19.98289311589633,0 73.78115834182785,19.9830077180395,0 73.7812424845384,19.98312876605446,0 73.78131317971769,19.98326784833735,0 73.78140099689828,19.98342750134641,0 73.78148553807721,19.98359679937998,0 73.78155421553855,19.98375124498569,0 73.78166271375008,19.98393427130611,0 73.78163209258453,19.98398598405316,0 
            </coordinates>
        </LineString>
    </Placemark>
   
   
</Document>
</kml>`;




const renderItem = ({ item, index }) => {
  return (
    <View style={styles.carouselItem}>
      <Image style={styles.carouselImage} source={item.image} />
    </View>
  );
};

const Mainmap = () => {



  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [userLocation, setUserLocation] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [directionsDestination, setDirectionsDestination] = useState(null);

  const GOOGLE_MAPS_APIKEY ="AIzaSyCIEHb7JkyL1mwS8R24pSdVO4p2Yi_8v98"


  const amenities = [
    {
      coordinate: { latitude: 19.983889, longitude: 73.781463 },
      title: 'Amenity1',
      description: 'Details about Amenity1. This is a brief description of what Amenity1 offers and its features.',
      image: require('../Assets/Trees/b3.png')
    },
    {
      coordinate: { latitude: 19.98413361586103, longitude: 73.78068925317841 },
      title: 'Amenity2',
      description: 'Details about Amenity2. This is a brief description of what Amenity2 offers and its features.',
      image: require('../Assets/Trees/b2.png')
    },
    {
      coordinate: { latitude: 19.983401500044838, longitude: 73.78004973895017 },
      title: 'Amenity3',
      description: 'Details about Amenity3. This is a brief description of what Amenity3 offers and its features.',
      image: require('../Assets/Trees/b5.png')
    },
    {
      coordinate: { latitude: 19.983179849115512, longitude: 73.78100750040255 },
      title: 'Amenity4',
      description: 'Details about Amenity4. This is a brief description of what Amenity4 offers and its features.',
      image: require('../Assets/Trees/b4.png')
    }
  ];
  




  const carouselData = [
    { image: require('../Assets/butter.png') },
    { image: require('../Assets/tiger.png') },
    { image: require('../Assets/tiger.png') },
  ];

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);


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
    setShowDirections(false);
  };

  const closeModal = () => {
    setSelectedAmenity(null);
    setShowDirections(false);
  };
    const handleDirectionPress = (selectedAmenity) => {
    if (selectedAmenity) {
      setDirectionsDestination(selectedAmenity.coordinate);
      setShowDirections(true);
      setSelectedAmenity(null);
    }
  };

  const coordinates = parseCoordinates(kmlData);



  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.9836752199088,
          longitude: 73.7806615225102,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <Polyline
          coordinates={coordinates}
          strokeColor="#FF0000"
          fillColor='red'
          strokeWidth={3}
        />
        {amenities.map((amenity, index) => (
          <Marker
            key={index}
            coordinate={amenity.coordinate}
            title={amenity.title}

            onPress={ ()=>handleMarkerPress(amenity)}
          >
            <Image style={{ height: 50, width: 50 }} source={amenity.image} />
          </Marker>
        ))}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="User Location"
            pinColor="black"
          />
        )}
              {showDirections && userLocation && directionsDestination && (
          <MapViewDirections
            origin={userLocation}
            destination={directionsDestination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="black"
          />
        )}
      </MapView>
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
                  <Text style={styles.title}>{selectedAmenity.title}</Text>
                  <TouchableOpacity style={styles.dibtn} onPress={()=>handleDirectionPress(selectedAmenity)}><Text style={{ color: '#fff', fontWeight: "400", fontSize: 15 }}>Direction</Text></TouchableOpacity>
                </View>
                <Text style={styles.description}>{selectedAmenity.description}</Text>

              </ScrollView>

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
    borderTopRightRadius: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    // textAlign: 'center',
    color:'black'
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
  }


});

export default Mainmap;



