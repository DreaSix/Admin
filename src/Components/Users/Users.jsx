import React from "react";
import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Users.scss";

const Users = () => {
  // Table Data
  const dataSource = [
    {
      key: "1",
      username: "Kabali@123",
      wallet: "₹436000",
      password: "ka@12345",
      mobileno:"9876789876"
    },
    {
      key: "2",
      username: "Sreenu6453",
      wallet: "₹10000",
      password: "sreee@7564",
       mobileno:"987678976"
    },
  ];

  // Table Columns
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },

    {
        title: "MobileNumber",
        dataIndex: "mobileno",
        key: "mobileno",
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
  );
};

export default Users;
