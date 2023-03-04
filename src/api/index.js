import axios from 'axios';

const API_URL = `/api`;
const baseQuery = axios.create({
    baseURL: API_URL,
    responseType: 'json',
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

const API = {
    post: (address, body) => baseQuery
        .post(address, body)
        .then(({data}) => data)
        .catch(err => console.log(err)),
    get: (address) => baseQuery
        .get(address)
        .then(({data}) => data)
        .catch(err => console.log(err))
};
export default API;
