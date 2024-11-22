import React from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddPlayers.scss';
import { useNavigate } from "react-router-dom";

const AddPlayer = () => {
    const navigate = useNavigate(); 

  const handleNext = () => {
      navigate("/create-players"); // Redirect to the home page
    };


  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form Values:', values);
  };

  return (
    <div className="create-player-container">
      <h1>Create Player</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Match Name */}
        <Form.Item
          label="Match Name"
          name="matchName"
          rules={[{ required: true, message: 'Please enter a match name' }]}
        >
          <Input placeholder="Enter match name" />
        </Form.Item>

        {/* Upload Match Image */}
        <Form.Item label="Upload Match Image" name="matchImage">
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false} // Disable automatic upload
          >
            <div>
              <UploadOutlined />
              <p>Click to upload</p>
            </div>
          </Upload>
        </Form.Item>

        {/* Country / Francis Name */}
        <Form.Item label="Country / Francis Name (Optional)" name="countryName">
          <Input placeholder="Enter country or Francis name" />
        </Form.Item>

        {/* Save Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block onClick={handleNext}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPlayer;
