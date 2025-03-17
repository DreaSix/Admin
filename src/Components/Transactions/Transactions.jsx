import React, { useEffect, useState } from "react";
import { Input, Table, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Transactions.scss";
import { transactionService } from "../../Service/TransactionService";
import Cookies from "js-cookie";


const Transactions = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [allTransactions, setAllTransactions] = useState([])

  useEffect(() => {
    getAllTransactions()
  }, [])

  const getAllTransactions = () => {
    transactionService.getAllTransactions()
      .then(response => {
        const filteredData = response?.data?.filter(item => item?.userResponseVO?.id === Cookies.get("userId"))
        let transactions;
        if (activeTab === "All"){
          transactions = filteredData
        }else if (activeTab === "DEPOSIT"){
          transactions = filteredData?.filter(deposit => deposit?.transactionType === "DEPOSIT")
        }else{
          transactions = filteredData?.filter(deposit => deposit?.transactionType === "WITHDRAW")

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
      : allTransactions.filter((item) => item.transactionType === activeTab );

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
      title: "Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
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
