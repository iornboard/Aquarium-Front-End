
import Axios from 'axios'

import {
    INCREMENT,
    DECREMENT,
    SET_DIFF,
    SIGN_UP,
} from './types';


export function increment() {
    return {
        type: INCREMENT
    };
}

export function decrement() {
    return {
        type: DECREMENT
    };
}

export function setDiff(value) {
    return {
        type: SET_DIFF,
        diff: value
    };
}


export function signUp(value) {

    const request = Axios.post('/api/sign-up', value) 
    .then(response => response.data) 

    return {
        type: SIGN_UP,
        payload : request
    };
}

