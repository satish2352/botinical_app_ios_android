import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text, ActivityIndicator, RefreshControl, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Gallery = ({ route }) => {
    const id = route.params;
    const [images, setGalleryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(1);
    const { SelectedLanguage1 } = globalvariavle();
    const [refreshing, setRefreshing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image for the modal
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

    useEffect(() => {
        fetchData(start, SelectedLanguage1);
        return () => { console.log('Component will unmount'); };
    }, [SelectedLanguage1, start]);

    const fetchData = async (startValue, language, isRefreshing = false) => {
        const token = await AsyncStorage.getItem('token');

        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/get-gallery`, {
                start: startValue,
                language: language,
                gallery_category_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (isRefreshing) {
                setGalleryData(response.data.data);
            } else {
                setGalleryData((prevImages) => [...prevImages, ...response.data.data]);
            }
            setRefreshing(false);
        } catch (error) {
            console.error('Error fetching gallery data:', error);
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    const renderImageItem = ({ item, index }) => {
        // Render pairs of images
        const isEvenIndex = index % 2 === 0;
        const nextImage = images[index + 1];

        return (
            <View style={styles.imageContainer} key={`image-pair-${index}`}>
                {isEvenIndex && (
                    <>
                        <TouchableOpacity style={styles.imageWrapper} onPress={() => handleImagePress(item.image)}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                        </TouchableOpacity>
                        {nextImage && (
                            <TouchableOpacity style={styles.imageWrapper} onPress={() => handleImagePress(nextImage.image)}>
                                <Image source={{ uri: nextImage.image }} style={styles.image} />
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        );
    };

    const handleImagePress = (imageUri) => {
        setSelectedImage(imageUri);
        setModalVisible(true); // Show the modal with the selected image
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setStart(1);
        fetchData(1, SelectedLanguage1, true); // Pass true to indicate refreshing
    };

    const handleLoadMore = () => {
        setStart((prevStart) => prevStart + 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{SelectedLanguage1 === 'english' ? 'GALLERY' : 'గ్యాలరీ'}</Text>
            <FlatList
                data={images}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderImageItem}
                contentContainerStyle={styles.flatListContent}
                ListFooterComponent={
                    loading ? <ActivityIndicator size="large" color="#01595A" /> : (
                        <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                            <FontAwesomeIcon icon={faChevronDown} style={styles.icon} />
                        </TouchableOpacity>
                    )
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />

            {/* Modal for viewing the full image */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalBackground}>
                        <Image source={{ uri: selectedImage }} style={styles.fullImage} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    flatListContent: {
        paddingHorizontal: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageWrapper: {
        width: '48%', // Adjust width to create space for two images with margins
    },
    image: {
        width: '100%',
        height: 190, // Adjust height as needed
        borderRadius: 20,
        resizeMode: 'cover',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 15,
        alignSelf: 'center',
        color: '#000000',
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
    },
    fullImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Maintain aspect ratio
    },
});

export default Gallery;



// import React, { useEffect, useState } from 'react';
// import { View, FlatList, Image, StyleSheet, Dimensions, Text, ActivityIndicator, RefreshControl, TouchableOpacity, Alert } from 'react-native';
// import config from '../../config/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import ImageView from 'react-native-image-viewing';
// import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { useWindowDimensions } from 'react-native';

// const Gallery = ({ route }) => {
//     const id = route.params;
//     const [images, setGalleryData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [start, setStart] = useState(1);
//     const { SelectedLanguage1 } = globalvariavle();
//     const [refreshing, setRefreshing] = useState(false);
//     const [viewImageIndex, setViewImageIndex] = useState(null);
//     const [isImageViewVisible, setIsImageViewVisible] = useState(false);
//     const { width, height } = useWindowDimensions(); // Get window dimensions

//     useEffect(() => {
//         fetchData(start, SelectedLanguage1);
//         return () => { console.log('Component will unmount'); }
//     }, [SelectedLanguage1, start]);

//     const fetchData = async (startValue, language, isRefreshing = false) => {
//         const token = await AsyncStorage.getItem('token');
        
//         setLoading(true);
//         try {
//             const response = await axios.post(`${config.API_URL}auth/get-gallery`, {
//                 start: startValue,
//                 language: language,
//                 gallery_category_id: id
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             if (isRefreshing) {
//                 setGalleryData(response.data.data);
//             } else {
//                 setGalleryData((prevImages) => [...prevImages, ...response.data.data]);
//             }
//             setRefreshing(false);
//         } catch (error) {
//             console.error('Error fetching gallery data:', error);
//             Alert.alert('Error', 'Unable to fetch gallery data. Please try again later.');
//         } finally {
//             setRefreshing(false);
//             setLoading(false);
//         }
//     };

//     const renderImageItem = ({ item, index }) => {
//         if (index % 2 !== 0) {
//             return null;
//         } else {
//             const nextImage = images[index + 1];
//             if (nextImage) {
//                 return (
//                     <View style={styles.imageContainer} key={`image-pair-${index}`}>
//                         <TouchableOpacity onPress={() => { setIsImageViewVisible(true); setViewImageIndex(index); }}>
//                             <Image source={{ uri: item.image }} style={[styles.image, styles.doubleImage]} />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => { setIsImageViewVisible(true); setViewImageIndex(index + 1); }}>
//                             <Image source={{ uri: nextImage.image }} style={[styles.image, styles.doubleImage]} />
//                         </TouchableOpacity>
//                     </View>
//                 );
//             } else {
//                 return (
//                     <TouchableOpacity onPress={() => { setIsImageViewVisible(true); setViewImageIndex(index); }} key={item.id}>
//                         <Image source={{ uri: item.image }} style={[styles.image, styles.singleImage]} />
//                     </TouchableOpacity>
//                 );
//             }
//         }
//     };

//     const handleRefresh = () => {
//         setRefreshing(true);
//         setStart(1);
//         fetchData(1, SelectedLanguage1, true); // Pass true to indicate refreshing
//     };

//     const handleLoadMore = () => {
//         setStart((prevStart) => prevStart + 1);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>{SelectedLanguage1 === 'english' ? 'GALLERY' : 'గ్యాలరీ'}</Text>
//             <FlatList
//                 data={images}
//                 keyExtractor={(item, index) => `${item.id}-${index}`}
//                 renderItem={renderImageItem}
//                 contentContainerStyle={styles.flatListContent}
//                 ListFooterComponent={
//                     loading ? <ActivityIndicator size="large" color="#01595A" /> : (
//                         <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
//                             <FontAwesomeIcon icon={faChevronDown} style={styles.icon} />
//                         </TouchableOpacity>
//                     )
//                 }
//                 refreshControl={
//                     <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//                 }
//             />
//             <ImageView
//                 images={images.map(image => ({ uri: image.image }))}
//                 imageIndex={viewImageIndex}
//                 visible={isImageViewVisible}
//                 onRequestClose={() => setIsImageViewVisible(false)}
//                 presentationStyle="fullScreen" // Use full screen for better zooming experience
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//     },
//     flatListContent: {
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     imageContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         marginVertical: 5,
//     },
//     image: {
//         margin: 5,
//         borderRadius: 15,
//     },
//     singleImage: {
//         width: Dimensions.get('window').width - 20,
//         height: Dimensions.get('window').width > Dimensions.get('window').height ? (Dimensions.get('window').height - 20) * 0.75 : (Dimensions.get('window').width - 20) * 0.75, // Maintain aspect ratio
//     },
//     doubleImage: {
//         width: (Dimensions.get('window').width / 2) - 20,
//         height: ((Dimensions.get('window').width / 2) - 20) * 0.75, // Maintain aspect ratio
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         padding: 15,
//         alignSelf: 'center',
//         color: '#000000',
//         textAlign: 'center',
//         backgroundColor: '#F8F8F8',
//         borderBottomWidth: 1,
//         borderBottomColor: '#E0E0E0',
//     },
//     loadMoreButton: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         padding: 12,
//         backgroundColor: '#01595A',
//         borderRadius: 50,
//         marginVertical: 10,
//         width: 60,
//         alignSelf: "center",
//     },
//     icon: {
//         color: '#fff',
//         fontSize: 20,
//     },
// });

// export default Gallery;
