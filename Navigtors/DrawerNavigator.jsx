
import React, { useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeStackNavigation from './HomeStackNavigation';
import AboutStack from './AboutStack';
import Aminitiesstack from './Aminitiesstack';
import Treesstack from './Treesstack';

import Chargesstack from './Chargesstack';
import Gardenmapstacks from './Gardenmapstacks';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import Gallerystack from './Gallerystack';
import Contactstack from './Contactstack';
import { View, Image, StyleSheet, TouchableOpacity, Alert,StatusBar,Linking } from 'react-native';
import AminetiesMapstack from './AminetiesMapstack';
import { MyProvider } from '../context/Mycontext';
import Mainmapstack from './Mainmapstack';
import AddEntityStack from './AddEntityStack';
import Flowersstack from './Flowersstack';
import Logout from '../src/Componets/Logout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalvariavle } from './globlevariable/MyContext';
import ChangepassStack from './ChangepassStack';
import ARVRamenitiesStack from './ARVRamenitiesStack';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const insets = useSafeAreaInsets();
  const showAlert = () => {
    Alert.alert(
      "Rules and Regulations",
      "For more information, click .",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "KNOW MORE",
          onPress: () => Linking.openURL("https://www.google.com"),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
    <StatusBar backgroundColor="#01595A" barStyle="light-content" />
      <DrawerContentScrollView {...props}>
        
        <View style={styles.drawerHeader}>
          <Image
            source={require('../src/Assets/logo.png')} // Replace with your image source
            style={styles.drawerImage}
          />
        </View>

        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.info} onPress={() => showAlert()}>
          <Icon1 name="info-with-circle" size={25} color="#ffff" /></TouchableOpacity>
      </DrawerContentScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <Logout />
      </View>
    </View>

  );
}

function DrawerNavigator() {
  const { SelectedLanguage1 } = globalvariavle();
  useEffect(() => {
    return () => { }
  }, [SelectedLanguage1])
  return (

    <Drawer.Navigator initialRouteName="HomeStack"
      screenOptions={{
        statusBarHidden: false,
        headerShown: false,
        headerTransparent: true,
        drawerActiveBackgroundColor: '#01595A', // Customizing drawer's active background color
        drawerActiveTintColor: '#fff', // Customizing drawer's active text color
        drawerPosition: 'right', // Setting the drawer to slide from the right side
        drawerLabelStyle: { fontSize: 18, fontWeight: 'bold', },
        drawerItemStyle: { marginBottom: -5 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigation}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Home' : 'హోమ్',
          drawerIcon: ({ focused, size }) => (
            <Icon name="home" size={25} color={focused ? '#fff' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
        name="AboutStack"
        component={AboutStack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'About Us' : 'గురించి',
          drawerIcon: ({ focused, size }) => (
            <Icon name="information-circle" size={25} color={focused ? '#fff' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mainmapstack"
        component={Mainmapstack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Garden Map' : 'గార్డెన్ మ్యాప్',
          drawerIcon: ({ focused, size }) => (
            <Icon name="map" size={25} color={focused ? '#fff' : '#ccc'} /> // Adjusted icon for Contact Us
          ),
        }}
      />
      <Drawer.Screen
        name="Treesstack"
        component={Treesstack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Trees' : 'చెట్లు',
          drawerIcon: ({ focused, size }) => (
            <Foundation name="trees" size={25} color={focused ? '#fff' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Flowersstack" 
        component={Flowersstack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Plants' : 'మొక్కలు',
          drawerIcon: ({ focused, size }) => (
            <Icon name="leaf" size={25} color={focused ? '#fff' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Aminitiesstack"
        component={Aminitiesstack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Amenities' : 'సౌకర్యాలు',
          drawerIcon: ({ focused, size }) => (
            <Icon name="logo-apple-ar" size={25} color={focused ? '#fff' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
      name="ARVRamenitiesStack"
      component={ARVRamenitiesStack}
      options={{
        title: SelectedLanguage1 === 'english' ? 'ARVR Amenities ' : 'ARVR సౌకర్యాలు',
        drawerIcon: ({ focused, size }) => (
          <Icon name="logo-apple-ar" size={25} color={focused ? '#fff' : '#ccc'} /> // Adjusted icon for Contact Us
        ),
      }}
    />

      <Drawer.Screen
        name="Chargesstack"
        component={Chargesstack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Ticket Details' : 'టికెట్ వివరాలు',
          drawerIcon: ({ focused, size }) => (
            <Icon name="cash" size={25} color={focused ? '#fff' : '#ccc'} /> // Adjusted icon for Charges
          ),
        }}
      />

      <Drawer.Screen
        name="Gallerystack"
        component={Gallerystack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Gallery' : 'గ్యాలరీ',
          drawerIcon: ({ focused, size }) => (
            <Icon name="images" size={25} color={focused ? '#fff' : '#ccc'} /> // Adjusted icon for Gallery
          ),
        }}
      />
      <Drawer.Screen
        name="Contactstack"
        component={Contactstack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Contact us' : 'మమ్మల్ని సంప్రదించండి',
          drawerIcon: ({ focused, size }) => (
            <Icon name="call" size={25} color={focused ? '#fff' : '#ccc'} /> // Adjusted icon for Contact Us
          ),
        }}
      />


      <Drawer.Screen
        name="AddEntityStack"
        component={AddEntityStack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Add Entities' : 'ఎంటిటీలను జోడించండి',
          drawerIcon: ({ focused, size }) => (
            <Icon name="map" size={25} color={focused ? '#fff' : '#ccc'} /> // Adjusted icon for Contact Us
          ),
        }}
      />
      <Drawer.Screen
        name="ChangepassStack"
        component={ChangepassStack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Change Password' : 'పాస్‌వర్డ్ మార్చండి',
          drawerIcon: ({ focused, size }) => (
            <Icon name="lock-closed" size={25} color={focused ? '#fff' : '#ccc'} /> // Adjusted icon for Contact Us
          ),
        }}
      />
     


    </Drawer.Navigator>

  );
}

export default DrawerNavigator;


const styles = StyleSheet.create({
  drawerHeader: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01595A',
    bottom: 10,
    paddingVertical: 25,

  },
  drawerImage: {
    width: '100%',
    height: 170,
    resizeMode: 'contain'

  },
  footer: {
    padding: 5,
    backgroundColor: '#f6f6f6',
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',

  },
  info: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 15,
    top:10
  }

});





// <Drawer.Screen
// name="Gardenmapstacks"
// component={Gardenmapstacks}
// options={{
//   title: 'Garden Map',
//   drawerIcon: ({ focused, size }) => (
//     <Icon name="map" size={25} color={focused ? '#fff' : '#ccc'} /> // Adjusted icon for Garden Map
//   ),
// }}
// />

// <Drawer.Screen
//         name="AminetiesMapstack"
//         component={AminetiesMapstack}
//         options={{
//           title: 'Amenities Map',
//           drawerIcon: ({ focused, size }) => (
//             <Icon name="map" size={25} color={focused ? '#fff' : '#ccc'} /> // Adjusted icon for Contact Us
//           ),
//         }}
//       />