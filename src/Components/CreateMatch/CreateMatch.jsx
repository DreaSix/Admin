import React from "react";
import { Form, Input, Button, Upload, Select, DatePicker, message } from "antd";
import { UploadOutlined, CalendarOutlined } from "@ant-design/icons";
import "./CreateMatch.scss";
import { useNavigate } from "react-router-dom";
import { matchDetails } from "../../Service/MatchDetailsService";
import dayjs from "dayjs";

const { Option } = Select;

const CreateMatch = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('values', values)

    const dateTimeString = values?.countDownEndTime
      ? dayjs(values.countDownEndTime).format("YYYY-MM-DD HH:mm:ss")
      : "";

    const formData = new FormData();
    formData.append("matchName", values?.matchName);
    formData.append("matchTime", values?.matchTime);
    formData.append("countDownEndTime", dateTimeString); // Send formatted date-time string
    formData.append("teamOneName", values?.teamOneName);
    formData.append("teamTwoName", values?.teamTwoName);
    values?.matchAction?.forEach(auction => {
      formData.append("matchAction", auction);
    })

    if (values?.matchImage?.length > 0) {
      values.matchImage.forEach((file) => {
        formData.append("matchImage", file.originFileObj);
      });
    }

    matchDetails
      .createMatch(formData)
      .then(() => {
        message.success("Match created successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <main>
      <div className="create-match-container">
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
            <Input
              style={{ border: "0.5px solid black" }}
              placeholder="Enter match name"
            />
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
              <Button
                style={{ border: "0.5px solid black" }}
                icon={<UploadOutlined />}
              >
                Upload
              </Button>
            </Upload>
          </Form.Item>

          {/* Countdown End Date & Time */}
          <Form.Item
            label="Countdown End Date & Time"
            name="countDownEndTime"
            rules={[
              { required: true, message: "Please select the date & time" },
            ]}
          >
            <DatePicker
              showTime
              placeholder="Select date & time"
              suffixIcon={<CalendarOutlined />}
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: "100%", border: "0.5px solid black" }}
            />
          </Form.Item>

          {/* Team-1 Name */}
          <Form.Item
            label="Team-1 Name"
            name="teamOneName"
            rules={[{ required: true, message: "Please enter team-1 name" }]}
          >
            <Input
              style={{ border: "0.5px solid black" }}
              placeholder="Team-1 name"
            />
          </Form.Item>

          {/* Team-2 Name */}
          <Form.Item
            label="Team-2 Name"
            name="teamTwoName"
            rules={[{ required: true, message: "Please enter team-2 name" }]}
          >
            <Input
              style={{ border: "0.5px solid black" }}
              placeholder="Team-2 name"
            />
          </Form.Item>

          {/* Match Auction */}
          <Form.Item
            label="Match Auction"
            name="matchAction"
            rules={[
              { required: true, message: "Please select an auction type" },
            ]}
          >
            <Select
              style={{ border: "0.5px solid black" }}
              mode="multiple"
              placeholder="Select an option"
            >
              <Option value="topSixer"> Top Sixer </Option>
              <Option value="topScorer"> Top Scorer </Option>
              <Option value="topContest">Top Contest</Option>
              <Option value="mostWickets">Most Wickets</Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              style={{ backgroundColor: "yellow" }}
              htmlType="submit"
              block
            >
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default CreateMatch;
