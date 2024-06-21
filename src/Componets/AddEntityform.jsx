import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Langchange from './Langchange';
import LinearGradient from 'react-native-linear-gradient';
import { globalvariavle, useMyData } from '../../Navigtors/globlevariable/MyContext';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';


const AddEntityform = ({ navigation, route }) => {
    const item = route.params;
    const { useerid, SelectedLanguage1 } = globalvariavle();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        address: '',
        occupation: '',
    });

    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        address: '',
        occupation: '',
    });

    const handleInputChange = (field, value) => {
        setFormState(prevState => ({ ...prevState, [field]: value }));
    };

    const handleFileSelection = (field) => {
        launchImageLibrary({
            mediaType: field === 'audio' ? 'audio' : field === 'video' ? 'video' : 'photo',
        }, (response) => {
            if (response.didCancel) {
                console.warn('User cancelled file picker');
            } else if (response.errorCode) {
                console.warn('FilePicker Error: ', response.errorMessage);
            } else {
                const file = response.assets[0];
                handleInputChange(field, file);
            }
        });
    };

    const handleRegistration = async () => {
        Alert.alert("Data Successfully Added", 'Done')
        // // Validate fields
        // let valid = true;
        // let errors = {};

        // if (!formState.name.trim()) {
        //     errors.name = 'Name is required';
        //     valid = false;
        // }

        // if (!formState.email.trim()) {
        //     errors.email = 'Email is required';
        //     valid = false;
        // } else if (!validateEmail(formState.email.trim())) {
        //     errors.email = 'Invalid email format';
        //     valid = false;
        // }

        // if (!formState.mobile.trim()) {
        //     errors.mobile = 'Please fill in your mobile number';
        //     valid = false;
        // } else if (!/^\d{10}$/.test(formState.mobile)) {
        //     errors.mobile = 'Please enter a valid 10-digit mobile number';
        //     valid = false;
        // }

        // if (!formState.gender.trim()) {
        //     errors.gender = 'Gender is required';
        //     valid = false;
        // }

        // if (!formState.dob.trim()) {
        //     errors.dob = 'Date of Birth is required';
        //     valid = false;
        // } else if (!validateDate(formState.dob.trim())) {
        //     errors.dob = 'format (DD/MM/YYYY)';
        //     valid = false;
        // }

        // if (!formState.address.trim()) {
        //     errors.address = 'Address is required';
        //     valid = false;
        // }

        // if (!formState.occupation.trim()) {
        //     errors.occupation = 'Occupation is required';
        //     valid = false;
        // }

        // setErrorState(errors);

        // if (!valid) {
        //     return;
        // }

        // const token = await AsyncStorage.getItem('token');
        // axios.post(`${config.API_URL}auth/update-user-form?id=${useerid}`, {
        //     full_name: formState.name,
        //     email: formState.email,
        //     gender: formState.gender,
        //     date_of_birth: formState.dob,
        //     address: formState.address,
        //     occupation: formState.occupation,
        //     language: SelectedLanguage1,
        // }, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        //     .then(response => {
        //         console.log('Registration successful:', response.data.message);
        //         Alert.alert('Registration successful:', response.data.message);
        //         navigation.navigate('Home');
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         Alert.alert('Error', 'Failed to register. Please try again later.');
        //     });
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validateDate = (date) => {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/;
        return regex.test(date);
    }

    return (
        <LinearGradient
            colors={['#015A4A', '#89CE9B', '#89CE9B']}
            locations={[0, 1, 0.32]}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.contentContainer}
        >
            <ScrollView >
                <View style={styles.fromwrap}>
                    <Text style={{ fontSize: 25, fontWeight: '500', color: '#01595A', margin: 10, alignSelf: 'flex-start', marginHorizontal: 30 }}>ADD DETAILS</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="TREE NAME"
                        placeholderTextColor="black"
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="नाम"
                        placeholderTextColor="black"
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                    {errorState.name ? <Text style={styles.error}>{errorState.name}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="BOTANICAL NAME"
                        placeholderTextColor="black"
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="वानस्पतिक नाम"
                        placeholderTextColor="black"
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    {errorState.email ? <Text style={styles.error}>{errorState.email}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="COMMON NAME"
                        placeholderTextColor="black"

                        onChangeText={(value) => handleInputChange('mobile', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="साधारण नाम"
                        placeholderTextColor="black"

                        onChangeText={(value) => handleInputChange('mobile', value)}
                    />
                    {errorState.mobile ? <Text style={styles.error}>{errorState.mobile}</Text> : null}
                    <View style={styles.inputwrap}>
                        <TextInput
                            style={styles.input2}
                            placeholder="LATITUDE"
                            placeholderTextColor="black"
                            onChangeText={(value) => handleInputChange('gender', value)}
                        />
                        <TextInput
                            style={styles.input2}
                            placeholder="LONGITUDE "
                            placeholderTextColor="black"
                            onChangeText={(value) => handleInputChange('dob', value)}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            {errorState.gender ? <Text style={styles.error}>{errorState.gender}</Text> : null}
                            {errorState.dob ? <Text style={styles.error}>{errorState.dob}</Text> : null}
                        </View>
                    </View>
                    <TextInput
                        style={[styles.input, styles.textArea]} // Combine styles for input and textArea
                        placeholder="DESCRIPTION"
                        placeholderTextColor="black"
                        onChangeText={(value) => handleInputChange('address', value)}
                        multiline={true}
                        numberOfLines={4} // Adjust the number of lines as needed
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]} // Combine styles for input and textArea
                        placeholder="वर्णन"
                        placeholderTextColor="black"
                        onChangeText={(value) => handleInputChange('address', value)}
                        multiline={true}
                        numberOfLines={4} // Adjust the number of lines as needed
                    />
                    {errorState.address ? <Text style={styles.error}>{errorState.address}</Text> : null}
                    <View style={styles.inputwrap}>


                        <TouchableOpacity style={styles.buttonAUDIOVIDEO} onPress={() => handleFileSelection('audio')}>
                            <Text style={styles.buttonText1}>SELECT AUDIO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAUDIOVIDEO} onPress={() => handleFileSelection('audio')}>
                            <Text style={styles.buttonText1}>ऑडियो अपलोड</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAUDIOVIDEO} onPress={() => handleFileSelection('video')}>
                            <Text style={styles.buttonText1}>SELECT VIDEO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAUDIOVIDEO} onPress={() => handleFileSelection('video')}>
                            <Text style={styles.buttonText1}>वीडियो अपलोड</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            {errorState.gender ? <Text style={styles.error}>{errorState.gender}</Text> : null}
                            {errorState.dob ? <Text style={styles.error}>{errorState.dob}</Text> : null}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.buttonAUDIOVIDEO} onPress={() => handleFileSelection('photo')}>
                        <Text style={styles.buttonText1}>SELECT IMAGE</Text>
                    </TouchableOpacity>
                    {errorState.occupation ? <Text style={styles.error}>{errorState.occupation}</Text> : null}
                    <TouchableOpacity style={styles.button} onPress={handleRegistration}>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    contentContainer: {
        flex: 1,
        justifyContent: "center"
    },
    input: {
        width: '90%',
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
        // marginVertical: 4,
        color: '#000'
    },
    input2: {
        width: '42%',
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
        width: '80%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        backgroundColor: '#01595A',
        // alignSelf: 'flex-end',
        // marginRight: 25
    },
    buttonAUDIOVIDEO: {
        width: '40%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
        backgroundColor: '#A0A0A0',
        // alignSelf: 'flex-end',
        // marginRight: 25,
        padding: 10
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    buttonText1: {
        color: 'black',
        fontSize: 15,
        // fontWeight: '500',
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
        marginVertical: 40




    },
    inputwrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems:"center"
        justifyContent: "center"

    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginHorizontal: 29
    },
    textArea: {
        height: 100, // Adjust the height as needed
        textAlignVertical: 'top', // Align text to the top of the input
    },
})
export default AddEntityform


