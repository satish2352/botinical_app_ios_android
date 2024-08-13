

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
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
            id: 1,
            name: ' Add Trees',
            image: require('../Assets/Trees/b2.png'), // Assuming b2.png is another image for variety
        },
        {
            id: 2,
            name: 'Add Plants',
            image: require('../Assets/Trees/b3.png'), // Assuming b3.png is another image for variety
        },

        {
            id: 3,
            name: ' Add Amenities',
            image: require('../Assets/Trees/b1.png'),
        },


    ];
    const [treeData, setTreeData] = useState([]);
    const { SelectedLanguage1 } = globalvariavle();
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => viewdetails(item)}>

            <View style={styles.textwrap}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const viewdetails = (data) => {
        if (data.id === 3) {
            navigation.navigate('Addamenities', data);
        } else {
            navigation.navigate('AddEntityform', data);
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
                <Text style={styles.text}>{SelectedLanguage1 === 'english' ? 'ADD ENTITIES' : 'ఎంటిటీలను జోడించండి'}</Text>
            </LinearGradient>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.name.toString()}
                numColumns={0}
                ListFooterComponent={() => (
                    <View style={styles.footer}>
                        {/* <Text style={styles.pageIndicator}>{start} / {totalPages}</Text> */}
                        {loading && <ActivityIndicator size="large" color="#01595A" />}
                    </View>
                )}
            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#ffff'
    },
    card: {

        margin: 8,
        elevation: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 5,
        shadowRadius: 12,
        backgroundColor: '#01595A',
        borderRadius: 10,

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

        // width: '100%',




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
