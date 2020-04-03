import {
    ADD_GALLERY,
    CLEAR_GALLERY,
    GET_GALLERY,
    GET_GALLERY_BY_ID,
    UPDATE_GALLERY,
    CLEAR_UPDATE_GALLERY
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_GALLERY:
            return {
                ...state,
                addGallery: action.payload
            }
        case CLEAR_GALLERY:
            return {
                ...state,
                addGallery: action.payload
            }
        case GET_GALLERY:
            return {
                ...state,
                getGallery: action.payload
            }
        case GET_GALLERY_BY_ID:
            return {
                ...state,
                getGalleryByid: action.payload
            }
        case UPDATE_GALLERY:
            return {
                ...state,
                updateGallery: action.payload
            }
        case CLEAR_UPDATE_GALLERY:
            return {
                ...state,
                updateGallery: action.payload
            }
        default:
            return state;
    }
}