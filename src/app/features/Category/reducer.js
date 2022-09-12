import { ERROR_FETCHING_CATEGORY, START_FETCHING_CATEGORY, SUCCESS_FETCHING_CATEGORY } from "./constant";

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    totalItems: 1,
    status: statusList.idle
}

export default function categoryReducer(state = initialState, {type, payload}) {
    switch (type) {
        case START_FETCHING_CATEGORY:
            return {...state, status: statusList.process}
        
        case ERROR_FETCHING_CATEGORY: 
            return {...state, status: statusList.error}
      
        case SUCCESS_FETCHING_CATEGORY: 
            return {...state, status: statusList.success, data: payload.data, totalItems: payload.count }
    
        default:
            return state
    }
}