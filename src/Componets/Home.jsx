

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Image, StatusBar, Text, TouchableWithoutFeedback, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
// import ImageZoom from 'react-native-image-pan-zoom';
// import Modal from 'react-native-modal';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
// import axios from 'axios';
// import config from '../../config/config';
// import RotatingImage from '../Reusablecompoent/RotatingImage';
// import Orientation from 'react-native-orientation-locker';
// const Home = () => {
//     const [isModalVisible, setModalVisible] = useState(true);
//     const [homedata, sethomedatadeatils] = useState([]);
//     const { SelectedLanguage1 } = globalvariavle();
//     const [loading, setLoading] = useState(true);
//     const [orientation, setOrientation] = useState('');
//     const toggleModal = () => {
//         setModalVisible(!isModalVisible);
//     };

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         const token = await AsyncStorage.getItem('token');
//     //         setLoading(true);
//     //         axios.post(
//     //             `${config.API_URL}get-home-data`,
//     //             {
//     //                 language: SelectedLanguage1,
//     //             },
//     //             {
//     //                 headers: {
//     //                     Authorization: `Bearer ${token}`,
//     //                 },
//     //             }
//     //         )
//     //         .then(response => {
//     //             sethomedatadeatils(response.data.data[0]);
//     //             setLoading(false);
//     //         })
//     //         .catch(error => {
//     //             console.error('Error fetching tree data:', error);
//     //             setLoading(false);
//     //         });
//     //     };

//     //     fetchData();
//     //     return () => {
//     //         console.log('Component will unmount');
//     //     };
//     // }, [SelectedLanguage1]);

//     useEffect(() => {
//         let isMounted = true; // To handle component unmounting properly
//         const fetchData = async () => {
//             try {
//                 setLoading(true); // Start loading
//                 const token = await AsyncStorage.getItem('token');
//                 // if (!token) throw new Error('Token not found');

//                 const response = await axios.post(
//                     `${config.API_URL}get-home-data`,
//                     {
//                         language: SelectedLanguage1,
//                     },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 if (isMounted) {
//                     sethomedatadeatils(response.data.data[0]); // Update state only if still mounted
//                 }
//             } catch (error) {
//                 console.error('Error fetching home data:', error);
//             } finally {
//                 if (isMounted) {
//                     setLoading(false); // Stop loading
//                 }
//             }
//         };

//         fetchData();
//         const orientationChangeListener = Orientation.addOrientationListener((newOrientation) => {
//             setOrientation(newOrientation);  // Update state on orientation change
//           });
//         return () => {
//             isMounted = false; // Cleanup function to prevent state update after unmount
//             Orientation.removeOrientationListener(orientationChangeListener);
//         };
//     }, [SelectedLanguage1]);
//     const stripHtmlTags = (str) => {
//         if (!str) return '';
//         let result = str.replace(/<\/?[^>]+(>|$)/g, '');
//         result = result.replace(/&nbsp;/g, ' ');
//         result = result.replace(/wikipedia/gi, '');
//         return result;
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar hidden={true} />

//             <TouchableWithoutFeedback onPress={toggleModal}>
//                 <View style={styles.zoomContainer}>
//                     <ImageZoom
//                         cropWidth={Dimensions.get('window').width}
//                         cropHeight={Dimensions.get('window').height}
//                         imageWidth={Dimensions.get('window').width}
//                         imageHeight={Dimensions.get('window').height}

//                     >
//                     <RotatingImage image={homedata.image} toggleModal={toggleModal}/>
//                     </ImageZoom>
//                     {loading && <ActivityIndicator size="large" color="red" />}
//                 </View>
//             </TouchableWithoutFeedback>

//             <Modal
//                 isVisible={isModalVisible}
//                 onBackdropPress={toggleModal}
//                 onSwipeComplete={toggleModal}
//                 swipeDirection="down"
//                 style={styles.modal}
//                 backdropTransitionOutTiming={4}
//             >
//                 <TouchableWithoutFeedback onPress={toggleModal}>
//                     <View style={styles.modalContent}>
//                         <View style={styles.modalHandle} />
//                         <Text style={styles.modalTitle}>{homedata.name}</Text>
//                         <ScrollView>
//                             {isModalVisible && (
//                                 <View>
//                                     <Text style={{ color: 'black', textAlign: 'justify' }}>
//                                         {stripHtmlTags(homedata.description)}
//                                     </Text>
//                                 </View>
//                             )}
//                         </ScrollView>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>

//             {!isModalVisible && (
//                 <TouchableWithoutFeedback onPress={toggleModal}>
//                     <View style={styles.bottomTitleContainer}>
//                         <View style={styles.modalHandle} />
//                         <Text style={styles.modalTitle}>{homedata.name}</Text>
//                     </View>
//                 </TouchableWithoutFeedback>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#A4C153'
//     },
//     zoomContainer: {
//         flex: 1,
//         // marginBottom:30
//     },
//     imageZoom: {
//         flex: 1,
//     },
//     image: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height,
//         resizeMode: 'center',

//     },
//     modal: {
//         justifyContent: 'flex-end',
//         margin: 0,
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         padding: 20,
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//     },
//     modalHandle: {
//         width: 60,
//         height: 5,
//         backgroundColor: '#ccc',
//         borderRadius: 2.5,
//         alignSelf: 'center',
//         marginBottom: 10,
//         bottom: 10
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     bottomTitleContainer: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         backgroundColor: 'white',
//         padding: 20,
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         elevation: 10,
//     },
// });

// export default Home;
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    FlatList
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import axios from 'axios';
import config from '../../config/config';
import RotatingImage from '../Reusablecompoent/RotatingImage';
import Orientation from 'react-native-orientation-locker';
import CountCard from '../Reusablecompoent/CountCard';

const Home = () => {
    const [isModalVisible, setModalVisible] = useState(true);
    const [homedata, setHomedataDetails] = useState({});
    const [countData, setCountData] = useState({});
    const { SelectedLanguage1 } = globalvariavle();
    const [loading, setLoading] = useState(true);
    console.log('count', countData);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Function to fetch home data
    const fetchData = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                `${config.API_URL}get-home-data`,
                {
                    language: SelectedLanguage1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data?.data?.[0]) {
                setHomedataDetails(response.data.data[0]);
            }
        } catch (error) {
            console.error('Error fetching home data:', error);
        } finally {
            setLoading(false);
        }
    };
    const countdata = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                `${config.API_URL}total-count`,
                {
                    language: SelectedLanguage1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data) {
                setCountData(response.data);
            }
        } catch (error) {
            console.error('Error fetching count data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchData();
        countdata();
        return () => {
        };
    }, [SelectedLanguage1]);
    useEffect(() => {
        const orientationChangeListener = Orientation.addOrientationListener(() => {
            fetchData(); // Fetch data on orientation change
        });
        return () => {
            Orientation.removeOrientationListener(orientationChangeListener);
        };
    }, []);

    const stripHtmlTags = (str) => {
        if (!str) return '';
        return str.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ').replace(/wikipedia/gi, '').trim();
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />

            <TouchableWithoutFeedback onPress={toggleModal}>

                <View style={styles.zoomContainer}>
                    <ImageZoom
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={Dimensions.get('window').width}
                        imageHeight={Dimensions.get('window').height}
                    >

                        <RotatingImage image={homedata.image} toggleModal={toggleModal} />

                    </ImageZoom>
                </View>
            </TouchableWithoutFeedback>
            <View style={{ position: "absolute", top: 45, flexDirection: "row", flexWrap: "wrap",justifyContent:"space-evenly" }}>
                <CountCard count={countData.zones ||0} name={SelectedLanguage1 === 'english' ? 'Theme Park' : 'థీమ్ పార్క్'} />
                <CountCard count={countData.ARVR ||0} name={SelectedLanguage1 === 'english' ? 'ARVR Amenities ' : 'ARVR సౌకర్యాలు'} />
                <CountCard count={countData.amenities ||0} name={SelectedLanguage1 === 'english' ? 'Total Facilities' : 'మొత్తం సౌకర్యాలు'} />
                <CountCard count={countData.typeoftickets||0} name={SelectedLanguage1 === 'english' ? 'Type of Tickets ' : 'టిక్కెట్‌ల రకం'} />
            </View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                onSwipeComplete={toggleModal}
                swipeDirection="down"
                style={styles.modal}
                backdropTransitionOutTiming={4}
            >
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>{homedata.name}</Text>
                        <ScrollView>
                            <Text style={{ color: 'black', textAlign: 'justify' }}>
                                {stripHtmlTags(homedata.description)}
                            </Text>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {!isModalVisible && (
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={styles.bottomTitleContainer}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>{homedata.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A4C153',
    },
    zoomContainer: {
        flex: 1,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalHandle: {
        width: 60,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    bottomTitleContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    list: {
        paddingHorizontal: 10, // Adds some padding around the list
    },
});

export default Home;
