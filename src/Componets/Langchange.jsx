// import { StyleSheet, Text, View,Image } from 'react-native'
// import React from 'react'
// import Icon from 'react-native-vector-icons/FontAwesome';
// const Langchange = () => {
//   return (
//     <View style={styles.langiconwrap}>

//     <Icon name="language"
//                 size={34} color="#01595A" />
// </View>
//   )
// }

// export default Langchange

// const styles = StyleSheet.create({
//     langiconwrap: {
      
//     },
    
// })


import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Langchange = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageChange = (language) => {
    // Add logic here to change the language
    console.log('Selected language:', language);
    setModalVisible(false); // Close the modal after selecting language
  };

  return (
    <View style={styles.langiconwrap}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="language" size={34} color="#01595A" />
      </TouchableOpacity>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.languageOption} onPress={() => handleLanguageChange('Hindi')}>
              <Text style={styles.languageText}>Hindi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageOption} onPress={() => handleLanguageChange('English')}>
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
            {/* Add more language options as needed */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  langiconwrap: {
    // Add styles as needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    // elevation: 5,
  },
  languageOption: {
    padding: 8,
   borderWidth:1,
 
    borderRadius:10,
    margin:5,
    width:160,
    backgroundColor:"#fff"
  },
  languageText: {
    fontSize: 18,
    textAlign: 'center',
    color:'#000',
    fontWeight:'bold'
  },
});

export default Langchange;
