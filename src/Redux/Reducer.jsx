import { combineReducers } from "redux"

import { SET_LATEST_RATE } from "./Action"

const initialState = {
    latestRate : {rateId: '', date:'', hallmarkRate: 0, tajabiRate: 0 , silverRate:0},
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


const rootReducer =  combineReducers({latestRateReducer})


export default rootReducer;