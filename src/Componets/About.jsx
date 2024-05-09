





import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// The main component

const cardData = [
    {
        image: require('../Assets/aboutimage/i2.png'),
        text: "Electronic gate has been provided to maintain transparency on issue of entry passes",
        headname: "Herbal/Medicinal Garden"
    },
    {
        image: require('../Assets/aboutimage/i3.png'),
        text: "Educating the visitors to see the Zoo as scientific institution engaged in welfare and conservation of wildlife. Also to view the Zoo and knowledge centers for wildlife education, maintaining healthy ambience and pollution free environment.",
        headname: "Butterfly Park"
    },
    {
        image: require('../Assets/aboutimage/i2.png'),
        text: "Electronic gate has been provided to maintain transparency on issue of entry passes",
        headname: "Herbal/Medicinal Garden"
    },
    {
        image: require('../Assets/aboutimage/i3.png'),
        text: "Educating the visitors to see the Zoo as scientific institution engaged in welfare and conservation of wildlife. Also to view the Zoo and knowledge centers for wildlife education, maintaining healthy ambience and pollution free environment.",
        headname: "Butterfly Park"
    },
];
const About = () => {
// const [cardData,setaboutData]=useState([]);
//     useEffect(() => {
        
//         const fetchData = async () => {
//             const token = await AsyncStorage.getItem('token');
           
//             try {
              
//                 const response = await axios.post(`${config.API_URL}auth/get-aboutus-list`, {},{
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
                
//                 setaboutData(response.data.data);
               
//             } catch (error) {
//                 console.error('Error fetching about data:', error);
//             }
//         };
//         fetchData();
//     }, []);

    return (
        <LinearGradient
            colors={['rgba(83, 174, 105, 0.39)', '#FBFFFC']}
            style={styles.container}
            start={{ x: 1.0, y: 1.0 }}
            end={{ x: 0.0, y: 0.0 }}
        >
            <ScrollView style={{ marginTop: 40 }}>
                <Text style={styles.header}>ABOUT US</Text>
                <View style={styles.imageView}>
                    <Image
                        source={require('../Assets/aboutimage/i1.png')} // Replace with your image source
                        style={styles.image1}
                    />
                    <Text style={styles.text}>
                        Botanical Garden of Hyderabad is also one of the interesting sightseeing places in Hyderabad offering a refreshing setting and rich flora. Having been developed by the Forest Departments, Botanical Garden is situated in Madhapur near the Hi-tech City which is almost 16 km away from centre of the city.
                    </Text>
                </View>
                {
                    cardData.map((item, index) => {

                        
                            if(index % 2 === 0 ){
                           
                            return(
                            <View>
                                <View style={styles.cardwrap}>

                                    <View style={styles.cardhead}>
                                        <Image
                                            source={item.image} // Replace with your image source
                                            style={styles.image2}
                                        />
                                    </View>
                                    <View style={styles.cardtext}>
                                        <Text style={styles.text2}>{item.text}</Text>
                                    </View>

                                </View>
                                <Text style={styles.header2}>{item.headname}</Text>
                            </View>
                            )}
                            else{
                            return(
                            <View>
                                <View style={styles.cardwrap}>

                                    
                                    <View style={styles.cardtext}>
                                        <Text style={styles.text2}>{item.text}</Text>
                                    </View>
                                    <View style={styles.cardhead1}>
                                        <Image
                                            source={item.image} // Replace with your image source
                                            style={styles.image3}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.header3}>{item.headname}</Text></View>
                            )
                        }
                   

                    })
                }


            </ScrollView>
        </LinearGradient>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },

    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
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
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'justify',
        padding: 10,
        color: "#000",
    },
    text2: {
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'justify',
        color: '#000'
    },
    imageView: {
        alignItems: 'center',
        borderRadius: 20
    },
    textView: {
        flexDirection: 'row', // Arrange items side by side
        alignItems: 'center', // Align items vertically
        marginBottom: 20,
        flexWrap: 'wrap',
        backgroundColor: '#ffff',
        borderRadius: 25

    },
    image2: {
        width: "100%",
        height: 160,
        resizeMode: 'cover',

        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    image3: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',

        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
     
    },
    image1: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20

    },

    cardwrap: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 6,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
        marginHorizontal: 10,



    },
    cardhead: {
        width: "50%",

        height: '100%',
        // padding: 15,

        alignItems: 'center'
    },
    cardhead1: {
        width: "50%",

        height: '100%',
        // padding: 15,

        alignItems: 'flex-end'
    },
    cardtext: {
        width: "50%",
        alignItems: "center",
        padding: 10
    }
});

export default About;

