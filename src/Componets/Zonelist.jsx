


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl,Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Editcordinates from '../Reusablecompoent/Editcordinates';
import SearchBar from '../Reusablecompoent/SearchBar';
const Zonelist = ({ navigation }) => {
    const [cardData, setAmenitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [start, setStart] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const { SelectedLanguage1, isLoggedIn, showLoginPrompt,roleid } = globalvariavle();
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
    }, [navigation, isLoggedIn, SelectedLanguage1, start,searchText]);

    // useEffect(() => {

    //     return()=>{}
    // }, []);

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/get-zone-area`, {
                start,
                language: SelectedLanguage1,
                name:searchText
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
        navigation.navigate('Zonesdetails', data);
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
        setSearchText('')
    };

   const stripHtmlTags = (str) => {
    if (!str) return '';
    let result = str.replace(/<\/?[^>]+(>|$)/g, "");  // Remove HTML tags
    result = result.replace(/&nbsp;/g, " ");          // Replace &nbsp; with a space
    result = result.replace(/wikipedia/gi, "");       // Remove "wikipedia"
    result = result.replace(/\s+/g, " ");             // Collapse multiple spaces
    return result.trim();                             // Trim spaces from start/end
};

    const Updatecordinates = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/update-tree-plant-aminities`, {
                start,
                language: SelectedLanguage1,
                latitude: lat,
                longitude: long,
                type: 3,
               aminities_id: treeid
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
            console.error('Error fetching tree data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }
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
                <Text style={styles.header}>{SelectedLanguage1 === 'english' ? 'ZONES' : 'మండలాలు'}</Text>
                <SearchBar
                value={searchText}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onSearch={handleSearchPress}
                placeholder="Search here..."
            />
            {cardData.length === 0 ? (
                // Show this message if cardData is empty
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Data not found</Text>
                </View>
              ) : (
                cardData.map((item, index) => {
                  if (index % 2 === 0) {
                    return (
                      <TouchableOpacity key={index} style={styles.cardwrap} onPress={() => handleLogin(item)}>
              
                        {/* Image Section */}
                        <View style={styles.cardhead}>
                          <Image source={{ uri: item.image }} style={styles.image2} />
                        </View>
              
                        {/* Text Section */}
                        <View style={styles.cardtext}>
                          <Text style={styles.text}>{item.name}</Text>
                          <Text numberOfLines={6} ellipsizeMode="tail" style={styles.text2}>
                            {stripHtmlTags(item.description)}
                          </Text>
                        </View>
                        
                        {/* Conditional render of Editcordinates button */}
                        {roleid === '1' && (
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              alignSelf: 'flex-start',
                              borderTopRightRadius: 10,
                              borderBottomLeftRadius: 10,
                              backgroundColor: '#01595A',
                              zIndex: 1,
                              right: 0,
                            }}
                          >
                            <Editcordinates
                              item={item}
                              setlong={setlong}
                              setlat={setlat}
                              Updatecordinates={Updatecordinates}
                              settreeid={settreeid}
                            />
                          </TouchableOpacity>
                        )}
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity key={index} style={styles.cardwrap2} onPress={() => handleLogin(item)}>
              
                        {/* Text Section */}
                        <View style={styles.cardtext}>
                          <Text style={styles.text}>{item.name}</Text>
                          <Text style={[styles.text2, { textAlign: 'left' }]} numberOfLines={6} ellipsizeMode="tail">
                            {stripHtmlTags(item.description)}
                          </Text>
                        </View>
              
                        {/* Image Section */}
                        <View style={styles.cardhead}>
                          <Image source={{ uri: item.image }} style={styles.image3} />
                        </View>
              
                        {/* Conditional render of Editcordinates button */}
                        {roleid === '1' && (
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              alignSelf: 'flex-start',
                              borderToprightRadius: 10,
                              borderBottomRightRadius: 10,
                              backgroundColor: '#01595A',
                              zIndex: 1,
                            }}
                          >
                            <Editcordinates
                              item={item}
                              setlong={setlong}
                              setlat={setlat}
                              Updatecordinates={Updatecordinates}
                              settreeid={settreeid}
                            />
                          </TouchableOpacity>
                        )}
                      </TouchableOpacity>
                    );
                  }
                })
              )}
              
                {loading && <ActivityIndicator size="large" color="#01595A" />}
                {<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                <Text style={styles.pageIndicator}>{start} / {totalPages}</Text>
            </ScrollView>

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
        width: 160,
        height: 155,
        resizeMode: 'cover',
        alignSelf: 'flex-start',
        borderRadius: 100,
        right: 2
    },
    image3: {
        width: 160,
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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
});

export default Zonelist;

