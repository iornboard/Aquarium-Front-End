import Axios from 'axios'

import {
    JOIN,
    LOGIN,
    CREATE_POST,
    POST
} from './types';


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
    .then(res => res.headers.authorization)

    return {
        type: LOGIN,
        payload : request
    };
}

export function CreatePost(value) {

    const request = Axios.post('/api/create-post', value) 
        .then(response => response.data)

    return {
        type: CREATE_POST,
        payload : request
    };
}

export function Post(value) {

    const request = Axios.post('/api/post', value) 
        .then(response => response.data) 

    return {
        type: POST,
        payload : request
    };
}

