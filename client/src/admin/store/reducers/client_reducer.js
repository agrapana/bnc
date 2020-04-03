import {
    AUTH_CLIENT,
    LOGIN_CLIENT,
    LOGOUT_CLIENT,
    STEAM_AUTH
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_CLIENT:
            return {
                ...state,
                clientData: action.payload
            }
        case LOGIN_CLIENT:
            return {
                ...state,
                loginClientSuccess: action.payload
            }
        case LOGOUT_CLIENT:
            return { ...state }
        case STEAM_AUTH:
            return {
                ...state,
                steamAuth: action.payload
            }
        default:
            return state;
    }
}