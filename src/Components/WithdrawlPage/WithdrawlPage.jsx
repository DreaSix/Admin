import React, { useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import "./WithdrawlPage.scss";

const WithdrawlPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const withdrawlData = [
    {
      key: "1",
      username: "Ravi@2023",
      amount: "₹5000",
      accountNumber: "123456789012",
      accountHolderName: "Ravi Kumar",
      ifscCode: "SBIN0000123",
      upiId: "ravi@ybl",
    },
    {
      key: "2",
      username: "Sneha_22",
      amount: "₹3000",
      accountNumber: "987654321098",
      accountHolderName: "Sneha Das",
      ifscCode: "HDFC0000456",
      upiId: "sneha@hdfc",
    },
  ];

  const columns = [
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
      render: () => (
        <div className="action-buttons">
          <Button type="primary" className="accept-btn">
            Accept
          </Button>
          <Button type="danger" className="reject-btn">
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
        dataSource={withdrawlData}
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
            <strong>Username:</strong> {selectedTransaction.username}
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
          <p>
            <strong>UPI ID:</strong> {selectedTransaction.upiId}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default WithdrawlPage;
