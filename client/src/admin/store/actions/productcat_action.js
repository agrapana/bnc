import axios from 'axios';
import {
    GET_PRODUCTCAT,
    ADD_PRODUCTCAT,
    CLEAR_PRODUCTCAT
} from '../types';
import { PRODUCTCAT_SERVER } from '../misc';

export function getProductcats() {
    const request = axios.get(`${PRODUCTCAT_SERVER}/getproductcat`)
        .then(response => response.data);

    return {
        type: GET_PRODUCTCAT,
        payload: request
    }
}

export function addProductcat(dataToSubmit) {
    const request = axios.post(`${PRODUCTCAT_SERVER}/addproductcat`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_PRODUCTCAT,
        payload: request
    }
}

export function clearProductcat() {
    return {
        type: CLEAR_PRODUCTCAT,
        payload: ''
    }
}