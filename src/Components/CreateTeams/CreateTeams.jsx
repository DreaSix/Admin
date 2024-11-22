import React, { useState } from "react";
import { Tabs, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CreateTeams.scss";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const CreateTeams = () => {
    const navigate = useNavigate(); 
    
    const handleNext = () => {
        navigate("/"); // Redirect to the home page
      };

    
  const [team1Players, setTeam1Players] = useState(Array(6).fill(""));
  const [team2Players, setTeam2Players] = useState(Array(6).fill(""));

  const handlePlayerChange = (team, index, value) => {
    if (team === "team1") {
      const updatedPlayers = [...team1Players];
      updatedPlayers[index] = value;
      setTeam1Players(updatedPlayers);
    } else {
      const updatedPlayers = [...team2Players];
      updatedPlayers[index] = value;
      setTeam2Players(updatedPlayers);
    }
  };

  const renderPlayerInputs = (team, players) => {
    return players.map((player, index) => (
      <div className="player-row" key={index}>
        <div className="player-label">Player-{index + 1}</div>
        <Input
          className="player-input"
          placeholder="Enter Player Name"
          value={player}
          onChange={(e) => handlePlayerChange(team, index, e.target.value)}
        />
        <Upload>
          <Button icon={<UploadOutlined />} className="upload-btn" />
        </Upload>
      </div>
    ));
  };

  return (
    <div className="player-selection-container">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Team-1" key="1">
          <Form layout="vertical" className="player-form">
            {renderPlayerInputs("team1", team1Players)}
            <Button type="primary" htmlType="submit" className="save-btn">
              Save
            </Button>
          </Form>
        </TabPane>
        <TabPane tab="Team-2" key="2">
          <Form layout="vertical" className="player-form">
            {renderPlayerInputs("team2", team2Players)}
            <Button type="primary" htmlType="submit" className="save-btn" onClick={handleNext}>
              Save
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CreateTeams;
