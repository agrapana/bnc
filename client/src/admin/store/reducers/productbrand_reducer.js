import {
    GET_PRODUCTBRAND,
    ADD_PRODUCTBRAND,
    CLEAR_PRODUCTBRAND
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTBRAND:
            return {
                ...state,
                getProductbrand: action.payload
            }
        case ADD_PRODUCTBRAND:
            return {
                ...state,
                addProductbrand: action.payload
            }
        case CLEAR_PRODUCTBRAND:
            return {
                ...state,
                addProductbrand: action.payload
            }
        default:
            return state;
    }
}