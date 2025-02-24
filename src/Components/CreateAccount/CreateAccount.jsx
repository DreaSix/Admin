import { useState } from "react";
import { Input, Button, Radio, Form, Card } from "antd";
import "./CreateAccount.scss"
import { paymentService } from "../../Service/PaymentService";

const CreateAccount = () => {
  const [paymentMethod, setPaymentMethod] = useState("BANK");

  const onFinish = (values) => {
    const payload = {
      ...values
    }
    paymentService.createPayment(payload)
      .then(response => {
        console.log('response', response)
      })
      .catch(error => {
        console.log('error', error)
      })
  };

  return (
    <main>
    <div className="max-w-md mx-auto p-4">
      <Card className="accountBody">
      <Form
          name="paymentForm"
          onFinish={onFinish}
          initialValues={{
            paymentMethod: "BANK",
          }}
        >
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>

          {/* Payment Method Selection */}
          <Form.Item name="paymentMethod" label="Select Payment Method" className="mb-4">
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            >
              <Radio value="BANK">Bank</Radio>
              <Radio value="UPI">UPI</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Bank Fields */}
          {paymentMethod === "BANK" && (
            <>
              <Form.Item
                name="accountName"
                label="Account Name"
                rules={[{ required: true, message: "Please input your account name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="accountNumber"
                label="Account Number"
                rules={[{ required: true, message: "Please input your account number!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ifscCode"
                label="IFSC Code"
                rules={[{ required: true, message: "Please input your IFSC code!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="bankName"
                label="Bank Name"
                rules={[{ required: true, message: "Please input your bank name!" }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          {/* UPI Fields */}
          {paymentMethod === "UPI" && (
            <>
              <Form.Item
                name="upiId"
                label="UPI ID"
                rules={[{ required: true, message: "Please input your UPI ID!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="upiPhone"
                label="UPI Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your UPI phone number!"
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: "Phone number must be exactly 10 digits!"
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="qrCodeUrl"
                label="QR Code URL"
                rules={[
                  {
                    required: true,
                    message: "Please input your QR code URL!"
                  },
                  {
                    type: "url",
                    message: "Please enter a valid URL!"
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          {/* Amount */}
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input type="number" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full mt-4">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Card>
    </div>
    </main>
  );
};

export default CreateAccount;
