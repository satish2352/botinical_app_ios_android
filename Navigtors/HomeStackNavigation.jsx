import React, { useEffect, useState } from 'react'

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flowerdetails from '../src/Componets/Flowerdetails';
import Logout from '../src/Componets/Logout';
import AddEntity from '../src/Componets/AddEntity';
import AddEntityform from '../src/Componets/AddEntityform';
import Addamenities from '../src/Componets/Addamenities';
import ChangePass from '../src/Componets/ChangePass';
import Editcordinates from '../src/Reusablecompoent/Editcordinates';
import Arvramenities from '../src/Componets/Arvramenities';
import Arvrdetails from '../src/Componets/Arvrdetails';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Priortyamenities from '../src/Componets/Priortyamenities';
import PriortyArvrdetails from '../src/Componets/PriortyArvrdetails';


const Stack = createNativeStackNavigator();
function HomeStackNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const navigation = useNavigation();


  // useEffect(() => {
  //   const checkUserToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       setIsLoggedIn(token ? true : false); // Set isLoggedIn based on token presence
  //     } catch (error) {
  //       console.error('Error checking user token:', error);
  //       setIsLoggedIn(false);
  //     } finally {
  //       setIsLoading(false); // Hide loading indicator after checking
  //     }
  //   };

  //   checkUserToken();
  // }, []);


  return (

    <Stack.Navigator initialRouteName='Home'
      screenOptions={{
        statusBarHidden: false,
        translucent: false,
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: '#01595A',
        headerTitleAlign: 'center',
        headerRight: () => {
          return (
            <View style={{ flexDirection: 'row' }}>

              <Icon name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={34} color="#01595A" />
            </View>
          )
        },
        headerLeft: () => {
          return (
            <TouchableOpacity >
            <Langchange color={'#01595A'} size={34} />
            </TouchableOpacity>
          )
        }
      }}
    >




      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> 
      <Stack.Screen name="Home" component={Home} options={{ statusBarHidden: true ,headerShown: true}} />

      <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
      <Stack.Screen name="Regifrom" component={Regifrom} />
      <Stack.Screen name="ChargesList" component={ChargesList} />
      <Stack.Screen name="About" component={About} />
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
      {/*
        <Stack.Screen name="AddEntity" component={AddEntity} /> 
     <Stack.Screen name="AddEntityform" component={AddEntityform} /> 
     <Stack.Screen name="Addamenities" component={Addamenities} /> 
     */}
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="Editcordinates" component={Editcordinates} />
      <Stack.Screen name="Arvramenities" component={Arvramenities} />
      <Stack.Screen name="Arvrdetails" component={Arvrdetails} />
      <Stack.Screen name="Priortyamenities" component={Priortyamenities} />
      <Stack.Screen name="PriortyArvrdetails" component={PriortyArvrdetails} />










    </Stack.Navigator>

  )
}

export default HomeStackNavigation;


// {isLoggedIn === false ?
//   (
//     <>
//     <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//     <Stack.Screen name="Home" component={Home}  options={{ statusBarHidden: true }}  />
//     </>
//   )
//   :
//   (
//     <>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
//       <Stack.Screen name="Regifrom" component={Regifrom} />
//       <Stack.Screen name="ChargesList" component={ChargesList} />
//       <Stack.Screen name="About" component={About} />
//       <Stack.Screen name="Amenities" component={Amenities} />
//       <Stack.Screen name="Aminitiesdetails" component={Aminitiesdetails} />
//       <Stack.Screen name="Treecompo" component={Treecompo} />
//       <Stack.Screen name="Flowers" component={Flowers} />
//       <Stack.Screen name="PlatsDetails" component={PlatsDetails} />
//       <Stack.Screen name="Flowerdetails" component={Flowerdetails} />
//       <Stack.Screen name="Contactus" component={Contactus} />
//       <Stack.Screen name="Gallery" component={Gallery} />
//       <Stack.Screen name="Aminities2" component={Aminities2} />
//       <Stack.Screen name="logout" component={Logout} />
//       {/*
//   <Stack.Screen name="AddEntity" component={AddEntity} />
// <Stack.Screen name="AddEntityform" component={AddEntityform} />
// <Stack.Screen name="Addamenities" component={Addamenities} />
// */}
//       <Stack.Screen name="ChangePass" component={ChangePass} />
//       <Stack.Screen name="Editcordinates" component={Editcordinates} />
//       <Stack.Screen name="Arvramenities" component={Arvramenities} />
//       <Stack.Screen name="Arvrdetails" component={Arvrdetails} />
//       <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//     </>

//   )


// }
