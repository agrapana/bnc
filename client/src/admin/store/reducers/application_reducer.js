import {
    ADD_APPLICATION,
    CLEAR_APPLICATION,
    ADD_APPLICATION_ICON,
    CLEAR_APPLICATION_ICON,
    ADD_APPLICATION_IMAGES,
    CLEAR_APPLICATION_IMAGES,
    ADD_APPLICATION_APK,
    CLEAR_APPLICATION_APK,
    UPDATE_APPLICATION,
    CLEAR_UPDATE_APPLICATION,
    UPDATE_APPLICATION_IMAGES,
    CLEAR_UPDATE_APPLICATION_IMAGES,
    GET_APPLICATION,
    GET_APPLICATION_BY_ID,
    DOWNLOAD_APPLICATION,
    PUBLISH_APPLICATION,
    CLEAR_PUBLISH_APPLICATION,
    UNPUBLISH_APPLICATION,
    CLEAR_UNPUBLISH_APPLICATION
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_APPLICATION:
            return {
                ...state,
                addApplication: action.payload
            }
        case CLEAR_APPLICATION:
            return {
                ...state,
                addApplication: action.payload
            }
        case UPDATE_APPLICATION:
            return {
                ...state,
                updateApplication: action.payload
            }
        case CLEAR_UPDATE_APPLICATION:
            return {
                ...state,
                updateApplication: action.payload
            }
        case ADD_APPLICATION_ICON:
            return {
                ...state,
                addApplicationIcon: action.payload
            }
        case CLEAR_APPLICATION_ICON:
            return {
                ...state,
                addApplicationIcon: action.payload
            }
        case ADD_APPLICATION_IMAGES:
            return {
                ...state,
                addApplicationImages: action.payload
            }
        case CLEAR_APPLICATION_IMAGES:
            return {
                ...state,
                addApplicationImages: action.payload
            }
        case ADD_APPLICATION_APK:
            return {
                ...state,
                addApplicationApk: action.payload
            }
        case CLEAR_APPLICATION_APK:
            return {
                ...state,
                addApplicationApk: action.payload
            }
        case UPDATE_APPLICATION_IMAGES:
            return {
                ...state,
                updateApplicationImages: action.payload
            }
        case CLEAR_UPDATE_APPLICATION_IMAGES:
            return {
                ...state,
                updateApplicationImages: action.payload
            }
        case PUBLISH_APPLICATION:
            return {
                ...state,
                publishApplication: action.payload
            }
        case CLEAR_PUBLISH_APPLICATION:
            return {
                ...state,
                publishApplication: action.payload
            }
        case UNPUBLISH_APPLICATION:
            return {
                ...state,
                unpublishApplication: action.payload
            }
        case CLEAR_UNPUBLISH_APPLICATION:
            return {
                ...state,
                unpublishApplication: action.payload
            }
        case GET_APPLICATION:
            return {
                ...state,
                getApplication: action.payload
            }
        case GET_APPLICATION_BY_ID:
            return {
                ...state,
                getApplicationByid: action.payload
            }
        case DOWNLOAD_APPLICATION:
            return {
                ...state,
                downloadApplication: action.payload
            }
        default:
            return state;
    }
}