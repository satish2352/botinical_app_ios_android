









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
import { View, Image, StyleSheet, TouchableOpacity, Alert, StatusBar, Linking } from 'react-native';
import AminetiesMapstack from './AminetiesMapstack';
import { MyProvider } from '../context/Mycontext';
import Mainmapstack from './Mainmapstack';
import AddEntityStack from './AddEntityStack';
import FlowersStack from './FlowersStack';
import Logout from '../src/Componets/Logout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalvariavle } from './globlevariable/MyContext';
import ChangepassStack from './ChangepassStack';
import ARVRamenitiesStack from './ARVRamenitiesStack';
import ZonesStack from './ZonesStack';
import Login from '../src/Componets/Login';
import PriorityamenitiesStack from './PriorityamenitiesStack';
import Langchange from '../src/Componets/Langchange';
import WebviewScreen from '../src/Componets/WebviewScreen';
import DeleteAccountScreen from '../src/Componets/DeleteAccountScreen';

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
        <TouchableOpacity style={styles.info} >
          <Langchange color={'#ffff'} size={25} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.info1} onPress={() => showAlert()} >
          <Icon1 name="info-with-circle" size={25} color="#ffff" />
        </TouchableOpacity>
      </DrawerContentScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <Logout />
      </View>
    </View>

  );
}

function DrawerNavigator() {
  const { SelectedLanguage1, roleid, isLoggedIn } = globalvariavle();
  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
    return () => { }
  }, [SelectedLanguage1, roleid])
  const roleId = roleid; // Example roleId, adjust as needed
  return (

    <Drawer.Navigator initialRouteName='HomeStack'
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
        name="FlowersStack"
        component={FlowersStack}
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
        name="ZonesStack"
        component={ZonesStack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Zones' : 'మండలాలు',
          drawerIcon: ({ focused, size }) => (
            <Icon name="color-filter" size={25} color={focused ? '#fff' : '#ccc'} />
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
        name="PriorityamenitiesStack"
        component={PriorityamenitiesStack}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Priority  Amenities ' : 'ప్రాధాన్య  సౌకర్యాలు',
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

      {roleid == '1' ? (
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
      ) : null}

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
     <Drawer.Screen
  name="termandconditions"
  component={WebviewScreen}
  initialParams={{
    title: SelectedLanguage1 === 'english' ? 'Terms and Conditions' : 'నిబంధనలు మరియు షరతులు',
    url: 'https://support.virtualwildlifesafari.in/terms-and-conditions.html',
  }}
  options={{
    title: SelectedLanguage1 === 'english' ? 'Terms and Conditions' : 'నిబంధనలు మరియు షరతులు',
    drawerIcon: ({ focused }) => (
      <Icon
        name={focused ? 'document-text' : 'document-text-outline'}
        size={24}
        color={focused ? '#fff' : '#ccc'}
      />
    ),
  }}
/>

<Drawer.Screen
  name="policy"
  component={WebviewScreen}
  initialParams={{
    title: SelectedLanguage1 === 'english' ? 'Privacy Policy' : 'గోప్యతా విధానం',
    url: 'https://support.virtualwildlifesafari.in/privacy-policy.html',
  }}
  options={{
    title: SelectedLanguage1 === 'english' ? 'Privacy Policy' : 'గోప్యతా విధానం',
    drawerIcon: ({ focused }) => (
      <Icon
        name={focused ? 'shield-checkmark' : 'shield-checkmark-outline'}
        size={24}
        color={focused ? '#fff' : '#ccc'}
      />
    ),
  }}
/>


      <Drawer.Screen
        name="deleteaccount"
        component={DeleteAccountScreen}
        options={{
          title: SelectedLanguage1 === 'english' ? 'Delete Account' : 'ఖాతాను తొలగించండి',
          drawerIcon: ({ focused }) => (
            <Icon name="trash-bin" size={25} color={focused ? '#fff' : '#ccc'} />
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
    top: 10
  },
  info1: {
    position: 'absolute',
    alignSelf: 'flex-start',
    padding: 15,
    top: 10
  },

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