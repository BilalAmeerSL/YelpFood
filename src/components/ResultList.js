import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ResultDetails from './ResultDetils';
import { withNavigation } from 'react-navigation'

const ResultList = ({ title, results, navigation }) => {
    if(!results.length){
        return null;
    }
    return (
        <View style={styles.conatiner}>
            <Text style={styles.title}>{title}</Text>
            {/* <Text>Results:{results.length}</Text> */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={results}
                keyExtractor={result => result.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ResultShow', { id: item.id })}>
                            <ResultDetails result={item} />
                        </TouchableOpacity>
                    )
                }} />
        </View>
    );
}
const styles = StyleSheet.create({
    conatiner: {
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
        marginBottom: 5
    }
});
export default withNavigation(ResultList);