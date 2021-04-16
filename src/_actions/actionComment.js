import Axios from 'axios'

import {
    GET_COMMENTS,
    CREATE_COMMENT
} from './types';


export function getComments() {

    const request = Axios.get('/api/comments') 
        .then(response => response.data) 

    return {
        type: GET_COMMENTS,
        payload : request
    };
}


export function createComment(value) {

    const request = Axios.post('/api/create-comment', value) 
        .then(response => response.data)

    return {
        type: CREATE_COMMENT,
        payload : request
    };
}

