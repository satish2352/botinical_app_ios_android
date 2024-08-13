import React from 'react'

import { NavigationContainer, useNavigation, DrawerActions, StatusBar } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../src/Componets/Login';
import Home from '../src/Componets/Home';
import Otpscreen from '../src/Componets/Optscreen';
import Langchange from '../src/Componets/Langchange';
import Registration from '../src/Componets/Registration';
import Regifrom from '../src/Componets/Regifrom';
import ChargesList from '../src/Componets/ChargesList';
import About from '../src/Componets/About';
import Amenities from '../src/Componets/Amenities';
import Aminitiesdetails from '../src/Componets/Aminitiesdetails';
import Treecompo from '../src/Componets/Treecompo';
import Flowers from '../src/Componets/Flowers';
import PlatsDetails from '../src/Componets/PlatsDetails';
import Contactus from '../src/Componets/Contactus';
import Gallery from '../src/Componets/Gallery';
import Aminities2 from '../src/Componets/Aminities2';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import { View } from 'react-native';

import Flowerdetails from '../src/Componets/Flowerdetails';
import Logout from '../src/Componets/Logout';
import AddEntity from '../src/Componets/AddEntity';
import AddEntityform from '../src/Componets/AddEntityform';
import Addamenities from '../src/Componets/Addamenities';



const Stack = createNativeStackNavigator();
function HomeStackNavigation() {
  const navigation = useNavigation();
  return (

    <Stack.Navigator initialRouteName="Login"
      screenOptions={{
        statusBarHidden: false,
        translucent: false,
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: '#01595A',
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
              <Langchange />

            </View>
          )
        }
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Otpscreen" component={Otpscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
      <Stack.Screen name="Regifrom" component={Regifrom} />
      <Stack.Screen name="ChargesList" component={ChargesList} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Amenities" component={Amenities} />
      <Stack.Screen name="Aminitiesdetails" component={Aminitiesdetails} />
      <Stack.Screen name="Treecompo" component={Treecompo} />
      <Stack.Screen name="Flowers" component={Flowers} />
      <Stack.Screen name="PlatsDetails" component={PlatsDetails} />
      <Stack.Screen name="Flowerdetails" component={Flowerdetails} />
      <Stack.Screen name="Contactus" component={Contactus} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Aminities2" component={Aminities2} />
      <Stack.Screen name="logout" component={Logout} />
      <Stack.Screen name="AddEntity" component={AddEntity} /> 
      <Stack.Screen name="AddEntityform" component={AddEntityform} /> 
      <Stack.Screen name="Addamenities" component={Addamenities} /> 
      

    </Stack.Navigator>

  );
}

export default HomeStackNavigation;
