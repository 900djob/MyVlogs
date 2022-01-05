import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_actions";
import Auth from "../../../hoc/auth"

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = () => {
    dispatch(logoutUser()).then((res) => {
      if (res.payload.success) {
        navigate("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
};

export default Auth(LandingPage, null);
