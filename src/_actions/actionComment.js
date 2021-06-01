import Axios from 'axios'

import {
    GET_COMMENTS,
    CREATE_COMMENT
} from './types';


export function getPostComments(postId) {

    const request = Axios.get('/api/post-comments?postId=' + postId ) 
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

