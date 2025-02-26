import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CreateWinner.scss";
import { matchDetails } from "../../Service/MatchDetailsService";
import { useNavigate } from "react-router";
import { Option } from "antd/es/mentions";
import { all } from "axios";

const CreateWinners = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([])
  const [selectedMatchId, setSelectedMatchId] = useState()
  const [playerDetails, setPlayerDetails] = useState([])
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const payload = {
      ...values
    }
    matchDetails
      .createWinner(payload)
      .then((response) => {
        console.log("response", response);
        navigate("/")
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

  useEffect(() => {
      getPlayerDetailsByMatchId();
    }, [selectedMatchId]);
  
    const getPlayerDetailsByMatchId = () => {
      matchDetails
        .getMatchPlayerDetails(selectedMatchId)
        .then((response) => {
          const allPlayers = response.data.flatMap(match => 
            Object.values(match?.playersDtoMap || {})
          );

          setPlayerDetails(allPlayers)
      
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const handleMatchChange = (value) => {
      setSelectedMatchId(value)
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
          rules={[{ required: true, message: "Please select match" }]}
        >
          <Select onChange={handleMatchChange}>
            {matches?.map(match => (
              <Option value={match?.matchId}>{match?.matchName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="playerId"
          label="Player Name"
          rules={[{ required: true, message: "Please select player" }]}
        >
          <Select>
            {playerDetails?.map(player => (
              <Option value={player?.playerId}>{player?.playerName}</Option>
            ))}
          </Select>
        </Form.Item>

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
