import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'

const Contactus = ({ route }) => {
    const data = route.params;
    return (
        <View
            style={styles.maincontainer}
        >
            <View style={styles.subcontainer1}>
                <View style={styles.bgImage}>
                    <Image style={styles.image} source={require('../Assets/contactus/contact.png')} />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.location}>location <Text style={{ fontSize: 14, fontWeight: 'normal' }}>Kothaguda Reserve Forest, Gachibowli Road, Near Hi-tec City, Kondapur, Hyderabad, Telangana 500032</Text></Text>
                <Text style={styles.location}>
                    Phone{'\n'}
                    <Text style={{ fontSize: 14, fontWeight: 'normal' }}>
                        Assit Director: 8008301605 {'\n'}
                        Estate Officer: 9490664849
                    </Text>
                </Text>
                <Text style={styles.location}>
                    Email{'\n'}
                    <Text style={{ fontSize: 14, fontWeight: 'normal' }}>
                    adoptsfdc@gmail.com 
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
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="EMAIL"
                        placeholderTextColor="black"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="ADDRESS"
                        placeholderTextColor="black"
                    />
                    <TextInput
                        style={[styles.input, { height: 80 }]} // Adjust the height for the MESSAGE input
                        placeholder="MESSAGE"
                        placeholderTextColor="black"
                        multiline={true}
                        textAlignVertical="top"
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>SEND</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: "#ffff",

    },
    bgImage: {
        left: 20
    },
    image: {
        height: '75%',
        width: '100%',
        resizeMode: 'center',
        // marginVertical: 50,
        alignSelf: 'flex-start',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: '#01595A',
    },
    subcontainer1: {
        flex: 1,
    },
    contactcardwrap: {
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'flex-start',
        elevation: 20,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        position: 'absolute',
        width: '90%',
        alignSelf: "center",
        top: 180
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
        marginVertical: 10,
        // alignSelf: 'flex-start',
        marginHorizontal: 35,
        fontFamily: 'Century Gothic',


    }
})
export default Contactus
