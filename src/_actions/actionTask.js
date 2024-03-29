import Axios from 'axios'

import {
    ABOUT_TASK,
    SET_TASK
} from './types';


export function createTask(value) {

    const request = Axios.post('/api/create-task', value) 
        .then(response => response.data)

    return {
        type: ABOUT_TASK,
        payload : request
    };
}


export function readTask(taskId) {

    const request = Axios.get('/api/task?taskId=' + taskId ) 
        .then(response => response.data) 

    return {
        type: SET_TASK,
        payload : request
    };
}


export function readAllUserTask(userId) {

    const request = Axios.get('/api/all-user-task?userId=' + userId ) 
        .then(response => response.data) 

    return {
        type: ABOUT_TASK,
        payload : request
    };
}


export function readAllProjectTask(projectId) {

    const request = Axios.get('/api/all-project-task?projectId=' + projectId ) 
    .then(response => response.data)

    return {
        type: ABOUT_TASK,
        payload : request
    };
}


export function updateTask(value) {

    const request = Axios.put('/api/update-task', value ) 
    .then(response => response.data )

    return {
        type: SET_TASK,
        payload : request
    };
}


export function updateTaskInfo(value) {

    const request = Axios.put('/api/update-task-info' , value ) 
    .then(response => response.data)

    return {
        type: SET_TASK,
        payload : request
    };
}


export function updateTaskStore(value) {

    return {
        type: SET_TASK,
        payload : value
    };
}





