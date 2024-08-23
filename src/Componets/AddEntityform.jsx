import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { globalvariavle, useMyData } from '../../Navigtors/globlevariable/MyContext';
import ImageResizer from 'react-native-image-resizer';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import { log } from 'react-native-reanimated';
import axios from 'axios';
import Getcordinates from '../Reusablecompoent/Getcordinates';



const AddEntityform = ({ navigation, route }) => {
    const item = route.params;
    const id = item.id

    const { useerid, SelectedLanguage1 } = globalvariavle();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [selectedTree, setSeletedTree] = useState(null);
    const [selectedicons, setselecctedicons] = useState(null);
    const [selectedhieghttype, setselectedhieghttype] = useState('');
    const [selectedcanopyttype, setselectedcanopyttype] = useState('');
    const [selectedgirthtype, setselectedgirthtype] = useState('');
    const [english_botnical_name, setenglish_botnical_name] = useState(null);
    const [hindi_botnical_name, sethindi_botnical_name] = useState(null);
    const [english_common_name, setenglish_common_name] = useState(null);
    const [hindi_name, sethindi_name] = useState(null);
    const [hindi_common_name, sethindi_common_name] = useState(null);
    const [treeplantid, settreeplantid] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showmap, setshowmap] = useState(false);
    const [pickerError, setPickerError] = useState('');
    const [iconError, seticonError] = useState('');
    const [dropdowndata, setdropdowndata] = useState([]);
    const [icons, seticons] = useState([]);
    const [marker, setMarker] = useState(null); // State to store a single marker
    console.log('mmmmmmmm', marker);

    const initialFormState = {
        latitude: '',
        longitude: '',
        height: '',
        height_type: '',
        canopy: '',
        canopy_type: '',
        girth: '',
        english_description: '',
        girth_type: '',
        hindi_description: '',
        image: '',
        image_two: '',
        image_three: '',
        image_four: '',
        image_five: '',
        english_audio_link: '',
        hindi_audio_link: '',
        english_video_upload: '',
        hindi_video_upload: '',
    };

    const [formState, setFormState] = useState(initialFormState);



    const [errorState, setErrorState] = useState({
        errorlatitude: '',
        errorlongitude: '',
        errorheight: '',
        errorheight_type: '',
        errorcanopy: '',
        errorcanopy_type: '',
        errorgirth: '',
        errorenglish_description: '',
        errorgirth_type: '',
        errorhindi_description: '',
        errorimage: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        errorenglish_audio_link: '',
        errorhindi_audio_link: '',
        errorenglish_video_upload: '',
        errorhindi_video_upload: '',
    });
    console.log('6666', formState);

    useEffect(() => {
        const id = item.id

        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios.post(`${config.API_URL}auth/get-tree-plant`,
                    {
                        // tree_plant_id: id,
                        language: SelectedLanguage1,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setdropdowndata(response.data.data);
            } catch (error) {
                console.error('Error fetching tree data:', error);
            }
        };
        fetchData();
        Geticons();
        return () => {
            console.log('Component will unmount');
        };
    }, [SelectedLanguage1]);

    const Geticons = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await axios.post(`${config.API_URL}auth/get-icon`,
                {

                    language: SelectedLanguage1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            seticons(response.data.data);
        } catch (error) {
            console.error('Error fetching tree data:', error);
        }
    }

    const handleInputChange = (field, value) => {

        setFormState(prevState => ({ ...prevState, [field]: value }));


        if (field === "name") {
            setSelectedTree(value)
            const selectedItem = dropdowndata.find(item => item.english_name === value);
            setenglish_botnical_name(selectedItem.english_botnical_name)
            sethindi_botnical_name(selectedItem.hindi_botnical_name)
            setenglish_common_name(selectedItem.english_common_name)
            sethindi_common_name(selectedItem.hindi_common_name)
            sethindi_name(selectedItem.hindi_name)
            settreeplantid(selectedItem.id)
            setPickerError('')
        }
    };

    const selectMediaFile = async (mediaType, fieldname) => {
        setSelectedField(fieldname);
        try {
            const result = await DocumentPicker.pick({
                type: mediaType,
            });
            const data = (result[0]);

            setFormState((prevState) => ({
                ...prevState,
                [fieldname]: data,
            }));

            //   handleInputChange(selectedField, data);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User canceled the picker');
            } else {
                console.error(err);
            }
        }
    };
    const compressImage = async (uri, width, height, quality = 80) => {
        try {
            const resizedImage = await ImageResizer.createResizedImage(uri, width, height, 'JPEG', quality);
            return {
                uri: resizedImage.uri,
                name: resizedImage.name,
                filename: resizedImage.name,
                type: 'image/jpeg', // or response.assets[0].type if you have it
            };
        } catch (err) {
            console.warn('Image Resizing Error: ', err);
            throw err; // Re-throw error if needed
        }
    };


    const selectImage = async (field) => {
        const mediaType = field === 'audio' ? 'audio' : field === 'video' ? 'video' : 'photo';

        if (field === "video") {
            setSelectedField(field);
        }

        launchImageLibrary({
            mediaType: mediaType,
            includeBase64: false,
            quality: 1,
        }, async (response) => {
            if (response.didCancel) {
                console.warn('User cancelled file picker');
            } else if (response.errorCode) {
                console.warn('FilePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                const originalUri = asset.uri;
                const originalWidth = asset.width;
                const originalHeight = asset.height;

                try {
                    const compressedImageUri = await compressImage(originalUri, originalWidth * 0.5, originalHeight * 0.5);
                    handleInputChange(selectedField, compressedImageUri);
                    console.log('Compressed Image URI', compressedImageUri);
                    setModalVisible(false);
                } catch (err) {
                    console.warn('Failed to compress image', err);
                }
            } else {
                console.warn('No assets found in the response');
            }
        });
    };

    const handleFileSelection = (field) => {
        setSelectedField(field);
        setModalVisible(true);
    };

    const captureImage = (mediaType) => {
        launchCamera({
            mediaType,
            includeBase64: false,
        }, async (response) => {
            if (response.didCancel) {
                console.warn('User cancelled camera picker');
            } else if (response.errorCode) {
                console.warn('Camera Error: ', response.errorMessage);
            } else {
                const originalUri = response.assets[0].uri;
                const originalWidth = response.assets[0].width;
                const originalHeight = response.assets[0].height;
                console.warn('No valid URI found in the capture', originalUri);
                try {
                    const compressedImage = await compressImage(originalUri, originalWidth * 0.5, originalHeight * 0.5);
                    handleInputChange(selectedField, compressedImage);
                    console.log('Compressed Image Data', compressedImage);
                    setModalVisible(false);
                } catch (err) {
                    console.warn('Failed to compress image');
                }
            }
        });
    };
    const convertStateToFormData = (state) => {
        const formData = new FormData();

        Object.entries(state).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        return formData;
    };

    const handleRegistration = async () => {
        if (!selectedTree) {
            setPickerError('Please select a tree or plant.');
            return;
        }
        if (!selectedicons) {
            seticonError('Please select a icon name.');
            return;
        }
        // Convert formState to FormData
        const formData = convertStateToFormData(formState);

        // Validate fields
        let valid = true;

        // Clear previous errors
        let errors = {};

        // Validation checks
        const requiredFields = [
            { field: 'latitude', message: 'Latitude is required' },
            { field: 'longitude', message: 'Longitude is required' },
            { field: 'height', message: 'Height is required' },
            { field: 'height_type', message: 'Height type is required' },
            { field: 'canopy', message: 'Canopy is required' },
            { field: 'canopy_type', message: 'Canopy type is required' },
            { field: 'girth', message: 'Girth is required' },
            { field: 'girth_type', message: 'Girth type is required' },
            { field: 'english_description', message: 'English description is required' },
            { field: 'hindi_description', message: 'Hindi description is required' },
            { field: 'image', message: 'Image is required' },
            { field: 'english_audio_link', message: 'English audio link is required' },
            { field: 'hindi_audio_link', message: 'Hindi audio link is required' },
            { field: 'english_video_upload', message: 'English video upload is required' },
            { field: 'hindi_video_upload', message: 'Hindi video upload is required' },
        ];

        requiredFields.forEach(({ field, message }) => {
            const value = formState[field];

            // Check if value is empty or not provided
            if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
                errors[`error${field}`] = message;
                valid = false;
            } else {
                errors[`error${field}`] = '';
            }
        });

        // Update the error state
        setErrorState(prevState => ({ ...prevState, ...errors }));

        // Stop execution if form is not valid
        if (!valid) {
            console.log('Validation failed:', errors);
            return;
        }

        try {
            setLoading(true);
            // Retrieve the token from storage
            const token = await AsyncStorage.getItem('token');
            console.log('icon Id', selectedicons);

            // Make the API call
            const response = await axios.post(
                `${config.API_URL}auth/add-tree-plant-aminities?type=${id}`,
                formData,
                {
                    params: { tree_plant_id: treeplantid, icon_id: selectedicons },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Handle the response message
            if (response.data.status === 'false') {
                const messageString = Array.isArray(response.data.message)
                    ? response.data.message.join('\n') // Join array items with line breaks
                    : response.data.message;

                Alert.alert('Message', messageString);
            } else {
                console.log('Registration successful:', response.data.message);
                Alert.alert('Success', response.data.message);
                setFormState(initialFormState); // Reset form to initial state
                navigation.navigate('AddEntity');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };
    const handleLongPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setMarker(coordinate); // Set the marker to the new coordinate
        setFormState((prevState) => ({
            ...prevState,
            latitude: coordinate.latitude.toString(), // Convert to string if needed
            longitude: coordinate.longitude.toString(), // Convert to string if needed
        }));
    };

    const handleDragEnd = (event) => {
        const { coordinate } = event.nativeEvent;
        setMarker(coordinate); // Update marker position after dragging
        setFormState((prevState) => ({
            ...prevState,
            latitude: coordinate.latitude.toString(), // Convert to string if needed
            longitude: coordinate.longitude.toString(), // Convert to string if needed
        }));
    };
    const handleCloseMap = () => {
        setshowmap(false); // Hide the map
    };
    return (
        <LinearGradient
            colors={['#015A4A', '#89CE9B', '#89CE9B']}
            locations={[0, 1, 0.32]}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.contentContainer}
        >
            <ScrollView >
                <View style={styles.fromwrap}>
                    <Text style={{ fontSize: 25, fontWeight: '500', color: '#01595A', margin: 10, alignSelf: 'flex-start', marginHorizontal: 30 }}>{item.name}</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectedTree}
                            style={styles.pickervalue}
                            onValueChange={(itemValue) => { handleInputChange('name', itemValue) }}
                        >
                            <Picker.Item label="Name" value={selectedTree} />
                            {dropdowndata.map((data, index) => (
                                <Picker.Item key={index} label={data.english_name} value={data.english_name} />
                            ))}
                        </Picker>
                    </View>
                    {pickerError ? <Text style={styles.error}>{pickerError}</Text> : null}
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectedicons}
                            style={styles.pickervalue}
                            onValueChange={(itemValue) => { setselecctedicons(itemValue), seticonError('') }}
                        >
                            <Picker.Item label="Icons" value={selectedicons} />
                            {icons.map((data, index) => (
                                <Picker.Item key={index} label={data.name} value={data.id} />
                            ))}
                        </Picker>
                    </View>
                    {iconError ? <Text style={styles.error}>{iconError}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="नाम"
                        placeholderTextColor="black"

                        value={hindi_name}
                        editable={false}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="BOTANICAL NAME"
                        placeholderTextColor="black"
                        value={english_botnical_name}
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="वानस्पतिक नाम"
                        placeholderTextColor="black"
                        value={hindi_botnical_name}
                        editable={false}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="COMMON NAME"
                        placeholderTextColor="black"
                        value={english_common_name}
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="साधारण नाम"
                        placeholderTextColor="black"
                        value={hindi_common_name}
                        editable={false}
                    />

                    <View style={styles.inputwrap}>
                        <TextInput
                            style={styles.input2}
                            placeholder="LATITUDE"
                            placeholderTextColor="black"
                            value={formState.latitude}
                            onChangeText={(value) => handleInputChange('latitude', value)}
                        />
                        <TextInput
                            style={styles.input2}
                            placeholder="LONGITUDE "
                            placeholderTextColor="black"
                            value={formState.longitude}
                            onChangeText={(value) => handleInputChange('longitude', value)}
                        />
                    </View>
                    <TouchableOpacity style={[styles.button,{width:'40%',marginVertical:10}]} onPress={() => setshowmap(true)} >
                        <Text style={styles.buttonText}>Select On Map</Text>
                    </TouchableOpacity>
                    <View style={styles.errorwrap}>
                        {errorState.errorlatitude ? <Text style={styles.error}>{errorState.errorlatitude}</Text> : null}
                        {errorState.errorlongitude ? <Text style={styles.error}>{errorState.errorlongitude}</Text> : null}
                    </View>

                    <View style={styles.inputwrap}>
                        <TextInput
                            style={styles.input2}
                            placeholder="HEIGHT "
                            placeholderTextColor="black"
                            onChangeText={(value) => handleInputChange('height', value)}
                        />
                        <View style={styles.inputpicker}>
                            <Picker
                                selectedValue={selectedhieghttype}
                                style={styles.pickervalue}
                                onValueChange={(itemValue) => {
                                    setselectedhieghttype(itemValue);
                                    handleInputChange('height_type', itemValue); // Update form state with selected value
                                }}
                            >
                                <Picker.Item label="HEIGHT TYPE" value="" />
                                <Picker.Item label="CM" value="CM" />
                                <Picker.Item label="FEET" value="FEET" />
                            </Picker></View>

                    </View>
                    <View style={styles.errorwrap}>
                        {errorState.errorheight ? <Text style={styles.error}>{errorState.errorheight}</Text> : null}
                        {errorState.errorheight_type ? <Text style={styles.error}>{errorState.errorheight_type}</Text> : null}
                    </View>
                    <View style={styles.inputwrap}>
                        <TextInput
                            style={styles.input2}
                            placeholder="CANOPY "
                            placeholderTextColor="black"
                            onChangeText={(value) => handleInputChange('canopy', value)}
                        />

                        <View style={styles.inputpicker}>
                            <Picker
                                selectedValue={selectedcanopyttype}
                                style={styles.pickervalue}
                                onValueChange={(itemValue) => {
                                    setselectedcanopyttype(itemValue);
                                    handleInputChange('canopy_type', itemValue); // Update form state with selected value
                                }}
                            >
                                <Picker.Item label="CANOPY TYPE" value="" />
                                <Picker.Item label="CM" value="CM" />
                                <Picker.Item label="FEET" value="FEET" />
                            </Picker></View>
                    </View>
                    <View style={styles.errorwrap}>
                        {errorState.errorcanopy ? <Text style={styles.error}>{errorState.errorcanopy}</Text> : null}
                        {errorState.errorcanopy_type ? <Text style={styles.error}>{errorState.errorcanopy_type}</Text> : null}
                    </View>
                    <View style={styles.inputwrap}>
                        <TextInput
                            style={styles.input2}
                            placeholder="GIRTH "
                            placeholderTextColor="black"
                            onChangeText={(value) => handleInputChange('girth', value)}
                        />

                        <View style={styles.inputpicker}>
                            <Picker
                                selectedValue={selectedgirthtype}
                                style={styles.pickervalue}
                                onValueChange={(itemValue) => {
                                    setselectedgirthtype(itemValue);
                                    handleInputChange('girth_type', itemValue); // Update form state with selected value
                                }}
                            >
                                <Picker.Item label="GIRTH TYPE" value="" />
                                <Picker.Item label="CM" value="CM" />
                                <Picker.Item label="FEET" value="FEET" />
                            </Picker></View>
                    </View>
                    <View style={styles.errorwrap}>
                        {errorState.errorgirth ? <Text style={styles.error}>{errorState.errorgirth}</Text> : null}
                        {errorState.errorgirth_type ? <Text style={styles.error}>{errorState.errorgirth_type}</Text> : null}
                    </View>
                    <TextInput
                        style={[styles.input, styles.textArea]} // Combine styles for input and textArea
                        placeholder="DESCRIPTION"
                        placeholderTextColor="black"
                        onChangeText={(value) => handleInputChange('english_description', value)}
                        multiline={true}
                        numberOfLines={4} // Adjust the number of lines as needed
                    />
                    {errorState.errorenglish_description ? <Text style={styles.error}>{errorState.errorenglish_description}</Text> : null}
                    <TextInput
                        style={[styles.input, styles.textArea]} // Combine styles for input and textArea
                        placeholder="वर्णन"
                        placeholderTextColor="black"
                        onChangeText={(value) => handleInputChange('hindi_description', value)}
                        multiline={true}
                        numberOfLines={4} // Adjust the number of lines as needed
                    />
                    {errorState.errorhindi_description ? <Text style={styles.error}>{errorState.errorhindi_description}</Text> : null}
                    <View style={styles.inputwrap}>
                        <TouchableOpacity style={styles.buttonAUDIOVIDEO} onPress={() => selectMediaFile([types.audio], 'english_audio_link')}>
                            {formState.english_audio_link ? (<Icon name="check" size={34} color="#01595A" />)
                                :
                                (<Text style={styles.buttonText1}>SELECT AUDIO</Text>)}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAUDIOVIDEO} onPress={() => selectMediaFile([types.audio], 'hindi_audio_link')}>
                            {formState.hindi_audio_link ? (<Icon name="check" size={34} color="#01595A" />)
                                :
                                (<Text style={styles.buttonText1}>ऑडियो अपलोड</Text>)}

                        </TouchableOpacity>
                    </View>
                    <View style={styles.errorwrap}>
                        {errorState.errorenglish_audio_link ? <Text style={styles.error}>{errorState.errorenglish_audio_link}</Text> : null}
                        {errorState.errorhindi_audio_link ? <Text style={styles.error}>{errorState.errorhindi_audio_link}</Text> : null}
                    </View>
                    <View style={styles.inputwrap}>
                        <TouchableOpacity style={styles.buttonAUDIOVIDEO} onPress={() => selectMediaFile([types.video], 'english_video_upload')}>
                            {formState.english_video_upload ? (<Icon name="check" size={34} color="#01595A" />)
                                :
                                (<Text style={styles.buttonText1}>SELECT VIDEO</Text>)}

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAUDIOVIDEO} onPress={() => selectMediaFile([types.video], 'hindi_video_upload')}>
                            {formState.hindi_video_upload ? (<Icon name="check" size={34} color="#01595A" />)
                                :
                                (<Text style={styles.buttonText1}>वीडियो अपलोड</Text>)}

                        </TouchableOpacity>

                    </View>
                    <View style={styles.errorwrap}>
                        {errorState.errorenglish_video_upload ? <Text style={styles.error}>{errorState.errorenglish_video_upload}</Text> : null}
                        {errorState.errorhindi_video_upload ? <Text style={styles.error}>{errorState.errorhindi_video_upload}</Text> : null}
                    </View>
                    <TouchableOpacity style={[styles.buttonImageselect, { backgroundColor: '#01595A' }]} onPress={() => handleFileSelection('image')}>

                        {formState.image.uri ? (
                            <Image source={{ uri: formState.image.uri }} style={styles.image} />
                        ) : (
                            <Text style={[styles.buttonText1, { color: '#ffff' }]}>IMAGE 1</Text>

                        )}
                    </TouchableOpacity>
                    {errorState.errorimage ? <Text style={styles.error}>{errorState.errorimage}</Text> : null}
                    <View style={styles.optionalimagewrap}>
                        <TouchableOpacity style={styles.optionalimage} onPress={() => handleFileSelection('image_two')}>

                            {formState.image_two.uri ? (
                                <Image source={{ uri: formState.image_two.uri }} style={styles.image1} />
                            ) : (
                                <Text style={styles.buttonText1}>Image 2</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionalimage} onPress={() => handleFileSelection('image_three')}>
                            {formState.image_three.uri ? (
                                <Image source={{ uri: formState.image_three.uri }} style={styles.image1} />
                            ) : (
                                <Text style={styles.buttonText1}>Image 3</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionalimage} onPress={() => handleFileSelection('image_four')}>
                            {formState.image_four.uri ? (
                                <Image source={{ uri: formState.image_four.uri }} style={styles.image1} />
                            ) : (
                                <Text style={styles.buttonText1}>Image 4</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionalimage} onPress={() => handleFileSelection('image_five')}>
                            {formState.image_five.uri ? (
                                <Image source={{ uri: formState.image_five.uri }} style={styles.image1} />
                            ) : (
                                <Text style={styles.buttonText1}>Image 5</Text>
                            )}
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleRegistration} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        )}


                    </TouchableOpacity>

                </View>
                {/* Modal for file selection */}
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={() => captureImage('photo')} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Capture Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectImage('photo')} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Select from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            {showmap ? <Getcordinates marker={marker}
                handleLongPress={handleLongPress} handleDragEnd={handleDragEnd} handleCloseMap={handleCloseMap} /> : null}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    contentContainer: {
        flex: 1,
        justifyContent: "center"
    },
    input: {
        width: '90%',
        height: 45,
        borderColor: '#477E56',
        // borderWidth: 0.5,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        padding: 1,
        backgroundColor: '#ffff',
        fontSize: 16, // Font size of the input text
        fontWeight: '400',
        // marginVertical: 4,
        color: '#000'
    },
    input2: {
        width: '42%',
        height: 45,
        borderColor: '#477E56',
        borderWidth: 0.5,
        borderRadius: 25,
        paddingHorizontal: 15,
        // marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        padding: 1,
        backgroundColor: '#ffff',
        marginHorizontal: 8,
        color: '#000',
        fontSize: 16

    },
    inputpicker: {
        width: '42%',
        height: 45,
        borderColor: '#477E56',
        borderWidth: 0.5,

        // paddingHorizontal: 15,
        marginBottom: 5,
        backgroundColor: '#ffff',
        marginHorizontal: 8,
        color: '#000',

        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,


    },
    button: {
        width: '80%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#01595A',
        // alignSelf: 'flex-end',
        // marginRight: 25
    },
    buttonAUDIOVIDEO: {
        width: '40%',
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
        backgroundColor: '#A0A0A0',
        // alignSelf: 'flex-end',
        // marginRight: 25,
        // padding: 10
    },
    buttonImageselect: {
        width: '20%',
        height: 110,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
        backgroundColor: '#A0A0A0',
        // alignSelf: 'flex-end',
        // marginRight: 25,
        // padding: 10
    },
    optionalimage: {
        width: '15%',
        height: 85,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
        backgroundColor: '#A0A0A0',
        // alignSelf: 'flex-end',
        // marginRight: 25,
        // padding: 10,
        marginHorizontal: 10
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    buttonText1: {
        color: 'black',
        fontSize: 15,
        // fontWeight: '500',
    },
    langiconwrap: {
        alignSelf: 'flex-end',
        position: "absolute",
        padding: 10
    },
    langicon: {
        width: 45,
        height: 35,
    },
    fromwrap: {
        alignItems: 'center',
        margin: 10,
        marginVertical: 40




    },
    inputwrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems:"center"
        justifyContent: "center"

    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginHorizontal: 29

    },
    textArea: {
        height: 100, // Adjust the height as needed
        textAlignVertical: 'top', // Align text to the top of the input
    },
    picker: {

        width: '90%',
        height: 45,
        // borderWidth: 0.5,
        borderRadius: 25,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        backgroundColor: '#ffff',
        fontSize: 16, // Font size of the input text



    },
    optionalimagewrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4D8A5B',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center'
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    errorwrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-evenly',

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 60,
    },
    image1: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 80,
    },
    pickervalue: {
        color: '#000',
        // fontSize:20,
        bottom: 5

    }
})
export default AddEntityform

