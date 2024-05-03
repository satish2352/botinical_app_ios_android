


import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions ,Text} from 'react-native';

const Gallery = () => {
    // Sample image data
    const images = [
        { id: 1, uri: require('../Assets/gallery/g2.png') },
        { id: 2, uri: require('../Assets/gallery/g1.png') },
        { id: 3, uri: require('../Assets/gallery/g3.png') },
        { id: 4, uri: require('../Assets/gallery/g4.png') },
        { id: 5, uri: require('../Assets/gallery/g5.png') },
        { id: 6, uri: require('../Assets/gallery/g6.png') },


        // Add more images as needed
    ];

    const renderImageItem = ({ item, index }) => {
        // For odd index, render a single image
        if (index % 2 !== 0) {
            return (
                <Image source={item.uri} style={[styles.image, styles.singleImage]} />
            );
        } else {
            // For even index, render two images side by side
            const nextImage = images[index + 2];
            if (nextImage) {
                return (
                    <View style={styles.imageContainer}>
                        <Image source={item.uri} style={[styles.image, styles.doubleImage]} />
                        <Image source={nextImage.uri} style={[styles.image, styles.doubleImage]} />
                    </View>
                );
            } else {
                // If there's no next image, render a single image
                return (
                    <Image source={item.uri} style={[styles.image, styles.singleImage]} />
                );
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>GALLERY</Text>
            <FlatList
                data={images}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderImageItem}
                contentContainerStyle={styles.flatListContent}
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
        // marginBottom: 5,
    },
    image: {
        width: '100%', // Divide by number of columns
        height: '100%', // Divide by number of columns
        margin: 5, // Adjust the margin as needed for spacing between images
        resizeMode: 'cover',
        borderRadius: 20
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
        // marginTop:40
    },
});

export default Gallery;
