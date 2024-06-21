
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Home = ({ navigation }) => {
    const carouselData = [
        { image: require('../Assets/s1.jpg') },
        { image: require('../Assets/s2.jpg') },
        { image: require('../Assets/s3.jpg') },
      
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [searchText, setSearchText] = useState('');

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.carouselItem}>
                <Image style={styles.carouselImage} source={item.image} />
            </View>
        );
    };

    return (
        <View style={styles.maincontainer}>
            <View style={styles.subcontainer1}>

                <Image style={styles.Image} source={require('../Assets/map.png')} />
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Search"
                        placeholderTextColor="#A9A9A9"
                    />
                    <TouchableOpacity style={styles.searchButton}>
                        <FontAwesomeIcon icon={faSearch} size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.carouselwrap}>
                    <Carousel
                        data={carouselData}
                        renderItem={renderItem}
                        sliderWidth={wp(100)}
                        autoplay={true}
                        itemWidth={wp(90)} // Set item width to full width
                        onSnapToItem={(index) => setActiveIndex(index)}
                        autoplayInterval={5000}
                        loop={true} 
                    />
                    <View style={styles.paginationContainer}>
                        <Pagination
                            dotsLength={carouselData.length}
                            activeDotIndex={activeIndex}
                            dotStyle={styles.paginationDot}
                            inactiveDotStyle={styles.paginationInactiveDot}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </View>
                </View>
                <ScrollView>
                <View style={styles.headingwrap}>
                    <Text style={styles.headtext}>ZONE 1</Text>
                    <Text style={{ color: '#000', textAlign: 'justify' }}> Butterfly Park presents an innumerable variety of butterflies that cane spotted throughout the year. Hyderabad Zoo is the first zoo in the country to start a park solely dedicated to butterflpresents an innumerable variety of butterflies that can be spotted throughout the year. Hyderabad Zoo is the first zoo in the country to start a park solely dedicated to butterflies. dedicated to butterflies.Established in 1988, Butterfly Park 988, Butterfly Park presents an innumerable variety of butterflies that can bButterfly Park 988, Butterfly Park presents an innumerable variety of butterflies that cane spotted throughout the year. Hyderabad Zoo is the first zoo in the country to start a park solely dedicated to butterflpresents an innumerable variety of butterflies that can be spotted throughout the year. Hyderabad Zoo is the first zoo in the country to start a park
                    </Text>
                </View>
                </ScrollView>
            </View>

            <View style={styles.buttonview}>
                <TouchableOpacity style={styles.button} >

                    <Text style={styles.buttonText}>Audio</Text>
                    <Icon name="multitrack-audio" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Video</Text>
                    <Icon name="ondemand-video" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Set background color,

    },
    contentContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        // position: 'relative',


    },
    carouselItem: {
        width: '100%', // Set width to full width
        height: hp(28),
        borderRadius: 10,
        overflow: 'hidden',
        // marginBottom: 10,

    },
    carouselImage: {
        // flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    paginationContainer: {
        position: 'absolute',
        top: hp(20), // Adjust top position as needed

    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 12,
        backgroundColor: '#ffff',
        marginHorizontal: 4,

    },
    paginationInactiveDot: {
        backgroundColor: '#C4C4C4',

    },
    button: {
        width: '40%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#01595A',
        margin: 10,

    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
        margin: 10
    },
    headingwrap: {
        // alignItems: 'flex-start',
        // bottom: 30,
        // position: "absolute",
        marginHorizontal: 15,
        // marginTop:40
    },
    headtext: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        color: '#000000',
        // marginHorizontal: 15,

    },
    buttonview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
      backgroundColor:'transparent'
    },
    Image: {
        height: hp(55),
        width: "100%",
        resizeMode: 'cover'
    },

    subcontainer1: {
        flex: 1,
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 45,
        // marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#ffff',
        borderRadius: 30,
        borderWidth: 1,
        height: 50, // Adjust the height as needed
        position: "absolute",
        width: "90%"


    },
    searchInput: {
        // flex: 1,
        fontSize: 16,
        color:'#000'

    },
    searchButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#01595A',
        marginLeft: 10,
    },
    carouselwrap:{
        alignItems:"center",
        justifyContent:'center',
        height:'50%',
    padding:10

    }
});

export default Home;
