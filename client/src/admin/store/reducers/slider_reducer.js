import {
    ADD_SLIDER,
    CLEAR_SLIDER,
    GET_SLIDER,
    GET_SLIDER_BY_ID,
    UPDATE_SLIDER,
    CLEAR_UPDATE_SLIDER
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_SLIDER:
            return {
                ...state,
                addSlider: action.payload
            }
        case CLEAR_SLIDER:
            return {
                ...state,
                addSlider: action.payload
            }
        case GET_SLIDER:
            return {
                ...state,
                getSlider: action.payload
            }
        case GET_SLIDER_BY_ID:
            return {
                ...state,
                getSliderByid: action.payload
            }
        case UPDATE_SLIDER:
            return {
                ...state,
                updateSlider: action.payload
            }
        case CLEAR_UPDATE_SLIDER:
            return {
                ...state,
                updateSlider: action.payload
            }
        default:
            return state;
    }
}