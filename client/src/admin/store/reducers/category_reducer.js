import {
    GET_CATEGORY,
    ADD_CATEGORY,
    CLEAR_CATEGORY
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                getCategory: action.payload
            }
        case ADD_CATEGORY:
            return {
                ...state,
                addCategory: action.payload
            }
        case CLEAR_CATEGORY:
            return {
                ...state,
                addCategory: action.payload
            }
        default:
            return state;
    }
}