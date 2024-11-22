import React, { useState } from "react";
import { Button, Drawer, Avatar, List } from "antd";
import { UserOutlined, BankOutlined, LockOutlined, HistoryOutlined, PhoneOutlined, PoweroffOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SideMenu.scss";

const SideMenu = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setVisible(false); // Close drawer on navigation
  };

  return (
    <div className="side-menu">
      {/* Menu Button */}
      <Button type="text" onClick={showDrawer} className="menu-icon-button">
        <MenuOutlined className="menu-icon" />
      </Button>
      <Drawer placement="left" width="70%" onClose={onClose} open={visible}>
        {/* User Info */}
        <div className="user-info" style={{display:"flex", alignItems:"center"}}>
          <Avatar style={{marginRight:"15px"}} icon={<UserOutlined />} size={32} />
          <div className="username" style={{color:"#0a2a59",fontWeight:"bold"}}>Kabali59</div>
        </div>

        <hr/>

        {/* Balance Information */}
        <div className="balance-info">
          <div style={{marginTop:"10px", marginBottom:"10px",color:"#0a2a59",fontWeight:"bold"}} className="balance-title">
            <BankOutlined style={{fontSize:"25px", marginRight:"15px"}} className="icon" /> Balance Information
          </div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <p>Available Balance: </p>
            <p>₹ 0.00</p>
          </div>
          <hr/>
          <div style={{marginTop:"10px", marginBottom:"10px"}} className="balance-actions">
            <Button  style={{marginRight:"10px", backgroundColor:"#ffd700",}} onClick={() => handleNavigation("/depositpage")}>Deposit</Button>
            <Button onClick={() => handleNavigation("/withdraw")}>Withdrawal</Button>
          </div>
        </div>

        <hr/>

        {/* Menu List */}
        <List>
          <List.Item onClick={() => handleNavigation("/players")}>
            <HistoryOutlined /> Transactions History
          </List.Item>
          <List.Item onClick={() => handleNavigation("/change-password")}>
            <LockOutlined /> Change Password
          </List.Item>
          <List.Item onClick={() => handleNavigation("/bets")}>
            <UserOutlined /> My Bets
          </List.Item>
          <List.Item onClick={() => handleNavigation("/contact-us")}>
            <PhoneOutlined /> Contact Us
          </List.Item>
          <List.Item onClick={() => handleNavigation("/loginpage")} style={{ color: 'red' }}>
            <PoweroffOutlined /> Logout
          </List.Item>
        </List>
      </Drawer>
    </div>
  );
};

export default SideMenu;
