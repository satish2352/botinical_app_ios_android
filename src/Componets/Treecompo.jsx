import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Editcordinates from '../Reusablecompoent/Editcordinates';

const Treecompo = ({ navigation }) => {
    const [treeData, setTreeData] = useState([]);
    const { SelectedLanguage1, isLoggedIn, showLoginPrompt, roleid } = globalvariavle();
    console.log('SelectedLanguage1',SelectedLanguage1);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [lat, setlat] = useState(null);
    const [long, setlong] = useState(null);
    const [treeid, settreeid] = useState(null);
    console.log('1111111111111', treeid);


    console.log('under tree compoent lat long ', lat, long);

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            if (!isLoggedIn) {
                showLoginPrompt(navigation);
            }
        });
        return unsubscribe;
    }, [navigation, isLoggedIn, SelectedLanguage1, start]);

    const Updatecordinates = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/update-tree-plant-aminities`, {
                start,
                language: SelectedLanguage1,
                latitude: lat,
                longitude: long,
                type: 1,
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
            console.error('Error fetching tree data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

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

            setTreeData(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching tree data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => viewdetails(item)}>
            <View><Image source={{ uri: item.image }} style={styles.image} /></View>
            <View style={styles.textwrap}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
            {roleid === '1' ?

                <TouchableOpacity style={{ position: 'absolute', alignSelf: "flex-end", borderTopRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#01595A', }}>
                    <Editcordinates item={item} setlong={setlong} setlat={setlat} Updatecordinates={Updatecordinates} settreeid={settreeid} />
                </TouchableOpacity>
                : null
            }
        </TouchableOpacity>
    );

    const viewdetails = (data) => {
        navigation.navigate('PlatsDetails', data);
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
        <View style={styles.container}>
            <LinearGradient
                colors={['#01595A', 'rgba(115, 115, 115, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>{SelectedLanguage1 === 'english' ? 'TREES' : 'చెట్లు'}</Text>
            </LinearGradient>
            <FlatList
                data={treeData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                ListFooterComponent={() => (
                    <View style={styles.footer}>
                        <Text style={styles.pageIndicator}>{start} / {totalPages}</Text>
                        {loading && <ActivityIndicator size="large" color="#01595A" />}
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
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

export default Treecompo;

