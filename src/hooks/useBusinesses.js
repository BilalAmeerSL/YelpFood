import { useState, useEffect } from 'react';
import yelp from '../api/yelp';

export default () => {
    const [results, setResults] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setLoading] = useState(true);

    const searchApi = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'san jose'
                }
            });
            setResults(response.data.businesses);
            setLoading(false);
            setErrMsg(null);
        } catch (err) {
            setLoading(false);
            setErrMsg('Something went wrong');
        }
    };
    useEffect(() => {
        searchApi('');
    }, []);
    return [searchApi, results, errMsg, isLoading];
};