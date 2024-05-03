import React from 'react'

import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Treecompo from '../src/Componets/Treecompo';
import PlatsDetails from '../src/Componets/PlatsDetails';
import Flowers from '../src/Componets/Flowers';
import Langchange from '../src/Componets/Langchange';


const Stack = createNativeStackNavigator();
function flowersstack() {
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
                        <Langchange/>
          
                      </View>
                    )
                  }
            }}
        >
            <Stack.Screen name="Flowers" component={Flowers} />
            <Stack.Screen name="PlatsDetails" component={PlatsDetails} />

        </Stack.Navigator>

    );
}

export default flowersstack;
