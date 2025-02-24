import React from 'react';
import { Form, Input, Button, Tabs } from 'antd';
import './WithDrawl.scss';

const { TabPane } = Tabs;

const Withdrawl = () => {
  const onFinish = (values) => {
    console.log('Form Values:', values);
  };

  return (
    <main>
    <div className="bank-form-container">
      <Tabs defaultActiveKey="1" centered className="tab-container">
        {/* Bank Tab */}
        <TabPane tab="Bank" key="1">
          <Form layout="vertical" onFinish={onFinish} className="form-container">
            <Form.Item
              name="userId"
              label="User Name / ID"
              rules={[{ required: true, message: 'Please enter your User Name / ID' }]}
            >
              <Input placeholder="Enter your User Name / ID" />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Please enter the Amount' }]}
            >
              <Input placeholder="Enter Amount" type="number" />
            </Form.Item>

            <Form.Item
              name="holderName"
              label="Holder Name"
              rules={[{ required: true, message: 'Please enter the Holder Name' }]}
            >
              <Input placeholder="Enter Account Holder Name" />
            </Form.Item>

            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[{ required: true, message: 'Please enter the Account Number' }]}
            >
              <Input placeholder="Enter Account Number" type="number" />
            </Form.Item>

            <Form.Item
              name="ifsc"
              label="IFSC Code"
              rules={[{ required: true, message: 'Please enter the IFSC Code' }]}
            >
              <Input placeholder="Enter IFSC Code" />
            </Form.Item>

            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={[{ required: true, message: 'Please enter the Bank Name' }]}
            >
              <Input placeholder="Enter Bank Name" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Done
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        {/* UPI Tab */}
        <TabPane tab="UPI" key="2">
          <Form layout="vertical" onFinish={onFinish} className="form-container">
            <Form.Item
              name="userId"
              label="User Name / ID"
              rules={[{ required: true, message: 'Please enter your User Name / ID' }]}
            >
              <Input placeholder="Enter your User Name / ID" />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Please enter the Amount' }]}
            >
              <Input placeholder="Enter Amount" type="number" />
            </Form.Item>

            <Form.Item
              name="upiId"
              label="UPI ID"
              rules={[{ required: true, message: 'Please enter your UPI ID' }]}
            >
              <Input placeholder="Enter UPI ID" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Done
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
    </main>
  );
};

export default Withdrawl;
