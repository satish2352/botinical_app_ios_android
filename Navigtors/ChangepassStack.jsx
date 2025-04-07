import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePass from '../src/Componets/ChangePass';
import Langchange from '../src/Componets/Langchange';
import Login from '../src/Componets/Login';
const Stack = createNativeStackNavigator();
const ChangepassStack = () => {
    const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="ChangePass"
    screenOptions={{
        statusBarHidden: true,
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerRight: () => {
            return (
              <View style={{ flexDirection: 'row', }}>
  
                <Icon name="menu"
                  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                  size={34} color="#01595A" />
              </View>
            )
          },
          headerLeft: () => {
            return (
              <View >
                 <Langchange color={'#01595A'} size={34} />
  
              </View>
            )
          }
    }}
>
    <Stack.Screen name="ChangePass" component={ChangePass} />
</Stack.Navigator>
  )
}

export default ChangepassStack