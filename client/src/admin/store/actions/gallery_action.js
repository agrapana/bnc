import axios from 'axios';
import {
    ADD_GALLERY,
    CLEAR_GALLERY,
    GET_GALLERY,
    GET_GALLERY_BY_ID,
    UPDATE_GALLERY,
    CLEAR_UPDATE_GALLERY
} from '../types';
import { GALLERY_SERVER } from '../misc';

export function addGallery(dataToSubmit) {
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
    const request = axios.post(`${GALLERY_SERVER}/addgallery`, formData)
        .then(response => response.data);

    return {
        type: ADD_GALLERY,
        payload: request
    }
}

export function clearGallery() {
    return {
        type: CLEAR_GALLERY,
        payload: ''
    }
}

export function updateGallery(dataToSubmit) {
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

    const request = axios.post(`${GALLERY_SERVER}/updategallery`, formData)
        .then(response => response.data);

    return {
        type: UPDATE_GALLERY,
        payload: request
    }
}

export function clearUpdateGallery() {
    return {
        type: CLEAR_UPDATE_GALLERY,
        payload: ''
    }
}

export function getGallery() {
    const request = axios.get(`${GALLERY_SERVER}/getgallery`)
        .then(response => response.data);

    return {
        type: GET_GALLERY,
        payload: request
    }
}

export function getGalleryByid(id){
    const request = axios.get(`${GALLERY_SERVER}/getgallerybyid?id=${id}&type=single`)
    .then(response => {
        return response.data[0]
    })

    return {
        type: GET_GALLERY_BY_ID,
        payload: request
    }
}