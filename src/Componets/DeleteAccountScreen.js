import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../../config/config';
// console.log('config',config.API_URL);
// Alert.alert('config',config.API_URL);

const DeleteAccountScreen = ({ navigation }) => {
    const [confirmChecked, setConfirmChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('role_id');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleDelete = async () => {
        if (!confirmChecked) {
            Alert.alert('Confirmation Required', 'Please check the box to confirm.');
            return;
        }

        Alert.alert(
            'Are you sure?',
            'This action is irreversible. Do you really want to delete your account?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('token');
                            setLoading(true);

                            const response = await axios.post(
                                `${config.API_URL}auth/delete-account`, // Replace with actual endpoint
                                {},
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );

                            setLoading(false);
                            Alert.alert('Success', 'Your account has been deleted.');
                            handleLogout();
                        } catch (error) {
                            setLoading(false);
                            console.error('Delete error:', error?.response?.data || error.message);
                            Alert.alert(
                                'Error',
                                error?.response?.data?.message || 'Failed to delete account. Please try again.'
                            );
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Delete Account</Text>

            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={confirmChecked}
                    onValueChange={setConfirmChecked}
                    tintColors={{ true: '#d32f2f', false: '#666' }}
                />
                <Text style={styles.label}>
                    I understand this action is permanent and cannot be undone.
                </Text>
            </View>

            <Text style={styles.warningText}>
                Deleting your account will remove all your data permanently from our system.
            </Text>

            <TouchableOpacity
                style={[
                    styles.deleteButton,
                    { backgroundColor: confirmChecked ? '#d32f2f' : '#aaa' },
                ]}
                disabled={!confirmChecked || loading}
                onPress={handleDelete}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Delete My Account</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
    warningText: {
        fontSize: 14,
        color: '#d32f2f',
        marginBottom: 30,
        lineHeight: 20,
    },
    deleteButton: {
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DeleteAccountScreen;
