import Axios from 'axios'

import {
    ABOUT_PROJECT,
    ABOUT_TERM
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














export function createTerm(value) {

    const request = Axios.post('/api/create-term', value ) 
        .then(response => response.data) 

    return {
        type: ABOUT_TERM,
        payload : request
    };
}

export function readTerm(termId) {

    const request = Axios.get('/api/term?termId=' + termId ) 
        .then(response => response.data) 

    return {
        type: ABOUT_TERM,
        payload : request
    };
}


export function readAllTerm(userId) {

    const request = Axios.get('/api/all-user-term?userId=' + userId ) 
        .then(response => response.data) 


    return {
        type: ABOUT_TERM,
        payload : request
    };
}


export function updateTerm(value) {

    const request = Axios.put('/api/update-term', value ) 
    .then(response => response.data )

    return {
        type: ABOUT_TERM,
        payload : request
    };
}

