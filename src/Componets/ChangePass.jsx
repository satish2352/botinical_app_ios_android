import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../config/config';

import Icon1 from 'react-native-vector-icons/Ionicons';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { useNavigation } from '@react-navigation/native';
const ChangePass = () => {
    const navigation = useNavigation();
    const { SelectedLanguage1 ,isLoggedIn, showLoginPrompt} = globalvariavle();
    const [data, setdata] = useState();
    const [oldpass, setoldpass] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { setid } = globalvariavle();



    const chnagepass1 = async() => {
        setError('');

        if (!oldpass?.trim()) {
            setError('Old Password is required');
            return;
        }

        // Validate New Password
        if (!newpassword?.trim()) {
            setError('New password is required');
            return;
        } else if (newpassword.trim().length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        // Validate Confirm Password
        if (!confirmpassword?.trim()) {
            setError('Confirm password is required');
            return;
        } else if (newpassword.trim() !== confirmpassword.trim()) {
            setError('Passwords do not match');
            return;
        }

        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/change-password-profile`, {
                old_password:oldpass,
                new_password:confirmpassword,
                language: SelectedLanguage1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data.message);
          if(response.data.status === 'true'){
            setError(response.data.message)
            Alert.alert('Update Successful', response.data.message);
        await AsyncStorage.removeItem('token');
            setid('');
            navigation.navigate('Login');
            setError('');
          }
          else{
            setError(response.data.message)
          }
        } catch (error) {
            console.error('Error fetching tree data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
        
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
                        <Text style={styles.modalTitle}>Change Password</Text>
                        <ScrollView contentContainerStyle={{ alignItems:"center"}}>
                        <TextInput
                            style={styles.input}
                            placeholder="Old Password"
                            placeholderTextColor="black"
                            onChangeText={setoldpass}
                            value={oldpass}
                            keyboardType='visible-password'

                        />
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="New Password"
                                placeholderTextColor="black"
                                onChangeText={setnewpassword}
                                value={newpassword}
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
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder=" Confirm Password"
                                placeholderTextColor="black"
                                onChangeText={setconfirmpassword}
                                value={confirmpassword}
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

                        <TouchableOpacity style={styles.button} onPress={chnagepass1} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#ffffff" />
                            ) : (
                                <Text style={styles.buttonText}>Change Password</Text>
                            )}
                        </TouchableOpacity>
                        </ScrollView>
                    </View>
                   
                </ImageBackground>
            </View>
        </View>
    );
};




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
        width: '50%',
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
        // alignItems: 'center',
        justifyContent:'center',
        marginTop: 50,
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


    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#01595A',
        alignSelf:'center'
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

export default ChangePass;

