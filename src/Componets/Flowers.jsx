// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const DATA = [
//     { id: '1', title: 'Lotus', image: require('../Assets/flowers/banyantree1.png'), description: 'The Lotus flower, known scientifically as Nelumbo nucifera, is a symbol of purity, enlightenment, self-regeneration, and rebirth. Its characteristics are a marvel because it flourishes in muddy waters and yet emerges unscathed, producing beautiful, fragrant flowers. This aquatic perennial is notable not just for its beauty but also for its significance in various cultures, especially in Eastern religions like Buddhism and Hinduism, where it represents spiritual awakening and purity of body, speech, and mind.' },
//     { id: '2', title: 'Lily', image: require('../Assets/flowers/Group1071.png'), description: 'The Lotus flower, known scientifically as Nelumbo nucifera, is a symbol of purity, enlightenment, self-regeneration, and rebirth. Its characteristics are a marvel because it flourishes in muddy waters and yet emerges unscathed, producing beautiful, fragrant flowers. This aquatic perennial is notable not just for its beauty but also for its significance in various cultures, especially in Eastern religions like Buddhism and Hinduism, where it represents spiritual awakening and purity of body, speech, and mind.' },
//     { id: '3', title: 'Rhododendron', image: require('../Assets/flowers/Rhododendron.png'), description: 'The Lotus flower, known scientifically as Nelumbo nucifera, is a symbol of purity, enlightenment, self-regeneration, and rebirth. Its characteristics are a marvel because it flourishes in muddy waters and yet emerges unscathed, producing beautiful, fragrant flowers. This aquatic perennial is notable not just for its beauty but also for its significance in various cultures, especially in Eastern religions like Buddhism and Hinduism, where it represents spiritual awakening and purity of body, speech, and mind.' },
//     { id: '4', title: 'Jarul', image: require('../Assets/flowers/banyantree2.png'), description: 'The Lotus flower, known scientifically as Nelumbo nucifera, is a symbol of purity, enlightenment, self-regeneration, and rebirth. Its characteristics are a marvel because it flourishes in muddy waters and yet emerges unscathed, producing beautiful, fragrant flowers. This aquatic perennial is notable not just for its beauty but also for its significance in various cultures, especially in Eastern religions like Buddhism and Hinduism, where it represents spiritual awakening and purity of body, speech, and mind.' },
//     { id: '5', title: 'Kanikonna', image: require('../Assets/flowers/banyantree3.png'), description: 'The Lotus flower, known scientifically as Nelumbo nucifera, is a symbol of purity, enlightenment, self-regeneration, and rebirth. Its characteristics are a marvel because it flourishes in muddy waters and yet emerges unscathed, producing beautiful, fragrant flowers. This aquatic perennial is notable not just for its beauty but also for its significance in various cultures, especially in Eastern religions like Buddhism and Hinduism, where it represents spiritual awakening and purity of body, speech, and mind.' },
//     { id: '6', title: 'Palash', image: require('../Assets/flowers/banyantree4.png'), description: 'The Lotus flower, known scientifically as Nelumbo nucifera, is a symbol of purity, enlightenment, self-regeneration, and rebirth. Its characteristics are a marvel because it flourishes in muddy waters and yet emerges unscathed, producing beautiful, fragrant flowers. This aquatic perennial is notable not just for its beauty but also for its significance in various cultures, especially in Eastern religions like Buddhism and Hinduism, where it represents spiritual awakening and purity of body, speech, and mind.' },
//     { id: '7', title: 'Lotus', image: require('../Assets/flowers/banyantree5.png'), description: 'The Lotus flower, known scientifically as Nelumbo nucifera, is a symbol of purity, enlightenment, self-regeneration, and rebirth. Its characteristics are a marvel because it flourishes in muddy waters and yet emerges unscathed, producing beautiful, fragrant flowers. This aquatic perennial is notable not just for its beauty but also for its significance in various cultures, especially in Eastern religions like Buddhism and Hinduism, where it represents spiritual awakening and purity of body, speech, and mind.' },
//     { id: '8', title: 'Lily', image: require('../Assets/flowers/banyantree6.png'), description: 'The Lotus flower, known scientifically as Nelumbo nucifera, is a symbol of purity, enlightenment, self-regeneration, and rebirth. Its characteristics are a marvel because it flourishes in muddy waters and yet emerges unscathed, producing beautiful, fragrant flowers. This aquatic perennial is notable not just for its beauty but also for its significance in various cultures, especially in Eastern religions like Buddhism and Hinduism, where it represents spiritual awakening and purity of body, speech, and mind.' },
// ];



// const Flowers = ({navigation}) => {
//     const [treeData, setTreeData] = useState([]);
//     useEffect(() => {

//         const fetchData = async () => {
//             const token = await AsyncStorage.getItem('token');

//             try {

//                 const response = await axios.post('https://botinical.com.sumagodemo.com/api/auth/get-flowers-list', {},{
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });

//                 setTreeData(response.data.data);

//             } catch (error) {
//                 console.error('Error fetching tree data:', error);
//             }
//         };
//         fetchData();
//     }, []);
//     const renderItem = ({ item }) => (
//         <TouchableOpacity style={styles.card} onPress={() => viewdetails(item)}>
//             <View><Image source={item.image} style={styles.image} /></View>

//             <View style={styles.textwrap}>
//                 <Text style={styles.title}>{item.title}</Text>
//             </View>

//         </TouchableOpacity>
//     );


//     const viewdetails = (data) => {
//         navigation.navigate('flowerdetails', data);
//     }
//     return (
//         <View style={styles.container}>
//             <LinearGradient
//                 colors={['#01595A', 'rgba(115, 115, 115, 0)']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.gradient}
//             >
//                 <Text style={styles.text}>FLOWERS</Text>
//             </LinearGradient>
//             <FlatList
//                 data={DATA}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 numColumns={2}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',





//     },
//     card: {
//         backgroundColor: '#FFF',
//         borderRadius: 10,
//         elevation: 3,
//         shadowOffset: { width: 1, height: 1 },
//         shadowColor: '#333',
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         margin: 8,
//         width: '45%',




//     },
//     title: {
//         fontSize: 18,
//         paddingVertical: 10,
//         textAlign: 'center',
//         color: '#fff'


//     },
//     image: {
//         width: '100%',
//         height: 160, // Adjust the height as needed
//         borderTopLeftRadius: 8,
//         borderTopRightRadius: 8,
//         resizeMode: "cover",
//         top: 10,

//     },
//     textwrap: {
//         alignItems: 'center',
//         backgroundColor: '#01595A',
//         width: '100%',
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//     },

//     text: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: '#fff'
//     },
//     gradient: {
//         width: '60%',
//         height: 50,
//         justifyContent: 'center',
//         alignSelf: 'flex-start',
//         marginHorizontal: 10,
//         padding: 10,
//         marginTop: 55
//     },
// });

// export default Flowers;




















import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

const Flowers = ({ navigation }) => {
    const [treeData, setTreeData] = useState([]);

    const { SelectedLanguage1 } = globalvariavle();

    useEffect(() => {
        fetchData();
    }, [SelectedLanguage1]);

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await axios.post(`${config.API_URL}auth/get-flowers-list`, {
                language: SelectedLanguage1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTreeData(response.data.data);
        } catch (error) {
            console.error('Error fetching flowers data:', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => viewdetails(item)}>
            <View><Image source={{ uri: item.image }} style={styles.image} /></View>
            <View style={styles.textwrap}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const viewdetails = (data) => {
        navigation.navigate('flowerdetails', data);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#01595A', 'rgba(115, 115, 115, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>FLOWERS</Text>
            </LinearGradient>
            <FlatList
                data={treeData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
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
        width: '47%',
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
        // top: 10,
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
        color: '#fff'
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
});

export default Flowers;
