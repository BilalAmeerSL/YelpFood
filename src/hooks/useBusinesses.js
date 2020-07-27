import { useState, useEffect } from 'react';
import yelp from '../api/yelp';

export default () => {
    const [results, setResults] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    const searchApi = async (searchTerm) => {
        try {
            console.log('Hi There');
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'san jose'
                }
            });
            setResults(response.data.businesses);
            setErrMsg(null);
        } catch (err) {
            setErrMsg('Something went wrong');
        }
    };
    useEffect(() => {
        searchApi('');
    }, []);
    return [searchApi, results, errMsg];
};