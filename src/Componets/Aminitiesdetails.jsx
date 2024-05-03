import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Aminitiesdetails = ({ route }) => {
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
                    <Text style={{ color: '#000',textAlign: 'justify' }} >{data.description}</Text>

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
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
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
        // justifyContent: 'flex-start',
        alignItems: 'center',
        padding:2

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
        top: 20,
        // position: "absolute",
        marginHorizontal: 13,





    },
    headtext: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        // margin: 20,
        marginVertical: 20
    },
    buttonview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20
    },


    subcontainer1: {
        flex: 1,
        alignItems: 'center',

    },
})
export default Aminitiesdetails
