import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import yelp from '../api/yelp';
import { SliderBox } from "react-native-image-slider-box";
import { AirbnbRating } from 'react-native-ratings';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { Linking } from 'expo';

const ResultShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const id = navigation.getParam('id');
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
        setLoading(false);
    };
    useEffect(() => {
        setLoading(true);
        getResult(id);
    }, []);
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
    const showCategories = () => {
        return result.categories.map((item, index) => <Text key={index} >{item.title}, </Text>);
    }
    return (
        <View style={{ flex: 1 }}>
            {isLoading ?
                <ActivityIndicator size="large" color={"#bc2b78"} style={styles.loading} />
                : null}
            {result ? <View>
                <SliderBox images={result.photos} autoplay circleLoop />
                <View style={{ padding: 10 }}>
                    <AirbnbRating count={5} defaultRating={result.rating} isDisabled={true} size={20} showRating={false} />
                    <View style={styles.row}>
                        <Text style={styles.title}>{result.name}</Text>
                        <Text style={{ flex: 1, }}>{result.review_count} Reviews</Text>
                    </View>
                    <View style={styles.row}>

                        <Feather name="tag" style={{ padding: 2 }} />
                        <Text style={{ flex: 1 }}>
                            {showCategories()}</Text>

                        <Feather name="clock" style={{ padding: 2 }} />
                        {result.is_closed ? <Text>Closed</Text> :
                            <Text>Open</Text>}
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
            </View> : null}
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
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default ResultShowScreen;