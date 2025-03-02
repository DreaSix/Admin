import { useState } from "react";
import { Input, Button, Radio, Form, Card, Upload } from "antd";
import "./CreateAccount.scss";
import { paymentService } from "../../Service/PaymentService";
import { UploadOutlined, ClockCircleOutlined } from "@ant-design/icons";

const CreateAccount = () => {
  const [paymentMethod, setPaymentMethod] = useState("BANK");

  const onFinish = (values) => {
    console.log('values', values)
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key !== "qrCode"){
        formData.append(key, values[key]);
      }
  });

  console.log('values?.qrCode', values?.qrCode?.fileList)

  if (values?.qrCode?.fileList?.length > 0) {
    values?.qrCode?.fileList?.forEach((file) => {
      console.log('file', file)
      formData.append("qrCode", file.originFileObj);
    });
  }
    paymentService
      .createPayment(formData)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <main>
      <div className="max-w-md mx-auto p-50">
        <Card className="accountBody">
          <Form
            name="paymentForm"
            onFinish={onFinish}
            initialValues={{
              paymentMethod: "BANK",
            }}
          >
            <h2 className="text-xl font-bold mb-4">Account Details</h2>

            {/* Payment Method Selection */}
            <Form.Item
              name="paymentMethod"
              label="Select Payment Method"
              className="mb-4"
            >
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
                  rules={[
                    {
                      required: true,
                      message: "Please input your account name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="accountNumber"
                  label="Account Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your account number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="ifscCode"
                  label="IFSC Code"
                  rules={[
                    { required: true, message: "Please input your IFSC code!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="bankName"
                  label="Bank Name"
                  rules={[
                    { required: true, message: "Please input your bank name!" },
                  ]}
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
                  rules={[
                    { required: true, message: "Please input your UPI ID!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="upiPhone"
                  label="Mobile Number "
                  rules={[
                    {
                      required: true,
                      message: "Please input your UPI phone number!",
                    },
                    {
                      pattern: /^\d{10}$/,
                      message: "Phone number must be exactly 10 digits!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="qrCode"
                  label="QR Code"
                  rules={[
                    {
                      required: true,
                      message: "Please input your QR code URL!",
                    },
                  ]}
                >
                  <Upload
                    name="qrCode"
                    listType="picture"
                    maxCount={1}
                    accept="image/*"
                  >
                    <Button
                      style={{ border: "0.5px solid black" }}
                      icon={<UploadOutlined />}
                    >
                      Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </>
            )}

            {/* Submit Button */}
            <Form.Item>
              <Button
                style={{
                  background: "#ffcc00",
                  border: "10px",
                  color: "black",
                  fontWeight: "bold",
                }}
                htmlType="submit"
                className="w-full mt-4"
              >
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
