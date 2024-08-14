

import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal, Button } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../config/config';
import ListModal from './ListModal';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
const Login = ({ navigation }) => {
    const [data, setdata] = useState();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [modalVisible, setModalVisible] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { setid } = globalvariavle();
    const handleLogin = async () => {
        const URL = config.API_URL;
        setError('');
        // Validate mobile number
        if (email === '') {
            setError('Please fill in your email address');
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (password === '') {
            setError('Please fill in your password');
            return;
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        try {
            setLoading(true); // Start loading
            // Make API call to request OTP
            const response = await axios.post(`${URL}login`, {
                email: email,
                password: password
            });
            console.log('Response from API:', response.data);
            setdata(response.data);

            if (response.data && response.data.status === 'True') {
                // Handle successful OTP request
                console.log('OTP Sent Successfully:', response.data.message);
                setError(response.data.message)
                await AsyncStorage.setItem('token', response.data.token);
                const id = response.data.data.id;
                console.log('User ID:', id);
                setid(id);
                // navigation.navigate('Otpscreen', { mobile_number: mobile });
                navigation.navigate('Home');
                setError('');
                setemail('');
                setpassword('')
            } else {
                // Handle unsuccessful OTP request
                setError(response.data.message);
            }
        } catch (error) {
            // Handle error response from API
            console.error('Error requesting OTP:', error.message);
            setError(error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const skipregi = () => {
        navigation.navigate('Home');
    }
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return (
        <View style={styles.maincontainer}>
            <ImageBackground style={styles.bgImage} source={require('../Assets/bg.png')}>
                <Image style={styles.Image} source={require('../Assets/logo.png')} />
            </ImageBackground>
            <View style={styles.underview}>
                <ImageBackground style={styles.bottombgImage} source={require('../Assets/animal.png')}>
                    <View style={styles.inputwrap}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email Id"
                            placeholderTextColor="black"
                            onChangeText={setemail}
                            value={email}
                            keyboardType='email-address'

                        />
                        <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            placeholderTextColor="black"
                            onChangeText={setpassword}
                            value={password}
                            secureTextEntry={!isPasswordVisible} 
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                            <Icon1
                                name={isPasswordVisible ? "eye-off" : "eye"} // Change icon based on state
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                        </View>
                        {error ? <Text style={styles.error}>{error}</Text> : null}
                        <TouchableOpacity onPress={() => setModalVisible(true)}><Text style={styles.underlineText}>Forgot Password?</Text></TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#ffffff" />
                            ) : (
                                <Text style={styles.buttonText}>Log In</Text>
                            )}
                        </TouchableOpacity>
                        <View style={styles.regiline}><Text style={{ color: 'black' }}> Dont have an account? <Text style={{ fontWeight: 'bold', color: "orange" }} onPress={() => navigation.navigate('Regifrom')}>Register now</Text></Text></View>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#01595A', alignSelf: 'flex-end', marginHorizontal: 25 }} onPress={skipregi}>SKIP FOR NOW</Text>
                </ImageBackground>
            </View>
            <ForgotPass modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    );
};


//forgot modal
const ForgotPass = ({ modalVisible, setModalVisible }) => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otpError, setOtpError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateInputs = () => {
        let valid = true;

        if (!otp.trim()) {
            setOtpError('OTP is required');
            valid = false;
        } else {
            setOtpError('');
        }

        if (!newPassword.trim()) {
            setNewPasswordError('New password is required');
            valid = false;
        } else {
            setNewPasswordError('');
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirm password is required');
            valid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        return valid;
    };
    const handleSubmit = () => {
        if (validateInputs()) {
            // Handle password reset logic here
            alert('Password reset successfully!');
            setModalVisible(false);
        }
    }
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Reset Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            placeholderTextColor="black"
                            // value={otp}
                            onChangeText={setOtp}
                            keyboardType="numeric"
                        />
                        {otpError ? <Text style={styles.error}>{otpError}</Text> : null}

                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            placeholderTextColor="black"
                            // value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                        {newPasswordError ? <Text style={styles.error}>{newPasswordError}</Text> : null}
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="black"
                            // value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                        {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} >

                            <Text style={styles.buttonText}>Submit</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Icon name="close" size={30} color="#01595A" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
    },
    bgImage: {
        height: hp(45),
        alignItems: 'center',
    },
    Image: {
        height: 180,
        width: 250,
        resizeMode: 'contain',
        marginVertical: 50,
    },
    bottombgImage: {
        height: hp(64),
        width: '100%',
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
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
    button: {
        width: '70%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        backgroundColor: '#01595A',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    inputwrap: {
        alignItems: 'center',
        marginTop: 80,
    },
    underview: {
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        bottom: 40,
    },
    error: {
        color: 'red',
    },
    regiline: {
        margin: 8
    },
    underlineText: {
        textDecorationLine: 'underline',
        color: 'gray',
        margin: 4
    },




    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#01595A'
    },
    closeButton: {
        color: 'blue',
        marginTop: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        backgroundColor: '#ffff',
      
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        
    },
});

export default Login;
