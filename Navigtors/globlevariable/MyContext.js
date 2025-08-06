// MyContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Platform, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationPermissionModal from '../../src/Componets/LocationPermissionModal';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [useerid, setid] = useState('');
  const [SelectedLanguage1, setSelectedLanguage1] = useState('english');
  const [isConnected, setIsConnected] = useState(true);
  const [isGPSOn, setIsGPSOn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleid, setroleid] = useState(null);
  const [locationPermissionModalVisible, setLocationPermissionModalVisible] = useState(false);
  const [onPermissionConfirmCallback, setOnPermissionConfirmCallback] = useState(null);

  console.log('dddddd', roleid);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token);
        const role_id = await AsyncStorage.getItem('role_id');
        setroleid(role_id);
      } catch (error) {
        console.error('Error checking user token:', error);
        setIsLoggedIn(false);
      }
    };

    checkUserToken();
  }, []);

  const getCurrentGPS = () => {
    Geolocation.getCurrentPosition(
      () => setIsGPSOn(true),
      () => setIsGPSOn(false),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const requestlocationPermission = async () => {
     setLocationPermissionModalVisible(false);
    try {
      let permission;

      if (Platform.OS === 'android') {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      } else {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      }

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        getCurrentGPS();
        console.log('Location permission granted');
      } else {
        setIsGPSOn(false);
        console.log('Location permission denied');
      }

      // Hide the modal either way
      setLocationPermissionModalVisible(false);
    } catch (err) {
      console.warn(err);
      setLocationPermissionModalVisible(false);
    }
  };

  const checkGPSStatus = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const status = await check(permission);

    if (status === RESULTS.GRANTED) {
      getCurrentGPS();
    } else {
      // Show modal only when permission not granted
      setLocationPermissionModalVisible(true);
    }
  };

  const checkStatus = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });
    checkGPSStatus();
  };

  const showLoginPrompt = (navigation) => {
    Alert.alert(
      "Login Required",
      "You need to login to access this screen.",
      [
        { text: "Back", style: "cancel", onPress: () => navigation.goBack() },
        { text: "Login", onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });

    console.log('uuuuuuuuuuuuuuuuuuuuu', useerid);

    return () => {
      unsubscribeNetInfo();
    };
  }, [useerid]);

  return (
    <MyContext.Provider value={{
      useerid,
      setid,
      SelectedLanguage1,
      setSelectedLanguage1,
      isConnected,
      isGPSOn,
      checkStatus,
      isLoggedIn,
      setIsLoggedIn,
      showLoginPrompt,
      roleid,
      setroleid,
      checkGPSStatus
    }}>
      {children}

      {/* Location Permission Modal */}
      <LocationPermissionModal
        visible={locationPermissionModalVisible}
        onConfirm={() => {
           // user confirmed
        }}
        onCancel={() => {
         
          requestlocationPermission(); // user denied
        }}
      />
    </MyContext.Provider>
  );
};

export const globalvariavle = () => useContext(MyContext);
