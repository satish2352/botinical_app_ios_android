import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/AntDesign';
const ChargesList = ({navigation}) => {
    const [chargesData, setChargesData] = useState([]);
    const { SelectedLanguage1 ,isLoggedIn, showLoginPrompt} = globalvariavle();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [start, setStart] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
          if (!isLoggedIn) {
            showLoginPrompt(navigation);
          }
        });
        return unsubscribe;
      }, [navigation, isLoggedIn,start, SelectedLanguage1]);
 

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/get-ticket-list`, {
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

    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    return (
        <LinearGradient
            colors={['#53AE69', '#FBFFFC']}
            style={styles.container}
            start={{ x: 1.0, y: 1.0 }}
            end={{ x: 0.0, y: 0.0 }}
        >
            <ScrollView
                style={{ marginTop: 45 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <Text style={styles.header}>{SelectedLanguage1 === 'english' ? 'BOTANICAL GARDEN TICKETS' : 'బొటానికల్ గార్డెన్ టిక్కెట్లు'}</Text>
                <Text style={styles.text}>
                    {SelectedLanguage1 === 'english' ? 'Botanical Garden of Hyderabad is also one of the interesting sightseeing places in Hyderabad offering a refreshing setting and rich flora. Having been developed by the Forest Departments, Botanical Garden is situated in Madhapur near the Hi-tech City which is almost 16 km away from centre of the city.' : 'హైదరాబాద్‌లోని బొటానికల్ గార్డెన్ కూడా హైదరాబాద్‌లోని ఆసక్తికరమైన సందర్శనా స్థలాలలో ఒకటి, ఇది రిఫ్రెష్ సెట్టింగ్ మరియు గొప్ప వృక్ష సంపదను అందిస్తుంది. అటవీ శాఖలు అభివృద్ధి చేసినందున, బొటానికల్ గార్డెన్ మాదాపూర్‌లో హైటెక్ సిటీకి సమీపంలో ఉంది, ఇది నగరం                    16 కిమీ దూరంలో ఉంది.'}
                </Text>
                <Text style={styles.subHeader}>{SelectedLanguage1 === 'english' ? 'ENTRY FEE AND OTHER CHARGES' : 'ప్రవేశ రుసుము మరియు ఇతర ఛార్జీలు'}</Text>

                {chargesData.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.cardwrap} onPress={() => openModal(item)}>
                        <View style={styles.cardhead}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </View>
                        <View style={styles.cardtext}>
                            <Text style={styles.cardDetails}>{item.ticket_cost}</Text>
                        </View>
                    </TouchableOpacity>
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}                                                                                                                                                                                                                                                                                                                                        
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        {selectedItem && (
                            <View style={styles.modalDetailsContainer}>

                                <View style={styles.modaldata}>
                                    <TouchableOpacity style={styles.closeButton} onPress={()=>closeModal()}>
                                        <FontAwesomeIcon icon={faTimes} size={35} style={styles.closeIcon} />
                                    </TouchableOpacity>
                                    <Text style={styles.modalTitle}>{selectedItem.name}</Text>

                                </View>
                                <Text style={styles.modalDetails}> {selectedItem.rules_terms}</Text>
                                {/* Add more details as necessary */}
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
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
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#333',
        marginVertical: 20,
    },
    text: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'justify',
        paddingHorizontal: 20,
        color: "#333",
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: "center",
        color: '#6CB47F',
    },
    cardwrap: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        marginHorizontal: 15,
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    cardDetails: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#333",
    },
    cardhead: {
        width: "60%",
        backgroundColor: '#01595A',
        padding: 15,
        justifyContent: 'center',
    },
    cardtext: {
        width: "40%",
        alignItems: "center",
        justifyContent: "center",
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
        elevation: 5,
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
        elevation: 5,
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
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,

        // alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        // position: "absolute",
        margin: 5,
        // 
    },
    closeIcon: {
        color: '#fff',
        fontSize: 27,
        position:'absolute',
        right: 10
    },
    modalDetailsContainer: {
        // alignItems: 'center',
        // justifyContent:"center"

    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 10,
        color: '#fff',
        textAlign: 'center'
    },
    modalDetails: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
        padding: 10,



    },
    modaldata: {

        backgroundColor: '#01595A',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20

    }
});

export default ChargesList;
