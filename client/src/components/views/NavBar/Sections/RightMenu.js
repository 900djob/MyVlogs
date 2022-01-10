/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../../Config';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const MenuItems = (props) => {
  const navigate = useNavigate();
  
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(res => {
      if (res.status === 200) {
        navigate("/");
      } else {
        alert('로그아웃 실패!')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="signin">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="signup">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default MenuItems;

