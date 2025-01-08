import React, { useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import "./DepositePage.scss";

const DepositePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const depositData = [
    {
      key: "1",
      username: "Kabali@123",
      amount: "₹2000",
      transactionId: "912345678912",
      screenshotimg: "https://4.bp.blogspot.com/-1xqajupQ9_Q/WEsJZ6uRbYI/AAAAAAAAmWE/0vWkrR3fYOcMSrsQXue0MAtmlXBy_yTGACEw/s1600/Screenshot_2016-12-02-22-51-28-891_com.phonepe.app.png",
    },
    {
      key: "2",
      username: "Sreenu6453",
      amount: "₹1000",
      transactionId: "sreenu@ybl",
      screenshotimg: "https://3.bp.blogspot.com/-wKLNcT_PmU8/WEsJanUxEgI/AAAAAAAAmWM/-U3m_l5BBhgEkFK8CbuCSU4_smgSb-SpgCEw/s1600/Screenshot_2016-12-10-00-57-42-738_com.phonepe.app%257E01.png",
    },
    {
        key: "2",
        username: "Sreenu6453",
        amount: "₹1000",
        transactionId: "sreenu@ybl",
        screenshotimg: "https://via.placeholder.com/300x200",
      },
      {
        key: "1",
        username: "Kabali@123",
        amount: "₹2000",
        transactionId: "912345678912",
        screenshotimg: "https://4.bp.blogspot.com/-1xqajupQ9_Q/WEsJZ6uRbYI/AAAAAAAAmWE/0vWkrR3fYOcMSrsQXue0MAtmlXBy_yTGACEw/s1600/Screenshot_2016-12-02-22-51-28-891_com.phonepe.app.png",
      },
      {
        key: "1",
        username: "Kabali@123",
        amount: "₹2000",
        transactionId: "912345678912",
        screenshotimg: "https://4.bp.blogspot.com/-1xqajupQ9_Q/WEsJZ6uRbYI/AAAAAAAAmWE/0vWkrR3fYOcMSrsQXue0MAtmlXBy_yTGACEw/s1600/Screenshot_2016-12-02-22-51-28-891_com.phonepe.app.png",
      },
      {
        key: "1",
        username: "Kabali@123",
        amount: "₹2000",
        transactionId: "912345678912",
        screenshotimg: "https://4.bp.blogspot.com/-1xqajupQ9_Q/WEsJZ6uRbYI/AAAAAAAAmWE/0vWkrR3fYOcMSrsQXue0MAtmlXBy_yTGACEw/s1600/Screenshot_2016-12-02-22-51-28-891_com.phonepe.app.png",
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
        dataSource={depositData}
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
          <p><strong>Username:</strong> {selectedTransaction.username}</p>
          <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
          <p><strong>UTR / Trans ID:</strong> {selectedTransaction.transactionId}</p>
          <div className="modal-image-container">
            <strong>Uploaded Image:</strong>
            <img
              src={selectedTransaction.screenshotimg}
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
