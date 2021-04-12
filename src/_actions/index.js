import Axios from 'axios'

import {
    IMAGE
} from './types';

const mtConfig = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export function image(value) {

    const request = Axios.post('/api/image', value , mtConfig ) 
        .then(res => console.log(res)) 

    return {
        type: IMAGE,
        payload : request
    };
}