// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import config from '../../config/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// const ChargesList = () => {
//     const [chargesData, setChargesData] = useState([]);
//     const { SelectedLanguage1 } = globalvariavle();
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const [start, setStart] = useState(1);

//     useEffect(() => {
//         fetchData();
//     }, [start, SelectedLanguage1]);

//     const fetchData = async () => {
//         const token = await AsyncStorage.getItem('token');
//         setLoading(true);
//         try {
//             const response = await axios.post(`${config.API_URL}auth/get-charges-list`, {
//                 start,
//                 language: SelectedLanguage1,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setChargesData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching charges data:', error);
//         } finally {
//             setLoading(false);
//             setRefreshing(false);
//         }
//     };

//     const handleNext = () => {
//         setStart(start + 1);
//     };

//     const handleBack = () => {
//         if (start > 1) {
//             setStart(start - 1);
//         }
//     };

//     const handleRefresh = () => {
//         setRefreshing(true);
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
//                 style={{ marginTop: 45 }}
//                 refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
//             >
//                 <Text style={styles.header}>BOTANICAL GARDEN CHARGES</Text>
//                 <Text style={styles.text}>
//                     The Nehru Zoological Park is open to the public from Tuesday to Sunday (6 DAYS) and every Monday is a Zoo holiday. The government has enhanced the tariffs for entry into the Zoo from 10th August 2023 onwards.
//                 </Text>
//                 <Text style={styles.subHeader}>ENTRY FEE AND OTHER CHARGES</Text>
                
//                 {chargesData.map((item, index) => (
//                     <View key={index} style={styles.cardwrap}>
//                         <View style={styles.cardhead}>
//                             <Text style={styles.cardTitle}>{item.name}</Text>
//                         </View>
//                         <View style={styles.cardtext}>
//                             <Text style={styles.cardDetails}>{item.price}</Text>
//                         </View>
//                     </View>
//                 ))}
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

// // Styles for the component
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 4,
//     },
//     header: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         alignSelf: 'center',
//         color: '#000000'
//     },
//     text: {
//         fontSize: 13,
//         marginBottom: 10,
//         textAlign: 'justify',
//         padding: 10,
//         color: "#000"
//     },
//     subHeader: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         alignSelf: "center",
//         color: '#6CB47F'
//     },
//     cardwrap: {
//         flex: 1,
//         backgroundColor: 'white',
//         borderRadius: 12,
//         shadowColor: '#000',
//         shadowOpacity: 0.23,
//         shadowRadius: 2.62,
//         elevation: 6,
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 15,
//         marginHorizontal: 15
//     },
//     cardTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#ffff'
//     },
//     cardDetails: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: "#000",
//     },
//     cardhead: {
//         width: "60%",
//         backgroundColor: '#01595A',
//         height: '100%',
//         padding: 15,
//         borderRadius: 12,
//         alignItems: 'center'
//     },
//     cardtext: {
//         width: "40%",
//         alignItems: "center",
//         justifyContent: "center"
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

// export default ChargesList;

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ChargesList = () => {
    const [chargesData, setChargesData] = useState([]);
    const { SelectedLanguage1 } = globalvariavle();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [start, setStart] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData();
    }, [start, SelectedLanguage1]);

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/get-charges-list`, {
                start,
                language: SelectedLanguage1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data;
            setChargesData(responseData.data);
            setTotalPages(responseData.totalPages || 1); // Set the total number of pages
        } catch (error) {
            console.error('Error fetching charges data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleNext = () => {
        if (start < totalPages) {
            setStart(start + 1);
        }
    };

    const handleBack = () => {
        if (start > 1) {
            setStart(start - 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    return (
        <LinearGradient
            colors={['rgba(83, 174, 105, 0.39)', '#FBFFFC']}
            style={styles.container}
            start={{ x: 1.0, y: 1.0 }}
            end={{ x: 0.0, y: 0.0 }}
        >
            <ScrollView 
                style={{ marginTop: 45 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <Text style={styles.header}>BOTANICAL GARDEN CHARGES</Text>
                <Text style={styles.text}>
                    The Nehru Zoological Park is open to the public from Tuesday to Sunday (6 DAYS) and every Monday is a Zoo holiday. The government has enhanced the tariffs for entry into the Zoo from 10th August 2023 onwards.
                </Text>
                <Text style={styles.subHeader}>ENTRY FEE AND OTHER CHARGES</Text>
                
                {chargesData.map((item, index) => (
                    <View key={index} style={styles.cardwrap}>
                        <View style={styles.cardhead}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </View>
                        <View style={styles.cardtext}>
                            <Text style={styles.cardDetails}>{item.price}</Text>
                        </View>
                    </View>
                ))}
                {loading && <ActivityIndicator size="large" color="#01595A" />}
                <Text style={styles.pageIndicator}>{start} / {totalPages}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <FontAwesomeIcon icon={faChevronRight} style={styles.icon} />
            </TouchableOpacity>
        </LinearGradient>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#000000'
    },
    text: {
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'justify',
        padding: 10,
        color: "#000"
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: "center",
        color: '#6CB47F'
    },
    cardwrap: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 6,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        marginHorizontal: 15
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffff'
    },
    cardDetails: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#000",
    },
    cardhead: {
        width: "60%",
        backgroundColor: '#01595A',
        height: '100%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center'
    },
    cardtext: {
        width: "40%",
        alignItems: "center",
        justifyContent: "center"
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
    icon: {
        color: '#fff',
        fontSize: 20,
    },
    pageIndicator: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        color: '#000000',
    },
});

export default ChargesList;



















// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import config from '../../config/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// const ChargesList = () => {
//     const [chargesData, setChargesData] = useState([]);
//     const { SelectedLanguage1 } = globalvariavle();
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const [loadMoreLoading, setLoadMoreLoading] = useState(false);
//     const [start, setStart] = useState(1);

//     useEffect(() => {
//         fetchData(1, SelectedLanguage1);
//     }, [SelectedLanguage1]);

//     const fetchData = async (pageNumber, language) => {
//         const token = await AsyncStorage.getItem('token');
//         setLoading(true);
//         try {
//             const response = await axios.post(`${config.API_URL}auth/get-charges-list`, {
//                 start: pageNumber,
//                 language: language,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             if (pageNumber === 1) {
//                 setChargesData(response.data.data);
//             } else {
//                 setChargesData(prevData => [...prevData, ...response.data.data]);
//             }
//         } catch (error) {
//             console.error('Error fetching charges data:', error);
//         } finally {
//             setLoading(false);
//             setLoadMoreLoading(false);
//             setRefreshing(false);
//         }
//     };

//     const handleLoadMore = () => {
//         if (!loadMoreLoading) {
//             setLoadMoreLoading(true);
//             setStart(prevStart => {
//                 const nextStart = prevStart + 1;
//                 fetchData(nextStart, SelectedLanguage1);
//                 return nextStart;
//             });
//         }
//     };

//     const handleRefresh = () => {
//         setRefreshing(true);
//         setStart(1);
//         fetchData(1, SelectedLanguage1);
//     };

//     return (
//         <LinearGradient
//             colors={['rgba(83, 174, 105, 0.39)', '#FBFFFC']}
//             style={styles.container}
//             start={{ x: 1.0, y: 1.0 }}
//             end={{ x: 0.0, y: 0.0 }}
//         >
//             <ScrollView
//                 style={{ marginTop: 45 }}
//                 refreshControl={
//                     <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//                 }
//             >
//                 <Text style={styles.header}>BOTANICAL GARDEN CHARGES</Text>
//                 <Text style={styles.text}>
//                     The Nehru Zoological Park is open to the public from Tuesday to Sunday (6 DAYS) and every Monday is a Zoo holiday. The government has enhanced the tariffs for entry into the Zoo from 10th August 2023 onwards.
//                 </Text>
//                 <Text style={styles.subHeader}>ENTRY FEE AND OTHER CHARGES</Text>
               
//                 {chargesData.map((item, index) => (
//                     <View key={index} style={styles.cardwrap}>
//                         <View style={styles.cardhead}>
//                             <Text style={styles.cardTitle}>{item.name}</Text>
//                         </View>
//                         <View style={styles.cardtext}>
//                             <Text style={styles.cardDetails}>{item.price}</Text>
//                         </View>
//                     </View>
//                 )
//             )}
//             {loadMoreLoading && <ActivityIndicator size="large" color="#01595A" />}
//             {!loadMoreLoading && (
//                 <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
//                     <FontAwesomeIcon icon={faChevronDown} style={styles.icon} />
//                 </TouchableOpacity>
//             )}
//             </ScrollView>
            
//         </LinearGradient>
//     );
// };

// // Styles for the component
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 4,
//     },
//     header: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         alignSelf: 'center',
//         color: '#000000'
//     },
//     text: {
//         fontSize: 13,
//         marginBottom: 10,
//         textAlign: 'justify',
//         padding: 10,
//         color: "#000"
//     },
//     subHeader: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         alignSelf: "center",
//         color: '#6CB47F'
//     },
//     cardwrap: {
//         flex: 1,
//         backgroundColor: 'white',
//         borderRadius: 12,
//         shadowColor: '#000',
//         shadowOpacity: 0.23,
//         shadowRadius: 2.62,
//         elevation: 6,
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 15,
//         marginHorizontal: 15
//     },
//     cardTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#ffff'
//     },
//     cardDetails: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: "#000",
//     },
//     cardhead: {
//         width: "60%",
//         backgroundColor: '#01595A',
//         height: '100%',
//         padding: 15,
//         borderRadius: 12,
//         alignItems: 'center'
//     },
//     cardtext: {
//         width: "40%",
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     loadMoreButton: {
//         // position: 'absolute',
//         // bottom: 20,
//         alignSelf: 'center',
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

// export default ChargesList;
