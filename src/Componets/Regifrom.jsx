import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Langchange from './Langchange';
import LinearGradient from 'react-native-linear-gradient';
import { useMyData } from '../../Navigtors/globlevariable/MyContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Regifrom = ({ navigation }) => {
    const {useerid } = useMyData();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');

    const handleRegistration = async() => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        axios.post(`https://botinical.com.sumagodemo.com/api/auth/update-user-form?id=${useerid}`, {
            full_name: name,
            email: email,
            gender: gender,
            date_of_birth: dob,
            address: address,
            occupation: occupation 
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Registration successful:', response.data.message);
          Alert.alert('Registration successful:', response.data.message);
            navigation.navigate('Home');
        })
        .catch(error => {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to register. Please try again later.');
        });
    }

    return (
        <View style={styles.maincontainer}>
            <View style={styles.subcontainer1}>
                    <Image style={styles.Image} source={require('../Assets/simplelogo.png')} />
            </View>
            <LinearGradient
                colors={['#015A4A', '#89CE9B', '#89CE9B']}
                locations={[0, 1, 0.32]}
                start={{ x: 1, y: 1 }} // Top left
                end={{ x: 1, y: 0 }}   // Bottom left
                style={styles.contentContainer}>
                <View style={styles.fromwrap}>

                <Text style={{fontSize:25,fontWeight:'500',color:'#01595A',margin:15,alignSelf:'flex-start',marginHorizontal:35}}>REGISTRATION</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="NAME"
                        placeholderTextColor="black"
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="EMAIL"
                        placeholderTextColor="black"
                        onChangeText={setEmail}
                    />
                    <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input2}
                        placeholder="GENDER"
                        placeholderTextColor="black"
                        onChangeText={setGender}
                    />
                    <TextInput
                        style={styles.input2}
                        placeholder="DOB "
                        placeholderTextColor="black"
                        onChangeText={setDob}
                    />
                    </View>
                    <TextInput
                    style={styles.input}
                    placeholder="ADDRESS"
                    placeholderTextColor="black"
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="OCCUPATION"
                    placeholderTextColor="black"
                    onChangeText={setOccupation}
                />
                    <TouchableOpacity style={styles.button} onPress={handleRegistration} >
                        <Text style={styles.buttonText}>SUBMIT </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,

    },
    bgImage: {
        height: hp(40),
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    Image: {
        height: 170,
        width: 250,
        resizeMode: 'contain',
        marginVertical: 50

    },
    subcontainer1: {
        flex: 1,
        alignItems:"center"
    },
    contentContainer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        // justifyContent: 'flex-end',
        // alignItems: 'center'
    },
    bottombgImage: {
        height: hp(55),
        width: '100%',
        alignItems: 'center',
        resizeMode: 'center',
    },
    input: {
        width: '85%',
        height: 45,
        borderColor: '#477E56',
        borderWidth: 0.5,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 11,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        padding: 1,
        backgroundColor: '#ffff',
        fontSize: 16, // Font size of the input text
        fontWeight: '400',
        marginVertical:4,
        color:'#000'
    },
    input2: {
        width: '40%',
        height: 45,
        borderColor: '#477E56',
        borderWidth: 0.5,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 11,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        padding: 1,
        backgroundColor: '#ffff',
       marginHorizontal:8,
       fontSize: 16, // Font size of the input text
       fontWeight: '400',
       
    },
    button: {
        width: '50%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        backgroundColor: '#01595A',
        alignSelf:'flex-end',
        marginRight:25
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    langiconwrap: {
        alignSelf: 'flex-end',
        position: "absolute",
        padding: 10
    },
    langicon: {
        width: 45,
        height: 35,
    },
    fromwrap: {
        alignItems: 'center',
        margin: 10
    },
    inputwrap:{
        flexDirection:'row',
        flexWrap:'wrap'
    }
})
export default Regifrom
