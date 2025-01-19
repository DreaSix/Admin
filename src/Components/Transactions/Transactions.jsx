import React, { useEffect, useState } from "react";
import { Input, Table, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Transactions.scss";
import { transactionService } from "../../Service/TransactionService";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [allTransactions, setAllTransactions] = useState([])

  useEffect(() => {
    getAllTransactions()
  }, [])

  const getAllTransactions = () => {
    transactionService.getAllTransactions()
      .then(response => {
        const transactions = response?.data?.filter(deposit => deposit?.status)
        setAllTransactions(transactions)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const filteredData =
    activeTab === "All"
      ? allTransactions
      : allTransactions.filter((item) => item.paymentOption === activeTab);

  // Table Columns
  const columns = [
    {
      title: "Type",
      dataIndex: "paymentOption",
      key: "paymentOption",
      render: (paymentOption) =>
        paymentOption === "Deposit" ? (
          <span style={{ color: "green" }}>{paymentOption}</span>
        ) : (
          <span style={{ color: "red" }}>{paymentOption}</span>
        ),
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
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
