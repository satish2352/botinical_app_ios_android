import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Langchange from './Langchange';
import LinearGradient from 'react-native-linear-gradient';


import Icon from 'react-native-vector-icons/MaterialIcons';
const PlatsDetails = ({ route }) => {
    const data = route.params;
    return (
        <View style={styles.maincontainer}>
            <View style={styles.subcontainer1}>
                <View style={styles.bgImage}
                >
                    
                    <Image style={styles.image} source={data.image} />
                </View>
            </View>
            <View

                style={styles.contentContainer}>

                <View style={styles.headingwrap}>
                    <Text style={styles.headtext}>{data.title}</Text>
                    <Text style={{ color: '#000',textAlign: 'justify' }}>{data.description}</Text>
                    <View style={styles.headtext2wrap}>
                        <Text style={styles.headtext2}>BOTNICAL NAME-<Text style={{ color: '#000', }}>{data.title}</Text></Text>
                        <Text style={styles.headtext2}>COMMON NAME-<Text style={{ color: '#000', }}>{data.title}</Text></Text>
                    </View>
                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.button} >

                            <Text style={styles.buttonText}>Audio</Text>
                            <Icon name="multitrack-audio" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>Video</Text>
                            <Icon name="ondemand-video" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        backgroundColor: "#ffff"
    },
    image: {
        height: '90%',
        width: '100%',
        resizeMode: 'contain',
        // marginVertical: 50

    },
    subcontainer1: {
        flex: 1,
        // alignItems: "center"
    },
    contentContainer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 20, // Add elevation for Android shadow

        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
         padding:10
    },

    button: {
        width: '40%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#01595A',
        margin: 10,

    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
        margin: 10
    },
    headingwrap: {
        alignItems: 'flex-start',
        top: 30,
        // position: "absolute",
        marginHorizontal: 15,




    },
    headtext: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        // margin: 15,
       paddingVertical:10

    },
    headtext2: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        padding: 5,
        color: '#01595A'

    },
    buttonview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20,
        alignSelf:'center'
    },


    subcontainer1: {
        flex: 1,
        alignItems: 'center',

    },
    headtext2wrap: {
        marginVertical: 10
    }
})
export default PlatsDetails
