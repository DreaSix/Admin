import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import './NewUsers.scss';

const NewUsers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });

  const data = [
    {
      key: '1',
      fullName: 'Sreevardhan',
      phone: '9515206990',
    },
    {
      key: '2',
      fullName: 'Elisha',
      phone: '9754643232',
    },
    {
      key: '3',
      fullName: 'Sreenu',
      phone: '8565757312',
    },
  ];

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'center',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button
          type="primary"
          style={{ backgroundColor: '#FFCC00', border: 'none', color: '#000' }}
          onClick={() => handleGenerate(record)}
        >
          Generate
        </Button>
      ),
    },
  ];

  const handleGenerate = (record) => {
    // Dummy login details for now
    setLoginDetails({
      username: `${record.fullName.toLowerCase().replace(' ', '')}@123`,
      password: 'gdr735@',
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="user-table-container">
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered
        className="custom-table"
      />
      <Modal
        title="User Login Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        <div className="login-details">
          <p>
            <strong>Username:</strong> {loginDetails.username}{' '}
            <Button
              type="link"
              onClick={() => navigator.clipboard.writeText(loginDetails.username)}
            >
              <i className="copy-icon">📋</i>
            </Button>
          </p>
          <p>
            <strong>Password:</strong> {loginDetails.password}{' '}
            <Button
              type="link"
              onClick={() => navigator.clipboard.writeText(loginDetails.password)}
            >
              <i className="copy-icon">📋</i>
            </Button>
          </p>
          <Button
            type="primary"
            style={{
              backgroundColor: '#FFCC00',
              border: 'none',
              color: '#000',
              marginTop: '10px',
              width: '100%',
            }}
          >
            Share
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NewUsers;
