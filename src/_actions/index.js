import Axios from 'axios'

import {
    IMAGE, 
    AUTHUSERPAGE,
    ABOUT_MODAL,
} from './types';

const mtConfig = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export function image(value) {

    const request = Axios.post('/api/image', value , mtConfig ) 
        .then(response => response.data) 

    return {
        type: IMAGE,
        payload : request
    };
}

export function authUserPage( userNickname ) {

    const request = Axios.get('/api/auth-userpage', { params: { userNickname : userNickname } })
        .then(response => { return {data: response.data, status: response.status}}) 
        .catch(error => { return {data: error.response.data, status: error.response.status}})   

    return {
        type: AUTHUSERPAGE,
        payload : request
    };
}


export function modal( value ) {

    return {
        type: ABOUT_MODAL,
        payload : value
    };
}
