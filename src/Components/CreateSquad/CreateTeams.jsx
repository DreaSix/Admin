import React, { useEffect, useState } from "react";
import { Tabs, Form, Input, Button, Upload, Avatar, List, message } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import "./CreateTeams.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { matchDetails } from "../../Service/MatchDetailsService";
import { matchScreen } from "antd/es/_util/responsiveObserver";

const { TabPane } = Tabs;

const CreateTeams = () => {

  const { matchId } = useParams();

  const [matchData, setMatchDetails] = useState(null)
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [team1Players, setTeam1Players] = useState(Array(6).fill(""));
  const [team2Players, setTeam2Players] = useState(Array(6).fill(""));
  const [selectedTab, setSelectedTab] = useState("1")
  const [playersList, setPlayersList] = useState({})

  useEffect(() => {
    if (matchId) {
      getMatchDetailsById()
    }
  }, [])

  const getMatchDetailsById = () => {
    matchDetails.getMtachDetailsById(matchId)
      .then(response => {
        setMatchDetails(response?.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    getPlayerDetailsByMatchId()
  }, [matchData])

  const getPlayerDetailsByMatchId = () => {
    matchDetails.getMatchPlayerDetails(matchId)
      .then(response => {

        setPlayersList(response?.data)
        if (selectedTab === "1") {
          const teamOneData = response?.data?.find(
            (player) => player?.teamName === matchData?.teamOneName
          );
          const flattenedPlayers1 = teamOneData?.playersDtoMap;

          setSelectedPlayers(flattenedPlayers1)
        } else if (selectedTab === "2") {
          const teamTwoData = response?.data?.find(
            (player) => player?.teamName === matchData?.teamTwoName
          );
          const flattenedPlayers2 = teamTwoData?.playersDtoMap;
          setSelectedPlayers(flattenedPlayers2)
        }
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
    console.log('selectedPlayers', Object.keys(selectedPlayers))
    const payload = {
      teamName: matchData?.teamOneName,
      matchId: matchData?.matchId,
      playerIds: Object.keys(selectedPlayers)
    }

    matchDetails.saveTeamPlayerDetails(payload)
      .then(response => {
        message.success("Players added successfully")
        getMatchDetailsById()
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const addTeam2Players = () => {
    const payload = {
      teamName: matchData?.teamTwoName,
      matchId: matchData?.matchId,
      playerIds:  Object.keys(selectedPlayers)
    }

    matchDetails.saveTeamPlayerDetails(payload)
      .then(response => {
        message.success("Players added successfully")
        getMatchDetailsById()
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    const filtered = players.filter((player) =>
      player.playerName?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const handleAddPlayer = (player) => {
    console.log('selectedPlayers', selectedPlayers)
    if (selectedPlayers === null || selectedPlayers === undefined){
      console.log('player', player)
      setSelectedPlayers((prevPlayers) => ({
        ...prevPlayers, // Keep existing players
        [player.playerId]: player, // Add new player with playerId as the key
      }));
    } else if (!Object.keys(selectedPlayers).includes(player?.playerId)) {
      console.log('player', player)
      setSelectedPlayers((prevPlayers) => ({
        ...prevPlayers, // Keep existing players
        [player.playerId]: player, // Add new player with playerId as the key
      }));
    }
    console.log('selectedPlayers', selectedPlayers)

    setSearchTerm('');
    setFilteredPlayers(players);
  };


  const renderPlayerInputs = (team, players) => {
    return (
      <div className="player-row">
        <div className="player-label">Player</div>
        <Input.Search
         style={{border:"0.5px solid gray"}}
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

  const handleTabChange = (value) => {
    setSelectedTab(value)
    setSearchTerm('');
    setFilteredPlayers([]);
    setSelectedPlayers([]);
    if (value === "1") {
      const teamOneData = playersList.find(
        (player) => player?.teamName === matchData?.teamOneName
      );      
      const flattenedPlayers1 = teamOneData?.playersDtoMap;
      setSelectedPlayers(flattenedPlayers1)
    } else if (value === "2") {
      const teamTwoData = playersList?.find(
        (player) => player?.teamName === matchData?.teamTwoName
      );
      const flattenedPlayers2 = teamTwoData?.playersDtoMap;
      setSelectedPlayers(flattenedPlayers2)
    }
  };

  const handleRemovePlayer = (playerId) => {
  
    const updatedPlayers = { ...selectedPlayers };
  
    delete updatedPlayers[playerId];
  
    setSelectedPlayers(updatedPlayers);
  };
  



  return (
    <main>
      <div className="player-selection-container">
      <Tabs defaultActiveKey="1" className="custom-tabs " onChange={handleTabChange}>
        <TabPane tab={matchData?.teamOneName} key="1">
          <Form onFinish={addTeam1Players} layout="vertical" className="player-form">
            {renderPlayerInputs("team1", team1Players)}
            <h3>Selected Players:</h3>
            {selectedPlayers !== null && selectedPlayers !== undefined && Object.keys(selectedPlayers).length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={Object.entries(selectedPlayers)} // Convert object to array
                renderItem={([playerId, player]) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        onClick={() => handleRemovePlayer(playerId)}
                        style={{ color: "red" }}
                        icon={<CloseOutlined />}
                      />
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`data:image/jpeg;base64,${player?.playerImage}`}
                          style={{ backgroundColor: "#d6d3d3" }}
                        />
                      }
                      title={player.playerName}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p>No players selected.</p>
            )}

            <Button type="primary" htmlType="submit" className="save-btn">
              Save
            </Button>
          </Form>
        </TabPane>
        <TabPane tab={matchData?.teamTwoName} key="2">
          <Form onFinish={addTeam2Players} layout="vertical" className="player-form">
            {renderPlayerInputs("team2", team2Players)}
            <h3>Selected Players:</h3>
            {selectedPlayers !== null && selectedPlayers !== undefined && Object.keys(selectedPlayers).length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={Object.entries(selectedPlayers)} // Convert object to array
                renderItem={([playerId, player]) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        onClick={() => handleRemovePlayer(playerId)}
                        style={{ color: "red" }}
                        icon={<CloseOutlined />}
                      />
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`data:image/jpeg;base64,${player?.playerImage}`}
                          style={{ backgroundColor: "#d6d3d3" }}
                        />
                      }
                      title={player.playerName}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p>No players selected.</p>
            )}

            <Button type="primary" htmlType="submit" className="save-btn">
              Save
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </div>
    </main>

  );
};

export default CreateTeams;
