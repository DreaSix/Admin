import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import "./DepositePage.scss";
import { transactionService } from "../../Service/TransactionService";

const DepositePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allDeposites, setAllDeposites] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
      getDepositTransactions()
    }, [])
  
    const getDepositTransactions = () => {
      transactionService.getAllTransactions()
        .then(response => {
          const deposites = response?.data?.filter(deposit => deposit?.paymentOption === "Deposit" && !deposit?.status)
          setAllDeposites(deposites)
        })
        .catch(error => {
          console.log('error', error)
        })
    }

    const handleClickAccept = (record) => {
      console.log('record', record)
      const params = {
        status: true,
        userId: record?.userId
      }
      transactionService.updateTransactions(record?.id, params)
        .then(response => {
          getDepositTransactions()
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
    <div className="deposit-container">
      <h2>Deposit Transactions</h2>
      <div className="search-bar">
        <Input
        style={{marginBottom:"13px"}}
          placeholder="Search User Name / ID"
          suffix={<SearchOutlined />}
        />
      </div>
      <Table
        dataSource={allDeposites}
        columns={columns}
        pagination={false}
        bordered
      />

      {selectedTransaction && (
        <Modal
          title="Transaction Details"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        >
          <p><strong>Username:</strong> {selectedTransaction.userName}</p>
          <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
          <p><strong>UTR / Trans ID:</strong> {selectedTransaction.utrNumber}</p>
          <div className="modal-image-container">
            <strong>Uploaded Image:</strong>
            <img
              src={`data:image/jpeg;base64,${selectedTransaction.uploadedProof}`}
              alt="Uploaded Screenshot"
              className="uploaded-image"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DepositePage;
