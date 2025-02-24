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
        let transactions;
        if (activeTab === "All"){
          transactions = response?.data?.filter(deposit => deposit?.approvalStatus === "APPROVED")
        }else if (activeTab === "DEPOSIT"){
          transactions = response?.data?.filter(deposit => deposit?.approvalStatus === "APPROVED" && deposit?.transactionType === "DEPOSIT")
        }else{
          transactions = response?.data?.filter(deposit => deposit?.approvalStatus === "APPROVED" && deposit?.transactionType === "WITHDRAW")

        }
        setAllTransactions(transactions)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const filteredData =
    activeTab === "All"
      ? allTransactions
      : allTransactions.filter((item) => item.transactionType === activeTab && item?.approvalStatus === "APPROVED");

  // Table Columns
  const columns = [
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
      render: (paymentOption) =>
        paymentOption === "DEPOSIT" ? (
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
    <main>
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
          className={activeTab === "DEPOSIT" ? "active-tab" : ""}
          onClick={() => setActiveTab("DEPOSIT")}
        >
          Deposit
        </Button>
        <Button
          className={activeTab === "WITHDRAW" ? "active-tab" : ""}
          onClick={() => setActiveTab("WITHDRAW")}
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
    </main>
  );
};

export default Transactions;
