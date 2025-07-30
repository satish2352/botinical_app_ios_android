import React from 'react'

import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Treecompo from '../src/Componets/Treecompo';
import PlatsDetails from '../src/Componets/PlatsDetails';
import Flowers from '../src/Componets/Flowers';
import Langchange from '../src/Componets/Langchange';
import Mainmap from '../src/Componets/Mainmap';
import Flowerdetails from '../src/Componets/flowerdetails';





const Stack = createNativeStackNavigator();
function Flowersstack() {
    const navigation = useNavigation();
    return (

        <Stack.Navigator initialRouteName="Flowers"
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
            <Stack.Screen name="Flowers" component={Flowers} />
            <Stack.Screen name="Flowerdetails" component={Flowerdetails} />
            <Stack.Screen name="Mainmap" component={Mainmap} />

        </Stack.Navigator>

    );
}

export default Flowersstack;
