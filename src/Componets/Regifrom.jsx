import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Langchange from './Langchange';
import LinearGradient from 'react-native-linear-gradient';
import { globalvariavle, useMyData } from '../../Navigtors/globlevariable/MyContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
const Regifrom = ({ navigation }) => {
    const { useerid } = globalvariavle();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [dobError, setDobError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [occupationError, setOccupationError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const { SelectedLanguage1 } = globalvariavle();
    
    const [show, setShow] = useState(false);
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
        } if (!mobile === '') {
            setMobileError('Please fill in your mobile number');
            valid = false;

        }
        else if (!/^\d{10}$/.test(mobile)) {
            setMobileError('Please enter a valid 10-digit mobile number');
            valid = false;
        }
        else {
            setMobileError('');
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
        } // Password validation
        if (!password.trim()) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError('');
        }

        // Confirm Password validation
        if (!confirmpassword.trim()) {
            setConfirmPasswordError('Confirm Password is required');
            valid = false;
        } else if (password !== confirmpassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }


        if (!valid) {
            return;
        }

        const token = await AsyncStorage.getItem('token');
        console.log(token);
        axios.post(`${config.API_URL}user-registration`, {
            full_name: name,
            email: email,
            gender: gender,
            date_of_birth: dob,
            address: address,
            occupation: occupation,
            language: SelectedLanguage1,
            password:confirmpassword
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

    const showDatepicker = () => {
        setShow(true);
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShow(Platform.OS === 'ios');
        setDob(currentDate);
    };
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
    const skipregi = () => {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.maincontainer}>
            <View style={styles.subcontainer1}>
                <Image style={styles.Image} source={require('../Assets/logo.png')} />
            </View>
            <LinearGradient
                colors={['#015A4A', '#89CE9B', '#89CE9B']}
                locations={[0, 1, 0.32]}
                start={{ x: 1, y: 1 }} // Top left
                end={{ x: 1, y: 0 }}   // Bottom left
                style={styles.contentContainer}>

                <View style={styles.fromwrap}>

                    <Text style={{ fontSize: 25, fontWeight: '500', color: '#01595A', margin: 15, alignSelf: 'flex-start', marginHorizontal: 35 }}>REGISTRATION</Text>
                    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
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
                        <TextInput
                            style={styles.input}
                            placeholder="MOBILE"
                            placeholderTextColor="black"
                            keyboardType="numeric"
                            onChangeText={setMobile}
                            maxLength={10}
                        />
                        {mobileError ? <Text style={styles.error}>{mobileError}</Text> : null}
                        <View style={styles.inputwrap}>
                       
                            <View style={styles.input2}>
                            <Picker
                            selectedValue={gender}
                            style={styles.pickervalue}
                            onValueChange={(itemValue) => {
                                setGender(itemValue);
                            
                            }}
                          >
                            <Picker.Item label="GENDER" value="" />
                            <Picker.Item label="FEMALE" value="FEMALE" />
                            <Picker.Item label="MALE" value="MALE" />
                            <Picker.Item label="OTHER" value="OTHER" />
                          </Picker></View>
                           
                            <TouchableOpacity style={styles.input2} onPress={showDatepicker}><Text style={styles.dobbutton}>{dob ? dob.toLocaleDateString() : 'DOB'}</Text></TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    value={dob || new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                    maximumDate={new Date()} // Optional: Prevent selecting a future date
                                />
                            )}
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
                        <TextInput
                            style={styles.input}
                            placeholder="PASSWORD"
                            placeholderTextColor="black"
                            onChangeText={setpassword}
                            keyboardType='visible-password'
                        />
                        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
                        <TextInput
                            style={styles.input}
                            placeholder="CONFIRM PASSWORD"
                            placeholderTextColor="black"
                            onChangeText={setconfirmpassword}
                            keyboardType='visible-password'


                        />
                        {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
                        <TouchableOpacity style={styles.button} onPress={handleRegistration} >
                            <Text style={styles.buttonText} >SUBMIT </Text>
                        </TouchableOpacity>
                        <View style={styles.regiline}><Text style={{ color: "#ffff" }}> Already have an account? <Text style={{ fontWeight: 'bold', color: "orange" }} onPress={() => navigation.navigate('Login')}>Login</Text></Text></View>
                    </ScrollView>
                </View>
                <Text style={{ fontSize: 15, fontWeight: '500', color: '#ffff', alignSelf: 'flex-end', marginHorizontal: 25, marginBottom: 20 }} onPress={skipregi}>SKIP FOR NOW</Text>
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
        alignSelf: 'center',
        // marginRight: 25
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
        // alignItems: 'center',
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
    regiline: {
        margin: 5

    },
    pickervalue:{
        color:'#000',
        // fontSize:20,
        bottom:5
        
    },
    dobbutton:{
        fontSize: 16,
        color:'#000',
        fontWeight: '400',
        // alignSelf:'center',
        padding:10
    }
})
export default Regifrom


