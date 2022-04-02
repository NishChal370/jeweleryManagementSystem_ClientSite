export const SET_LATEST_RATE = 'GET_LATEST_RATE';
export const SET_ADMIN_INFO = 'GET_ADMIN_INFO'

const setLatestRate=(data)=>{
    return{
        type: SET_LATEST_RATE,
        payload: data
    }
}

const setAdminInfo=(data)=>{
    return{
        type: SET_ADMIN_INFO,
        payload: data
    }
}

export { setLatestRate, setAdminInfo }