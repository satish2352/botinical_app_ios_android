

// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator,RefreshControl } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import config from '../../config/config';
// import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// const Treecompo = ({ navigation }) => {
//     const [treeData, setTreeData] = useState([]);
//     const { SelectedLanguage1 } = globalvariavle();
//     const [loading, setLoading] = useState(false);
//     const [start, setStart] = useState(1);
//     const [refreshing, setRefreshing] = useState(false);
//     useEffect(() => {
//         fetchData();
        
//     }, [SelectedLanguage1, start]);

//     const fetchData = async () => {
//         const token = await AsyncStorage.getItem('token');
//         setLoading(true);
//         try {
//             const response = await axios.post(`${config.API_URL}auth/get-tress-list`, {
//                 start,
//                 language: SelectedLanguage1,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             setTreeData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching tree data:', error);
//         } finally {
//             setLoading(false);
//             setRefreshing(false);
//         }
//     };

//     const renderItem = ({ item }) => (
//         <TouchableOpacity style={styles.card} onPress={() => viewdetails(item)}>
//             <View><Image source={{ uri: item.image }} style={styles.image} /></View>
//             <View style={styles.textwrap}>
//                 <Text style={styles.title}>{item.name}</Text>
//             </View>
//         </TouchableOpacity>
//     );

//     const viewdetails = (data) => {
//         navigation.navigate('PlatsDetails', data);
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
//         <View style={styles.container}>
//             <LinearGradient
//                 colors={['#01595A', 'rgba(115, 115, 115, 0)']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.gradient}
//             >
//                 <Text style={styles.text}>TREE</Text>
//             </LinearGradient>
//             <FlatList
//                 data={treeData}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id.toString()}
//                 numColumns={2}
//                 ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
//                 refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
//             />
//             <TouchableOpacity style={styles.backButton} onPress={handleBack}>
//                 <FontAwesomeIcon icon={faChevronLeft} style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//                 <FontAwesomeIcon icon={faChevronRight} style={styles.icon} />
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
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
//         backgroundColor: '#01595A',
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
//     textwrap: {
//         alignItems: 'center',
//         backgroundColor: '#01595A',
//         width: '100%',
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//     },
//     text: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: '#fff',
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

// export default Treecompo;


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Treecompo = ({ navigation }) => {
    const [treeData, setTreeData] = useState([]);
    const { SelectedLanguage1 } = globalvariavle();
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [SelectedLanguage1, start]);

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/get-tress-list`, {
                start,
                language: SelectedLanguage1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (start === 1) {
                setTreeData(response.data.data);
            } else {
                setTreeData(prevData => [...prevData, ...response.data.data]);
            }
        } catch (error) {
            console.error('Error fetching tree data:', error);
        } finally {
            setLoading(false);
            setLoadMoreLoading(false);
            setRefreshing(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => viewdetails(item)}>
            <View><Image source={{ uri: item.image }} style={styles.image} /></View>
            <View style={styles.textwrap}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const viewdetails = (data) => {
        navigation.navigate('PlatsDetails', data);
    };

    const handleLoadMore = () => {
        if (!loadMoreLoading) {
            setLoadMoreLoading(true);
            setStart(prevStart => prevStart + 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setStart(1);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#01595A', 'rgba(115, 115, 115, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>TREE</Text>
            </LinearGradient>
            <FlatList
                data={treeData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#01595A" /> : (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                        <FontAwesomeIcon icon={faChevronDown} style={styles.icon} />
                    </TouchableOpacity>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: '#01595A',
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
    textwrap: {
        alignItems: 'center',
        backgroundColor: '#01595A',
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
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
    loadMoreButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: '#01595A',
        borderRadius: 50,
        marginVertical: 10,
        width: 50,
        alignSelf: "center"
    },
    icon: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Treecompo;
