import axios from "axios";

const AXIOS = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});


const URL_SET_RATE = 'rate-set/';
const URL_GET_ALL_RATES = 'rates/';
const URL_GET_RATE_BY_DATE = 'rate/';


export { 
    AXIOS,
    URL_SET_RATE, 
    URL_GET_ALL_RATES, 
    URL_GET_RATE_BY_DATE, 
    
}