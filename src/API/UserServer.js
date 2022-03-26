import { AXIOS, URL_CHANGE_PASSWORD, URL_CUSTOMER_ADDRESS_REPORT, URL_DELETE_BILL_BY_ID, URL_DELETE_PENDING_ORDER_BY_ID, URL_DELETE_STAFF_BY_ID, URL_GET_ADMIN_DETAIL, URL_GET_ALL_RATES, URL_GET_BILLS_SUMMARY, URL_GET_BILL_BY_ID, URL_GET_BILL_PRODUCTS_REPORT_MONTHLY, URL_GET_INCREMENT_REPORT, URL_GET_ORDERS_SUMMARY, URL_GET_ORDER_BY_ID, URL_GET_PENDING_ORDER_BY_ID, URL_GET_PENDING_ORDER_PRODUCT_BY_ID, URL_GET_RATE_BY_DATE, URL_GET_RATE_REPORT, URL_GET_SALES_REPORT, URL_GET_STAFF_DETAIL, URL_GET_STAFF_NAME_LIST, URL_GET_STAFF_WORK, URL_LOGIN, URL_LOGOUT, URL_POST_ADMIN_DETAIL, URL_POST_ASSIGNED_WORK, URL_POST_BILL, URL_POST_ORDER, URL_POST_ORDER_UPDATE, URL_POST_SAVED_BILL, URL_POST_STAFF, URL_RESET_PASSWORD, URL_RESET_PASSWORD_CONFIRM, URL_SET_RATE, URL_UPDATE_STAFF_BY_ID } from "./Constant"



export const Fetch_Rate_By_Date = async (date)=>{
    return await AXIOS.get(URL_GET_RATE_BY_DATE+date);
}


export const Fetch_All_Rates = async ()=>{
    return await AXIOS.get(URL_GET_ALL_RATES);
}


export const Post_Rate = async (currentRate)=>{
    return await AXIOS.post(URL_SET_RATE, currentRate);
}

export const Fetch_Rate_Report = async(param)=>{
    return await AXIOS.get(URL_GET_RATE_REPORT+param)
}

export const Post_Bill = async(newBill)=>{
    return await AXIOS.post(URL_POST_BILL, newBill);
}

export const Fetch_Bill_Summary = async(searchFor)=>{
    return await AXIOS.get(URL_GET_BILLS_SUMMARY+searchFor);
}

export const Fetch_Bill_By_Id = async(billId)=>{
    return await AXIOS.get(URL_GET_BILL_BY_ID+billId)
}

export const Post_Edited_Bill = async(editedBill)=>{
    return await AXIOS.post(URL_POST_SAVED_BILL, editedBill)
}

export const Delete_Bill_By_Id = async(billId)=>{
    return await AXIOS.delete(URL_DELETE_BILL_BY_ID+billId)
}

export const Post_Order = async(newOrder)=>{
    return await AXIOS.post(URL_POST_ORDER, newOrder)
}

export const Fetch_Orders_Summary = async(page)=>{
    return await AXIOS.get(URL_GET_ORDERS_SUMMARY+page);
}

export const Fetch_Order_By_Id = async(orderId)=>{
    return await AXIOS.get(URL_GET_ORDER_BY_ID+orderId)
}

export const Fetch_Pending_Order_Product_By_Id = async(orderId)=>{
    return await AXIOS.get(URL_GET_PENDING_ORDER_PRODUCT_BY_ID+orderId)
}

export const Post_Order_Update = async(editedOrder)=>{
    return await AXIOS.post(URL_POST_ORDER_UPDATE, editedOrder)
}

export const Delete_Pending_Order = async(orderId)=>{
    return await AXIOS.delete(URL_DELETE_PENDING_ORDER_BY_ID+orderId)
}

export const Get_Staff_Detail = async()=>{
    return await AXIOS.get(URL_GET_STAFF_DETAIL)
}

export const Post_Staff = async(staff)=>{
    return await AXIOS.post(URL_POST_STAFF, staff)
}

export const Delete_Staff_By_Id = async(staffId)=>{
    return await AXIOS.delete(URL_DELETE_STAFF_BY_ID+staffId)
}

export const Update_Staff_By_Id = async(staffId, staffDetail)=>{
    return await AXIOS.post(URL_UPDATE_STAFF_BY_ID+staffId, staffDetail)
}

export const Get_Staff_Names = async()=>{
    return await AXIOS.get(URL_GET_STAFF_NAME_LIST)
}

export const POST_Staff_Assign_Work = async(workDetail)=>{
    return await AXIOS.post(URL_POST_ASSIGNED_WORK, workDetail)
}

export const Fetch_Staff_Work = async(param)=>{
    return await AXIOS.get(URL_GET_STAFF_WORK+param)
}

export const Fetch_Customer_Address_Report = async()=>{
    return await AXIOS.get(URL_CUSTOMER_ADDRESS_REPORT)
}

export const Fetch_Increment_Report = async()=>{
    return await AXIOS.get(URL_GET_INCREMENT_REPORT)
}

export const Fetch_Bill_Product_Report_Monthly = async(date)=>{
    return await AXIOS.get(URL_GET_BILL_PRODUCTS_REPORT_MONTHLY+date)
}


export const Fetch_Sales_Report = async(date)=>{
    return await AXIOS.get(URL_GET_SALES_REPORT+date)
}



export const Post_Login = async(loginDetail)=>{
    return await AXIOS.post(URL_LOGIN, {username:loginDetail.email, password:loginDetail.password})
}

export const Post_Logout = async()=>{
    return await AXIOS.post(URL_LOGOUT,{refresh_token:localStorage.getItem('refresh_token')})
}

///send token to reset password in email
export const POST_RESET_PASSWORD = async(email)=>{
    return await AXIOS.post(URL_RESET_PASSWORD,email)
}

export const POST_RESET_PASSWORD_CONFIRM = async(detail)=>{
    return await AXIOS.post(URL_RESET_PASSWORD_CONFIRM,detail)
}

export const POST_CHANGE_PASSWORD = async(passwordDetail)=>{
    return await AXIOS.patch(URL_CHANGE_PASSWORD, passwordDetail)
}

export const GET_ADMIN_DETAIL = async()=>{
    return await AXIOS.get(URL_GET_ADMIN_DETAIL)
}


export const POST_ADMIN_DETAIL = async(adminDetail)=>{
    return await AXIOS.post(URL_POST_ADMIN_DETAIL, adminDetail)
}

// tried to create sepreeate file for axios and this works
// export const fetchTry = async ()=>{
//     return await axios.get(`http://127.0.0.1:8000/api/rates/`)
// }

// export const getTry= async()=>{
//     console.log("ME ");
//     return await AXIOS.get(URL_GET_ALL_RATES)
//             .then((result)=>{
//                 Toast.fire({
//                     icon: 'sucess',
//                     title: "Saved"
//                 });
                
//                 return result
//             })
//             .catch((error)=>{
//                 Toast.fire({
//                     icon: 'error',
//                     title: error+" unable to save"
//                 });

//                 return "Error!!"
//             });            
// }