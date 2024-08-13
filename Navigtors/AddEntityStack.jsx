import React from 'react'

import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Langchange from '../src/Componets/Langchange';
import Mainmap from '../src/Componets/Mainmap';
import AddEntity from '../src/Componets/AddEntity';
import AddEntityform from '../src/Componets/AddEntityform';
import Addamenities from '../src/Componets/Addamenities';

const Stack = createNativeStackNavigator();
function AddEntityStack() {
    const navigation = useNavigation();
    return (

        <Stack.Navigator initialRouteName="AddEntity"
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
                            <Langchange />

                        </View>
                    )
                }
            }}
        >
            <Stack.Screen name="AddEntity" component={AddEntity} />
            <Stack.Screen name="AddEntityform" component={AddEntityform} />
            <Stack.Screen name="Addamenities" component={Addamenities} />

        </Stack.Navigator>

    );
}

export default AddEntityStack;
