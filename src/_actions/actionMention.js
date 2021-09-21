import Axios from 'axios'

import {
    ABOUT_MENTION
} from './types';


export function createMention(value) {

    const request = Axios.post('/api/create-ment', value ) 
        .then(response => response.data) 

    return {
        type: ABOUT_MENTION,
        payload : request
    };
}


export function readMention(mentId) {

    const request = Axios.get('/api/ment?mentId=' + mentId ) 
        .then(response => response.data) 

    return {
        type: ABOUT_MENTION,
        payload : request
    };
}


export function readAllMention(userId) {

    const request = Axios.get('/api/all-ment?userId=' + userId ) 
        .then(response => response.data) 


    return {
        type: ABOUT_MENTION,
        payload : request
    };
}


export function readAllMentMark(aqrmId) {

    const request = Axios.get('/api/all-mark?aqrmId=' + aqrmId ) 
        .then(response => response.data) 


    return {
        type: ABOUT_MENTION,
        payload : request
    };
}


