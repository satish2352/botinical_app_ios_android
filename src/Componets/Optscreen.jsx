

// import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Langchange from './Langchange';

// const Otpscreen = ({ navigation }) => {
//     const [otp, setOtp] = useState(['', '', '', '']);
//     const [error, setError] = useState('');
// console.log('666666666666666',otp);
//     const handlelogin = async () => {
//         try {
//             // Join the OTP array into a single string
//             const otpValue = otp.join('');
//             console.log('666666666tttttt666666',otpValue);
//             // Make API call to verify OTP
//             const response = await axios.post('https://yourapi.com/verifyotp', {
//                 otp: otpValue,
//             });

//             if (response.data.success) {
//                 // Handle successful OTP verification
//                 console.log('OTP Verification Successful:', response.data);
//                 // Navigate to next screen upon successful verification
//                 navigation.navigate('Registration');
//             } else {
//                 // Handle unsuccessful OTP verification
//                 setError('Invalid OTP. Please try again.');
//             }
//         } catch (error) {
//             // Handle error response from API
//             console.error('OTP Verification Error:', error);
//             setError('Failed to verify OTP. Please try again.');
//         }
//     };
//     const handleOtpChange = (index, value) => {
//         if (value.length > 1) return; // Allow only one character in each box
//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);
//     };

//     return (
//         <View style={styles.maincontainer}>

//             <ImageBackground style={styles.bgImage} source={require('../Assets/bg.png')}>

//                 <Image style={styles.Image} source={require('../Assets/logo.png')} />
//             </ImageBackground>

//             <View style={styles.contentContainer}>
//                 <ImageBackground style={styles.bottombgImage} source={require('../Assets/animal.png')}>
//                     <View ><Text style={{ fontSize: 20, fontWeight: '700', color: '#000000', margin: 40 }}>Enter OTP</Text>

//                     </View>
//                     {error ? <Text style={styles.error}>{error}</Text> : null}
//                     <View style={styles.otpContainer}>
//                         {otp.map((digit, index) => (
//                             <TextInput
//                                 key={index}
//                                 style={styles.otpInput}
//                                 onChangeText={(value) => handleOtpChange(index, value)}
//                                 value={digit}
//                                 maxLength={1}
//                                 keyboardType="numeric"
//                             />
//                         ))}
//                     </View>
//                     <TouchableOpacity style={styles.button} onPress={handlelogin}>
//                         <Text style={styles.buttonText}>Submit</Text>
//                     </TouchableOpacity>
//                 </ImageBackground>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     maincontainer: {
//         flex: 1,
//     },
//     bgImage: {
//         height: hp(45),
//         // width: '100%',
//         alignItems: 'center',
//         // justifyContent: 'center',
//     },
//     Image: {
//         height: 170,
//         width: 250,
//         resizeMode: 'contain',
//         marginVertical: 50
//     },
//     subcontainer1: {
//         flex: 1,
//     },
//     contentContainer: {

//         backgroundColor: "white",
//         borderTopRightRadius: 50,
//         borderTopLeftRadius: 50,
//         // position: 'absolute',
//         bottom: 40
//     },
//     bottombgImage: {
//         height: hp(60),
//         width: '100%',
//         alignItems: 'center',
//         resizeMode: 'center',
//     },

//     button: {
//         width: '70%',
//         height: 45,
//         borderRadius: 40,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 20,
//         backgroundColor: '#01595A',
//     },
//     buttonText: {
//         color: '#ffffff',
//         fontSize: 18,
//         fontWeight: '500',
//     },
//     otpContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '60%',
//         // marginTop: 20,

//     },
//     otpInput: {
//         borderWidth: 0.5,
//         borderColor: '#477E56',
//         width: '22%',
//         height: 50,
//         fontSize: 18,
//         textAlign: 'center',
//         backgroundColor: '#ffff',
//         borderWidth: 0.5,
//         borderRadius: 5,
//         color: '#000',
//         marginBottom: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//         elevation: 10,


//     },
//     error: {
//         color: 'red',
//         marginBottom: 20,
//     },
// });

// export default Otpscreen;

import React, { useState, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

import config from '../../config/config';




const OtpScreen = ({ navigation, route }) => {
    const { mobile_number } = route.params;
    const [data, setdata] = useState();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);
    const {setid } = globalvariavle();
   
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
        const URL= config.API_URL;
        try {
            const otpValue = otp.join('');
            const response = await axios.post(`${URL}verifyotp`, {
                mobile_number: mobile_number,
                user_otp: otpValue,
            });
            console.log('Response from API:', response.data);
            
            if (response.data.status === 'true') {
                console.log('OTP Verification Successful');
                await AsyncStorage.setItem('token', response.data.token);
                
                const id =response.data.data.id
                console.log('999999999',id);
                setid(id);
                navigation.navigate('Registration');
            } else {
                console.error('OTP Verification Error:', response.data.message);
                setError(response.data.message);
            }
        } catch (error) {
            console.error('OTP Verification Error:', error);
            setError('Failed to verify OTP. Please try again.');
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
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Submit</Text>
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
        marginVertical: 50
    },
    contentContainer: {
        backgroundColor: "white",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        bottom: 40
    },
    bottombgImage: {
        height: hp(61),
        width: '100%',
        alignItems: 'center',
        resizeMode: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
        margin: 40
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
        borderWidth: 0.5,
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
