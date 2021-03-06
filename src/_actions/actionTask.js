import Axios from 'axios'

import {
    GET_TASK,
    CREATE_TASK,
    SET_TASK,
    UPDATE_TASK_IMG,
} from './types';


export function getTasks(userId) {

    const request = Axios.get('/api/task?userId=' + userId ) 
        .then(response => response.data) 

    return {
        type: GET_TASK,
        payload : request
    };
}

export function createTask(value) {

    const request = Axios.post('/api/create-task', value) 
        .then(response => response.data)

    return {
        type: CREATE_TASK,
        payload : request
    };
}

export function setTask(value) {

    return {
        type: SET_TASK,
        payload : value
    };
}

export function updateTasKImg(task) {

    const request = Axios.post('/api/update-task-img', task) 
    .then(response => response.data)

    return {
        type: UPDATE_TASK_IMG,
        payload : request
    };
}

