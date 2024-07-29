

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    const [cardData, setaboutData] = useState([]);
    const [cardData1, setaboutData1] = useState([]);
    const { SelectedLanguage1 } = globalvariavle();
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

      
        fetchData();
        fetchData1();
        return () => { console.log('Component will unmount') }

    }, [SelectedLanguage1, start]);
    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {

            const response = await axios.post(`${config.API_URL}auth/get-aboutus-element-list`, {
                start,
                language: SelectedLanguage1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setaboutData(response.data.data);
            setTotalPages(response.data.totalPages);
           

        } catch (error) {
            console.error('Error fetching about data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
    const fetchData1 = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {

            const response = await axios.post(`${config.API_URL}auth/get-aboutus-list`, {
               start,
                language: SelectedLanguage1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setaboutData1(response.data.data[0]);
           
           

        } catch (error) {
            console.error('Error fetching about data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
        fetchData1();
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
            <ScrollView style={{ marginTop: 40 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <Text style={styles.header}>{SelectedLanguage1 === 'english' ? 'ABOUT US' : 'గురించి'}</Text>
                <View style={styles.imageView}>
                    <Image
                    source={{ uri: cardData1.image }} // Replace with your image source
                        style={styles.image1}
                    />
                    <Text style={styles.text} ellipsizeMode="tail">
                    {stripHtmlTags(cardData1.description)}
                    </Text>
                </View>
                {
                    cardData.map((item, index) => {
                
                
                        if (index % 2 === 0) {
                
                            return (
                                <View>
                                    <View style={styles.cardwrap}>
                
                                        <View style={styles.cardhead}>
                                            <Image
                                                source={{ uri: item.image }} // Replace with your image source
                                                style={styles.image2}
                                            />
                                        </View>
                                        <View style={styles.cardtext}>
                                            <Text style={styles.text2} numberOfLines={7} ellipsizeMode="tail">{stripHtmlTags(item.description)}</Text>
                                        </View>
                
                                    </View>
                                    <Text style={styles.header2}>{item.name}</Text>
                                </View>
                            )
                        }
                        else {
                            return (
                                <View>
                                    <View style={styles.cardwrap}>
                
                
                                        <View style={styles.cardtext}>
                                            <Text style={styles.text2} numberOfLines={7} ellipsizeMode="tail">{stripHtmlTags(item.description)}</Text>
                                        </View>
                                        <View style={styles.cardhead1}>
                                            <Image
                                                source={{ uri: item.image }} // Replace with your image source
                                                style={styles.image3}
                                            />
                                        </View>
                                    </View>
                                    <Text style={styles.header3}>{item.name}</Text></View>
                            )
                        }
                
                
                    })
                }
               

            </ScrollView>
            {loading && <ActivityIndicator size="large" color="#01595A" />}
            {<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            <Text style={styles.pageIndicator}>{start} / {totalPages}</Text>
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
        padding: 10,
    },

    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
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
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'justify',
        padding: 10,
        color: "#000",
    },
    text2: {
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'justify',
        color: '#000'
    },
    imageView: {
        alignItems: 'center',
        borderRadius: 20
    },
    textView: {
        flexDirection: 'row', // Arrange items side by side
        alignItems: 'center', // Align items vertically
        marginBottom: 20,
        flexWrap: 'wrap',
        backgroundColor: '#ffff',
        borderRadius: 25

    },
    image2: {
        width: "100%",
        height: 160,
        resizeMode: 'cover',

        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    image3: {
        width: "100%",
        height: 160,
        resizeMode: 'cover',

        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,

    },
    image1: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20

    },

    cardwrap: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 6,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
        marginHorizontal: 10,



    },
    cardhead: {
        width: "50%",

        height: '100%',
        // padding: 15,

        alignItems: 'center'
    },
    cardhead1: {
        width: "50%",

        height: '100%',
        // padding: 15,

        alignItems: 'flex-end'
    },
    cardtext: {
        width: "50%",
        alignItems: "center",
        padding: 10
    },
    pageIndicator: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        color: '#000000',
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
});

export default About;



