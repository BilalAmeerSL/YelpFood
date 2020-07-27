import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ResultDetails = ({ result }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: result.image_url }} />
            <Text style={styles.name}>{result.name}</Text>
            <Text>{result.rating} Satrs, {result.review_count}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        marginLeft:15
    },
    image: {
        width: 150,
        height: 120,
        borderRadius: 4,
        marginBottom:5
    },
    name: {
        fontWeight: "bold",
    }
});
export default ResultDetails;