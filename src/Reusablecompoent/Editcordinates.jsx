import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Getcordinates from './Getcordinates';
import { log } from 'react-native-reanimated';

const Editcordinates = ({ item, setlong, setlat, Updatecordinates, settreeid }) => {



  const [modalVisible, setModalVisible] = useState(false);



  return (

    <View style={{ alignItems: 'center', justifyContent: "center" }}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#01595A', borderRadius: 20, height: 40, width: 40, alignItems: 'center', justifyContent: "center", padding: 5 }}>
        <Icon name="edit" size={25} color="#FFFFFF" />
      </TouchableOpacity>
      {modalVisible ? <Editlatlongmodal modalVisible={modalVisible} setModalVisible={setModalVisible} setlong={setlong} setlat={setlat} Updatecordinates={Updatecordinates} item={item} settreeid={settreeid} /> : null}

    </View>

  )
}

const Editlatlongmodal = ({ modalVisible, setModalVisible, setlong, setlat, Updatecordinates, item, settreeid }) => {
  console.log('all data', item);
  settreeid(item.id)

  const [lat, setlatt] = useState(null);
  const [long, setlongg] = useState(null);
  const [showmap, setshowmap] = useState(false);
  const [marker, setMarker] = useState({
    latitude: Number(item.latitude),
    longitude: Number(item.longitude)
  });
  const [latError, setLatError] = useState('');
  const [longError, setLongError] = useState('');
  const handleSubmit = () => {
    if (!lat) {
      setLatError('Latitude is requiredd');
    }
    if (!long) {
      setLongError('Longitude is required');
    }

    // If there are no errors, proceed with form submission
    if (lat && long) {

      Updatecordinates();
      setModalVisible(false);
      setLatError('');
      setLongError('');

    }


  }
  const closemodal = () => {

    setModalVisible(false);
    setMarker(null)
    setLatError('');
    setLongError('')
  }
  const handleLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    console.log(coordinate, 'coodinate');

    setMarker(coordinate);
    setlat(coordinate.latitude.toString()) // Convert to string if needed
    setlong(coordinate.longitude.toString()) // Convert to string if needed
    setlatt(coordinate.latitude.toString())
    setlongg(coordinate.longitude.toString())
  };

  const handleDragEnd = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarker(coordinate);
    setlat(coordinate.latitude.toString()) // Convert to string if needed
    setlong(coordinate.longitude.toString()) // Convert to string if needed
    setlatt(coordinate.latitude.toString())
    setlongg(coordinate.longitude.toString())
  };
  const handleCloseMap = () => {
    setshowmap(false); // Hide the map
  };

  const validateLatitude = (value) => {
    setlat(value);
    if (!value) {
      setLatError('Latitude is required');
    } else if (parseFloat(value) < -90 || parseFloat(value) > 90) {
      setLatError('Latitude must be between -90 and 90');
    } else {
      setLatError('');
    }
  };

  const validateLongitude = (value) => {
    setlong(value);
    if (!value) {
      setLongError('Longitude is required');
    } else if (parseFloat(value) < -180 || parseFloat(value) > 180) {
      setLongError('Longitude must be between -180 and 180');
    } else {
      setLongError('');
    }
  };
  const Openmodal1 = () => {
    setshowmap(true)
   
  }
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Latitude & Longitude</Text>
            <View style={styles.inputwrap}>
              <TextInput
                style={styles.input2}
                placeholder="LATITUDE"
                placeholderTextColor="black"
                value={lat}
                editable={false}
                onChangeText={validateLatitude}
              />

              <TextInput
                style={styles.input2}
                placeholder="LONGITUDE "
                placeholderTextColor="black"
                value={long}
                editable={false}
                onChangeText={validateLongitude}
              />

            </View>
            <View style={[styles.inputwrap]}>
              {latError ? <Text style={styles.errorText}>{latError}</Text> : null}
              {longError ? <Text style={styles.errorText}>{longError}</Text> : null}
            </View>
            <TouchableOpacity style={[styles.button, { width: '12%', borderRadius: 40 }]} onPress={() => Openmodal1()} >
              <Icon name="map-marker" size={25} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { width: '50%' }]} onPress={() => handleSubmit()} >

              <Text style={styles.buttonText}>Submit</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => closemodal()}>
              <Icon name="close" size={30} color="#01595A" />
            </TouchableOpacity>
          </View>
        </View>
        {showmap ? <Getcordinates marker={marker}
          handleLongPress={handleLongPress} handleDragEnd={handleDragEnd} handleCloseMap={handleCloseMap} /> : null}
      </Modal>

    </View>
  )
}
const styles = StyleSheet.create({


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // padding:20
  },
  modalContent: {
    width: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#01595A'
  },
  closeButton: {
    color: 'blue',
    marginTop: 15,
  },
  inputwrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems:"center"
    justifyContent: "center"

  },
  error: {
    color: 'red',
    marginBottom: 5,
    marginHorizontal: 29

  },
  textArea: {
    height: 100, // Adjust the height as needed
    textAlignVertical: 'top', // Align text to the top of the input
  },
  input2: {
    width: '42%',
    height: 45,
    borderColor: '#477E56',
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    // marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,
    padding: 1,
    backgroundColor: '#ffff',
    marginHorizontal: 8,
    color: '#000',
    fontSize: 16,


  },
  button: {
    width: '80%',
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
  errorText: {
    color: 'red',
    // marginBottom: 10,
    marginHorizontal: 15
  },
})
export default Editcordinates