import React from "react";
import { Form, Input, Button, Upload, Select, TimePicker, message } from "antd";
import { UploadOutlined, ClockCircleOutlined } from "@ant-design/icons";
import "./CreateMatch.scss";
import { useNavigate } from "react-router-dom";
import { matchDetails } from "../../Service/MatchDetailsService";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const CreateMatch = () => {

    const navigate = useNavigate();  // Create navigate function

  const onFinish = (values) => {
    console.log('values?.matchImage', values?.matchImage)

    const dateStr = values?.countDownEndTime

    const timeString = dayjs(dateStr.$d).format('YYYY-MM-DD HH:mm:ss');

    const formData = new FormData()

    formData.append("matchName", values?.matchName)
    formData.append("matchTime", values?.matchTime)
    formData.append("countDownEndTime", timeString)
    formData.append("teamOneName", values?.teamOneName)
    formData.append("teamTwoName", values?.teamTwoName)
    formData.append("matchAction", values?.matchAction)
    if (values?.matchImage?.length > 0) {
      values?.matchImage?.forEach((file) => {
        formData.append("matchImage", file.originFileObj);
      });
    }

    matchDetails.createMatch(formData)
      .then(response => {
        message.success("Match created successfully")
        navigate("/")
      }).catch(error => {
        console.log('error', error)
      })
  };


  return (
    <main>
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
        {/* <Form.Item
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
        </Form.Item> */}

        {/* Countdown End Time */}
        <Form.Item
          label="Countdown End Time"
          name="countDownEndTime"
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
          name="teamOneName"
          rules={[{ required: true, message: "Please enter team-1 name" }]}
        >
          <Input style={{border:"1px solid white"}} placeholder="Team-1 name" />
        </Form.Item>

        {/* Team-2 Name */}
        <Form.Item
          label="Team-2 Name"
          name="teamTwoName"
          rules={[{ required: true, message: "Please enter team-2 name" }]}
        >
          <Input style={{border:"1px solid white"}} placeholder="Team-2 name" />
        </Form.Item>

        {/* Match Auction */}
        <Form.Item
          label="Match Auction"
          name="matchAction"
          rules={[{ required: true, message: "Please select an auction type" }]}
        >
          <Select style={{border:"1px solid white"}} placeholder="Select an option">
            <Option value="topSixer"> Top Sixer </Option>
            <Option value="topScorer"> Top Scorer </Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button htmlType="submit" block>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
    </main>
  );
};

export default CreateMatch;
