import Axios from 'axios'

import {
    CHAT_HISTORY,
} from './types';


export function chatHistory(roomId) {

    const request = Axios.get('/api/history?roomId=' + roomId ) 
        .then(response => response.data) 

    return {
        type: CHAT_HISTORY,
        payload : request
    };
}

