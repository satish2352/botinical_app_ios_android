


import React, { useState, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import config from '../../config/config';

const OtpScreen = ({ navigation, route }) => {
    const { mobile_number } = route.params;
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const { setid } = globalvariavle();

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Allow only one character in each box
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        // Automatically focus on the next TextInput
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleLogin = async () => {
        const URL = config.API_URL;

        // Validate OTP
        if (otp.includes('')) {
            setError('Please enter the complete 4-digit OTP');
            return;
        }

        try {
            setLoading(true);
            const otpValue = otp.join('');
            const response = await axios.post(`${URL}verifyotp`, {
                mobile_number: mobile_number,
                user_otp: otpValue,
            });
            console.log('Response from API:', response.data);

            if (response.data.status === 'true') {
                console.log('OTP Verification Successful');
                await AsyncStorage.setItem('token', response.data.token);
                const id = response.data.data.id;
                console.log('User ID:', id);
                setid(id);
                navigation.navigate('Home');
                setOtp(['', '', '', '']);
            } else {
                console.error('OTP Verification Error:', response.data.message);
                setError(response.data.message);
            }
        } catch (error) {
            console.error('OTP Verification Error:', error);
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bgImage} source={require('../Assets/bg.png')}>
                <Image style={styles.logo} source={require('../Assets/logo.png')} />
            </ImageBackground>
            <View style={styles.contentContainer}>
                <ImageBackground style={styles.bottombgImage} source={require('../Assets/animal.png')}>
                    <Text style={styles.title}>Enter OTP</Text>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                style={styles.otpInput}
                                onChangeText={(value) => handleOtpChange(index, value)}
                                value={digit}
                                maxLength={1}
                                keyboardType="numeric"
                            />
                        ))}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Submit</Text>
                        )}
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        height: hp(45),
        alignItems: 'center',
    },
    logo: {
        height: 170,
        width: 250,
        resizeMode: 'contain',
        marginVertical: 50,
    },
    contentContainer: {
        backgroundColor: "white",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        bottom: 40,
    },
    bottombgImage: {
        height: hp(64),
        width: '100%',
        alignItems: 'center',
        resizeMode: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
        margin: 40,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    otpInput: {
        borderWidth: 0.5,
        borderColor: '#477E56',
        width: '22%',
        height: 50,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: '#ffff',
        borderRadius: 5,
        color: '#000',
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
    },
    button: {
        width: '70%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#01595A',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
});

export default OtpScreen;
