import React, { useEffect, useState } from "react";
import { Tabs, Form, Input, Button, Upload, Avatar, List } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CreateTeams.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { matchDetails } from "../../Service/MatchDetailsService";
import { matchScreen } from "antd/es/_util/responsiveObserver";

const { TabPane } = Tabs;

const CreateTeams = () => {

  const { matchId } = useParams();

  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [team1Players, setTeam1Players] = useState(Array(6).fill(""));
  const [team2Players, setTeam2Players] = useState(Array(6).fill(""));

  useEffect(() => {
    if (matchId){
      getMatchDetailsById()
    }
  }, [])

  const getMatchDetailsById = () => {
    matchDetails.getMtachDetailsById(matchId)
      .then(response => {
        console.log('response', response)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    getPlayersDetails();
  }, []);

  const getPlayersDetails = () => {
    matchDetails.getAllPlayers()
      .then(response => {
        console.log('response', response)
        setPlayers(response?.data)
      }).catch(error => {
        console.log('error', error)
      })
  }


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

  const addTeam1Players = () => {
    // const payload = {
    //   teamName: matchData?.teamOneName,
    //   matchId: matchData?.matchId,
    //   playerIds: selectedPlayers?.map(player => player?.playerId)
    // }

    // matchDetails.saveTeamPlayerDetails(payload)
    //   .then(response =>{
    //     console.log('response', response)
    //   })
    //   .catch(error =>{
    //     console.log('error', error)
    //   })
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    const filtered = players.filter((player) =>
      player.playerName?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const handleAddPlayer = (player) => {
    if (!selectedPlayers.some((p) => p.playerId === player.playerId)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
    setSearchTerm('');
    setFilteredPlayers(players);
  };


  const renderPlayerInputs = (team, players) => {
    return (
      <div className="player-row">
        <div className="player-label">Player</div>
        <Input.Search
          placeholder="Enter Player Name"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onSearch={(value) => {
            const match = players.find((player) =>
              player?.playerName?.toLowerCase().includes(value.toLowerCase())
            );
            if (match) handleAddPlayer(match);
          }}
        />

        {searchTerm && (
          <div className="player-suggestions">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="suggestion-item"
                onClick={() => handleAddPlayer(player)}
                style={{ cursor: 'pointer', margin: '5px 0', border: "2px solid black", width: "200px", backgroundColor: "#d6d3d3" }}
              >
                <Avatar src={`data:image/jpeg;base64,${player?.playerImage}`} size="medium" style={{ marginRight: '10px' }} />
                {player?.playerName}
              </div>
            ))}
          </div>
        )}

      </div>
    )
  };

  const handleTabChange = () => {
    setSearchTerm('');
    setFilteredPlayers([]);
    setSelectedPlayers([]);
  };

  return (
    <div className="player-selection-container">
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Team-1" key="1">
          <Form onFinish={addTeam1Players} layout="vertical" className="player-form">
            {renderPlayerInputs("team1", team1Players)}
            <h3>Selected Players:</h3>
            <List
              itemLayout="horizontal"
              dataSource={selectedPlayers}
              renderItem={(player) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`data:image/jpeg;base64,${player?.playerImage}`} style={{ backgroundColor: "#d6d3d3" }} />}
                    title={player.playerName}
                  />
                </List.Item>
              )}
            />
            <Button type="primary" htmlType="submit" className="save-btn">
              Save
            </Button>
          </Form>
        </TabPane>
        <TabPane tab="Team-2" key="2">
          <Form layout="vertical" className="player-form">
            {renderPlayerInputs("team2", team2Players)}
            <h3>Selected Players:</h3>
            <List
              itemLayout="horizontal"
              dataSource={selectedPlayers}
              renderItem={(player) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`data:image/jpeg;base64,${player?.playerImage}`} style={{ backgroundColor: "#d6d3d3" }} />}
                    title={player.playerName}
                  />
                </List.Item>
              )}
            />
            <Button type="primary" htmlType="submit" className="save-btn">
              Save
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CreateTeams;
