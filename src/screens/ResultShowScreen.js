import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import yelp from '../api/yelp';
import { SliderBox } from "react-native-image-slider-box";
import { AirbnbRating } from 'react-native-ratings';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import { Linking } from 'expo';

const ResultShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        console.log(response.data);
        setResult(response.data);
    };
    useEffect(() => {
        getResult(id);
    }, []);
    if (!result) {
        return null;
    }
    const dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };
    const openMap = (lat, lng) => {
        const latLng = `${lat},${lng}`;
        if (Platform.OS === 'android') { link = `geo:${latLng}`; }
        else { link = `maps:${latLng}`; }
        Linking.openURL(link);
    };
    return (
        <View>
            <SliderBox images={result.photos} autoplay circleLoop />
            <View style={{ padding: 10 }}>
                <AirbnbRating count={5} defaultRating={result.rating} isDisabled={true} size={20} showRating={false} />
                <View style={styles.row}>
                    <Text style={styles.title}>{result.name}</Text>
                    <Text style={{ flex: 1, }}>{result.review_count} Reviews</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.address}>{result.location.address1 + "\n" + result.location.city + "," + result.location.country}</Text>
                    <TouchableOpacity style={styles.icon} >
                        <Button onPress={() => { openMap(result.coordinates.latitude, result.coordinates.longitude) }} icon={
                            <Feather name="map-pin" color="white" />
                        } />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} >
                        <Button onPress={() => { dialCall(result.phone) }} icon={
                            <Feather name="phone-call" color="white" />
                        } />
                    </TouchableOpacity>
                </View>
            </View >
        </View>
    );
};
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 300
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        flex: 2.5
    },
    address: {
        flex: 2.5,
        alignItems: "flex-start"
    },
    icon: { padding: 10 },
    row: {
        flexDirection: "row",
        justifyContent: "center", alignItems: "center"
    }
});
export default ResultShowScreen;