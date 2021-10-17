
import React, { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { auth } from '../_actions/actionUser';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {modal} from '../_actions/index'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function (SpecificComponent, option, adminRoute = null){

    //null => 아무나 출입이 가능한 페이지이다.
    //true => 로그인한 유저만 출입이 가능한 페이지이다.
    //false => 로그인한 유저는 출입이 불가능한 페이지이다.


    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        const madal = useSelector( store => store.modal.madal );

        const { code , data } =  {...madal};

        const handleClose = (event, reason) => {
            dispatch(modal(null))
          };
        
          
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
                        props.history.push( "/user/"+ res.payload.userNickname )
                    }
                }   
            })

        }, [])

        return (
            <div>
                <Snackbar open={madal} autoHideDuration={6000}  onClose={handleClose}>
                    <Alert  severity={ code }>
                        {data}
                    </Alert>
                </Snackbar>

                <SpecificComponent />
            </div>
        )
    }
    return AuthenticationCheck
}