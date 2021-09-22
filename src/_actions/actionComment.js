import Axios from 'axios'

import {
    ABOUT_COMMNET
} from './types';


export function createCommnet(comment) {

    const request = Axios.post('/api/create-commnet' , comment ) 
        .then(response => response.data) 

    return {
        type: ABOUT_COMMNET,
        payload : request
    };
}


export function readCommnet(commnetId) {

    const request = Axios.get('/api/commnet?commnetId=' + commnetId ) 
        .then(response => response.data) 

    return {
        type: ABOUT_COMMNET,
        payload : request
    };
}

export function readAllMentCommnet(mentId) {

    const request = Axios.get('/api/ment-commnet?mentId=' + mentId ) 
        .then(response => response.data) 

    return {
        type: ABOUT_COMMNET,
        payload : request
    };
}

