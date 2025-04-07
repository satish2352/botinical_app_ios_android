import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CountCard = ({ count, name, style }) => {
    return (
        <View style={[styles.card]}>
            <Text style={styles.count}>{count}</Text>
            <Text style={styles.name}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: wp(35),
        height: wp(15),
        borderRadius: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        padding: 10,
        margin: 5,
        backgroundColor: '#01595A',

    },
    count: {
        fontSize: wp(4),
        fontWeight: 'bold',
        color: '#FFFFFF', // Fixed text color (e.g., white)
    },
    name: {
        fontSize: wp(4),
        marginTop: 1,
        color: '#FFFFFF', // Fixed text color (e.g., white)
        textAlign: "center"
    },
});

export default CountCard;
