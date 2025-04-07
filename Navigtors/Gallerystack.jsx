import React from 'react'

import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Gallery from '../src/Componets/Gallery';
import Langchange from '../src/Componets/Langchange';
import GalleryCategory from '../src/Componets/GalleryCategory';


const Stack = createNativeStackNavigator();
function Gallerystack() {
    const navigation = useNavigation();
    return (

        <Stack.Navigator initialRouteName="GalleryCategory"
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
            <Stack.Screen name="GalleryCategory" component={GalleryCategory} />
            <Stack.Screen name="Gallery" component={Gallery} />
       

        </Stack.Navigator>

    );
}

export default Gallerystack;
