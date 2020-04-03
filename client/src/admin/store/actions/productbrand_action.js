import axios from 'axios';
import {
    GET_PRODUCTBRAND,
    ADD_PRODUCTBRAND,
    CLEAR_PRODUCTBRAND
} from '../types';
import { PRODUCTBRAND_SERVER } from '../misc';

export function getProductbrands() {
    const request = axios.get(`${PRODUCTBRAND_SERVER}/getproductbrand`)
        .then(response => response.data);

    return {
        type: GET_PRODUCTBRAND,
        payload: request
    }
}

export function addProductbrand(dataToSubmit) {
    const request = axios.post(`${PRODUCTBRAND_SERVER}/addproductbrand`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_PRODUCTBRAND,
        payload: request
    }
}

export function clearProductbrand() {
    return {
        type: CLEAR_PRODUCTBRAND,
        payload: ''
    }
}