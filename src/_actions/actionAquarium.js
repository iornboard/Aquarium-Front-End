import Axios from 'axios'

import {
    ABOUT_AQUARIUM
} from './types';


export function createAquarium(value) {

    const request = Axios.post('/api/create-aqrm', value ) 
        .then(response => response.data) 

    return {
        type: ABOUT_AQUARIUM,
        payload : request
    };
}

export function readAquarium(aqrmId) {

    const request = Axios.get('/api/aqrm?aqrmId=' + aqrmId ) 
        .then(response => response.data) 

    return {
        type: ABOUT_AQUARIUM,
        payload : request
    };
}


export function readAllAquarium(userId) {

    const request = Axios.get('/api/all-aqrm?userId=' + userId ) 
        .then(response => response.data) 


    return {
        type: ABOUT_AQUARIUM,
        payload : request
    };
}

export function readPullAquarium() {

    const request = Axios.get('/api/pull-aqrm' ) 
        .then(response => response.data) 
        
    return {
        type: ABOUT_AQUARIUM,
        payload : request
    };
}



