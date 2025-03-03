import React, { useEffect, useState } from 'react';
import { Button, Tabs, List } from 'antd';
import { CheckCircleOutlined, QuestionCircleOutlined, RightOutlined } from '@ant-design/icons';
import './Transactions.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '../../Service/TransactionService';

const { TabPane } = Tabs;

const TransactionPage = () => {
  const [activeTab, setActiveTab] = useState('DEPOSIT');
  const [transactions, setTransactions] = useState([])
  const [allTransactions, setAllTransactions] = useState([])

  useEffect(() => {
    getUserTransactions()
  }, [])

  const getUserTransactions = () => {
    transactionService.getAllTransactions()
      .then(response => {
        const filteredData = response?.totalContent?.filter(item => item?.transactionType === activeTab)
        setAllTransactions(response?.totalContent)
        setTransactions(filteredData)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const navigate = useNavigate();

  const OnpaymentStatus  = () => {
    navigate("/payment-status");
  };

  const onTabChange = (key) => {
    setActiveTab(key);
    const filteredData = allTransactions?.filter(item => item?.transactionType === key)
    setTransactions(filteredData)

  };

  return (
    <main>
    
    <div className="transaction-page-container">
      <Tabs style={{marginTop: "15px"}} defaultActiveKey="DEPOSIT" onChange={onTabChange}>
        <TabPane
          tab={<Button className={activeTab === 'DEPOSIT' ? 'active-tab' : ''}>Deposit</Button>}
          key="DEPOSIT"
        />
        <TabPane
          tab={<Button className={activeTab === 'WITHDRAW' ? 'active-tab' : ''}>Withdrawal</Button>}
          key="WITHDRAW"
        />
      </Tabs>

      <List
        className="transaction-list"
        itemLayout="horizontal"
        dataSource={transactions}
        renderItem={(transaction) => (
          <List.Item
            actions={[
              <RightOutlined onClick={OnpaymentStatus} key="arrow" style={{ color: '#fff' }} />,
            ]}
          >
            <List.Item.Meta
              avatar={
                transaction.approvalStatus === 'APPROVED' ? (
                  <CheckCircleOutlined style={{ color: '#4caf50', fontSize: '24px' }} />
                ) : (
                  <QuestionCircleOutlined style={{ color: '#ff5252', fontSize: '24px' }} />
                )
              }
              title={`#${transaction?.id}`}
              description={transaction?.createdAt.split("T")[0]}
            />
            <div className="transaction-amount">{transaction.amount}</div>
          </List.Item>
        )}
      />
    </div>
    </main>
  );
};

export default TransactionPage;
