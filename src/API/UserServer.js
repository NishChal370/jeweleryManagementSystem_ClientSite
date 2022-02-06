import { AXIOS, URL_DELETE_BILL_BY_ID, URL_GET_ALL_RATES, URL_GET_BILLS_SUMMARY, URL_GET_BILL_BY_ID, URL_GET_RATE_BY_DATE, URL_POST_BILL, URL_POST_SAVED_BILL, URL_SET_RATE } from "./Constant"


export const Fetch_Rate_By_Date = async (date)=>{
    return await AXIOS.get(URL_GET_RATE_BY_DATE+date);
}


export const Fetch_All_Rates = async ()=>{
    return await AXIOS.get(URL_GET_ALL_RATES);
}


export const Post_Rate = async (currentRate)=>{
    return await AXIOS.post(URL_SET_RATE, currentRate);
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