import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';

import './NewUsers.scss';
import { getAllPlayers } from '../../Service/UsersService';

const NewUsers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usersData, setUsersData] = useState([])
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    getplayers()
  }, [])

  const getplayers = () => {
      getAllPlayers.getUsersList()
          .then(response => {
            setUsersData(response?.data)
          }).catch(error => {
            console.log('error', error)
          })
  }

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Phone',
      dataIndex: 'contactNo',
      key: 'contactNo',
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
    const params = {
      userId: record?.userId
    }
    getAllPlayers.createUser(params)
      .then(response => {
        setLoginDetails(response)
        getplayers()
      })
      .catch(error => {
        console.log('error', error)
      })
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="user-table-container">
      <Table
        dataSource={usersData}
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
