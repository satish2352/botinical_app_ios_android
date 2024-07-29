

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Navigtors/DrawerNavigator';
import { MyProvider } from './Navigtors/globlevariable/MyContext';
import StatusCheck from './src/Componets/StatusCheck';






const App = () => {
  return (
   <MyProvider>
      <NavigationContainer>
        <StatusCheck>
          <DrawerNavigator />
        </StatusCheck>
      </NavigationContainer>
    </MyProvider>
  );
}

export default App 

