import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './MatchDetails.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { matchDetails } from '../../Service/MatchDetailsService';


const MatchDetails = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState([])
  const [playersTeam1, setPlayersTeam1] = useState([])
  const [playersTeam2, setPlayersTeam2] = useState([])


  useEffect(() => {
      if (matchId) {
        getMatchDetailsById()
      }
    }, [])
  
    const getMatchDetailsById = () => {
      matchDetails.getMtachDetailsById(matchId)
        .then(response => {
          setMatchData(response?.data)
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
            const teamOneData = response?.data?.filter(player => player?.teamName === matchData?.teamOneName)
            const teamTwoData = response?.data?.filter(player => player?.teamName === matchData?.teamTwoName)
            const flattenedPlayers1 = teamOneData?.flatMap(item => item?.playerDetailsResponseList); 
            const flattenedPlayers2 = teamTwoData?.flatMap(item => item?.playerDetailsResponseList); 

            setPlayersTeam1(flattenedPlayers1)
            setPlayersTeam2(flattenedPlayers2)
          })
          .catch(error => {
            console.log('error', error)
          })
      }

  return (
    <div>
      <div className="cricket-page-container" >
        <div className="player-list-container" style={{ background:"linear-gradient(to top, #99ccff 0%, #003366 100%)"}}>
          <div className='heading-container'>
            <h4> {matchData?.teamOneName} vs {matchData?.teamTwoName}</h4>
            <p>Expected Players</p>
          </div>
          <table className="player-list-table">
            <thead>
              <tr>
                <th className='header-name'>{matchData?.teamOneName}</th>
                <th className='header-name'>{matchData?.teamTwoName}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="player-list">
                    {playersTeam1.map((player, index) => (
                      <div key={index} className="player-item">
                        <img src={`data:image/jpeg;base64,${player?.playerImage}`} alt={player.name} className="player-icon" />
                        <span>{player.playerName}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="player-list">
                    {playersTeam2.map((player, index) => (
                      <div key={index} className="player-item">
                        <img src={`data:image/jpeg;base64,${player?.playerImage}`} alt={player.name} className="player-icon" />
                        <span>{player.playerName}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MatchDetails;
