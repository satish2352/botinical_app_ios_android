


import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
config
// The main component
const cardData = [
        {
            title: "Nature's Hub Food Court",
            description: "The food court is placed in serene greenery. The ambience was awesome. The menu covers all the sessions with a limited number of offerings.",
            image: require('../Assets/amenities/1.png')
        },
        {
            title: "Open Gym",
            description: "Botanical Gardens in Gachibowli offers horticulture, picnic spots, rock formations, and an outdoor gym.",
            image: require('../Assets/amenities/2.png')
        },
        {
            title: "Adventure Arena",
            description: "Feakouts Adventure Zone in Kondapur's Botanical Garden has amazing outdoor activities like zip lining, archery, bull rides, zorbing, etc.",
            image: require('../Assets/amenities/3.png')
        },
        {
            title: "Robust Fitness Center",
            description: "A social, recreational and health facility, fitness centre is equipped with carry out exercises in Botanical garden.",
            image: require('../Assets/amenities/4.png')
        },
        {
            title: "Adventure Arena",
            description: "Feakouts Adventure Zone in Kondapur's Botanical Garden has amazing outdoor activities like zip lining, archery, bull rides, zorbing, etc.",
            image: require('../Assets/amenities/3.png')
        },
        {
            title: "Robust Fitness Center",
            description: "A social, recreational and health facility, fitness centre is equipped with carry out exercises in Botanical garden.",
            image: require('../Assets/amenities/4.png')
        },
    ];
const Amenities = ({ navigation }) => {

// const [cardData,setaminitiesData]=useState([]);
//     useEffect(() => {
        
//         const fetchData = async () => {
//             const token = await AsyncStorage.getItem('token');
           
//             try {
              
//                 const response = await axios.post(`${config.API_URL}auth/get-amenities-list`, {},{
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
                
//                 setaminitiesData(response.data.data);
               
//             } catch (error) {
//                 console.error('Error fetching about data:', error);
//             }
//         };
//         fetchData();
//     }, []);



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

                {cardData.map((item,index)=>{

                    
                  if(index % 2 === 0)  {
return(
                    <View>
                    <TouchableOpacity style={styles.cardwrap  } onPress={() => handlelogin(item)}>
                        <View style={styles.cardhead}>
                            <Image
                                source={item.image} // Replace with your image source
                                style={styles.image2}
                            />
                        </View>
                        <View style={styles.cardtext}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.text2}>{item.description}</Text>
                        </View>
                        </TouchableOpacity>
                        </View>
)
                  }
                  else{
                    return(
                       <View>
                       <TouchableOpacity style={styles.cardwrap2  } onPress={() => handlelogin(item)}>
                       <View style={styles.cardtext}>
                       <Text style={styles.text}>{item.title}</Text>
                       <Text style={[styles.text2, { textAlign: 'left' }]}>{item.description}</Text>
                   </View>
                   <View style={styles.cardhead}>
                       <Image
                           source={item.image} // Replace with your image source
                           style={styles.image3}
                       />
                   </View>
                   </TouchableOpacity>
                   </View>
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


