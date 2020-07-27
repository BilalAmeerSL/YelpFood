import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import useBusinesses from '../hooks/useBusinesses';
import ResultList from '../components/ResultList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errMsg, isLoading] = useBusinesses();
  const filterResultByPrice = (price) => {
    return results.filter(result => {
      return result.price === price;
    })
  };
  return (
    <View style={{ flex: 1 }}>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => searchApi(term)} />
      {errMsg ? <Text>{errMsg}</Text> : null}
      {/* <Text>We have found {results.length} results</Text> */}
      <ScrollView>
        <ResultList results={filterResultByPrice('$')} title='Cost Effective' />
        <ResultList results={filterResultByPrice('$$')} title='Bit Pricier' />
        <ResultList results={filterResultByPrice('$$$')} title='Big Spender' />

        <ResultList results={filterResultByPrice('$')} title='Cost Effective' />
        <ResultList results={filterResultByPrice('$$')} title='Bit Pricier' />
      </ScrollView>
      {isLoading ? <ActivityIndicator size="large" color={"#bc2b78"} style={styles.loading} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SearchScreen;
