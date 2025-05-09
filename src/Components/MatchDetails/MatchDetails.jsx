import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./MatchDetails.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { matchDetails } from "../../Service/MatchDetailsService";

const MatchDetails = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState([]);
  const [playersTeam1, setPlayersTeam1] = useState([]);
  const [playersTeam2, setPlayersTeam2] = useState([]);

  useEffect(() => {
    if (matchId) {
      getMatchDetailsById();
    }
  }, []);

  const getMatchDetailsById = () => {
    matchDetails
      .getMtachDetailsById(matchId)
      .then((response) => {
        setMatchData(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getPlayerDetailsByMatchId();
  }, [matchData]);

  const getPlayerDetailsByMatchId = () => {
    matchDetails
      .getMatchPlayerDetails(matchId)
      .then((response) => {
        const teamOneData = response?.data?.find(
          (player) => player?.teamName === matchData?.teamOneName
        );
        const teamTwoData = response?.data?.find(
          (player) => player?.teamName === matchData?.teamTwoName
        );

        const flattenedPlayers1 = teamOneData?.playersDtoMap;
        const flattenedPlayers2 = teamTwoData?.playersDtoMap;

        setPlayersTeam1(flattenedPlayers1);
        setPlayersTeam2(flattenedPlayers2);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <main>
    <div>
      <div className="cricket-page-container">
        <div className="player-list-container">
          <div className="heading-container">
            <h4>
              {" "}
              {matchData?.teamOneName} vs {matchData?.teamTwoName}
            </h4>
            <p>Expected Players</p>
          </div>
          <table className="player-list-table">
            <thead>
              <tr>
                <th className="header-name">{matchData?.teamOneName}</th>
                <th className="header-name">{matchData?.teamTwoName}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {playersTeam1 && (
                    <div className="player-list">
                      {Object.entries(playersTeam1).map(
                        ([playerId, player]) => (
                          <div key={playerId} className="player-item">
                            <img
                              src={player?.playerImage}
                              alt={player.playerName}
                              className="player-icon"
                            />
                            <span>{player.playerName}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </td>
                <td>
                  {playersTeam2 && (
                    <div className="player-list">
                      {Object.entries(playersTeam2).map(
                        ([playerId, player]) => (
                          <div key={playerId} className="player-item">
                            <img
                              src={player?.playerImage}
                              alt={player.playerName}
                              className="player-icon"
                            />
                            <span>{player.playerName}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
    </main>
  );
};

export default MatchDetails;
