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
        setDataSource(response?.totalContent)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  // Table Columns
  const columns = [
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "MobileNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    // {
    //   title: "Password",
    //   dataIndex: "password",
    //   key: "password",
    // },
    {
      title: "Wallet",
      dataIndex: "balance",
      key: "balance",
    },
  ];

  return (
    <main>
    <div className="user-table-container">
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
    </main>
  );
};

export default Users;
