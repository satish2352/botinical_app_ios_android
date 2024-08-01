

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Navigtors/DrawerNavigator';
import { MyProvider,globalvariavle } from './Navigtors/globlevariable/MyContext';
import StatusCheck from './src/Componets/StatusCheck';






const App = () => {
  // const { isLoggedIn } = globalvariavle();
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

