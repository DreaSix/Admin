import React, { useEffect, useState } from "react";
import { Card, Button, Switch, Menu } from "antd";
import "./AuctionPage.scss";
import Footer from "../Footer/Footer";
import { useParams } from "react-router";
import { matchDetails } from "../../Service/MatchDetailsService";
import { bidService } from "../../Service/BidService";
import ChatBox from "../Chatbox/Chatbox";

const Auction = () => {
  const { matchId } = useParams();
  const [showNextPlayers, setShowNextPlayers] = useState(false);
  const [matchData, setMatchDetails] = useState(null);
  const [nextPlayers, setNextPlayers] = useState([]);
  const [soldPlayers, setSoldPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [matchPlayerDetails, setMatchPlayerDetails] = useState();
  const [bidId, setBidId] = useState();

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

        setMatchPlayerDetails(response?.data);

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
        setBidId(biddingPlayer[0]?.bidId);

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
        setBidId(response?.id);
        getPlayerDetailsByMatchId()
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
                      <div className="player-name">{player?.playerName}</div>
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
                    <div className="player-card" key={player?.playerName}>
                      <img
                        src={`data:image/jpeg;base64,${player?.playerImage}`}
                        alt={player.playerName}
                        className="player-img"
                      />
                      <div className="player-name">{player?.playerName}</div>
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

        <ChatBox
          currentBidId={bidId}
          playerData={selectedPlayer}
          matchPlayerDetails={matchPlayerDetails}
          getPlayerDetailsByMatchId={getPlayerDetailsByMatchId}
        />

        <div>
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Auction;
