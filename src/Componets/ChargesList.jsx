import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Data for the cards
const chargesData = [
    { title: 'Adult Entry', details: '₹40' },
    { title: 'Adult Entry with Food Packet', details: '₹60' },
    { title: 'Child Entry', details: '₹30' },
    { title: '2 Wheeler Parking', details: '₹15' },
    { title: '4 Wheeler Parking', details: '₹30' },
    { title: 'Photoshoot (4 hrs)', details: '₹2000' },
    { title: 'Photoshoot (1 hr)', details: '₹500' },
    { title: 'Video Shoot (6 hrs)', details: '₹5000' },
    { title: 'Video Shoot (Full day)', details: '₹10,000' },
    { title: 'Cinema (6 hrs)', details: '₹15,000' },
];

// The main component
const ChargesList = () => {
    return (
        <LinearGradient
            colors={['rgba(83, 174, 105, 0.39)', '#FBFFFC']}
            style={styles.container}
            start={{ x: 1.0, y: 1.0 }}
            end={{ x: 0.0, y: 0.0 }}
        >
            <ScrollView style={{marginTop:45}}>
                <Text style={styles.header}>BOTANICAL GARDEN CHARGES</Text>
                <Text style={styles.text}>
                    The Nehru Zoological Park is open to the public from Tuesday to Sunday (6 DAYS) and every Monday is a Zoo holiday. The government has enhanced the tariffs for entry into the Zoo from 10th August 2023 onwards.
                </Text>
                <Text style={styles.subHeader}>ENTRY FEE AND OTHER CHARGES</Text>
                {chargesData.map((item, index) => (
                    <View key={index} style={styles.cardwrap}>
                        <View style={styles.cardhead}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.cardtext}>
                            <Text style={styles.cardDetails}>{item.details}</Text>
                        </View>

                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        // backgroundColor: '#ffff',


    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        // marginBottom: 5,
        alignSelf: 'center',
        color: '#000000'
    },
    text: {
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'justify',
        padding: 10,
        color: "#000"
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: "center",
        color: '#6CB47F'
    },
    cardwrap: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 6,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        marginHorizontal: 15

    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffff'
    },
    cardDetails: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#000",

    },
    cardhead: {
        width: "60%",
        backgroundColor: '#01595A',
        height: '100%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center'
    },
    cardtext: {
        width: "40%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ChargesList;
