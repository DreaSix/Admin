import React, { useEffect, useState } from "react";
import { Button, Drawer, Avatar, List } from "antd";
import { UserOutlined, BankOutlined, LockOutlined, HistoryOutlined, PhoneOutlined, PoweroffOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SideMenu.scss";
import Cookies from "js-cookie";
import { userService } from "../../Service/UserService";
import { transactionService } from "../../Service/TransactionService";


const SideMenu = ({setIsAuthenticated}) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [depositApprovedAmount, setDepositApprovedAmount] = useState(0)
  const [withdrawApprovedAmount, setWithdrawApprovedAmount] = useState(0)

  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
      getAllTransactions()
    }, [])
  
    const getAllTransactions = () => {
      transactionService.getAllTransactions()
        .then(response => {
          const filteredData = response?.data?.filter(item => item?.userResponseVO?.id === Cookies.get("userId"))
          let depositeAmount = 0;
          let withdrawAmount = 0;
          filteredData?.forEach(item => {
            if (item?.approvalStatus === "APPROVED" && item?.transactionType === "DEPOSIT"){
              depositeAmount = depositeAmount + item?.amount
            } else if (item?.approvalStatus === "APPROVED" && item?.transactionType === "WITHDRAW"){
              withdrawAmount = withdrawAmount + item?.amount
            }
          })

          setDepositApprovedAmount(depositeAmount)
          setWithdrawApprovedAmount(withdrawAmount)

        })
        .catch(error => {
          console.log('error', error)
        })
    }

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = () => {
    userService.getUser(Cookies.get("userId"))
      .then(response => {
        setUserDetails(response?.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }


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

  const handleLogout = () => {
    Cookies.remove("jwtToken")
    Cookies.remove("userId")
    setIsAuthenticated(false)
    navigate("/")
  }

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
          <div className="username" style={{color:"#0a2a59",fontWeight:"bold"}}>{userDetails?.name}</div>
        </div>

        <hr/>

        {/* Balance Information */}
        <div className="balance-info">
          <div style={{marginTop:"10px", marginBottom:"10px",color:"#0a2a59",fontWeight:"bold"}} className="balance-title">
            <BankOutlined style={{fontSize:"25px", marginRight:"15px"}} className="icon" /> Account Information
          </div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <p>Deposite Approved </p>
            <p>₹ {depositApprovedAmount}</p>
          </div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <p>Withdraw Approved </p>
            <p>₹ {withdrawApprovedAmount}</p>
          </div>
          <hr/>
          <div style={{marginTop:"10px", marginBottom:"10px"}} className="balance-actions">
            <Button  style={{marginRight:"10px", backgroundColor:"#ffd700",}} onClick={() => handleNavigation("/deposite-page")}>Deposit</Button>
            <Button onClick={() => handleNavigation("/withdrawl-page")}>Withdrawal</Button>
          </div>
        </div>

        <hr/>

        {/* Menu List */}
        <List>
          <List.Item onClick={() => handleNavigation("/transactions")}>
            <HistoryOutlined /> Transactions History
          </List.Item>
          <List.Item onClick={() => handleNavigation("/change-password")}>
            <LockOutlined /> Change Password
          </List.Item>
          <List.Item onClick={handleLogout} style={{ color: 'red' }}>
            <PoweroffOutlined /> Logout
          </List.Item>
        </List>
      </Drawer>
    </div>
  );
};

export default SideMenu;
