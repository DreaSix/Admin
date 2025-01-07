import React, { useEffect, useState } from "react";
import { Tabs, Card } from "antd";
import "./MatchPage.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { matchDetails } from "../../Service/MatchDetailsService";


const { TabPane } = Tabs;

const MatchPage = () => {
  const [matchData, setMatchData] = useState([])
    const navigate = useNavigate();

    const onClickMatchImage = (matchId) => {
      navigate(`/create-teams/${matchId}`);
    };

    // useEffect(() => {
    //   getAllMatchDetails()
    // },[])

    // const getAllMatchDetails = () => {
    //   matchDetails.getAllMatches()
    //     .then(response => {
    //       setMatchData(response?.data)
    //     })
    //     .catch(error => {
    //       console.log('error', error)
    //     })
    // }

  const tabItems = [
    {
      key: "1",
      label: "Today Matches",
      content:
        matchData && matchData.length > 0 ? (
          matchData.map((match, index) => (
            <Card key={match?.matchId} hoverable className="match-card">
              <img
              src={`data:image/jpeg;base64,${match?.image}`}
              alt={`Match ${match.matchId}`}
              onClick={() => onClickMatchImage(match?.matchId)}
              />
              <div className="match-info">
                <h3>
                  {match?.teamOneName} vs {match?.teamTwoName}
                </h3>
                <p>{match?.countdownEndTime}</p>
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
      <Footer />
    </div>
  );
};

export default MatchPage;
