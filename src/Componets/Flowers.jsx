import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Editcordinates from '../Reusablecompoent/Editcordinates';
import SearchBar from '../Reusablecompoent/SearchBar';
const Flowers = ({ navigation }) => {
    const [flowerData, setFlowerData] = useState([]);
    const [start, setStart] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const { SelectedLanguage1, isLoggedIn, showLoginPrompt, roleid } = globalvariavle();
    const [lat, setlat] = useState(null);
    const [long, setlong] = useState(null);
    const [treeid, settreeid] = useState(null);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            if (!isLoggedIn) {
                showLoginPrompt(navigation);
            }
        });
        return unsubscribe;
    }, [navigation, isLoggedIn, SelectedLanguage1, start, searchText]);

    useEffect(() => {

        return () => { }
    }, []);
    const Updatecordinates = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/update-tree-plant-aminities`, {
                start,
                language: SelectedLanguage1,
                latitude: lat,
                longitude: long,
                type: 2,
                tree_plant_id: treeid
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status === 'true') {
                Alert.alert("Data Update", response.data.message)
            }
            else {
                Alert.alert("Error", response.data.message)
            }
            console.log('data update', response.data);
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }


    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/get-flowers-list`, {
                language: SelectedLanguage1,
                start,
                name: searchText
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
            {roleid == '1' ?
                <TouchableOpacity style={{ position: 'absolute', alignSelf: "flex-end", borderTopRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#01595A', }}>
                    <Editcordinates item={item} setlong={setlong} setlat={setlat} Updatecordinates={Updatecordinates} settreeid={settreeid} />
                </TouchableOpacity>

                : null
            }

        </TouchableOpacity>
    );

    const viewDetails = (data) => {
        navigation.navigate('Flowerdetails', data);
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
        setSearchText('')
    };
    const handleSearchChange = (text) => {
        setSearchText(text);
        setStart(1); // Set start to 1 when text changes
      };
    
      const handleSearchFocus = () => {
        setStart(1); // Set start to 1 when search bar is clicked
      };
    
      const handleSearchPress = () => {
        console.log('Search button pressed');
        setStart(1); // Set start to 1 when search icon is clicked
      };
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#01595A', 'rgba(115, 115, 115, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>{SelectedLanguage1 === 'english' ? 'PLANTS' : 'మొక్కలు'}</Text>
            </LinearGradient>

            <SearchBar
            value={searchText}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onSearch={handleSearchPress}
            placeholder="Search here..."
          />

            <FlatList
                data={flowerData}
                renderItem={renderFlowerItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Data not found</Text>
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footer}>

                        {loading && <ActivityIndicator size="large" color="#01595A" />}
                        <Text style={styles.pageIndicator}>{start} / {totalPages}</Text>
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />

            {
                totalPages > 1 ? <View>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={start === 1}>
                        <FontAwesomeIcon icon={faChevronLeft} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={start === totalPages}>
                        <FontAwesomeIcon icon={faChevronRight} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                    : null
            }
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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    footer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    pageIndicator: {
        fontSize: 16,
        color: '#01595A',
        marginBottom: 10,
    },
});

export default Flowers;

