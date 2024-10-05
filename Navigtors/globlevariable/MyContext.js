

// MyContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Platform, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [useerid, setid] = useState('');
  const [SelectedLanguage1, setSelectedLanguage1] = useState('english');
  const [isConnected, setIsConnected] = useState(true);
  const [isGPSOn, setIsGPSOn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleid, setroleid] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(token ? true : false); // Set isLoggedIn based on token presence
        const role_id=await AsyncStorage.getItem('role_id');
        setroleid(role_id)  
        
      } catch (error) {
        console.error('Error checking user token:', error);
        setIsLoggedIn(false);
      } 
    };

    checkUserToken();
  }, []);


  const checkGPSStatus = async () => {
    let permission;

    if (Platform.OS === 'ios') {
      permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (permission === RESULTS.DENIED) {
      const requestPermission = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      if (requestPermission === RESULTS.GRANTED) {
        checkGPSStatus();
      }
    } else if (permission === RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        () => setIsGPSOn(true),
        () => setIsGPSOn(false),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      setIsGPSOn(false);
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

    checkGPSStatus();

    // Update login status based on user ID
    // setIsLoggedIn(useerid !== '');
console.log('uuuuuuuuuuuuuuuuuuuuu',useerid );

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
      setroleid
    }}>
      {children}
    </MyContext.Provider>
  );
};

export const globalvariavle = () => useContext(MyContext);
