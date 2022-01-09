import React, { useState } from "react";
import MenuItems from "./Sections/RightMenu";
// import { Drawer, Button } from "antd";
// import { AlignRightOutlined } from "@ant-design/icons";
import "./Sections/Navbar.css";

const NavBar = () => {
  // const [visible, setVisible] = useState(false);

  // const showDrawer = () => {
  //   setVisible(true);
  // };

  // const onClose = () => {
  //   setVisible(false);
  // };

  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu_rigth">
          <MenuItems mode="horizontal" />
        </div>
        {/* <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
          icon={<AlignRightOutlined />}
        ></Button> */}
        {/* <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <MenuItems mode="inline" />
        </Drawer> */}
      </div>
    </nav>
  );
};

export default NavBar;
