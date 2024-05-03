import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Langchange from './Langchange';
import LinearGradient from 'react-native-linear-gradient';
const Registration = ({ navigation }) => {
    const handlelogin = () => {
        navigation.navigate('Regifrom');
    }
    const skipregi = () => {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.maincontainer}>
            <View style={styles.subcontainer1}>

                <Image style={styles.Image} source={require('../Assets/logowithtext.png')} />

            </View>
            <LinearGradient
                colors={['#015A4A', '#89CE9B', '#89CE9B']}
                locations={[0, 1, 0.32]}
                start={{ x: 1, y: 1 }} // Top left
                end={{ x: 1, y: 0 }}   // Bottom left
                style={styles.contentContainer}>
                <View style={styles.fromwrap}>
                    <View style={{ alignItems: 'center', bottom: 100, left: 20 }}><Image style={styles.Image2} source={require('../Assets/regiimage.png')} /></View>
                    
                    <View style={{ alignItems: 'center', bottom: 150 }}>
                    <Text style={{fontSize:16,fontWeight:'500',color:'black',margin:10}}>Continue For Registration</Text>
                        <TouchableOpacity style={styles.button} onPress={handlelogin} >
                            <Text style={styles.buttonText}>REGISTER </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:15,fontWeight:'500',color:'#ffff',alignSelf:'flex-end',marginHorizontal:25,marginVertical:40}} onPress={skipregi}>SKIP FOR NOW</Text>
                        </View>

                </View>



            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,

    },
  
    Image: {
        height: hp(40),
        width: '100%',
        resizeMode: 'center',
        // marginVertical: 50

    },
    Image2: {
        height: 310,
        width: 300,
    },
    subcontainer1: {
        flex: 1,
        alignItems: "center",
       
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        // justifyContent: 'flex-end',
        
            elevation: 5,
        
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
        // position:"absolute"

    },
    inputwrap: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})
export default Registration
