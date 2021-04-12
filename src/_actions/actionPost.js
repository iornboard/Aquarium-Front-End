import Axios from 'axios'

import {
    CREATE_POST,
    POST,
} from './types';


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

