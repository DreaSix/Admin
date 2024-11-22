import React from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CreateWinner.scss";
import { useNavigate } from "react-router-dom";

const CreateWinners = () => {

    const navigate = useNavigate(); 

    const handleNext = () => {
        navigate("/"); // Redirect to the home page
      };

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form Values: ", values);
  };

  return (
    <div className="create-winners-container">
      <h2>Create Winners</h2>
      <Form
        form={form}
        layout="vertical"
        className="create-winners-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="winnerName"
          label="Winner Name"
          rules={[{ required: true, message: "Please enter winner name" }]}
        >
          <Input placeholder="Enter Winner Name" />
        </Form.Item>

        <Form.Item
          name="matchName"
          label="Match Name"
          rules={[{ required: true, message: "Please enter match name" }]}
        >
          <Input placeholder="Enter Match Name" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false} // Prevent automatic upload
          >
            <div className="upload-container">
              <UploadOutlined />
              <p>Upload Image</p>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="winningAmount"
          label="Winning Amount"
          rules={[{ required: true, message: "Please enter winning amount" }]}
        >
          <Input type="number" placeholder="Enter Amount" />
        </Form.Item>

        <Form.Item
          name="matchAuction"
          label="Match Auction"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Select placeholder="Select an option">
            <Select.Option value="auction1">Auction 1</Select.Option>
            <Select.Option value="auction2">Auction 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="done-button" onClick={handleNext}>
            Done
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateWinners;
