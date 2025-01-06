import React from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddPlayers.scss';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { matchDetails } from '../../Service/MatchDetailsService';

const AddPlayer = () => {
    const navigate = useNavigate(); 

  const handleNext = () => {
      navigate("/create-players"); // Redirect to the home page
    };


  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form Values:', values);
    const formData = new FormData()
    formData.append("playerName", values?.playerName)
    formData.append("countryName", values?.countryName)
    if (values?.playerImage?.fileList?.length > 0) {
      values?.playerImage?.fileList?.forEach((file) => {
        console.log('file', file)
        formData.append("playerImage", file.originFileObj);
      });
    }

   matchDetails.createPlayer(formData)
    .then(response => {
      navigate("/create-players")
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="create-player-container">
      <h1>Create Player</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Match Name */}
        <Form.Item
          label="Player Name"
          name="playerName"
          rules={[{ required: true, message: 'Please enter a match name' }]}
        >
          <Input placeholder="Enter match name" />
        </Form.Item>

        {/* Upload Match Image */}
        <Form.Item label="Upload Match Image" name="playerImage">
          <Upload
            listType="picture-card"
            accept="image/*"
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
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPlayer;
