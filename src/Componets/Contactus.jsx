import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import config from '../../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
const Contactus = ({ route }) => {
    const data = route.params;
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [add,setadd]=useState('');
    const [mesage,setmessage]=useState('');
    const [contactdetails,setcontactdetails]=useState([]);
    const { SelectedLanguage1 } = globalvariavle();
   console.log(contactdetails);
   useEffect(()=>{
    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');

        try {

            const response = await axios.post(`${config.API_URL}auth/get-contact-information`,
                {
                    
                    language: SelectedLanguage1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            setcontactdetails(response.data.data[0]);
            console.log(response.data.data[0]);

        } catch (error) {
            console.error('Error fetching tree data:', error);
        }
    };
    fetchData();
   },[])
    const handleRegistration = async() => {
      
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        axios.post(`${config.API_URL}auth/add-contactus-form`, {
            full_name: name,
            email: email,
            address: add,
            message: mesage,
          
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Registration successful:', response.data.message);
          Alert.alert('Registration successful:', response.data.message);
          
        })
        .catch(error => {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to register. Please try again later.');
        });
    }
    return (
        <View
            style={styles.maincontainer}
        >
            <View >
                <View style={styles.bgImage}>
                    <Image style={styles.image} source={require('../Assets/contactus/contact.png')} />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.location}>location <Text style={{ fontSize: 14, fontWeight: 'normal' }}>{contactdetails.address}</Text></Text>
                <Text style={styles.location}>
                    Phone{'\n'}
                    <Text style={{ fontSize: 14, fontWeight: 'normal' }}>
                        Assit Director: {contactdetails.director_number} {'\n'}
                        Estate Officer: {contactdetails.officer_number}
                    </Text>
                </Text>
                <Text style={styles.location}>
                    Email{'\n'}
                    <Text style={{ fontSize: 14, fontWeight: 'normal' }}>
                        {contactdetails.email}
                    </Text>
                </Text>


            </View>
            <View style={styles.contactcardwrap}>
                <View style={styles.fromwrap}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 10, alignSelf: 'center', marginHorizontal: 35, fontFamily: 'Century Gothic' }}>CONTACT US</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="NAME"
                        placeholderTextColor="black"
                        onChangeText={setname}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="EMAIL"
                        placeholderTextColor="black"
                        onChangeText={setemail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="ADDRESS"
                        placeholderTextColor="black"
                        onChangeText={setadd}
                    />
                    <TextInput
                        style={[styles.input, { height: 80 }]} // Adjust the height for the MESSAGE input
                        placeholder="MESSAGE"
                        placeholderTextColor="black"
                        multiline={true}
                        textAlignVertical="top"
                        onChangeText={setmessage}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegistration}>
                        <Text style={styles.buttonText} >SEND</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        // backgroundColor: "#ffff",

    },
    bgImage: {
        // left: 20
    },
    image: {
        height: '65%',
        width: '100%',
        resizeMode: 'center',
        // marginVertical: 50,
        alignSelf: 'flex-start',
        
        
    },
    contentContainer: {
        flex: 1,
        // justifyContent: 'flex-end',
        padding: 15,
        backgroundColor: '#01595A',
    },

    contactcardwrap: {
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'flex-end',
        elevation: 20,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        position: 'absolute',
        width: '90%',
        alignSelf: "center",
        marginTop: 180,

    },
    fromwrap: {
        alignItems: 'center',
        padding: 5,
        flex: 1
    },

    input: {
        width: '90%',
        height: 40,
        borderColor: '#477E56',
        // borderWidth: 0.5,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        padding: 4,
        backgroundColor: '#E0FEE7',
        fontSize: 16, // Font size of the input text
        fontWeight: 'bold',
        marginVertical: 4,

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
        marginRight: 25,
        margin: 10
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    location: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffff',
        marginBottom:22,
        // alignSelf: 'flex-start',
        marginHorizontal: 35,
        fontFamily: 'Century Gothic',


    }
})
export default Contactus
