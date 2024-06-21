

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator,RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';




const AddEntity = ({ navigation }) => {

    const data = [
        {
            name: ' Add Amenities',
            image: require('../Assets/Trees/b1.png'),
        },
        {
            name: ' Add Trees',
            image: require('../Assets/Trees/b2.png'), // Assuming b2.png is another image for variety
        },
        {
            name: 'Add Flowers',
            image: require('../Assets/Trees/b3.png'), // Assuming b3.png is another image for variety
        },
    ];
    const [treeData, setTreeData] = useState([]);
    const { SelectedLanguage1 } = globalvariavle();
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    // useEffect(() => {
    //     fetchData(); 
        
    // }, [SelectedLanguage1, start]);

    // const fetchData = async () => {
    //     const token = await AsyncStorage.getItem('token');
    //     setLoading(true);
    //     try {
    //         const response = await axios.post(`${config.API_URL}auth/get-tress-list`, {
    //             start,
    //             language: SelectedLanguage1,
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });

    //         setTreeData(response.data.data);
    //         setTotalPages(response.data.totalPages);
    //     } catch (error) {
    //         console.error('Error fetching tree data:', error);
    //     } finally {
    //         setLoading(false);
    //         setRefreshing(false);
    //     }
    // };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => viewdetails(item)}>
            <View><Image source={item.image } style={styles.image} /></View>
            <View style={styles.textwrap}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const viewdetails = (data) => {
        navigation.navigate('AddEntityform',  data);
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
    // const handleRefresh = () => {
    //     setRefreshing(true);
    //     fetchData();
    // };
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#01595A', 'rgba(115, 115, 115, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>ADD ENTITIES</Text>
            </LinearGradient>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.name.toString()}
                numColumns={2}
                ListFooterComponent={() => (
                    <View style={styles.footer}>
                      <Text style={styles.pageIndicator}>{start} / {totalPages}</Text>
                      {loading && <ActivityIndicator size="large" color="#01595A" />}
                    </View>
                  )}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
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

export default AddEntity;
