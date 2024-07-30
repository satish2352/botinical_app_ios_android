
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

const StatusCheck = ({ children }) => {
  const { isConnected, isGPSOn, checkStatus } = globalvariavle();

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#73A986'} barStyle={'default'} />
        <View style={styles.logocontainer}>
          <Image source={require('../Assets/logo.png')} style={styles.image1} />
          <Image source={require('../Assets/nointernet.png')} style={styles.image} />
          <Text style={styles.text}>Internet Connection Lost!!</Text>
          <TouchableOpacity style={styles.button} onPress={checkStatus}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logocontainer1}>
          <Image source={require('../Assets/pbgc1.png')} style={styles.image3} />
          <Image source={require('../Assets/pbgc.png')} style={styles.image2} />
        </View>
      </View>
    );
  }

  if (!isGPSOn) {
    return (


      <View style={styles.container}>
        <StatusBar backgroundColor={'#73A986'} barStyle={'default'} />
        <View style={styles.logocontainer}>
          <Image source={require('../Assets/logo.png')} style={styles.image1} />
          <Image source={require('../Assets/gpslost.png')} style={styles.image} />
          <Text style={styles.text}>GPS Signal Lost!!</Text>
          <TouchableOpacity style={styles.button} onPress={checkStatus}>
            <Text style={styles.buttonText}>Reload</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logocontainer1}>
          <Image source={require('../Assets/pbgc1.png')} style={styles.image3} />
          <Image source={require('../Assets/pbgc.png')} style={styles.image2} />
        </View>
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    // padding: 20,
    backgroundColor: '#73A986', // 50% transparent black background
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFF'
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 20,
    width: "40%",

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 10,
    // top: 20
  },
  image1: {
    width: 170,
    height: 170,
    marginBottom: 10,
  },
  image2: {
    width: 210,
    height: 220,

  },
  image3: {
    width: 210,
    height: 210,
    top: 100
  },
  logocontainer: {
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: 20
  },
  logocontainer1: {

    justifyContent: 'space-between',
    flexDirection: 'row'

  },
});

export default StatusCheck;
