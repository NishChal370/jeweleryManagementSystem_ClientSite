import axios from "axios";

export const set=async ()=>{
   try {
        const response = await axios.get(`http://127.0.0.1:8000/api/rates/`);
        // handle success;  
        alert("Saved");
        console.log("--------------------");
        console.log(response);
        console.log("--------------------");
        return response;
    } catch (error) {
        // handle error
        alert('Not Found');
    }
};
