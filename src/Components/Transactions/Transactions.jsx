import React, { useState } from "react";
import { Input, Table, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Transactions.scss";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Combined Table Data
  const dataSource = [
    {
      key: "1",
      username: "Kabali@123",
      amount: "₹2000",
      transactionId: "912345678912",
      type: "Deposit",
    },
    {
      key: "2",
      username: "Sreenu6453",
      amount: "₹1000",
      transactionId: "sreenu@ybl",
      type: "Deposit",
    },
    {
      key: "3",
      username: "Ram@567",
      amount: "₹1500",
      transactionId: "ram@ybl",
      type: "Withdrawal",
    },
    {
      key: "4",
      username: "Krish@901",
      amount: "₹800",
      transactionId: "krish@upi",
      type: "Withdrawal",
    },
  ];

  // Filter data based on active tab
  const filteredData =
    activeTab === "All"
      ? dataSource
      : dataSource.filter((item) => item.type === activeTab);

  // Table Columns
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) =>
        type === "Deposit" ? (
          <span style={{ color: "green" }}>{type}</span>
        ) : (
          <span style={{ color: "red" }}>{type}</span>
        ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    // {
    //   title: "UTR / Trans ID",
    //   dataIndex: "transactionId",
    //   key: "transactionId",
    // },
  ];

  return (
    <div className="deposit-withdraw-container">
      {/* Tabs */}
      <div className="tab-buttons">
        <Button
          className={activeTab === "All" ? "active-tab" : ""}
          onClick={() => setActiveTab("All")}
        >
          All
        </Button>
        <Button
          className={activeTab === "Deposit" ? "active-tab" : ""}
          onClick={() => setActiveTab("Deposit")}
        >
          Deposit
        </Button>
        <Button
          className={activeTab === "Withdrawal" ? "active-tab" : ""}
          onClick={() => setActiveTab("Withdrawal")}
        >
          Withdrawal
        </Button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <Input
          placeholder="Search User Name / ID"
          suffix={<SearchOutlined />}
        />
      </div>

      {/* Table */}
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default Transactions;
