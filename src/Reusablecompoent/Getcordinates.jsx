import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View, StyleSheet, Image, Modal, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, PermissionsAndroid, Platform, Alert, Button } from 'react-native';
import MapView, { Polyline, Marker, Polygon, AnimatedRegion, Circle, Callout } from 'react-native-maps';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
;
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';


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


const Getcordinates = ({ marker, handleLongPress,handleDragEnd,handleCloseMap }) => {

  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const markerRef = useRef()
  const mapRef = useRef();
  const GOOGLE_MAPS_APIKEY = "AIzaSyAiM1P7Z6YRNVl8b4vTszyFBURAvuI05FA"
 
  



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
const coordinates = parseCoordinates(kmlData);


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
        mapType="satellite" 
        onLongPress={handleLongPress}
      >
        <Polyline
          coordinates={coordinates}
          strokeColor="green"
          // fillColor='red'
          strokeWidth={8}
        />
      
        <Polygon
        coordinates={coordinates}
        fillColor="rgba(0, 0, 0, 0.5)" // Highlight the area
        strokeColor="green"
        strokeWidth={2}
      />
      {marker && ( // Check if marker is set before rendering
        <Marker
          coordinate={marker}
          draggable // Enable dragging
          onDragEnd={handleDragEnd} // Handle drag end event
          title={`Selected Location`}
          description={`Lat: ${marker.latitude}, Lng: ${marker.longitude}`}
        />
      )}
      </MapView>
      <View style={{alignItems:'center',margin:10}}><TouchableOpacity style={styles.button} onPress={handleCloseMap} >
                     
      <Text style={styles.buttonText}>Confirm Location</Text>


</TouchableOpacity></View>
  
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
  button: {
    width: '40%',
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#01595A',
    // alignSelf: 'flex-end',
    // marginRight: 25
},
buttonText: {
  color: '#ffffff',
  fontSize: 18,
  fontWeight: '500',
},
});
export default Getcordinates;


