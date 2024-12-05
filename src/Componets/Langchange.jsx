

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Langchange = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleLanguageChange = (language) => {
//     // Add logic here to change the language
//     console.log('Selected language:', language);
//     setModalVisible(false); // Close the modal after selecting language
//   };

//   return (
//     <View style={styles.langiconwrap}>
//       <TouchableOpacity onPress={() => setModalVisible(true)}>
//         <Icon name="language" size={34} color="#01595A" />
//       </TouchableOpacity>
//       <Modal
//         animationType='fade'
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity style={styles.languageOption} onPress={() => handleLanguageChange('Hindi')}>
//               <Text style={styles.languageText}>Hindi</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.languageOption} onPress={() => handleLanguageChange('English')}>
//               <Text style={styles.languageText}>English</Text>
//             </TouchableOpacity>
//             {/* Add more language options as needed */}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   langiconwrap: {
//     // Add styles as needed
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor:'rgba(0, 0, 0, 0.5)',
//     padding: 20,
//     borderRadius: 10,
//     // elevation: 5,
//   },
//   languageOption: {
//     padding: 8,
//    borderWidth:1,
 
//     borderRadius:10,
//     margin:5,
//     width:160,
//     backgroundColor:"#fff"
//   },
//   languageText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color:'#000',
//     fontWeight:'bold'
//   },
// });

// export default Langchange;


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
const Langchange = ({color,size}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const {setSelectedLanguage1 } = globalvariavle();
  // Function to handle language change
  const handleLanguageChange = async (language) => {
    try {
      // Save selected language to AsyncStorage
      await AsyncStorage.setItem('selectedLanguage', language);
      // console.log('Selected language:', language);
      setSelectedLanguage(language); // Update selected language state
      setSelectedLanguage1(language); // Update selected language state
      setModalVisible(false); // Close the modal after selecting language
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  // Function to retrieve selected language from AsyncStorage on component mount
  // const loadSelectedLanguage = async () => {
  //   try {
  //     const language = await AsyncStorage.getItem('selectedLanguage');
  //     if (language !== null) {
  //       setSelectedLanguage(language);
  //       console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",language);
  //     }
  //   } catch (error) {
  //     console.error('Error loading language:', error);
  //   }
  // };

  // // Load selected language on component mount
  // useEffect(() => {
  //   loadSelectedLanguage();
  // }, []);

  return (
    <TouchableOpacity style={styles.langiconwrap}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="language" size={size} color={color} />
      </TouchableOpacity>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.languageOption} onPress={() => handleLanguageChange('hindi')}>
              <Text style={styles.languageText}>తెలుగు</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageOption} onPress={() => handleLanguageChange('english')}>
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
            {/* Add more language options as needed */}
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
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
    backgroundColor:'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    // elevation: 5,
  },
  languageOption: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    width: 160,
    backgroundColor: "#fff"
  },
  languageText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold'
  },
});

export default Langchange;
