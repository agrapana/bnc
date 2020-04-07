import {
    GET_SERVERS,
    ADD_SERVERS,
    CLEAR_SERVERS,
    UPDATE_SERVERS,
    CLEAR_UPDATE_SERVERS
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_SERVERS:
            return {
                ...state,
                getServers: action.payload
            }
        case ADD_SERVERS:
            return {
                ...state,
                addServers: action.payload
            }
        case CLEAR_SERVERS:
            return {
                ...state,
                addServers: action.payload
            }
        case UPDATE_SERVERS:
            return {
                ...state,
                updateServers: action.payload
            }
        case CLEAR_UPDATE_SERVERS:
            return {
                ...state,
                updateServers: action.payload
            }
        default:
            return state;
    }
}