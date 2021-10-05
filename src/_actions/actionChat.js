import Axios from 'axios'

import {
    ABOUT_CHAT ,
} from './types';


export function chatHistory(roomId) {

    const request = Axios.get('/api/history?roomId=' + roomId ) 
        .then(response => response.data) 

    return {
        type: ABOUT_CHAT,
        payload : request
    };
}


export function createRoom(teamsId) {

    const request = Axios.post('/api/create-room' , teamsId ) 
        .then(response => response.data) 

    return {
        type: ABOUT_CHAT,
        payload : request
    };
}


