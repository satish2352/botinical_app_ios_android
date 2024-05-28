import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Langchange from './Langchange';
import LinearGradient from 'react-native-linear-gradient';
import { globalvariavle, useMyData } from '../../Navigtors/globlevariable/MyContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';

const Regifrom = ({ navigation }) => {
    const { useerid } = globalvariavle();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [dobError, setDobError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [occupationError, setOccupationError] = useState('');
    const { SelectedLanguage1 } = globalvariavle();
    const handleRegistration = async () => {
        // Validate fields
        let valid = true;
        if (!name.trim()) {
            setNameError('Name is required');
            valid = false;
        } else {
            setNameError('');
        }
        if (!email.trim()) {
            setEmailError('Email is required');
            valid = false;
        } else if (!validateEmail(email.trim())) {
            setEmailError('Invalid email format');
            valid = false;
        } else {
            setEmailError('');
        }
        if (!gender.trim()) {
            setGenderError('Gender is required');
            valid = false;
        } else {
            setGenderError('');
        }
        if (!dob.trim()) {
            setDobError('Date of Birth is required');
            valid = false;
        } else if (!validateDate(dob.trim())) {
            setDobError('format (DD/MM/YYYY)');
            valid = false;
        } else {
            setDobError('');
        }
        if (!address.trim()) {
            setAddressError('Address is required');
            valid = false;
        } else {
            setAddressError('');
        }
        if (!occupation.trim()) {
            setOccupationError('Occupation is required');
            valid = false;
        } else {
            setOccupationError('');
        }
        if (!valid) {
            return;
        }

        const token = await AsyncStorage.getItem('token');
        console.log(token);
        axios.post(`${config.API_URL}auth/update-user-form?id=${useerid}`, {
            full_name: name,
            email: email,
            gender: gender,
            date_of_birth: dob,
            address: address,
            occupation: occupation,
            language: SelectedLanguage1,
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
            // Handle error here
        });

    }
   
    const validateEmail = (email) => {
        // Email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    const validateDate = (date) => {
        // Date validation regex (DD/MM/YYYY)
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/;
        return regex.test(date);
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

                    <Text style={{ fontSize: 25, fontWeight: '500', color: '#01595A', margin: 15, alignSelf: 'flex-start', marginHorizontal: 35 }}>REGISTRATION</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="NAME"
                        placeholderTextColor="black"
                        onChangeText={setName}
                    />
                    {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="EMAIL"
                        placeholderTextColor="black"
                        onChangeText={setEmail}
                    />
                    {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
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
                        <View style={{ flexDirection: 'row', }}>
                            {genderError ? <Text style={styles.error}>{genderError}</Text> : null}
                            {dobError ? <Text style={styles.error}>{dobError}</Text> : null}
                        </View>

                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="ADDRESS"
                        placeholderTextColor="black"
                        onChangeText={setAddress}
                    />
                    {addressError ? <Text style={styles.error}>{addressError}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="OCCUPATION"
                        placeholderTextColor="black"
                        onChangeText={setOccupation}
                    />
                    {occupationError ? <Text style={styles.error}>{occupationError}</Text> : null}
                    <TouchableOpacity style={styles.button} onPress={handleRegistration} >
                        <Text style={styles.buttonText} >SUBMIT </Text>
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
        alignItems: "center"
    },
    contentContainer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        // justifyContent: 'flex-end',
        // alignItems: 'center'
    },
   
    input: {
        width: '85%',
        height: 45,
        borderColor: '#477E56',
        borderWidth: 0.5,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        padding: 1,
        backgroundColor: '#ffff',
        fontSize: 16, // Font size of the input text
        fontWeight: '400',
        marginVertical: 4,
        color: '#000'
    },
    input2: {
        width: '40%',
        height: 45,
        borderColor: '#477E56',
        borderWidth: 0.5,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        padding: 1,
        backgroundColor: '#ffff',
        marginHorizontal: 8,
        fontSize: 16, // Font size of the input text
        fontWeight: '400',
        color: '#000'

    },
    button: {
        width: '50%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        backgroundColor: '#01595A',
        alignSelf: 'flex-end',
        marginRight: 25
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
        margin: 10,
        flex: 1
    },
    inputwrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginHorizontal: 29
    },
})
export default Regifrom


