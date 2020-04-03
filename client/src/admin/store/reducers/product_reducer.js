import {
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BRAND_AND_LIMIT,
    UPDATE_PRODUCT,
    CLEAR_UPDATE_PRODUCT,
    UPDATE_ADDITIONAL_PRODUCT,
    CLEAR_UPDATE_ADDITIONAL_PRODUCT
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                addProduct: action.payload
            }
        case CLEAR_PRODUCT:
            return {
                ...state,
                addProduct: action.payload
            }
        case GET_PRODUCT:
            return {
                ...state,
                getProduct: action.payload
            }
        case GET_PRODUCTS:
            return {
                ...state,
                getProducts: action.payload
            }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                getProductByid: action.payload
            }
        case GET_PRODUCT_BRAND_AND_LIMIT:
            return {
                ...state,
                getProductBrandandLimit: action.payload
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                updateProduct: action.payload
            }
        case CLEAR_UPDATE_PRODUCT:
            return {
                ...state,
                updateProduct: action.payload
            }
        case UPDATE_ADDITIONAL_PRODUCT:
            return {
                ...state,
                updateAdditionalProduct: action.payload
            }
        case CLEAR_UPDATE_ADDITIONAL_PRODUCT:
            return {
                ...state,
                updateAdditionalProduct: action.payload
            }
        default:
            return state;
    }
}