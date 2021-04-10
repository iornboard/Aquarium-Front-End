
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/index';


export default function (SpecificComponent, option, adminRoute = null){

    //null => 아무나 출입이 가능한 페이지이다.
    //true => 로그인한 유저만 출입이 가능한 페이지이다.
    //false => 로그인한 유저는 출입이 불가능한 페이지이다.


    function AuthenticationCheck(props) {
        
        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth()).then(res => {
        
                //로그인 하지 않은 상태
                if(!res.payload){
                    if(option) {
                         props.history.push('/')
                    }
                } else {
                //로그인 한 상태
                    if(!option){
                        props.history.push('/')
                    }
                }   
            })

        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}