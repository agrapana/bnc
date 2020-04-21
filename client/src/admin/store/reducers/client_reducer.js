import {
    AUTH_CLIENT,
    LOGIN_CLIENT,
    VERIFY_PHONE,
    CONFIRM_PHONE_NUMBER,
    NAME_PIN,
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
        case VERIFY_PHONE:
            return {
                ...state,
                verifyPhone: action.payload
            }
        case CONFIRM_PHONE_NUMBER:
            return {
                ...state,
                clientDataConfirm: action.payload
            }
        case NAME_PIN:
            return {
                ...state,
                namePin: action.payload
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