import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
const data = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '4', name: 'Item 4' },
    // Add more items as needed
  ];

  const ListModal = ({ visible,nearbyEntities, onClose ,onItemSelect}) => {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.headerText}>Near of Entities</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={25} color="#01595A" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={nearbyEntities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <TouchableOpacity onPress={() => onItemSelect(item)} style={styles.ViewButton}>
              <Icon1 name="eye" size={25} color="#01595A" />
              </TouchableOpacity>
                </View>
              )}
            />
          </View>
          </TouchableWithoutFeedback>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const styles = StyleSheet.create({

    modalBackground: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity,
      
    },
    modalContainer: {
      width: '60%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      margin:20
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color:'#01595A'
    },
    closeButton: {
      padding: 10,
     
    },
    ViewButton: {
      padding: 0,
    },
 
    itemContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between'
    },
    itemText: {
      fontSize: 16,
      width:"80%",
      alignSelf:'center',
      color:'#000'
    },
  });
export default ListModal