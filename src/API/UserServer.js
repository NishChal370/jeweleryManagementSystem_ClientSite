import { AXIOS, URL_GET_ALL_RATES, URL_GET_RATE_BY_DATE, URL_SET_RATE } from "./Constant"


export const Fetch_Rate_By_Date = async (date)=>{
    return await AXIOS.get(URL_GET_RATE_BY_DATE+date);
}


export const Fetch_All_Rates = async ()=>{
    return await AXIOS.get(URL_GET_ALL_RATES);
}


export const Post_Rate = async (currentRate)=>{
    return await AXIOS.post(URL_SET_RATE, currentRate);
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