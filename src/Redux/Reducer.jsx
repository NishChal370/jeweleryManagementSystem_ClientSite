import { combineReducers } from "redux"

import { SET_LATEST_RATE, SET_ADMIN_INFO } from "./Action"

const initialState = {
    latestRate : {rateId: '', date:'', hallmarkRate: 0, tajabiRate: 0 , silverRate:0},
    adminInfo : {profileImage: null, name: ''},
}


const latestRateReducer=(state=initialState.latestRate , action)=>{
    switch (action.type) {
        case SET_LATEST_RATE:
            return{
                state,
                data : action.payload
            }
    
        default:
            return state
    }
}


const adminInfoReducer =(state=initialState.adminInfo , action)=>{
    switch (action.type) {
        case SET_ADMIN_INFO:
            return{
                state,
                data : action.payload
            }
    
        default:
            return state
    }
}


const rootReducer =  combineReducers({latestRateReducer, adminInfoReducer})


export default rootReducer;