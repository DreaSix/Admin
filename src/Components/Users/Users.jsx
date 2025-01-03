import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Users.scss";
import { getAllPlayers } from "../../Service/UsersService";

const Users = () => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    getAllUsers()
  }, [])
 
  const getAllUsers = () => {
    getAllPlayers.getAllUsers()
      .then(response => {
        console.log('response', response)
        setDataSource(response?.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  // Table Columns
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },

    {
        title: "MobileNumber",
        dataIndex: "contactNo",
        key: "contactNo",
      },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
      {
        title: "Wallet",
        dataIndex: "wallet",
        key: "wallet",
      },
  ];

  return (
    <div className="user-table-container" style={{ background:"linear-gradient(to top, #99ccff 0%, #003366 100%)"}}>
      <div className="search-bar">
        <Input
          placeholder="Search User Name / ID"
          suffix={<SearchOutlined />}
        />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default Users;
