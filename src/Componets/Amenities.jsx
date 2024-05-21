
// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import config from '../../config/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// const Amenities = ({ navigation }) => {
//     const [cardData, setAmenitiesData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [start, setStart] = useState(1);
//     const [refreshing, setRefreshing] = useState(false);
//     const { SelectedLanguage1 } = globalvariavle();

//     useEffect(() => {
//         fetchData();
//     }, [SelectedLanguage1, start]);

//     const fetchData = async () => {
//         const token = await AsyncStorage.getItem('token');
//         setLoading(true);
//         try {
//             const response = await axios.post(`${config.API_URL}auth/get-amenities-list`, {
//                 start,
//                 language: SelectedLanguage1,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setAmenitiesData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching amenities data:', error);
//         } finally {
//             setLoading(false);
//             setRefreshing(false);
//         }
//     };

//     const handleLogin = (data) => {
//         navigation.navigate('Aminitiesdetails', data);
//     };

//     const handleNext = () => {
//         setStart(prevStart => prevStart + 1);
//     };

//     const handleBack = () => {
//         if (start > 1) {
//             setStart(prevStart => prevStart - 1);
//         }
//     };

//     const handleRefresh = () => {
//         setRefreshing(true);
//         setStart(1);
//         fetchData();
//     };

//     return (
//         <LinearGradient
//             colors={['rgba(83, 174, 105, 0.39)', '#FBFFFC']}
//             style={styles.container}
//             start={{ x: 1.0, y: 1.0 }}
//             end={{ x: 0.0, y: 0.0 }}
//         >
//             <ScrollView
//                 style={{ marginTop: 40 }}
//                 refreshControl={
//                     <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//                 }
//             >
//                 <Text style={styles.header}>AMENITIES</Text>

//                 {cardData.map((item, index) => {
//                     if (index % 2 === 0) {
//                         return (
//                             <TouchableOpacity key={index} style={styles.cardwrap} onPress={() => handleLogin(item)}>
//                                 <View style={styles.cardhead}>
//                                     <Image
//                                         source={{ uri: item.image }}
//                                         style={styles.image2}
//                                     />
//                                 </View>
//                                 <View style={styles.cardtext}>
//                                     <Text style={styles.text}>{item.name}</Text>
//                                     <Text numberOfLines={7} ellipsizeMode="tail" style={styles.text2}>{item.description}</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         );
//                     } else {
//                         return (
//                             <TouchableOpacity key={index} style={styles.cardwrap2} onPress={() => handleLogin(item)}>
//                                 <View style={styles.cardtext}>
//                                     <Text style={styles.text}>{item.name}</Text>
//                                     <Text style={[styles.text2, { textAlign: 'left' }]} numberOfLines={7} ellipsizeMode="tail">{item.description}</Text>
//                                 </View>
//                                 <View style={styles.cardhead}>
//                                     <Image
//                                         source={{ uri: item.image }}
//                                         style={styles.image3}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         );
//                     }
//                 })}
//                 {loading && <ActivityIndicator size="large" color="#01595A" />}
//             </ScrollView>
//             <TouchableOpacity style={styles.backButton} onPress={handleBack}>
//                 <FontAwesomeIcon icon={faChevronLeft} style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//                 <FontAwesomeIcon icon={faChevronRight} style={styles.icon} />
//             </TouchableOpacity>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 7,
//     },
//     header: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         alignSelf: 'center',
//         color: '#000000',
//     },
//     text: {
//         fontSize: 16,
//         marginBottom: 5,
//         textAlign: 'center',
//         color: "#01595A",
//         fontWeight: '500',
//     },
//     text2: {
//         fontSize: 13,
//         color: '#000',
//         textAlign: 'right'
//     },
//     image2: {
//         width: 165,
//         height: 155,
//         resizeMode: 'cover',
//         alignSelf: 'flex-start',
//         borderRadius: 100,
//         right: 2
//     },
//     image3: {
//         width: 165,
//         height: 155,
//         resizeMode: 'cover',
//         alignSelf: 'flex-end',
//         borderRadius: 100,
//         left: 3
//     },
//     cardwrap: {
//         backgroundColor: 'white',
//         borderRadius: 25,
//         shadowColor: '#000',
//         shadowOpacity: 0.23,
//         shadowRadius: 2.62,
//         elevation: 6,
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 20,
//         marginHorizontal: 10,
//         borderTopLeftRadius: 110,
//         borderBottomLeftRadius: 120,
//     },
//     cardwrap2: {
//         backgroundColor: 'white',
//         borderRadius: 25,
//         shadowColor: '#000',
//         shadowOpacity: 0.23,
//         shadowRadius: 2.62,
//         elevation: 6,
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 20,
//         marginHorizontal: 10,
//         borderTopRightRadius: 80,
//         borderBottomRightRadius: 80
//     },
//     cardhead: {
//         width: "42%",
//         height: '100%',
//         borderRadius: 50,
//     },
//     cardtext: {
//         width: "60%",
//         paddingHorizontal: 15
//     },
//     nextButton: {
//         position: 'absolute',
//         bottom: 20,
//         right: 20,
//         backgroundColor: '#01595A',
//         borderRadius: 50,
//         width: 50,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     backButton: {
//         position: 'absolute',
//         bottom: 20,
//         left: 20,
//         backgroundColor: '#01595A',
//         borderRadius: 50,
//         width: 50,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     icon: {
//         color: '#fff',
//         fontSize: 20,
//     },
// });

// export default Amenities;


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Amenities = ({ navigation }) => {
    const [cardData, setAmenitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [start, setStart] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const { SelectedLanguage1 } = globalvariavle();

    useEffect(() => {
        fetchData();
    }, [SelectedLanguage1, start]);

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/get-amenities-list`, {
                start,
                language: SelectedLanguage1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAmenitiesData(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching amenities data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleLogin = (data) => {
        navigation.navigate('Aminitiesdetails', data);
    };

    const handleNext = () => {
        if (start < totalPages) {
            setStart(prevStart => prevStart + 1);
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handleBack = () => {
        if (start > 1) {
            setStart(prevStart => prevStart - 1);
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setStart(1);
        setCurrentPage(1);
        fetchData();
    };
   
    const stripHtmlTags = (str) => {
        if (!str) return '';
        let result= str.replace(/<\/?[^>]+(>|$)/g, "");
        result = result.replace(/&nbsp;/g, " ");
        result = result.replace(/wikipedia/gi, "");
        return result;
    }
    return (
        <LinearGradient
            colors={['rgba(83, 174, 105, 0.39)', '#FBFFFC']}
            style={styles.container}
            start={{ x: 1.0, y: 1.0 }}
            end={{ x: 0.0, y: 0.0 }}
        >
            <ScrollView
                style={{ marginTop: 40 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                <Text style={styles.header}>AMENITIES</Text>

                {cardData.map((item, index) => {
                    if (index % 2 === 0) {
                        return (
                            <TouchableOpacity key={index} style={styles.cardwrap} onPress={() => handleLogin(item)}>
                                <View style={styles.cardhead}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.image2}
                                    />
                                </View>
                                <View style={styles.cardtext}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text numberOfLines={7} ellipsizeMode="tail" style={styles.text2}>{stripHtmlTags(item.description)}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    } else {
                        return (
                            <TouchableOpacity key={index} style={styles.cardwrap2} onPress={() => handleLogin(item)}>
                                <View style={styles.cardtext}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={[styles.text2, { textAlign: 'left' }]} numberOfLines={7} ellipsizeMode="tail">{stripHtmlTags(item.description)}</Text>
                                </View>
                                <View style={styles.cardhead}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.image3}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    }
                })}
                {loading && <ActivityIndicator size="large" color="#01595A" />}
                {<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                <Text style={styles.pageIndicator}>{currentPage} / {totalPages}</Text>
            </ScrollView>
            
            <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={start === 1}>
                <FontAwesomeIcon icon={faChevronLeft} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={start === totalPages}>
                <FontAwesomeIcon icon={faChevronRight} style={styles.icon} />
            </TouchableOpacity>
        </LinearGradient>
    );
};

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
    text: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
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
        borderRadius: 100,
        right: 2
    },
    image3: {
        width: 165,
        height: 155,
        resizeMode: 'cover',
        alignSelf: 'flex-end',
        borderRadius: 100,
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
        width: "42%",
        height: '100%',
        borderRadius: 50,
    },
    cardtext: {
        width: "60%",
        paddingHorizontal: 15
    },
    nextButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#01595A',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#01595A',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageIndicator: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        color: '#000000',
    },
    icon: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Amenities;

