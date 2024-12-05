import React from 'react'

import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from '../src/Componets/About';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Langchange from '../src/Componets/Langchange';
import Arvramenities from '../src/Componets/Arvramenities';
import Arvrdetails from '../src/Componets/Arvrdetails';
import Mainmap from '../src/Componets/Mainmap';

const Stack = createNativeStackNavigator();
function ARVRamenitiesStack() {
    const navigation = useNavigation();
    return (

        <Stack.Navigator initialRouteName="Arvramenities"
            screenOptions={{
                statusBarHidden: true,
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerRight: () => {
                    return (
                        <View>

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
            <Stack.Screen name="Arvramenities" component={Arvramenities} />
            <Stack.Screen name="Arvrdetails" component={Arvrdetails} />
            <Stack.Screen name="Mainmap" component={Mainmap} />

        </Stack.Navigator>

    );
}

export default ARVRamenitiesStack;
