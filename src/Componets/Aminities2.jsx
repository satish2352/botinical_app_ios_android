
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// const Aminities2 = ({ navigation }) => {
//     const carouselData = [
//         { image: require('../Assets/butter.png') },
//         { image: require('../Assets/tiger.png') },
//         { image: require('../Assets/butter.png') },
//     ];

//     const [activeIndex, setActiveIndex] = useState(0);
//     const [searchText, setSearchText] = useState('');

//     const renderItem = ({ item, index }) => {
//         return (
//             <View style={styles.carouselItem}>
//                 <Image style={styles.carouselImage} source={item.image} />
//             </View>
//         );
//     };

//     return (
//         <View style={styles.maincontainer}>
//             <View style={styles.subcontainer1}>

//                 <Image style={styles.image} source={require('../Assets/a2.png')} />

//             </View>
//             <View style={styles.contentContainer}>
//                 <Text style={styles.headtext}>AMENITIES</Text>

//                 <View style={styles.buttonview}>
//                     <TouchableOpacity style={styles.button} >
//                         <Text style={styles.buttonText}>Washroom</Text>
//                         <FontAwesome5 name="restroom" size={20} color="#fff" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button} >
//                         <Text style={styles.buttonText}>Water</Text>
//                         <Icon name="water-drop" size={24} color="#fff" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button} >
//                     <Text style={styles.buttonText}>Canteen</Text>
//                     <Icon name="fastfood" size={24} color="#fff" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} >
//                 <Text style={styles.buttonText}>Guest House</Text>
//                 <Icon name="house" size={24} color="#fff" />
//             </TouchableOpacity>
//                 </View>
//             </View>
//         </View>

//     );
// }

// const styles = StyleSheet.create({
//     maincontainer: {
//         flex: 1,
//         backgroundColor: '#FFFFFF', // Set background color
//     },
//     contentContainer: {
//          flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: "#FFFF",
//     borderTopRightRadius: 50,
//     borderTopLeftRadius: 50,
//     elevation: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -7, // negative value to place shadow above the container
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     borderTopWidth: 1, // Add a border to create space for the shadow
//     borderColor: 'transparent', // Ensure the border is not visible
       

//     },

//     button: {
//         width: '43%',
//         height: 47,
//         borderRadius: 40,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row',
//         backgroundColor: '#01595A',
//         margin: 10,

//     },
//     buttonText: {
//         color: '#ffff',
//         fontSize: 18,
//         fontWeight: '500',
//         padding: 10
//     },

//     headtext: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         fontFamily: 'Century Gothic',
//         color: '#000000',
//         marginHorizontal: 20,
//         padding:10,
//         marginTop:15

//     },
//     buttonview: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent:'center'
//     },
//     image: {
//         height: hp(70),
//         width: "100%",
//         resizeMode: 'stretch'
//     },

//     subcontainer1: {
//         flex: 2,
//         // alignItems: 'center',

//     },

// });

// export default Aminities2;


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

const Aminities2 = ({ navigation }) => {
    const carouselData = [
        { image: require('../Assets/butter.png') },
        { image: require('../Assets/tiger.png') },
        { image: require('../Assets/butter.png') },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [buttonData,setaminitiesData]=useState([]);
    const { SelectedLanguage1 } = globalvariavle();
    // const buttonData = [
    //     { text: 'Washroom', icon: 'family-restroom' },
    //     { text: 'Water', icon: 'water-drop' },
    //     { text: 'Canteen', icon: 'fastfood' },
    //     { text: 'Guest House', icon: 'house' },
    //     { text: 'Guest House', icon: 'house' }
    // ]

    useEffect(() => {
        
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');
           
            try {
              
                const response = await axios.post(`${config.API_URL}auth/get-amenities-category`, {
                    language: SelectedLanguage1,
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setaminitiesData(response.data.data);
                console.log(response.data.data);
               
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };
        fetchData();
        return () => {
          
            console.log('Component will unmount');
        };
    }, [SelectedLanguage1]);

    const renderButton = (buttonInfo) => (
        <TouchableOpacity style={styles.button} key={buttonInfo.name}>
            <Text style={styles.buttonText}>{buttonInfo.name}</Text>
            <Icon name={buttonInfo.icon} size={24} color="#fff" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.maincontainer}>
            <View style={styles.subcontainer1}>
                <Image style={styles.image} source={require('../Assets/a2.png')} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.headtext}>AMENITIES</Text>
                <View style={styles.buttonview}>
                    {buttonData.map(renderButton)}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Set background color
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#FFFF",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        elevation: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -7, // negative value to place shadow above the container
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderTopWidth: 1, // Add a border to create space for the shadow
        borderColor: 'transparent', // Ensure the border is not visible
    },
    button: {
        width: '43%',
        height: 47,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#01595A',
        margin: 10,
    },
    buttonText: {
        color: '#ffff',
        fontSize: 18,
        fontWeight: '500',
        padding: 10
    },
    headtext: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        marginHorizontal: 20,
        padding:10,
        marginTop:15
    },
    buttonview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center'
    },
    image: {
        height: hp(70),
        width: "100%",
        resizeMode: 'stretch'
    },
    subcontainer1: {
        flex: 2,
    },
});

export default Aminities2;
