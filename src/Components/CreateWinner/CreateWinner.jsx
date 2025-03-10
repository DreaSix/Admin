import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CreateWinner.scss";
import { matchDetails } from "../../Service/MatchDetailsService";
import { useNavigate } from "react-router";
import { Option } from "antd/es/mentions";
import { all } from "axios";
import { getAllPlayers } from "../../Service/UsersService";

const CreateWinners = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([])
  const [selectedMatchId, setSelectedMatchId] = useState()
  const [playerDetails, setPlayerDetails] = useState([])
  const [form] = Form.useForm();
  const [users, setUsers] = useState([])

  useEffect(() => {
      getAllUsers()
    }, [])
  
    const getAllUsers = () => {
      getAllPlayers.getAllUsers()
        .then(response => {
          setUsers(response?.totalContent)
        })
        .catch(error => {
          console.log('error', error)
        })
    }

  const handleSubmit = (values) => {
    const user = playerDetails?.find(player => player?.playerId === values?.playerId)
    console.log('user', user)
    const payload = {
      ...values,
      userId: user?.userResponseVO?.id
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
      if (selectedMatchId){
        getPlayerDetailsByMatchId()
      }
    }, [selectedMatchId]);
  
    const getPlayerDetailsByMatchId = () => {
      matchDetails
        .getMatchPlayerDetails(selectedMatchId)
        .then((response) => {
          const allPlayers = response.data.flatMap(match => 
            Object.values(match?.playersDtoMap || {})
          );

          const matchUsers = response.data.flatMap(match => 
            Object.values(match?.playersDtoMap || {}) // Convert object to array safely
              .filter(player => player?.userResponseVO !== null) // Filter valid players
          );

          const allUsers = matchUsers.map(user => user?.userResponseVO)

          console.log('matchUsers', allUsers)

          setPlayerDetails(allPlayers)
          setUsers(allUsers)
      
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const handleMatchChange = (value) => {
      setSelectedMatchId(value)
    }

  return (
    <main>
    <div className="create-winners-container">
      <h2>Create Winners</h2>
      <Form
        form={form}
        layout="vertical"
        className="create-winners-form"
        onFinish={handleSubmit}
      >
        {/* <Form.Item
          name="winnerName"
          label="Winner Name"
          rules={[{ required: true, message: "Please enter winner name" }]}
        >
          <Input placeholder="Enter Winner Name" />
        </Form.Item> */}
        

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
          <Select disabled={!selectedMatchId}>
            {playerDetails?.map(player => (
              <Option value={player?.playerId}>{player?.playerName}</Option>
            ))}
          </Select>
        </Form.Item>

        {/* <Form.Item
          name="userId"
          label="User Name"
          rules={[{ required: true, message: "Please select user" }]}
        >
          <Select disabled={!selectedMatchId}>
            {users?.map(user => (
              <Option value={user?.id}>{user?.name}</Option>
            ))}
          </Select>
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
    </main>
  );
};

export default CreateWinners;
