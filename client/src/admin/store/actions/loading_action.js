import {
    ISLOADING
} from '../types';

export function loading(status) {
    return {
        type: ISLOADING,
        status
    }
}