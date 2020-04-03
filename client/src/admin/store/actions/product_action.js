import axios from 'axios';
import {
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT,
    UPDATE_ADDITIONAL_PRODUCT,
    CLEAR_UPDATE_PRODUCT,
    CLEAR_UPDATE_ADDITIONAL_PRODUCT,
    GET_PRODUCT_BRAND_AND_LIMIT
} from '../types';
import { PRODUCT_SERVER } from '../misc';

export function addProduct(dataToSubmit) {
    // console.log(dataToSubmit, "<<<<<<<<data to submit from form")
    const formData = new FormData();
    for (const key in dataToSubmit) {
        if ((dataToSubmit[key])) {
            if (key === 'images') {
                dataToSubmit[key].forEach((img, i) => {
                    formData.append(`image${i}`, img);
                });
            } else {
                formData.append(key, dataToSubmit[key]);
            }
        }
    }

    // console.log(formData, "<<<<<<<<formDataformDataformDataformData")
    const request = axios.post(`${PRODUCT_SERVER}/addproduct`, formData)
        .then(response => response.data);

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct() {
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

export function updateAdditionalProduct(dataToSubmit, id) {
    const request = axios.post(`${PRODUCT_SERVER}/updateadditionalproduct?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_ADDITIONAL_PRODUCT,
        payload: request
    }
}

export function clearUpdateAdditionalProduct() {
    return {
        type: CLEAR_UPDATE_ADDITIONAL_PRODUCT,
        payload: ''
    }
}

export function updateProduct(dataToSubmit) {
    const formData = new FormData();
    for (const key in dataToSubmit) {
        if ((dataToSubmit[key])) {
            if (key === 'imagesToAdd') {
                dataToSubmit[key].forEach((img, i) => {
                    formData.append(`image${i}`, img);
                });
            } else {
                formData.append(key, dataToSubmit[key]);
            }
        }
    }

    const request = axios.post(`${PRODUCT_SERVER}/updateproduct`, formData)
        .then(response => response.data);

    return {
        type: UPDATE_PRODUCT,
        payload: request
    }
}

export function clearUpdateProduct() {
    return {
        type: CLEAR_UPDATE_PRODUCT,
        payload: ''
    }
}

export function getProduct(limit, order, sortBy) {

    const request = axios.get(`${PRODUCT_SERVER}/getproduct?limit=${limit}&order=${order}&sortBy=${sortBy}`)
        .then(response => response.data);

    return {
        type: GET_PRODUCT,
        payload: request
    }
}

export function getProducts(limit, skip, filters = [], prevState = []) {
    const data = {
        limit,
        skip,
        filters
    }
    const request = axios.post(`${PRODUCT_SERVER}/getproducts`, data)
        .then(response => {
            let newState = [
                ...prevState,
                ...response.data.products
            ]
            return {
                category: response.data.category,
                products: newState
            }
        });

    return {
        type: GET_PRODUCTS,
        payload: request
    }
}

export function getProductbrandandlimit(name, limit) {
    const request = axios.get(`${PRODUCT_SERVER}/getbrandandlimit?id=${name}&limit=${limit}`)
        .then(response => response.data);

    return {
        type: GET_PRODUCT_BRAND_AND_LIMIT,
        payload: request
    }
}
export function getProductByid(id) {
    const request = axios.get(`${PRODUCT_SERVER}/getproductbyid?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        })

    return {
        type: GET_PRODUCT_BY_ID,
        payload: request
    }
}