import axios from "axios";


const AXIOS = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers:{
        Authorization: localStorage.getItem('access-token')
            ?'Bearer '+ localStorage.getItem('access-token')
            :null,
        'Content-Type': 'application/json',
        accept:'application/json',
    },
});


/**const AXIOS = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers:{
        Authorization: localStorage.getItem('access-token')
            ?'Bearer '+ localStorage.getItem('access-token')
            :null,
        'Content-Type': 'application/json',
        accept:'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    },
    withCredentials: true,
    credentials: "include",
});
 */
/***'Content-Type':'application/json',
        access:'application/json',
        withCredentials: true,
        credentials:true,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json', */

const URL_LOGIN ='login/';
const URL_LOGOUT ='logout/';

const URL_SET_RATE = 'rate-set/';
const URL_GET_ALL_RATES = 'rates/';
const URL_GET_RATE_BY_DATE = 'rate/';
const URL_GET_RATE_REPORT = 'rate/report/?type=';

const URL_GET_BILL_BY_ID = 'bill/'
const URL_POST_BILL = 'generate-bill/';
const URL_POST_SAVED_BILL = 'bill/update';
const URL_DELETE_BILL_BY_ID = 'bill/delete/';
const URL_GET_BILLS_SUMMARY = 'bills/summary';

const URL_GET_ORDER_BY_ID = 'order/';
const URL_POST_ORDER = 'place-order/';
const URL_POST_ORDER_UPDATE = 'order/update';
const URL_GET_ORDERS_SUMMARY = 'orders/summary/';
const URL_DELETE_PENDING_ORDER_BY_ID = 'order-delete/';
const URL_GET_PENDING_ORDER_PRODUCT_BY_ID = 'orderProduct/pending/';


const URL_GET_STAFF_DETAIL = 'staff/';
const URL_POST_STAFF = 'staff/register/';
const URL_GET_STAFF_WORK = 'staff/work/';
const URL_GET_STAFF_NAME_LIST = 'staff/name/';
const URL_DELETE_STAFF_BY_ID = 'staff/delete/';
const URL_UPDATE_STAFF_BY_ID = 'staff-update/';
const URL_POST_ASSIGNED_WORK = 'staff/assign/work/';


const URL_GET_SALES_REPORT ='/sales/report/?date=';
const URL_CUSTOMER_ADDRESS_REPORT = '/customer/report/';
const URL_GET_INCREMENT_REPORT = '/bill-order-staffwork/increment/report/';
const URL_GET_BILL_PRODUCTS_REPORT_MONTHLY = '/bill-product/monthly/report/?date=';



export { 
    AXIOS,
    URL_SET_RATE, 
    URL_GET_ALL_RATES, 
    URL_GET_RATE_REPORT,
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
    URL_DELETE_PENDING_ORDER_BY_ID,
    URL_GET_PENDING_ORDER_PRODUCT_BY_ID,
    URL_POST_STAFF,
    URL_GET_STAFF_DETAIL,
    URL_DELETE_STAFF_BY_ID,
    URL_UPDATE_STAFF_BY_ID,
    URL_GET_STAFF_NAME_LIST,
    URL_POST_ASSIGNED_WORK,
    URL_GET_STAFF_WORK,
    URL_GET_INCREMENT_REPORT,
    URL_CUSTOMER_ADDRESS_REPORT,
    URL_GET_BILL_PRODUCTS_REPORT_MONTHLY,
    URL_GET_SALES_REPORT,

    URL_LOGIN,
    URL_LOGOUT,
}