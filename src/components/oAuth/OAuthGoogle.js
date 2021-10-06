import React from "react";
import Button from '@material-ui/core/Button';
import { GoogleLogin } from "react-google-login";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_SCOPE} from "../../conf/oAuthConfig"
import Axios from "axios";
import { withRouter } from 'react-router-dom';

const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};


const Login = (props) => {

  const responseGoogle = async (response) => {
    console.log(1, response);
    let jwtToken = await Axios.post(
      "http://localhost:8080/api/oauth/jwt/google",
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
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      // buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={ renderProps => ( <Button fullWidth onClick={renderProps.onClick} style={{ color:"white" ,backgroundColor:"#ff1744", borderRadius:15, margin:"0px 0px 10px 0px"}}> <strong> <h2> GOOGLE </h2> </strong> </Button>)}
    />
  );
};

export default withRouter(Login);         