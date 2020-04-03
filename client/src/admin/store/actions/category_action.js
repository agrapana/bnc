import axios from 'axios';
import {
    GET_CATEGORY,
    ADD_CATEGORY,
    CLEAR_CATEGORY
} from '../types';
import { CATEGORY_SERVER } from '../misc';

export function getCategories() {
    const request = axios.get(`${CATEGORY_SERVER}/getcategory`)
        .then(response => response.data);

    return {
        type: GET_CATEGORY,
        payload: request
    }
}

export function addCategory(dataToSubmit) {
    const request = axios.post(`${CATEGORY_SERVER}/addcategory`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_CATEGORY,
        payload: request
    }
}

export function clearCategory() {
    return {
        type: CLEAR_CATEGORY,
        payload: ''
    }
}