

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Navigtors/DrawerNavigator';
import { MyProvider } from './Navigtors/globlevariable/MyContext';






const App = () => {
  return (
    <MyProvider>
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    </MyProvider>
  );
}

export default App 

