import React from 'react'

import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Contactus from '../src/Componets/Contactus';
import Langchange from '../src/Componets/Langchange';



const Stack = createNativeStackNavigator();
function Contactstack() {
    const navigation = useNavigation();
    return (

        <Stack.Navigator initialRouteName="Contactus"
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
            <Stack.Screen name="Contactus" component={Contactus} />
       

        </Stack.Navigator>

    );
}

export default Contactstack;
