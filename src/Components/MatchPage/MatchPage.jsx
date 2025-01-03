import React from "react";
import { Tabs, Card } from "antd";
import "./MatchPage.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";


const { TabPane } = Tabs;

const MatchPage = () => {
    const navigate = useNavigate();

    const onClickMatchImage = () => {
        navigate('/create-teams');
      };

  const matches = [
    {
      team1: "RCB",
      team2: "CSK",
      img: "https://img.jagranjosh.com/images/2024/April/242024/RCB-vs-LSG-today.jpg",
      countdown: "03:34:23",
    },
    {
      team1: "IND",
      team2: "AUS",
      img: "https://img.jagranjosh.com/images/2024/March/2932024/KKR-vs-RCB-tODAY.jpg",
      countdown: "03:34:23",
    },
    {
      team1: "RCB",
      team2: "CSK",
      img: "https://st1.latestly.com/wp-content/uploads/2018/04/M27-IPL-CSK-vs-MI-Live-Update-781x441.jpg",
      countdown: "03:34:23",
    },
    {
      team1: "IND",
      team2: "AUS",
      img: "https://sm.ign.com/t/ign_in/screenshot/default/template-1-ipl_3m2z.1200.png",
      countdown: "03:34:23",
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: "Today Matches",
      content:
        matches && matches.length > 0 ? (
          matches.map((match, index) => (
            <Card key={index} hoverable className="match-card">
              <img
               onClick={onClickMatchImage}
                src={match.img}
                alt={`${match.team1} vs ${match.team2}`}
              />
              <div className="match-info">
                <h3>
                  {match.team1} vs {match.team2}
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
