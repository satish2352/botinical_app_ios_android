import React from 'react'

import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from '../src/Componets/About';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Langchange from '../src/Componets/Langchange';
import Aminities2 from '../src/Componets/Aminities2';

const Stack = createNativeStackNavigator();
function AminetiesMapstack() {
    const navigation = useNavigation();
    return (

        <Stack.Navigator initialRouteName="Aminities2"
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
            <Stack.Screen name="Aminities2" component={Aminities2} />

        </Stack.Navigator>

    );
}

export default AminetiesMapstack;
