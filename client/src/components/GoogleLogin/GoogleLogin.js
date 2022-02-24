import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../../_actions/user_actions";
import Auth from "../../hoc/auth";
import { message } from "antd";


const Google_Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ClientID = process.dev.REACT_APP_CLIENT_ID;

  const googleOnSuccess = async (res) => {
    let body = {
      tokenId: res.tokenId
    }
    await dispatch(googleLogin(body)).then((res) => {
      if(res.payload.googleOnSucces) {
        message.success("로그인에 성공했습니다.")
        navigate("/")
      } else {
        alert("Error")
      }
    });
  };

  const googleOnFailure = (res) => {
    alert("Error")
  };
  
  return (
    <>
      <GoogleLogin
        clientId={ClientID}
        buttonText="Google login"
        onSuccess={googleOnSuccess}
        onFailure={googleOnFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default Auth(Google_Login, false);
