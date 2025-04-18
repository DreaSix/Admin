import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import "./WithdrawlPage.scss";
import { transactionService } from "../../Service/TransactionService";

const WithdrawlPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allWithdraws, setAllWithdraws] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    getWithdrawTransactions()
  }, [])

  const getWithdrawTransactions = () => {
    transactionService.getAllTransactions()
      .then(response => {
        const deposites = response?.data?.filter(deposit => deposit?.transactionType === "WITHDRAW" && deposit?.approvalStatus === "PENDING")
          setAllWithdraws(deposites)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleClickAccept = (record) => {
    const payload = {
      approvalStatus: "APPROVED",
      transactionId: record?.id
    }
    transactionService.updateTransactions(payload)
      .then(response => {
        getWithdrawTransactions()
        message.success("Transaction updated successfully")
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleClickReject = (record) => {
    const payload = {
      approvalStatus: "REJECTED",
      transactionId: record?.id
    }
    transactionService.updateTransactions(payload)
      .then(response => {
        getWithdrawTransactions()
        message.success("Transaction updated successfully")
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const columns = [
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
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-buttons">
          <Button type="primary" onClick={() => handleClickAccept(record)} className="accept-btn">
            Accept
          </Button>
          <Button type="danger" onClick={() => handleClickReject(record)} className="reject-btn">
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    setSelectedTransaction(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <main>
    <div className="withdrawl-container">
      <h2>Withdrawl Transactions</h2>
      <div className="search-bar">
        <Input
        style={{marginBottom:"13px"}}
          placeholder="Search User Name / ID"
          suffix={<SearchOutlined />}
        />
      </div>
      <Table
        dataSource={allWithdraws}
        columns={columns}
        pagination={false}
        bordered
      />

      {selectedTransaction && (
        <Modal
          title="Withdrawl Details"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        >
          <p>
            <strong>Username:</strong> {selectedTransaction.userName}
          </p>
          <p>
            <strong>Amount:</strong> {selectedTransaction.amount}
          </p>
          <p>
            <strong>Account Number:</strong> {selectedTransaction.accountNumber}
          </p>
          <p>
            <strong>Account Holder Name:</strong>{" "}
            {selectedTransaction.accountHolderName}
          </p>
          <p>
            <strong>IFSC Code:</strong> {selectedTransaction.ifscCode}
          </p>
          {/* <p>
            <strong>UPI ID:</strong> {selectedTransaction.upiId}
          </p> */}
        </Modal>
      )}
    </div>
    </main>
  );
};

export default WithdrawlPage;
