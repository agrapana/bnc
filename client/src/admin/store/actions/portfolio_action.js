import axios from 'axios';
import {
    ADD_PORTFOLIO,
    CLEAR_PORTFOLIO,
    GET_PORTFOLIO,
    GET_PORTFOLIO_BY_ID,
    UPDATE_PORTFOLIO,
    UPDATE_ADDITIONAL_PORTFOLIO,
    CLEAR_UPDATE_PORTFOLIO,
    CLEAR_UPDATE_ADDITIONAL_PORTFOLIO
} from '../types';
import { PORTFOLIO_SERVER } from '../misc';

export function addPortfolio(dataToSubmit) {
    // console.log(dataToSubmit, "<<<<<<<<data to submit from form")
    const formData = new FormData();
    for (const key in dataToSubmit) {
        if ((dataToSubmit[key])) {
            if (key === 'images') {
                dataToSubmit[key].forEach((img, i) => {
                    formData.append(`image${i}`, img);
                });
            } else {
                if (key !== 'additional'){
                    formData.append(key, dataToSubmit[key]);
                }
            }
        }
    }

    // console.log(formData, "<<<<<<<<formDataformDataformDataformData")
    const request = axios.post(`${PORTFOLIO_SERVER}/addportfolio`, formData)
        .then(response => response.data);

    return {
        type: ADD_PORTFOLIO,
        payload: request
    }
}

export function clearPortfolio() {
    return {
        type: CLEAR_PORTFOLIO,
        payload: ''
    }
}

export function updateAdditionalPortfolio(dataToSubmit, id) {
    const request = axios.post(`${PORTFOLIO_SERVER}/updateadditionalportfolio?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_ADDITIONAL_PORTFOLIO,
        payload: request
    }
}

export function clearUpdateAdditionalPortfolio() {
    return {
        type: CLEAR_UPDATE_ADDITIONAL_PORTFOLIO,
        payload: ''
    }
}

export function updatePortfolio (dataToSubmit) {
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

    const request = axios.post(`${PORTFOLIO_SERVER}/updateportfolio`, formData)
        .then(response => response.data);

    return {
        type: UPDATE_PORTFOLIO,
        payload: request
    }
}

export function clearUpdatePortfolio() {
    return {
        type: CLEAR_UPDATE_PORTFOLIO,
        payload: ''
    }
}

export function getPortfolio() {
    const request = axios.get(`${PORTFOLIO_SERVER}/getportfolio`)
        .then(response => response.data);

    return {
        type: GET_PORTFOLIO,
        payload: request
    }
}

export function getPortfolioByid(id){
    const request = axios.get(`${PORTFOLIO_SERVER}/getportfoliobyid?id=${id}&type=single`)
    .then(response => {
        return response.data[0]
    })

    return {
        type: GET_PORTFOLIO_BY_ID,
        payload: request
    }
}