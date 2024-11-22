import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpeg";
import "./Header.scss";
import SideMenu from "./SideMenu";

const Header = () => {
  const navigate = useNavigate();

  const onDeposit = () => {
    navigate("/depositpage");
  };

  return (
    <div className="header">
      <div className="menu-container">
        <SideMenu />
      </div>
      <img src={Logo} alt="DreamSix Logo" className="logo" />
    </div>
  );
};

export default Header;
