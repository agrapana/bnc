import axios from 'axios';
import {
    AUTH_USER,
    ADD_USER,
    CLEAR_ADD_USER,
    REGISTER_USER,
    CLEAR_REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GET_USERS,
    UPDATE_USER,
    CLEAR_UPDATE_USER,
    ADMIN_INSTALLATION
} from '../types';
import { USER_SERVER } from '../misc';

export function adminInstallation() {
    const request = axios.post(`${USER_SERVER}/initialinstallation`)
    .then(response => response.data);

return {
    type: ADMIN_INSTALLATION,
    payload: request
}
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function addUser(dataToSubmit) {
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

    const request = axios.post(`${USER_SERVER}/addnew`, formData)
        .then(response => response.data);

    return {
        type: ADD_USER,
        payload: request
    }
}

export function clearAddUser(){
    return {
        type: CLEAR_ADD_USER,
        payload: ''
    }
}

export function updateAdminUser(dataToSubmit) {
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

    const request = axios.post(`${USER_SERVER}/userupdate`, formData)
        .then(response => response.data);

    return {
        type: UPDATE_USER,
        payload: request
    }
}

export function clearUpdateAdminUser() {
    return {
        type: CLEAR_UPDATE_USER,
        payload: ''
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function clearRegisterUser(){
    return {
        type: CLEAR_REGISTER_USER,
        payload: ''
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function getAdminUser(){
    const request = axios.get(`${USER_SERVER}/adminusers`)
    .then(response => response.data);

    return {
        type: GET_USERS,
        payload: request
    }
}
