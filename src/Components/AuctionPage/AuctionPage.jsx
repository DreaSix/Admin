import React, { useState } from "react";
import { Card, Button, Switch, Menu } from "antd";
import "./AuctionPage.scss";
import Footer from "../Footer/Footer";


const players = [
  {
    name: "Dhoni",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4wGYdrRQsCseDMXG_OpyGnzPzRhZzbPV2Yw&s",
  },
  {
    name: "Kohli",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmvgF1br3j0w6pHctdBKbZdURoU1zVylWqwTgaH4o3ZgfYVHYeyltUVlYOYcqfOtBovwM&usqp=CAU",
  },
  {
    name: "Devillers",
    img: "https://static.cricketaddictor.com/wp-content/uploads/2021/03/AB-de-Villiers.png?q=80",
  },
  {
    name: "Maxwell",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcqyHRRD0u_3GmE89M8-Gk_zLwlObLE63HOA&s",
  },
];

const soldPlayers = [
  {
    name: "Devillers",
    img: "https://static.cricketaddictor.com/wp-content/uploads/2021/03/AB-de-Villiers.png?q=80",
  },
  {
    name: "Maxwell",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcqyHRRD0u_3GmE89M8-Gk_zLwlObLE63HOA&s",
  },
  {
    name: "Dhoni",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4wGYdrRQsCseDMXG_OpyGnzPzRhZzbPV2Yw&s",
  },
  {
    name: "Kohli",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmvgF1br3j0w6pHctdBKbZdURoU1zVylWqwTgaH4o3ZgfYVHYeyltUVlYOYcqfOtBovwM&usqp=CAU",
  },
];

const Auction = () => {
  const [showNextPlayers, setShowNextPlayers] = useState(false);
  const [showSoldPlayers, setShowSoldPlayers] = useState(false);

  return (
    <div className="auction-container">
      <div className="header">
        <div className="admin-info">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD00QC79nDx3sIKpgB0UJxudJ9qLv7f4a5ZQ&s" alt="Match Image" />
          <div className="admin-name">Admin</div>
          <div>
            <h3>TopSixer</h3>
          </div>
        </div> 
        <Button>Done</Button>    
      </div>

      {/* Next Players Section */}
      <div className="players-section">
        <Button
          className="dropdown-btn"
          onClick={() => setShowNextPlayers(!showNextPlayers)}
        >
          {showNextPlayers ? "Hide Players" : "Players List"}
        </Button>

        {showNextPlayers && (
          <div className="next-players">
            <h3>Next Players</h3>
            <div className="players">
              {players.map((player) => (
                <div className="player-card" key={player.name}>
                  <img
                    src={player.img}
                    alt={player.name}
                    className="player-img"
                  />
                  <div className="player-name">{player.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="players-section">
        {showNextPlayers && (
          <div className="next-players">
            <h3>Sold Players</h3>
            <div className="players">
              {players.map((player) => (
                <div className="player-card" key={player.name}>
                  <img
                    src={player.img}
                    alt={player.name}
                    className="player-img"
                  />
                  <div className="player-name">{player.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="player-info">
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS98HGbTrDUJJhQfg-96uxoG2Xk5sgOBIlReg&s"
          }
          alt="Virat kohli"
          className="player-img"
        />
        <div className="player-details">
          <span className="player-name">Virat Kohli</span>
          <span className="starting-price">
            Starting Price: <strong>Rs. 1000</strong>
          </span>
        </div>
      </div>

      {/* Bids Section */}
      <div className="bids-section">
        {[
          { name: "Raju", bid: 1100 },
          { name: "Elisha", bid: 1200 },
          { name: "Ramesh", bid: 1300 },
          { name: "Khayum", bid: 1400 },
          { name: "Pavan", bid: 1500 },
          { name: "Elisha", bid: 1600 },
        ].map((bid, index) => (
          <div className="bid-card" key={index}>
            <div className="bid-user">{bid.name.charAt(0)}</div>
            <div className="bid-info">
              <span className="bid-name">{bid.name}</span>
              <span className="bid-amount">{bid.bid}</span>
            </div>
          </div>
        ))}
      </div>

     {/* Footer Section with Action Buttons */}
     <div className="actions-footer">
        <div className="actions">
          <Button className="action-btn unsold">1</Button>
          <Button className="action-btn any-one">2</Button>
          <Button className="action-btn any-one">Any One</Button>
          <Button className="action-btn last-chance">Last Chance</Button>
          <Button className="action-btn all-drop">All Drop ?</Button>
          <Button className="action-btn unsold">Sold</Button>
          <Button className="action-btn unsold">Unsold</Button>
        </div>
      </div>

      <div>
      <Footer/>
      </div>
    </div>

  );
};

export default Auction;
