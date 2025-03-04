import React, { useEffect, useState } from "react";
import { Card, Button, Switch, Menu } from "antd";
import "./AuctionPage.scss";
import Footer from "../Footer/Footer";
import { useParams } from "react-router";
import { matchDetails } from "../../Service/MatchDetailsService";
import { bidService } from "../../Service/BidService";
import ChatBox from "../Chatbox/Chatbox";

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

const Auction = () => {
  const { matchId } = useParams();
  const [showNextPlayers, setShowNextPlayers] = useState(false);
  const [matchData, setMatchDetails] = useState(null);
  const [nextPlayers, setNextPlayers] = useState([]);
  const [soldPlayers, setSoldPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState();

  useEffect(() => {
    if (matchId) {
      getMatchDetailsById();
    }
  }, [matchId]);

  const getMatchDetailsById = () => {
    matchDetails
      .getMtachDetailsById(matchId)
      .then((response) => {
        setMatchDetails(response?.data);
      })
      .catch((error) => {
        console.log("Error fetching match details:", error);
      });
  };

  useEffect(() => {
    if (matchId) {
      getPlayerDetailsByMatchId();
    }
  }, [matchData]);

  const getPlayerDetailsByMatchId = () => {
    matchDetails
      .getMatchPlayerDetails(matchId)
      .then((response) => {
        if (!response?.data) {
          console.log("No match data found");
          return;
        }

        const unSoldPlayers = response.data.flatMap((match) =>
          Object.values(match?.playersDtoMap || {}).filter(
            (player) => player?.status === "UNSOLD"
          )
        );

        const biddingPlayer = response.data.flatMap((match) =>
          Object.values(match?.playersDtoMap || {}).filter(
            (player) => player?.status === "BIDDING"
          )
        );

        setSelectedPlayer(biddingPlayer[0]);

        const soldPlayers = response.data.flatMap((match) =>
          Object.values(match?.playersDtoMap || {}).filter(
            (player) => player?.status === "SOLD"
          )
        );

        setNextPlayers(unSoldPlayers);
        setSoldPlayers(soldPlayers);
      })
      .catch((error) => {
        console.log("Error fetching player details:", error);
      });
  };

  const handlePlayerSelect = (player) => {
    console.log("player", player);
    const params = {
      playerId: player?.playerId,
      matchId: matchId,
    };
    bidService
      .createBid(params)
      .then((response) => {
        console.log("response", response);
        setSelectedPlayer(player);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <main>
      <div className="auction-container">
        <div className="header">
          <div className="admin-info">
            <div style={{ display: "flex" }}>
              <img
                src={`data:image/jpeg;base64,${matchData?.matchImage}`}
                className="matchImage"
                alt="Match Image"
              />
              <div className="admin-name">Admin</div>
            </div>
            <div>
              <h3>TopSixer</h3>
            </div>
            <Button>Done</Button>
          </div>
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
                {Array.isArray(nextPlayers) &&
                  nextPlayers?.map((player) => (
                    <div
                      className="player-card"
                      onClick={() => handlePlayerSelect(player)}
                      key={player.playerName}
                    >
                      <img
                        src={`data:image/jpeg;base64,${player?.playerImage}`}
                        alt={player.playerName}
                        className="player-img"
                      />
                      <div className="player-name">{player.playerName}</div>
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
                {Array.isArray(soldPlayers) &&
                  soldPlayers?.map((player) => (
                    <div className="player-card" key={player.playerName}>
                      <img
                        src={`data:image/jpeg;base64,${player?.playerImage}`}
                        alt={player.playerName}
                        className="player-img"
                      />
                      <div className="player-name">{player.playerName}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {selectedPlayer && (
          <div className="player-info">
            <img
              src={`data:image/jpeg;base64,${selectedPlayer?.playerImage}`}
              alt={selectedPlayer?.playerName}
              className="player-img"
            />
            <div className="player-details">
              <span className="player-name">{selectedPlayer?.playerName}</span>
              <span className="starting-price">
                Starting Price: <strong>Rs. {selectedPlayer?.basePrice}</strong>
              </span>
            </div>
          </div>
        )}

        {/* <div className="bids-section">
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
        </div> */}

        <ChatBox />

        {/* <div className="actions-footer">
          <div className="actions">
            <Button className="action-btn unsold">1</Button>
            <Button className="action-btn any-one">2</Button>
            <Button className="action-btn any-one">Any One</Button>
            <Button className="action-btn last-chance">Last Chance</Button>
            <Button className="action-btn all-drop">All Drop ?</Button>
            <Button className="action-btn unsold">Sold</Button>
            <Button className="action-btn unsold">Unsold</Button>
          </div>
        </div> */}

        <div>
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Auction;
