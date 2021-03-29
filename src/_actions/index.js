import Axios from 'axios'

import {
    INCREMENT,
    DECREMENT,
    SET_DIFF,
    JOIN,
    LOGIN,
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

export function join(value) {

    const request = Axios.post('/api/join', value) 
    .then(response => response.data) 

    return {
        type: JOIN,
        payload : request
    };
}

export function login(value) {

    const request = Axios.post('/api/login', value) 
    .then(response => response.data) 

    return {
        type: LOGIN,
        payload : request
    };
}
