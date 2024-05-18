

// import React, { useEffect, useState } from 'react';
// import { View, FlatList, Image, StyleSheet, Dimensions, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
// import config from '../../config/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import ImageView from 'react-native-image-viewing';
// import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

// const Gallery = () => {
//     const [images, setGalleryData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [start, setStart] = useState(1);
//     const { SelectedLanguage1 } = globalvariavle();
//     const [refreshing, setRefreshing] = useState(false);
//     const [viewImageIndex, setViewImageIndex] = useState(null);
//     const [isImageViewVisible, setIsImageViewVisible] = useState(false);

//     useEffect(() => {
//         fetchData(start, SelectedLanguage1);
//         return () =>  { console.log('Component will unmount'); }
            
//     }, [SelectedLanguage1, start,refreshing]);

//     const fetchData = async (startValue, language) => {
//         const token = await AsyncStorage.getItem('token');
//         setLoading(true);
//         try {
//             const response = await axios.post(`${config.API_URL}auth/get-gallery`, {
//                 start: startValue,
//                 language: language,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             setGalleryData((prevImages) => [...prevImages, ...response.data.data]);
//             setRefreshing(false);
//         } catch (error) {
//             console.error('Error fetching gallery data:', error);
//         } 
//         finally {
//             setRefreshing(false);
//             setLoading(false);
            
//         }
//     };

//     const handleEndReached = () => {
//         if (!loading) {
//             setStart(start + 1);
//         }
//     };

//     const renderImageItem = ({ item, index }) => {
//         if (index % 2 !== 0) {
//             return (
//                 <TouchableOpacity onPress={() => { setIsImageViewVisible(true); setViewImageIndex(index); }}>
//                     <Image  source={{ uri: item.image }} style={[styles.image, styles.singleImage]} />
//                 </TouchableOpacity>
//             );
//         } else {
//             const nextImage = images[index + 1];
//             if (nextImage) {
//                 return (
//                     <View style={styles.imageContainer}>
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
//                     <TouchableOpacity onPress={() => { setIsImageViewVisible(true); setViewImageIndex(index); }}>
//                         <Image  source={{ uri: item.image }} style={[styles.image, styles.singleImage]} />
//                     </TouchableOpacity>
//                 );
//             }
//         }
//     };

//     const handleRefresh = () => {
//         setRefreshing(true);
//         setStart(1);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>GALLERY</Text>
//             <FlatList
//                 data={images}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={renderImageItem}
//                 contentContainerStyle={styles.flatListContent}
//                 onEndReached={handleEndReached}
//                 onEndReachedThreshold={0.5}
//                 ListFooterComponent={loading && <ActivityIndicator size="large" color="#01595A" />}
//                 refreshControl={
//                     <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//                 }
//             />
//             <ImageView
//                 images={images.map(image => ({ uri: image.image }))}
//                 imageIndex={viewImageIndex}
//                 visible={isImageViewVisible}
//                 onRequestClose={() => setIsImageViewVisible(false)}
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
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//         margin: 5,
//         resizeMode: 'cover',
//         borderRadius: 20,
//     },
//     singleImage: {
//         width: Dimensions.get('window').width - 20,
//         height: Dimensions.get('window').width - 200,
//     },
//     doubleImage: {
//         width: Dimensions.get('window').width / 2 - 20,
//         height: Dimensions.get('window').width / 2 - 55,
//     },
//     header: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         padding: 15,
//         alignSelf: 'center',
//         color: '#000000',
//     },
// });

// export default Gallery;

import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImageView from 'react-native-image-viewing';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Gallery = () => {
    const [images, setGalleryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(1);
    const { SelectedLanguage1 } = globalvariavle();
    const [refreshing, setRefreshing] = useState(false);
    const [viewImageIndex, setViewImageIndex] = useState(null);
    const [isImageViewVisible, setIsImageViewVisible] = useState(false);
    

    useEffect(() => {
        fetchData(start, SelectedLanguage1);
        return () => { console.log('Component will unmount'); }
    }, [SelectedLanguage1, start]);

    const fetchData = async (startValue, language, isRefreshing = false) => {
        const token = await AsyncStorage.getItem('token');
        
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}auth/get-gallery`, {
                start: startValue,
                language: language,
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
        if (index % 2 !== 0) {
            return null;
        } else {
            const nextImage = images[index + 1];
            if (nextImage) {
                return (
                    <View style={styles.imageContainer} key={`image-pair-${index}`}>
                        <TouchableOpacity onPress={() => { setIsImageViewVisible(true); setViewImageIndex(index); }} key={item.id}>
                            <Image source={{ uri: item.image }} style={[styles.image, styles.doubleImage]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIsImageViewVisible(true); setViewImageIndex(index + 1); }} key={nextImage.id}>
                            <Image source={{ uri: nextImage.image }} style={[styles.image, styles.doubleImage]} />
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (
                    <TouchableOpacity onPress={() => { setIsImageViewVisible(true); setViewImageIndex(index); }} key={item.id}>
                        <Image source={{ uri: item.image }} style={[styles.image, styles.singleImage]} />
                    </TouchableOpacity>
                );
            }
        }
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
            <Text style={styles.header}>GALLERY</Text>
            <FlatList
                data={images}
                keyExtractor={(item, index) => `${item.id}-${index}`}
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
            <ImageView
                images={images.map(image => ({ uri: image.image }))}
                imageIndex={viewImageIndex}
                visible={isImageViewVisible}
                onRequestClose={() => setIsImageViewVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    flatListContent: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: '100%',
        margin: 5,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    singleImage: {
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').width - 200,
    },
    doubleImage: {
        width: Dimensions.get('window').width / 2 - 20,
        height: Dimensions.get('window').width / 2 - 55,
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
});

export default Gallery;
