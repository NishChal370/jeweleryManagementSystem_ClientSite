// import axios from "axios";
// import { AXIOS, URL_GET_ALL_RATES } from "./Constant";

// export const set=async ()=>{
//     try {
//          const response = await axios.get(`http://127.0.0.1:8000/api/rates/`)
//                     .then(function (res) {
//                         // handle success
//                         console.log("INside usrl")
//                         console.log(res);
//                         return res;
//                     })
//                     .catch(function (error) {
//                         // handle error
//                         console.log(error);
//                     });
         
//          console.log("--------------------");
//          console.log(response);
//          console.log("--------------------");
//          return response;
//      } catch (error) {
//          // handle error
//          alert('Not Found');
//      }
//  };

// // export const set=async ()=>{
// //     try {
// //          const response = await AXIOS.get(URL_GET_ALL_RATES);
// //             // handle success; 
// //             console.log(response) 
// //             return response.data;
// //      } catch (error) {
// //          // handle error
// //          alert('Not Found');
// //      }
// //  };

// // export const set =async ()=>{
// //     try {
// //         await axios.get('http://127.0.0.1:8000/api/rates/')
// //         .then(function (response) {
// //             // handle success
// //             console.log("INside usrl")
// //             console.log(response);
// //             return response;
// //         })
// //         .catch(function (error) {
// //             // handle error
// //             console.log(error);
// //         });
        
// //     } catch (error) {
// //         // handle error
// //         alert('Not Found');
// //     }
    
// // }



// /**
//  * 
//  * export const set=async ()=>{
//    try {
//         // const response = await AXIOS.get(URL_GET_ALL_RATES);
//         // // handle success;  
//         // console.log("--------------------");
//         // console.log(response);
//         // console.log("--------------------");
//         const da = await AXIOS.get(URL_GET_ALL_RATES)
//             .then((response) => response.json())
//             .then(data => {
//                 console.log("---------INSIDE-----------");
//                 console.log(data);
//                 console.log("---------INSIDE-----------");
            
//                 return data['retrieve-agent']
//             })

//         // // handle success;  
//         console.log("--------------------");
//         console.log(da);
//         console.log("--------------------");
//         return da;
//     } catch (error) {
//         // handle error
//         alert('Not Found');
//     }
// };

//  */