// // StatusCheck.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
// import Geolocation from 'react-native-geolocation-service';
// import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const StatusCheck = ({ children }) => {
//   const [isConnected, setIsConnected] = useState(true);
//   const [isGPSOn, setIsGPSOn] = useState(true);

//   const checkGPSStatus = async () => {
//     const permission = await check(
//       Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//     );

//     if (permission === RESULTS.GRANTED) {
//       Geolocation.getCurrentPosition(
//         () => setIsGPSOn(true),
//         () => setIsGPSOn(false),
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     } else {
//       setIsGPSOn(false);
//     }
//   };

//   const checkStatus = () => {
//     NetInfo.fetch().then(state => {
//       setIsConnected(state.isConnected && state.isInternetReachable);
//     });

//     checkGPSStatus();
//   };

//   useEffect(() => {
//     const unsubscribeNetInfo = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected && state.isInternetReachable);
//     });

//     checkGPSStatus();

//     return () => {
//       unsubscribeNetInfo();
//     };
//   }, []);

//   if (!isConnected) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>No internet connection</Text>
//         <TouchableOpacity style={styles.button} onPress={checkStatus}>
//           <Text style={styles.buttonText}>Reload</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (!isGPSOn) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>GPS is turned off</Text>
//         <TouchableOpacity style={styles.button} onPress={checkStatus}>
//           <Text style={styles.buttonText}>Reload</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return children;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   button: {
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default StatusCheck;

// StatusCheck.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

const StatusCheck = ({ children }) => {
  const { isConnected, isGPSOn, checkStatus } = globalvariavle();

  if (!isConnected) {
    return (
      <View style={styles.container}>
      <Image source={require('../Assets/nointernet.png')} style={styles.image} />
        <Text style={styles.text}>Internet Connection Lost!!</Text>
        <TouchableOpacity style={styles.button} onPress={checkStatus}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isGPSOn) {
    return (
      <View style={styles.container}>
      <Image source={require('../Assets/gpslost.png')} style={styles.image} />
        <Text style={styles.text}>GPS Signal Lost!!</Text>
        <TouchableOpacity style={styles.button} onPress={checkStatus}>
          <Text style={styles.buttonText}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% transparent black background
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 20,
    width:"40%",
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign:'center'
  },
  image: {
    width: 170,
    height: 160,
    marginBottom: 20,
  },
});

export default StatusCheck;
