import Axios from 'axios'

import {
    GET_CHAT,
    CREATE_CHAT
} from './types';


export function getChats(roomId) {

    const request = Axios.get('/api/chat?roomId=' + roomId ) 
        .then(response => response.data) 

    return {
        type: GET_CHAT,
        payload : request
    };
}


export function createChat(value) {

    const request = Axios.post('/api/create-chat', value) 
        .then(response => response.data)

    return {
        type: CREATE_CHAT,
        payload : request
    };
}