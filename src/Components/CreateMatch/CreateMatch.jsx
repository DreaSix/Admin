import React from "react";
import { Form, Input, Button, Upload, Select, TimePicker } from "antd";
import { UploadOutlined, ClockCircleOutlined } from "@ant-design/icons";
import "./CreateMatch.scss";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateMatch = () => {

    const navigate = useNavigate();  // Create navigate function

  // Function to navigate to Create Match page
  const handleCreateMatch = () => {
    navigate('/create-teams');
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="create-match-container">
      <h2>Create Match</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="create-match-form"
      >
        {/* Match Name */}
        <Form.Item
          label="Match Name"
          name="matchName"
          rules={[{ required: true, message: "Please enter the match name" }]}
        >
          <Input style={{border:"1px solid white"}} placeholder="Enter match name" />
        </Form.Item>

        {/* Upload Match Image */}
        <Form.Item
          label="Upload Match Image"
          name="matchImage"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            name="logo"
            listType="picture"
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        {/* Match Time */}
        <Form.Item
          label="Match Time"
          name="matchTime"
          rules={[{ required: true, message: "Please select a match time" }]}
        >
          <Select style={{border:"0.5px solid white"}} placeholder="Select an option">
            <Option value="morning">Morning</Option>
            <Option value="afternoon">Afternoon</Option>
            <Option value="evening">Evening</Option>
          </Select>
        </Form.Item>

        {/* Countdown Start Time */}
        <Form.Item
          label="Countdown Start Time"
          name="startTime"
          rules={[
            { required: true, message: "Please select the start time" },
          ]}
        >
          <TimePicker
            placeholder="Select start time"
            suffixIcon={<ClockCircleOutlined />}
            style={{ width: "100%", border:"0.5px solid white" }}
          />
        </Form.Item>

        {/* Countdown End Time */}
        <Form.Item
          label="Countdown End Time"
          name="endTime"
          rules={[{ required: true, message: "Please select the end time" }]}
        >
          <TimePicker
            placeholder="Select end time"
            suffixIcon={<ClockCircleOutlined />}
            style={{ width: "100%" , border:"0.5px solid white" }}
          />
        </Form.Item>

        {/* Team-1 Name */}
        <Form.Item
          label="Team-1 Name"
          name="team1Name"
          rules={[{ required: true, message: "Please enter team-1 name" }]}
        >
          <Input style={{border:"1px solid white"}} placeholder="Team-1 name" />
        </Form.Item>

        {/* Team-2 Name */}
        <Form.Item
          label="Team-2 Name"
          name="team2Name"
          rules={[{ required: true, message: "Please enter team-2 name" }]}
        >
          <Input style={{border:"1px solid white"}} placeholder="Team-2 name" />
        </Form.Item>

        {/* Match Auction */}
        <Form.Item
          label="Match Auction"
          name="matchAuction"
          rules={[{ required: true, message: "Please select an auction type" }]}
        >
          <Select style={{border:"1px solid white"}} placeholder="Select an option">
            <Option value="live"> Top Sixer </Option>
            <Option value="closed"> Top Scorer </Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block onClick={handleCreateMatch}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateMatch;
