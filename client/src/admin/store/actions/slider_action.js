import axios from 'axios';
import {
    ADD_SLIDER,
    CLEAR_SLIDER,
    GET_SLIDER,
    GET_SLIDER_BY_ID,
    UPDATE_SLIDER,
    CLEAR_UPDATE_SLIDER
} from '../types';
import { SLIDER_SERVER } from '../misc';

export function addSlider(dataToSubmit) {
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

    const request = axios.post(`${SLIDER_SERVER}/addslider`, formData)
        .then(response => response.data);

    return {
        type: ADD_SLIDER,
        payload: request
    }
}

export function clearSlider() {
    return {
        type: CLEAR_SLIDER,
        payload: ''
    }
}

export function updateSlider(dataToSubmit) {
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

    const request = axios.post(`${SLIDER_SERVER}/updateslider`, formData)
        .then(response => response.data);

    return {
        type: UPDATE_SLIDER,
        payload: request
    }
}

export function clearUpdateSlider() {
    return {
        type: CLEAR_UPDATE_SLIDER,
        payload: ''
    }
}

export function getSlider() {
    const request = axios.get(`${SLIDER_SERVER}/getslider`)
        .then(response => response.data);

    return {
        type: GET_SLIDER,
        payload: request
    }
}

export function getSliderByid(id){
    const request = axios.get(`${SLIDER_SERVER}/getsliderbyid?id=${id}&type=single`)
    .then(response => {
        return response.data[0]
    })

    return {
        type: GET_SLIDER_BY_ID,
        payload: request
    }
}