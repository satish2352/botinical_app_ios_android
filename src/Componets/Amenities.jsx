import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// The main component
const Amenities = ({ navigation }) => {
    const handlelogin = (data) => {
        navigation.navigate('Aminitiesdetails', data);
    }
    return (
        <LinearGradient
            colors={['rgba(83, 174, 105, 0.39)', '#FBFFFC']}
            style={styles.container}
            start={{ x: 1.0, y: 1.0 }}
            end={{ x: 0.0, y: 0.0 }}
        >
            <ScrollView style={{ marginTop: 40 }}>
                <Text style={styles.header}>AMENITIES</Text>
                <TouchableOpacity style={styles.cardwrap} onPress={() => handlelogin({
                    title: "Nature's Hub Food Court",
                    description: "The food court is placed in serene greenery. The ambience was awesome. The menu covers all the sessions with a limited number of offerings.",
                    image: require('../Assets/amenities/11.png')
                })}>
                    <View style={styles.cardhead}>
                        <Image
                            source={require('../Assets/amenities/1.png')} // Replace with your image source
                            style={styles.image2}
                        />
                    </View>
                    <View style={styles.cardtext}>
                        <Text style={styles.text}>Nature's Hub Food Court</Text>
                        <Text style={styles.text2}>The food court is placed in serene greenery . The ambience was awesome . The menu covers all the session with limited number of offerings</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardwrap2} onPress={() => handlelogin({
                    title: "Open Gym",
                    description: "Botanical Gardens in Gachibowli offers horticulture, picnic spots, rock formations, and an outdoor gym.",
                    image: require('../Assets/amenities/11.png')
                })}>
                    <View style={styles.cardtext}>
                        <Text style={styles.text}>Open Gym</Text>
                        <Text style={[styles.text2, { textAlign: 'left' }]}>Botanical Gardens in Gachibowli offers horticulture, picnic spots, rock formations, and an outdoor gym.</Text>
                    </View>
                    <View style={styles.cardhead}>
                        <Image
                            source={require('../Assets/amenities/2.png')} // Replace with your image source
                            style={styles.image3}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardwrap} onPress={() => handlelogin({
                    title: "Adventure Arena",
                    description: "Feakouts Adventure Zone in Kondapur's Botanical Garden has amazing outdoor activities like zip lining, archery, bull rides, zorbing, etc.",
                    image: require('../Assets/amenities/11.png')
                })} >
                    <View style={styles.cardhead}>
                        <Image
                            source={require('../Assets/amenities/3.png')} // Replace with your image source
                            style={styles.image2}
                        />
                    </View>
                    <View style={styles.cardtext}>
                        <Text style={styles.text}>Adventure Arena</Text>
                        <Text style={styles.text2}>Feakouts Adventure Zone in Kondapur's Botanical Garden has amazing outdoor activities like zip lining, archery, bull rides, zorbing, etc.</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardwrap2} onPress={() => handlelogin({
                    title: "Robust Fitness Center",
                    description: "A social, recreational and health facility, fitness centre is equipped with carry out exercises in Botanical garden.",
                    image: require('../Assets/amenities/11.png')
                })}>
                    <View style={styles.cardtext}>
                        <Text style={styles.text}>Robust Fitness Center</Text>
                        <Text style={[styles.text2, { textAlign: 'left' }]}>A social, recreational and health facility, fitness centre is equipped with carry out exercises in Botanical garden.</Text>
                    </View>
                    <View style={styles.cardhead}>
                        <Image
                            source={require('../Assets/amenities/4.png')} // Replace with your image source
                            style={styles.image3}
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 7,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf: 'center',
        color: '#000000',
    },
    header2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        // alignSelf: 'center',
        color: '#000000',
        marginHorizontal: 15
    },
    header3: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-end',
        color: '#000000',
        marginHorizontal: 15
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'justify',
        color: "#01595A",
        fontWeight: '500',
    },
    text2: {
        fontSize: 13,
        color: '#000',
        textAlign: 'right'
    },
    image2: {
        width: 165,
        height: 155,
        resizeMode: 'cover',
        alignSelf: 'flex-start',
        borderRadius: 70,
        right: 2
    },
    image3: {
        width: 165,
        height: 155,
        resizeMode: 'cover',
        alignSelf: 'flex-end',
        // borderRadius: 70,
        left: 3
    },
    cardwrap: {
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 6,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginHorizontal: 10,
        borderTopLeftRadius: 110,
        borderBottomLeftRadius: 120,
    },
    cardwrap2: {
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 6,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginHorizontal: 10,
        borderTopRightRadius: 80,
        borderBottomRightRadius: 80
    },
    cardhead: {
        // flex:1,
        width: "42%",
        height: '100%',
        // padding: 15,
        borderRadius: 50,
        // alignItems: 'center'
    },
    cardtext: {
        width: "60%",
        // alignItems: "center",
        paddingHorizontal: 15
        // marginRight:5
    }
});

export default Amenities;

