import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import './CreatePlayers.scss';
import { useNavigate } from "react-router-dom";
import { matchDetails } from '../../Service/MatchDetailsService';  // Assuming this is your API service

const CreatePlayers = () => {
  const [players, setPlayers] = useState([]);  // State to store players fetched from the API
  const navigate = useNavigate(); 

  // Fetch players from the API when the component mounts
  useEffect(() => {
    getPlayersDetails();
  }, []);  // Empty dependency array means this runs once after the initial render

  const getPlayersDetails = () => {
    matchDetails.getAllPlayers()
      .then(response => {
        console.log('response', response)
        setPlayers(response?.data)
      }).catch(error => {
        console.log('error', error)
      })
  }

  const handleNext = () => {
    navigate("/add-players");  // Navigate to another page (e.g., Add Players page)
  };

  return (
    <main>
    <div className="player-list-container">
      <div className="search-bar">
        <Input
          prefix={<SearchOutlined style={{ color: '#88a3c1' }} />}
          placeholder="Search Players"
          className="search-input"
        />
        <div className="add-player-btn" onClick={handleNext}>
          <PlusOutlined />
        </div>
      </div>
      <div className="player-cards">
        {players?.length > 0 ? (
          players?.map((player) => (
            <div className="player-card" key={player.playerId}>
              <img src={`data:image/jpeg;base64,${player.playerImage}`} alt={player.playerName} className="player-image" />
              <div className="player-details">
                <span className="player-name">{player.playerName}</span>
                <span className="player-country">#{player.countryName}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No players found</div>  
        )}
      </div>
    </div>
    </main>
  );
};

export default CreatePlayers;
