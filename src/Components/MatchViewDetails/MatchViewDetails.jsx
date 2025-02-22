import React, { useEffect, useState } from "react";
import { Tabs, Card } from "antd";
import "./MatchViewDetails.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { matchDetails, matchDetailsService } from "../../Service/MatchDetailsService";
import { useNavigate } from "react-router";

const { TabPane } = Tabs;

const MatchViewDetails = () => {
      const navigate = useNavigate();
  
  const [matches, setMatches] = useState([])

  useEffect(() => {
    getAllMatches()
  }, [])

  const getAllMatches = () => {
    matchDetails.getAllMatches()
      .then(response => {
        setMatches(response?.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleMatchClick = (matchId) => {
    navigate(`/auction-page/${matchId}`);
  }


  const tabItems = [
    {
      key: "1",
      label: "Today Matches",
      content:
        matches && matches.length > 0 ? (
          matches.map((match, index) => (
            <Card onClick={() => handleMatchClick(match?.matchId)} key={index} hoverable className="match-card">
              <img
                src={`data:image/jpeg;base64,${match?.matchImage}`}
                alt={`${match.teamOneName} vs ${match.teamTwoName}`}
              />
              <div className="match-info">
                <h3>
                  {match.teamOneName} vs {match.teamTwoName}
                </h3>
                <p>{match.countdown}</p>
              </div>
            </Card>
          ))
        ) : (
          <p className="no-matches">No matches available for today.</p>
        ),
    },
    {
      key: "2",
      label: "Tomorrow Matches",
      content: <p className="no-matches">No matches available for tomorrow.</p>,
    },
  ];

  return (
    <main>
      <div className="match-page">
      <Tabs
        defaultActiveKey="1"
        centered
        className="custom-tabs"
        items={tabItems.map((tab) => ({
          key: tab.key,
          label: tab.label,
          children: tab.content,
        }))}
      />
    </div>
    </main>
  );
};

export default MatchViewDetails;
