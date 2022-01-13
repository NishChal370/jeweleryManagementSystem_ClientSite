import { combineReducers } from "redux"

import { SET_LATEST_RATE } from "./Action"

const initialState = {
    latestDate : {},
}


const latestRateReducer=(state=initialState.latestDate , action)=>{
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