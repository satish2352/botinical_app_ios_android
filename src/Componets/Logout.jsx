

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalvariavle } from '../../Navigtors/globlevariable/MyContext';

const Logout = () => {
    const navigation = useNavigation();
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const { setid } = globalvariavle();

    const handleLogout = async () => {
        setShowAlert(false);
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('role_id');
            setid('');
            setShowSuccessAlert(true); // Show success alert
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowAlert(true)} style={styles.logoutButton}>
                <Icon name="logout" size={34} color="#01595A" />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
            
            {/* Confirmation Alert */}
            {
                showAlert? <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Logout"
                message="Are you sure you want to logout?"
                closeOnTouchOutside={true}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No"
                confirmText="Yes"
                confirmButtonColor="#01595A"
                onCancelPressed={() => setShowAlert(false)}
                onConfirmPressed={handleLogout}
            />:null
            }
           

            {/* Success Alert after logout */}
            <AwesomeAlert
                show={showSuccessAlert}
                showProgress={false}
                title="Logged Out"
                message="You have been logged out successfully."
                closeOnTouchOutside={true}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="#01595A"
                onConfirmPressed={() => setShowSuccessAlert(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 3,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#01595A',
        paddingLeft: 10, // Added padding for better spacing
    },
});

export default Logout;
