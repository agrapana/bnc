import {
    GET_PRODUCTCAT,
    ADD_PRODUCTCAT,
    CLEAR_PRODUCTCAT
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTCAT:
            return {
                ...state,
                getProductcat: action.payload
            }
        case ADD_PRODUCTCAT:
            return {
                ...state,
                addProductcat: action.payload
            }
        case CLEAR_PRODUCTCAT:
            return {
                ...state,
                addProductcat: action.payload
            }
        default:
            return state;
    }
}