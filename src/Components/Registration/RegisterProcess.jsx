import React from "react";
import { Button, Card } from "antd";
import "./RegisterProcess.scss";
import Logo from "../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

const RegisterProcess = () => {
    
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/");
  };


  return (
    <div className="registration-container">
     <div className="register-logo">
        <img src={Logo} alt="DreamSix Logo" />
      </div>
      <div className="card-container">
        <Card className="whatsapp-card">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.f317oFwXxAZ4AK4_Zz016wHaHa&pid=Api&P=0&h=180"
            alt="WhatsApp Icon"
            className="whatsapp-icon"
          />
          <p className="wait-text">Please Wait For 2 Min</p>
          <p className="description">
            The Login Details Are Sent To Your Given WhatsApp Number. Please Check After 2
            Minutes.
          </p>
        </Card>
      </div>

      <div className="login-button-container">
        <Button type="primary" className="login-button" onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default RegisterProcess;
