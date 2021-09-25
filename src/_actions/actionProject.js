import Axios from 'axios'

import {
    ABOUT_PROJECT
} from './types';


export function createProject(value) {

    const request = Axios.post('/api/create-project', value ) 
        .then(response => response.data) 

    return {
        type: ABOUT_PROJECT,
        payload : request
    };
}

export function readProject(projectId) {

    const request = Axios.get('/api/project?projectId=' + projectId ) 
        .then(response => response.data) 

    return {
        type: ABOUT_PROJECT,
        payload : request
    };
}


export function readAllProject(userId) {

    const request = Axios.get('/api/all-project?userId=' + userId ) 
        .then(response => response.data) 


    return {
        type: ABOUT_PROJECT,
        payload : request
    };
}


