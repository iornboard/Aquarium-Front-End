import React from 'react';
import Button from '@material-ui/core/Button';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_SCOPE} from "../../conf/oAuthConfig"
import Axios from "axios";
import { withRouter } from 'react-router-dom';

const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const Login = (props) => {

    const responseFacebook = async (response) => {
      console.log(1, response);
      let jwtToken = await Axios.post(
        "http://localhost:8080/api/oauth/jwt/facebook",
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
        <FacebookLogin
        appId={FACEBOOK_CLIENT_ID}
        // fields={FACEBOOK_SCOPE}
        callback={responseFacebook}
        icon="fa-facebook"
        size="medium"
        textButton="login"
        render={ renderProps => ( <Button fullWidth onClick={renderProps.onClick} style={{ color:"white" , backgroundColor:"#3f51b5", borderRadius:15, margin:"0px 0px 10px 0px" }}> <strong> <h2> FACEBOOK </h2> </strong> </Button>)}
      />
    );
  };
  
  export default withRouter(Login);