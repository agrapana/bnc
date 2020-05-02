import axios from 'axios';
import {
    AUTH_CLIENT,
    LOGIN_CLIENT,
    VERIFY_PHONE,
    CONFIRM_PHONE_NUMBER,
    NAME_PIN,
    LOGOUT_CLIENT,
    STEAM_AUTH,
    LOGOUT_FROM_THIS_CLIENT
} from '../types';
import { CLIENT_SERVER } from '../misc';

export function logoutTeamLeague() {
    const request = axios.post(`${CLIENT_SERVER}/logoutfromthisteam`)
        .then(response => response.data);

    return {
        type: LOGOUT_FROM_THIS_CLIENT,
        payload: request
    }
}

export function clientauth() {
    const request = axios.get(`${CLIENT_SERVER}/clientauth`)
        .then(response => response.data);

    return {
        type: AUTH_CLIENT,
        payload: request
    }
}

export function verifyPhone(dataToSubmit) {
    const request = axios.post(`${CLIENT_SERVER}/verifyphone`, dataToSubmit)
        .then(response => response.data);

    return {
        type: VERIFY_PHONE,
        payload: request
    }
}

export function confirmPhoneNumber(dataToSubmit, token) {
    const request = axios.post(`${CLIENT_SERVER}/confirmphonenumber/${token}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: CONFIRM_PHONE_NUMBER,
        payload: request
    }
}

export function NamePin(dataToSubmit, token) {
    const request = axios.post(`${CLIENT_SERVER}/namepin?token=${token}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: NAME_PIN,
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