import Axios from 'axios'

import {
    IMAGE , AUTHUSERPAGE
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

    return {
        type: AUTHUSERPAGE,
        payload : request
    };
}
