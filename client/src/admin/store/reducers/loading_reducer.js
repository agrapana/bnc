import {
    ISLOADING
} from '../types';

const initialState = {
    isLoading: false
}

export default function LoadingState(state = initialState, action) {
    switch (action.type) {
        case ISLOADING:
            return {
                isLoading: action.status
            }
        default:
            return state;
    }
}