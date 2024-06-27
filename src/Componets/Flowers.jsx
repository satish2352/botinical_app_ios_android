import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Flowers = ({ navigation }) => {
    const [flowerData, setFlowerData] = useState([]);
    const [start, setStart] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const { SelectedLanguage1 } = globalvariavle();

    useEffect(() => {
        fetchData();
    }, [SelectedLanguage1, start]);

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/get-flowers-list`, {
                language: SelectedLanguage1,
                start
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFlowerData(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching flowers data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const renderFlowerItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => viewDetails(item)}>
            <View><Image source={{ uri: item.image }} style={styles.image} /></View>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const viewDetails = (data) => {
        navigation.navigate('flowerdetails', data);
    };

    const handleNext = () => {
        setStart(start + 1);
    };

    const handleBack = () => {
        if (start > 1) {
            setStart(start - 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setStart(1);
        fetchData();
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#01595A', 'rgba(115, 115, 115, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>PLATS</Text>
            </LinearGradient>
            <FlatList
                data={flowerData}
                renderItem={renderFlowerItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                ListFooterComponent={() => (
                    <View style={styles.footer}>
                     
                      {loading && <ActivityIndicator size="large" color="#01595A" />}
                      <Text style={styles.pageIndicator}>{start} / {totalPages}</Text>
                    </View>
                  )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
            
            <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={start === 1}>
                <FontAwesomeIcon icon={faChevronLeft} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <FontAwesomeIcon icon={faChevronRight} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        margin: 8,
        width: '46%',
    },
    title: {
        fontSize: 18,
        paddingVertical: 10,
        textAlign: 'center',
        color: '#fff'
    },
    image: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        resizeMode: "cover",
    },
    textWrap: {
        alignItems: 'center',
        backgroundColor: '#01595A',
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff'
    },
    gradient: {
        width: '60%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginHorizontal: 10,
        padding: 10,
        marginTop: 55
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
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
      },
      pageIndicator: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#01595A',
      },
    icon: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Flowers;


// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import config from '../../config/config';
// import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// const Flowers = ({ navigation }) => {
//     const [flowerData, setFlowerData] = useState([]);
//     const [start, setStart] = useState(1);
//     const { SelectedLanguage1 } = globalvariavle();
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const [loadMoreLoading, setLoadMoreLoading] = useState(false);

//     useEffect(() => {
//         fetchData();
//     }, [SelectedLanguage1, start]);

//     const fetchData = async () => {
//         const token = await AsyncStorage.getItem('token');
//         setLoading(true);
//         try {
//             const response = await axios.post(`${config.API_URL}auth/get-flowers-list`, {
//                 language: SelectedLanguage1,
//                 start
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             if (start === 1) {
//                 setFlowerData(response.data.data);
//             } else {
//                 setFlowerData(prevData => [...prevData, ...response.data.data]);
//             }
//         } catch (error) {
//             console.error('Error fetching flowers data:', error);
//         } finally {
//             setLoading(false);
//             setLoadMoreLoading(false);
//             setRefreshing(false);
//         }
//     };

//     const renderFlowerItem = ({ item }) => (
//         <TouchableOpacity style={styles.card} onPress={() => viewDetails(item)}>
//             <View><Image source={{ uri: item.image }} style={styles.image} /></View>
//             <View style={styles.textWrap}>
//                 <Text style={styles.title}>{item.name}</Text>
//             </View>
//         </TouchableOpacity>
//     );

//     const viewDetails = (data) => {
//         navigation.navigate('flowerdetails', data);
//     };

//     const handleLoadMore = () => {
//         if (!loadMoreLoading) {
//             setLoadMoreLoading(true);
//             setStart(prevStart => prevStart + 1);
//         }
//     };

//     const handleRefresh = () => {
//         setRefreshing(true);
//         setStart(1);
//     };

//     return (
//         <View style={styles.container}>
//             <LinearGradient
//                 colors={['#01595A', 'rgba(115, 115, 115, 0)']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.gradient}
//             >
//                 <Text style={styles.text}>FLOWERS</Text>
//             </LinearGradient>
//             <FlatList
//                 data={flowerData}
//                 renderItem={renderFlowerItem}
//                 keyExtractor={item => item.id.toString()}
//                 numColumns={2}
//                 ListFooterComponent={loading ? <ActivityIndicator size="large" color="#01595A" /> : (
//                     <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
//                         <FontAwesomeIcon icon={faChevronDown} style={styles.icon} />
//                     </TouchableOpacity>
//                 )}
//                 refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 5,
//     },
//     card: {
//         backgroundColor: '#FFF',
//         borderRadius: 10,
//         elevation: 3,
//         shadowOffset: { width: 1, height: 1 },
//         shadowColor: '#333',
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         margin: 8,
//         width: '46%',
//     },
//     title: {
//         fontSize: 18,
//         paddingVertical: 10,
//         textAlign: 'center',
//         color: '#fff'
//     },
//     image: {
//         width: '100%',
//         height: 160,
//         borderTopLeftRadius: 8,
//         borderTopRightRadius: 8,
//         resizeMode: "cover",
//     },
//     textWrap: {
//         alignItems: 'center',
//         backgroundColor: '#01595A',
//         width: '100%',
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//     },
//     text: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: '#fff'
//     },
//     gradient: {
//         width: '60%',
//         height: 50,
//         justifyContent: 'center',
//         alignSelf: 'flex-start',
//         marginHorizontal: 10,
//         padding: 10,
//         marginTop: 55
//     },
//     loadMoreButton: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         padding: 12,
//         backgroundColor: '#01595A',
//         borderRadius: 50,
//         marginVertical: 10,
//         width: 50,
//         alignSelf: "center"
//     },
//     icon: {
//         color: '#fff',
//         fontSize: 20,
//     },
// });

// export default Flowers;
