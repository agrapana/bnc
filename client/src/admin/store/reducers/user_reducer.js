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

export default function (state = {}, action) {
    switch (action.type) {
        case ADMIN_INSTALLATION:
            return {
                ...state,
                adminInstallation: action.payload
            }
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            }
        case ADD_USER:
            return {
                ...state,
                addUser: action.payload
            }
        case CLEAR_ADD_USER:
            return {
                ...state,
                addUser: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                updateUser: action.payload
            }
        case CLEAR_UPDATE_USER:
            return {
                ...state,
                updateUser: action.payload
            }
        case REGISTER_USER:
            return {
                ...state,
                registerSuccess: action.payload
            }
        case CLEAR_REGISTER_USER:
            return {
                ...state,
                registerSuccess: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload
            }
        case LOGOUT_USER:
            return { ...state }
        case GET_USERS:
            return {
                ...state,
                getUser: action.payload
            }
        default:
            return state;
    }
}