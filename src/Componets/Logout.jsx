
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
const Logout = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const showLogoutAlert = () => {
        setShowAlert(true);
    };

    const hideLogoutAlert = () => {
        setShowAlert(false);
    };

    const handleLogout = () => {
        // Perform logout operations here
        hideLogoutAlert();
        console.log('User logged out');
    };
    return (

        <View style={styles.langiconwrap}>
            <TouchableOpacity onPress={() => showLogoutAlert()} style={styles.logsty}>
                <Icon name="logout" size={34} color="#01595A" />
                <Text style={styles.logtext}>Log Out</Text>
            </TouchableOpacity>
            <View >
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Logout"
                    message="Are you sure you want to logout?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes"
                    confirmButtonColor="#01595A"
                    onCancelPressed={hideLogoutAlert}
                    onConfirmPressed={handleLogout}
                
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    langiconwrap: {
        // Add styles as needed
        padding: 3,

    },
    logsty: {
        flexDirection: 'row',
        flexWrap: 'wrap',


    },
    logtext: {
        fontSize: 20,
        fontWeight: '500',
        color: '#01595A',
        padding: 3
    }

});

export default Logout;
