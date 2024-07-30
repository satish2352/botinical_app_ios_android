


// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
// import config from '../../config/config';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

// const Contactus = ({ route }) => {
//     const data = route.params;
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');
//     const [message, setMessage] = useState('');
//     const [nameError, setNameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [addressError, setAddressError] = useState('');
//     const [messageError, setMessageError] = useState('');
//     const [contactDetails, setContactDetails] = useState({});
//     const { SelectedLanguage1 } = globalvariavle();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = await AsyncStorage.getItem('token');
//                 const response = await axios.post(
//                     `${config.API_URL}auth/get-contact-information`,
//                     { language: SelectedLanguage1 },
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//                 setContactDetails(response.data.data[0]);
//             } catch (error) {
//                 console.error('Error fetching contact information:', error);
//             }
//         };
//         fetchData();
//         return () => {
          
//             console.log('Component will unmount');
//         };
//     }, []);

//     const handleRegistration = async () => {
//         try {
//             // Validate form fields
//             let valid = true;
    
//             if (!name.trim()) {
//                 setNameError('Name is required');
//                 valid = false;
//             } else {
//                 setNameError('');
//             }
    
//             if (!email.trim()) {
//                 setEmailError('Email is required');
//                 valid = false;
//             } else if (!validateEmail(email.trim())) {
//                 setEmailError('Invalid email format');
//                 valid = false;
//             } else {
//                 setEmailError('');
//             }
    
//             if (!address.trim()) {
//                 setAddressError('Address is required');
//                 valid = false;
//             } else {
//                 setAddressError('');
//             }
    
//             if (!message.trim()) {
//                 setMessageError('Message is required');
//                 valid = false;
//             } else {
//                 setMessageError('');
//             }
    
//             // Check if form is valid
//             if (valid) {
//                 const token = await AsyncStorage.getItem('token');
//                 const response = await axios.post(
//                     `${config.API_URL}auth/add-contactus-form`,
//                     {
//                         full_name: name,
//                         email,
//                         address,
//                         message,
//                     },
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
    
//                 Alert.alert('Registration successful:', response.data.message);
//                 // Clear form inputs on successful submission
//                 setName('');
//                 setEmail('');
//                 setAddress('');
//                 setMessage('');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             Alert.alert('Error', 'Failed to register. Please try again later.');
//         }
//     };
    
//     const validateEmail = (email) => {
//         // Email validation regex
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     }

//     return (
//         <View style={styles.mainContainer}>
//             <View>
//                 <View style={styles.bgImage}>
//                     <Image style={styles.image} source={require('../Assets/contactus/contact.png')} />
//                 </View>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text style={styles.location}>Location<Text style={{ fontSize: 14, fontWeight: 'normal' }}>{contactDetails.address}</Text></Text>
//                 <Text style={styles.location}>Phone{'\n'}
//                     <Text style={{ fontSize: 14, fontWeight: 'normal' }}>
//                         Assit Director: {contactDetails.director_number} {'\n'}
//                         Estate Officer: {contactDetails.officer_number}
//                     </Text>
//                 </Text>
//                 <Text style={styles.location}>Email{'\n'}
//                     <Text style={{ fontSize: 14, fontWeight: 'normal' }}>{contactDetails.email}</Text>
//                 </Text>
//             </View>
//             <View style={styles.contactCardWrap}>
//                 <View style={styles.formWrap}>
//                     <Text style={styles.formTitle}>CONTACT US</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="NAME"
//                         placeholderTextColor="black"
//                         onChangeText={setName}
//                         value={name}
//                     />
//                     {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
//                     <TextInput
//                         style={styles.input}
//                         placeholder="EMAIL"
//                         placeholderTextColor="black"
//                         onChangeText={setEmail}
//                         value={email}
//                     />
//                     {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
//                     <TextInput
//                         style={styles.input}
//                         placeholder="ADDRESS"
//                         placeholderTextColor="black"
//                         onChangeText={setAddress}
//                         value={address}
//                     />
//                     {addressError ? <Text style={styles.error}>{addressError}</Text> : null}
//                     <TextInput
//                         style={[styles.input, { height: 80 }]}
//                         placeholder="MESSAGE"
//                         placeholderTextColor="black"
//                         multiline={true}
//                         textAlignVertical="top"
//                         onChangeText={setMessage}
//                         value={message}
//                     />
//                     {messageError ? <Text style={styles.error}>{messageError}</Text> : null}
//                     <TouchableOpacity style={styles.button} onPress={handleRegistration}>
//                         <Text style={styles.buttonText}>SEND</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//     },
//     bgImage: {},
//     image: {
//         height: '65%',
//         width: '100%',
//         resizeMode: 'center',
//         alignSelf: 'flex-start',
//     },
//     contentContainer: {
//         flex: 1,
//         padding: 15,
//         backgroundColor: '#01595A',
//     },
//     contactCardWrap: {
//         backgroundColor: 'white',
//         borderRadius: 30,
//         elevation: 20,
//         shadowOpacity: 0.27,
//         shadowRadius: 4.65,
//         position: 'absolute',
//         width: '90%',
//         alignSelf: "center",
//         marginTop: 180,
//     },
//     formWrap: {
//         alignItems: 'center',
//         padding: 5,
//         flex: 1
//     },
//     formTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#000',
//         marginVertical: 10,
//         alignSelf: 'center',
//         marginHorizontal: 35,
//         fontFamily: 'Century Gothic'
//     },
//     input: {
//         width: '90%',
//         height: 40,
//         borderColor: '#477E56',
//         borderRadius: 25,
//         paddingHorizontal: 15,
//         marginBottom: 6,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//         elevation: 10,
//         padding: 4,
//         backgroundColor: '#E0FEE7',
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginVertical: 4,
//     },
//     button: {
//         width: '50%',
//         height: 45,
//         borderRadius: 40,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 2,
//         backgroundColor: '#01595A',
//         alignSelf: 'flex-end',
//         marginRight: 25,
//         margin: 10
//     },
//     buttonText: {
//         color: '#ffffff',
//         fontSize: 18,
//         fontWeight: '500',
//     },
//     location: {
//         fontSize: 20,
//         fontWeight: '700',
//         color: '#ffff',
//         marginBottom:22,
//         marginHorizontal: 35,
//         fontFamily: 'Century Gothic',
//     },
//     error: {
//         color: 'red',
//         marginBottom: 5,
//         marginHorizontal: 29
//     },
// });

// export default Contactus;


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import config from '../../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

const Contactus = ({ route }) => {
    const data = route.params;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [contactDetails, setContactDetails] = useState([]);
    const { SelectedLanguage1 } = globalvariavle();

    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.post(
                    `${config.API_URL}auth/get-contact-information`,
                    { language: SelectedLanguage1 },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setContactDetails(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching contact information:', error);
            }
        };
        fetchContactDetails();
    }, [SelectedLanguage1]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!validateEmail(formData.email.trim())) {
            errors.email = 'Invalid email format';
        }
        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.message.trim()) errors.message = 'Message is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegistration = async () => {
        if (validateForm()) {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.post(
                    `${config.API_URL}auth/add-contactus-form`,
                    {
                        full_name: formData.name,
                        email: formData.email,
                        address: formData.address,
                        message: formData.message,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                Alert.alert('Registration successful:', response.data.message);
                setFormData({ name: '', email: '', address: '', message: '' });
            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to register. Please try again later.');
            }
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View>
                <View style={styles.bgImage}>
                    <Image style={styles.image} source={require('../Assets/contactus/contact.png')} />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.location}>{SelectedLanguage1 === 'english' ? 'Location' : 'స్థానం'}<Text style={styles.normalText}>{'\n'}{contactDetails.address}</Text></Text>
                <Text style={styles.location}>{SelectedLanguage1 === 'english' ? 'Phone' : 'ఫోన్'}{'\n'}
                    <Text style={styles.normalText}>
                    {SelectedLanguage1 === 'english' ? 'Assit Director' : 'అసిస్టెంట్ డైరెక్టర్'}: {contactDetails.director_number} {'\n'}
                    {SelectedLanguage1 === 'english' ? 'Estate Officer' : 'ఎస్టేట్ అధికారి'}: {contactDetails.officer_number}
                    </Text>
                </Text>
                <Text style={styles.location}>{SelectedLanguage1 === 'english' ? 'Email' : 'ఇమెయిల్'}{'\n'}
                    <Text style={styles.normalText}>{contactDetails.email}</Text>
                </Text>
            </View>
            <View style={styles.contactCardWrap}>
                <View style={styles.formWrap}>
                    <Text style={styles.formTitle}>{SelectedLanguage1 === 'english' ? 'CONTACT US' : 'మమ్మల్ని సంప్రదించండి'}</Text>
                    {['name', 'email', 'address', 'message'].map((field, index) => (
                        <React.Fragment key={index}>
                            <TextInput
                                style={[styles.input, field === 'message' && { height: 80 }]}
                                placeholder={field.toUpperCase()}
                                placeholderTextColor="black"
                                onChangeText={(value) => setFormData({ ...formData, [field]: value })}
                                value={formData[field]}
                                multiline={field === 'message'}
                                textAlignVertical={field === 'message' ? "top" : "center"}
                            />
                            {formErrors[field] && <Text style={styles.error}>{formErrors[field]}</Text>}
                        </React.Fragment>
                    ))}
                    <TouchableOpacity style={styles.button} onPress={handleRegistration}>
                        <Text style={styles.buttonText}>SEND</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    bgImage: {},
    image: {
        height: '65%',
        width: '100%',
        resizeMode: 'center',
        alignSelf: 'flex-start',
        left:15
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#01595A',
        justifyContent:'flex-end'
       
    },
    contactCardWrap: {
        backgroundColor: 'white',
        borderRadius: 30,
        elevation: 20,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        position: 'absolute',
        width: '90%',
        alignSelf: "center",
        marginTop: 160,
        flex:1
    },
    formWrap: {
        alignItems: 'center',
        padding: 5,
        flex: 1
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 10,
        alignSelf: 'center',
        marginHorizontal: 35,
        fontFamily: 'Century Gothic'
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: '#477E56',
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
        fontSize: 16,
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
        marginBottom: 22,
        marginHorizontal: 35,
        fontFamily: 'Century Gothic',
    },
    normalText: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginHorizontal: 29
    },
});

export default Contactus;
