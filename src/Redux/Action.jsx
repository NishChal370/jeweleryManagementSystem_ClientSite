export const SET_LATEST_RATE = 'GET_LATEST_RATE';


const setLatestRate=(data)=>{
    return{
        type: SET_LATEST_RATE,
        payload: data
    }
}

export { setLatestRate }