 // components/SearchBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ value, onChange, placeholder, onSearch ,onFocus }) => {
  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange} // Called whenever text changes
      onFocus={onFocus} // Called when the search bar is clicked
      placeholderTextColor="#999"
    />
    <TouchableOpacity onPress={onSearch} style={styles.iconContainer}>
      <Ionicons name="search" size={20} color='#01595A' />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,

  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    color: '#333',
  },
  iconContainer: {
    marginLeft: 8,
  },
});

export default SearchBar;
