import React from 'react';
import Button from '@material-ui/core/Button';
import NaverLogin from 'react-naver-login';
import {NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_SCOPE} from "../../conf/oAuthConfig"
import Axios from "axios";
import { withRouter } from 'react-router-dom';

const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  
  const Login = (props) => {

    const responseNaver = async (response) => {
      console.log(1, response);
      let jwtToken = await Axios.post(
        "http://localhost:8080/api/oauth/jwt/naver",
        JSON.stringify(response),
        config
      );
      if (jwtToken.status === 200) {
        console.log(2, jwtToken.data);
        localStorage.setItem("jwt", jwtToken.data.authorization);
        props.history.push("/user/"+jwtToken.data.redirectUrl)
      }
    };

    return (
        <NaverLogin 
        clientId={NAVER_CLIENT_ID}
        callbackUrl="http://127.0.0.1:3000"
        render={ renderProps => ( <Button fullWidth onClick={renderProps.onClick} style={{ color:"white",backgroundColor:"#8bc34a", borderRadius:15, margin:"0px 0px 10px 0px" }}> <strong> <h2> NAVER </h2> </strong> </Button>)}
        onSuccess={responseNaver}
        />
    );
  };
  
  export default withRouter(Login);