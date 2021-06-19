import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_SCOPE} from "../../conf/oAuthConfig"
import Axios from "axios";

const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  
  const responseFacebook = async (response) => {
    console.log(1, response);
    let jwtToken = await Axios.post(
      "http://localhost:8080/api/oauth/jwt/facebook",
      JSON.stringify(response),
      config
    );
    if (jwtToken.status === 200) {
      console.log(2, jwtToken.data);
      localStorage.setItem("jwt", jwtToken.data);
    }
  };

  const Login = () => {
    return (
        <FacebookLogin
        appId={FACEBOOK_CLIENT_ID}
        fields={FACEBOOK_SCOPE}
        callback={responseFacebook}
        icon="fa-facebook"
        size="medium"
        textButton="login"
      />
    );
  };
  
  export default Login;