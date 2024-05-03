import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, DrawerLayoutAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
const CustDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let drawerRef = React.createRef();

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      drawerRef.current.closeDrawer();
    } else {
      drawerRef.current.openDrawer();
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="right"
      renderNavigationView={() => (
        <View style={styles.drawer}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Text>Close Drawer</Text>
          </TouchableOpacity>
          <Text>Drawer Content</Text>
        </View>
      )}>
      <View style={styles.container}>
        {/* Main Content */}
        <TouchableOpacity onPress={toggleDrawer}>
        <Icon name="menu" size={34} color="#000" />
        </TouchableOpacity>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default CustDrawer;
