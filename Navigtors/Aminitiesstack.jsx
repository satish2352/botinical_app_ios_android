import React from 'react'

import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Amenities from '../src/Componets/Amenities';
import Aminitiesdetails from '../src/Componets/Aminitiesdetails';
import Langchange from '../src/Componets/Langchange';
import Mainmap from '../src/Componets/Mainmap';

const Stack = createNativeStackNavigator();
function Aminitiesstack() {
    const navigation = useNavigation();
    return (

        <Stack.Navigator initialRouteName="Amenities"
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
            <Stack.Screen name="Amenities" component={Amenities} />
            <Stack.Screen name="Aminitiesdetails" component={Aminitiesdetails} />
            <Stack.Screen name="Mainmap" component={Mainmap} />

        </Stack.Navigator>

    );
}

export default Aminitiesstack;
