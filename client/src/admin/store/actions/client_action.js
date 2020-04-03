import axios from 'axios';
import {
    AUTH_CLIENT,
    LOGIN_CLIENT,
    LOGOUT_CLIENT,
    STEAM_AUTH
} from '../types';
import { CLIENT_SERVER } from '../misc';

export function clientauth() {
    const request = axios.get(`${CLIENT_SERVER}/clientauth`)
        .then(response => response.data);

    return {
        type: AUTH_CLIENT,
        payload: request
    }
}

export function loginClient(dataToSubmit) {
    const request = axios.post(`${CLIENT_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_CLIENT,
        payload: request
    }
}

export function logoutClient() {
    const request = axios.get(`${CLIENT_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_CLIENT,
        payload: request
    }
}

export function steamAuth() {
    const request = axios.get(`${CLIENT_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: STEAM_AUTH,
        payload: request
    }
}