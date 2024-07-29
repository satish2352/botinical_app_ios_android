// // MyContext.js
// import React, { createContext, useState ,useContext} from 'react';

// const MyContext = createContext();

// export const MyProvider = ({ children }) => {
//     const [useerid, setid] = useState('');
//     const [SelectedLanguage1, setSelectedLanguage1] = useState();
   

//     return (
//         <MyContext.Provider value={{ useerid, setid,setSelectedLanguage1 ,SelectedLanguage1}}>
//             {children}
//         </MyContext.Provider>
//     );
// }; 

// export const globalvariavle = () => useContext(MyContext);


// MyContext.js
// MyContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [useerid, setid] = useState('');
  const [SelectedLanguage1, setSelectedLanguage1] = useState();
  const [isConnected, setIsConnected] = useState(true);
  const [isGPSOn, setIsGPSOn] = useState(true);

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

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });

    checkGPSStatus();

    return () => {
      unsubscribeNetInfo();
    };
  }, []);

  return (
    <MyContext.Provider value={{ useerid, setid, SelectedLanguage1, setSelectedLanguage1, isConnected, isGPSOn, checkStatus }}>
      {children}
    </MyContext.Provider>
  );
};

export const globalvariavle = () => useContext(MyContext);
