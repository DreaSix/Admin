import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CreateWinner.scss";
import { matchDetails } from "../../Service/MatchDetailsService";
import { useNavigate } from "react-router";
import { Option } from "antd/es/mentions";

const CreateWinners = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([])
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const payload = {
      ...values
    }
    console.log('payload', payload)
    matchDetails
      .createWinner(payload)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getAllMatches()
  }, [])

  const getAllMatches = () => {
    matchDetails.getAllMatches()
      .then(response => {
        setMatches(response?.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

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
          name="matchId"
          label="Match Name"
          rules={[{ required: true, message: "Please enter match name" }]}
        >
          <Select>
            {matches?.map(match => (
              <Option value={match?.matchId}>{match?.matchName}</Option>
            ))}
          </Select>
        </Form.Item>

        {/* <Form.Item
          name="winnerImage"
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            name="logo"
            listType="picture"
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item
          name="winnerAmount"
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
          <Button type="primary" htmlType="submit" className="done-button">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateWinners;
