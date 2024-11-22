import React from 'react';
import { Input } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import './CreatePlayers.scss';
import { useNavigate } from "react-router-dom";

const players = [
  {
    id: 1,
    name: 'Andre Russell',
    country: 'West Indies',
    image: 'https://tse3.mm.bing.net/th?id=OIP.ktbiIEIctRXFepngg70D2QHaHt&pid=Api&P=0&h=180',
  },
  {
    id: 2,
    name: 'AB Devillers',
    country: 'South Africa',
    image: 'https://tse4.mm.bing.net/th?id=OIP.0W7NQk8ZMS4ipsLcS1oFVwHaFq&pid=Api&P=0&h=180',
  },
  {
    id: 3,
    name: 'MS Dhoni',
    country: 'India',
    image: 'https://tse1.mm.bing.net/th?id=OIP.hN5YRMgCPsgpVsuyzlPJQQHaJI&pid=Api&P=0&h=180',
  },
];

const CreatePlayers = () => {

  const navigate = useNavigate(); 

  const handleNext = () => {
      navigate("/add-players"); // Redirect to the home page
    };

  return (
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
        {players.map((player) => (
          <div className="player-card" key={player.id}>
            {/* Use `src` directly for external URLs */}
            <img src={player.image} alt={player.name} className="player-image" />
            <div className="player-details">
              <span className="player-name">{player.name}</span>
              <span className="player-country">#{player.country}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePlayers;
