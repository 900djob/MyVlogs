import React from "react";
import { FaCode } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../../../_actions/user_actions";
import Auth from "../../../hoc/auth";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const onClickHandler = () => {
  //   dispatch(logoutUser()).then((res) => {
  //     if (res.payload.success) {
  //       navigate("/login");
  //     } else {
  //       alert("로그아웃에 실패했습니다.");
  //     }
  //   });
  // };

  return (
    <>
      <div className={styles.main}>
        <FaCode style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Landing Page</span>
      </div>
    </>
  );
};

export default Auth(LandingPage, null);
