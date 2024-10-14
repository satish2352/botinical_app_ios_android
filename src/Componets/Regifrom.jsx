import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Langchange from './Langchange';
import LinearGradient from 'react-native-linear-gradient';
import { globalvariavle, useMyData } from '../../Navigtors/globlevariable/MyContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation} from '@react-navigation/native';
const Regifrom = () => {
    const navigation = useNavigation();
    const { useerid } = globalvariavle();
    const [rolldata, setrolldata] = useState([]);
    const [rollvalue, setrollvalue] = useState(3);
console.log('value',rollvalue,'data',rolldata );

    
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

    useEffect(() => {
        // fetchData();
        return (() => { })
    }, [])
    // const fetchData = async () => {
    //     const token = await AsyncStorage.getItem('token');
    //     try {
    //         const response = await axios.post(`${config.API_URL}get-role`,
    //             {
    //                 // tree_plant_id: id,
    //                 language: SelectedLanguage1,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });
    //         setrolldata(response.data.data);
    //     } catch (error) {
    //         console.error('Error fetching tree data:', error);
    //     }
    // };

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
        if (!dob) {
            setDobError('Date of Birth is required');
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
        } else if(password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            valid = false;
        }
        else {
            setPasswordError('');
        }

        // Confirm Password validation
        if (!confirmpassword.trim()) {
            setConfirmPasswordError('Confirm Password is required');
            valid = false;
        } else if (password !== confirmpassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        }else if(confirmpassword.length < 8) {
            setConfirmPasswordError('Password must be at least 8 characters long');
            valid = false;
        } 
        else {
            setConfirmPasswordError('');
        }

        if (!valid) {
            return;
        }

        const token = await AsyncStorage.getItem('token');
        console.log(token);
        axios.post(`${config.API_URL}user-regs`, {
            full_name: name,
            email: email,
            mobile_number: mobile,
            gender: gender,
            date_of_birth: dob,
            address: address,
            occupation: occupation,
            language: SelectedLanguage1,
            password: confirmpassword,
            // role_id:rollvalue
            role_id:3
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {
                if (response.data.status === 'false') {
                    Alert.alert('Registration Failed', response.data.message);
                } else {
                    Alert.alert('Registration Successful', response.data.message);
                    // Optionally navigate to the home screen after successful registration
                    navigation.navigate('Login');
                }
            })
            .catch(error => {
                console.error('Registration Error:', error);

                let errorMessage = 'An unexpected error occurred. Please try again later.';

                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error('Server Response:', error.response.data);
                    errorMessage = error.response.data.message || errorMessage;
                } else if (error.request) {
                    // Request was made but no response received
                    console.error('Request Error:', error.request);
                    errorMessage = 'No response from server. Please check your internet connection.';
                } else {
                    // Something else happened in setting up the request
                    console.error('Error:', error.message);
                }

                Alert.alert('Registration Error', errorMessage);
            });

    }

    const showDatepicker = () => {
        setShow(true);
    };
    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios'); // Keep picker open for iOS, close it for Android

        if (selectedDate) {
            setDob(selectedDate); // Set selected date if it's available
        }
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
    const formatDate = (date) => {
        if (!date || !(date instanceof Date)) return ''; // Ensure date is valid
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    return (
        <ScrollView style={styles.maincontainer}>
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
                       {/*  <View style={styles.picker}>
                            <Picker
                                selectedValue={rollvalue}
                                style={styles.pickervalue}
                                onValueChange={(itemValue) => {
                                    setrollvalue(itemValue);

                                }}
                            >
                                <Picker.Item label="SELECT ROLE" value={rollvalue} />
                                {rolldata.map((data, index) => (
                                    <Picker.Item key={index} label={data.role_name} value={data.id} />
                                ))}
                            </Picker></View>
                            */}

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

                            <TouchableOpacity style={styles.input2} onPress={showDatepicker}><Text style={styles.dobbutton}>{dob ? formatDate(dob) : 'DOB'}</Text></TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    value={dob || new Date()} // Use current date if dob is not set
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
        </ScrollView>
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

    dobbutton: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400',
        // alignSelf:'center',
        padding: 10
    },
    pickervalue: {
        color: '#000',
        // fontSize:20,
        bottom: 5

    },
    picker: {

        width: '85%',
        height: 45,
        // borderWidth: 0.5,
        borderRadius: 25,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        backgroundColor: '#ffff',
       


    },
})
export default Regifrom


