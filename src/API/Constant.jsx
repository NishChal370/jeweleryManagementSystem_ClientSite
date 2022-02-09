import axios from "axios";

const AXIOS = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});


const URL_SET_RATE = 'rate-set/';
const URL_GET_ALL_RATES = 'rates/';
const URL_GET_RATE_BY_DATE = 'rate/';
const URL_GET_BILL_BY_ID = 'bill/'
const URL_POST_BILL = 'generate-bill/';
const URL_POST_SAVED_BILL = 'bill/update';
const URL_DELETE_BILL_BY_ID = 'bill/delete/';
const URL_GET_BILLS_SUMMARY = 'bills/summary';
const URL_POST_ORDER = 'place-order/';


export { 
    AXIOS,
    URL_SET_RATE, 
    URL_GET_ALL_RATES, 
    URL_GET_RATE_BY_DATE, 
    URL_POST_BILL,
    URL_GET_BILL_BY_ID,
    URL_POST_SAVED_BILL,
    URL_GET_BILLS_SUMMARY,
    URL_DELETE_BILL_BY_ID,
    URL_POST_ORDER,
    
}