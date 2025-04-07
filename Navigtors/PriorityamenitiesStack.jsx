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
import Priortyamenities from '../src/Componets/Priortyamenities';
import PriortyArvrdetails from '../src/Componets/PriortyArvrdetails';

const Stack = createNativeStackNavigator();
function PriorityamenitiesStack() {
    const navigation = useNavigation();
    return (

        <Stack.Navigator initialRouteName="Priortyamenities"
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
            <Stack.Screen name="Priortyamenities" component={Priortyamenities} />
            <Stack.Screen name="PriortyArvrdetails" component={PriortyArvrdetails} />
            <Stack.Screen name="Mainmap" component={Mainmap} />

        </Stack.Navigator>

    );
}

export default PriorityamenitiesStack;
