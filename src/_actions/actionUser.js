import Axios from 'axios'

import {
    JOIN,
    LOGIN,
    AUTH,
    USERIMAGE,
    USERINFO,
    SET_JOIN_USERS
} from './types';

export function auth() {

    let token = localStorage.getItem('jwt') || '';

    const request = Axios.get('/api/auth',{ headers : { authorization : token }}) 
        .then(response => response.data) 

    return {
        type: AUTH,
        payload : request
    };
}

export function join(value) {

    const request = Axios.post('/api/join', value) 
        .then(response => response.data) 

    return {
        type: JOIN,
        payload : request
    };
}

export function login(value) {

    const request = Axios.post('/api/login', value) 
    .then(res => res.headers.authorization)

    return {
        type: LOGIN,
        payload : request
    };
}

export function userImage(value) {

    const request = Axios.patch('/api/user-image', value) 
    .then(res => res.data)

    return {
        type: USERIMAGE,
        payload : request
    };
}

export function userInfo(userId) {

    const request = Axios.get('/api/user-info?userId='+userId) 
    .then(res => res.data)

    return {
        type: USERINFO,
        payload : request
    };
}

export function setJoinUsers(value) {

    return {
        type: SET_JOIN_USERS,
        payload : value
    };
}