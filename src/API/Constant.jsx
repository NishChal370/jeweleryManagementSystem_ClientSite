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
const URL_GET_ORDER_BY_ID = 'order/';
const URL_POST_ORDER = 'place-order/';
const URL_POST_ORDER_UPDATE = 'order/update';
const URL_GET_ORDERS_SUMMARY = 'orders/summary/';
const URL_GET_STAFF_DETAIL = 'staff/';
const URL_POST_STAFF = 'staff/register/';

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
    URL_GET_ORDER_BY_ID,
    URL_GET_ORDERS_SUMMARY,
    URL_POST_ORDER_UPDATE,
    URL_POST_STAFF,
    URL_GET_STAFF_DETAIL,
}