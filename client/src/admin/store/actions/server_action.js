import axios from 'axios';
import {
    GET_SERVERS,
    ADD_SERVERS,
    CLEAR_SERVERS,
    UPDATE_SERVERS,
    CLEAR_UPDATE_SERVERS
} from '../types';
import { SERVERS_SERVER } from '../misc';

export function getServers() {
    const request = axios.get(`${SERVERS_SERVER}/getservers`)
        .then(response => response.data);

    return {
        type: GET_SERVERS,
        payload: request
    }
}

export function addServers(dataToSubmit) {
    const request = axios.post(`${SERVERS_SERVER}/addservers`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_SERVERS,
        payload: request
    }
}

export function clearServers() {
    return {
        type: CLEAR_SERVERS,
        payload: ''
    }
}

export function updateServers(dataToSubmit) {
    const request = axios.post(`${SERVERS_SERVER}/updateservers`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_SERVERS,
        payload: request
    }
}

export function clearUpdateServers() {
    return {
        type: CLEAR_UPDATE_SERVERS,
        payload: ''
    }
}