import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import config from '../../config/config';



const Login = ({ navigation }) => {
    const [data, setdata] = useState();
    const [mobile, setmobile] = useState('');
    const [pass, setpass] = useState('');
    const [error, setError] = useState('');


    const handlelogin = async () => {

        try {
            // Validate mobile number
            if (mobile === '') {
                setError('Please fill in your mobile number');
                return;
            }

            // Make API call to request OTP
            const response = await axios.post(`${config.API_URL}login`, {
                mobile_number: mobile,
            });
            console.log('Response from API:', response.data);
            setdata(response.data)
            if (data && data.status === 'true') {
                // Handle successful OTP request
                Alert.alert(data.message);// Corrected this line
                console.log('OTP Sent Successfullyyyyyyyyyyyy:', response.message);


                navigation.navigate('Otpscreen', { mobile_number: mobile });
            } else {
                // Handle unsuccessful OTP request
                setError(response.data.error);
            }
        } catch (error) {
            // Handle error response from API
            console.error('Error requesting OTPppppppppppp:', error.message);
            setError(error.message);
        }
    };

    return (
        <View style={styles.maincontainer}>

            <ImageBackground style={styles.bgImage}
                source={require('../Assets/bg.png')} >

                <Image style={styles.Image} source={require('../Assets/logo.png')} />

            </ImageBackground>
            <View style={styles.underview}>
                <ImageBackground style={styles.bottombgImage}
                    source={require('../Assets/animal.png')} >
                    <View style={styles.inputwrap}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mobile No"
                            placeholderTextColor="black"
                            onChangeText={setmobile}

                            value={mobile}
                        />
                        {error ? <Text style={styles.error}>{error}</Text> : null}
                        <TouchableOpacity style={styles.button} onPress={handlelogin} >
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </View>


                </ImageBackground>
            </View>
        </View>
    )
    // 9527090946
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,

    },
    bgImage: {
        height: hp(45),
        // width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    Image: {
        height: 180,
        width: 250,
        resizeMode: 'contain',
        marginVertical: 50

    },


    bottombgImage: {
        height: hp(60),
        width: '100%',
        // alignItems: 'center',
        resizeMode: 'center',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,


    },
    input: {
        width: '70%',
        height: 47,
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
        color: '#000'
    },
    button: {
        width: '70%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        backgroundColor: '#01595A'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },

    inputwrap: {
        alignItems: 'center',
        marginTop: 80
    },
    underview: {
        backgroundColor: "white",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        // position: 'absolute',
        bottom: 40
    },
    error: {
        color: 'red',

    },
})
export default Login


