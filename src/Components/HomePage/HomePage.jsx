import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Typography, Carousel, Badge } from "antd";
import { redirect, useNavigate } from "react-router-dom";
import { TransactionOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

import "./HomePage.scss";
// import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { matchDetails } from "../../Service/MatchDetailsService";
import { transactionService } from "../../Service/TransactionService";

const HomePage = () => {
  const { Title, Text } = Typography;
  const [matches, setMatches] = useState([]);
  const [winnersList, setWinnersList] = useState([]);
  const [withdraw, setWithdraw] = useState(0);
  const [deposit, setDeposite] = useState(0);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = () => {
    transactionService
      .getAllTransactions()
      .then((response) => {
        let depositCount = 0;
        let withdrawCount = 0;

        response?.data?.forEach((item) => {
          if (
            item?.approvalStatus === "PENDING" &&
            item?.transactionType === "DEPOSIT"
          ) {
            depositCount += 1;
          } else if (
            item?.approvalStatus === "PENDING" &&
            item?.transactionType === "WITHDRAW"
          ) {
            withdrawCount += 1;
          }
        });

        console.log("Deposit:", depositCount);
        console.log("Withdraw:", withdrawCount);

        setDeposite(depositCount);
        setWithdraw(withdrawCount);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  useEffect(() => {
    getWinnersList();
  }, []);

  const getWinnersList = () => {
    matchDetails
      .getWinners()
      .then((response) => {
        setWinnersList(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const navigate = useNavigate(); // Create navigate function

  // Function to navigate to Create Match page
  const handleCreateMatch = () => {
    navigate("/create-match");
  };
  const handleCreateWinners = () => {
    navigate("/create-winners");
  };

  const handleCreatePlayers = () => {
    navigate("/create-players");
  };

  const handleUsers = () => {
    navigate("/users");
  };

  const handleTransactions = () => {
    navigate("/transactions");
  };

  const handleDeposite = () => {
    navigate("/deposite-page");
  };

  const handleWithdrawl = () => {
    navigate("/withdrawl-page");
  };

  const handleNewUsers = () => {
    navigate("/new-users");
  };

  const handleCreateSquad = () => {
    navigate("/matchs-page");
  };

  const onClickMatchImage = (matchId) => {
    navigate(`/match-details/${matchId}`);
  };

  useEffect(() => {
    getAllMatches();
  }, []);

  const getAllMatches = () => {
    matchDetails
      .getAllMatches()
      .then((response) => {
        setMatches(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleCreateAccount = () => {
    navigate("/payment-details");
  };

  const handleUpdates = () => {
    navigate("/updates");
  };

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <main>
      <div>
        <div className="dashboard-container">
          {/* Matches Section */}
          <div className="section">
            <Row justify="space-between" align="middle"></Row>
            <Carousel {...settings}>
              {matches.map((match) => (
                <Card key={match.matchId} className="match-card">
                  <img
                    onClick={() => onClickMatchImage(match.matchId)}
                    src={
                      match?.matchImage
                        ? match?.matchImage
                        : "https://i.pinimg.com/originals/a1/de/a2/a1dea2cf213703688b3d040e1c112a53.png"
                    }
                    alt="Match"
                    className="match-image"
                  />
                  <div className="match-info">
                    <Text className="match-title">
                      {match.teamOneName}{" "}
                      {match.teamTwoName ? `vs ${match.teamTwoName}` : ""}
                    </Text>
                    <Text className="match-timer">
                      {match.countdownEndTime}
                    </Text>
                  </div>
                </Card>
              ))}
            </Carousel>
          </div>

          <div className="section buttons-section">
            <Row justify="center" className="buttons-container">
              <Col>
                <Button
                  className="deposit-button green-button"
                  onClick={handleDeposite}
                >
                  <Badge count={deposit > 0 ? deposit : 0} offset={[10, 5]}>
                    Deposit
                  </Badge>
                </Button>

                <Button
                  className="withdraw-button red-button"
                  onClick={handleWithdrawl}
                >
                  <Badge count={withdraw > 0 ? withdraw : 0} offset={[10, 5]}>
                    Withdraw
                  </Badge>
                </Button>

                <Button
                  className="updates-button blue-button"
                  onClick={handleUpdates}
                >
                  Updates
                </Button>
              </Col>
            </Row>
          </div>

          <div className="section">
            <Card className="players-card">
              <Row align="middle">
                <Col>
                  <img
                    style={{ borderRadius: "" }}
                    src={
                      "https://cdn-icons-png.flaticon.com/512/1099/1099700.png"
                    }
                    alt="Players"
                    className="players-icon"
                  />
                </Col>
                <Col>
                  <Text className="players-text">Create Match</Text>
                </Col>
                <Col flex="auto" />
                <Col>
                  <Button
                    type="text"
                    className="arrow-button"
                    onClick={handleCreateMatch}
                  >
                    &gt;
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>

          <div className="section">
            <Card className="players-card">
              <Row align="middle">
                <Col>
                  <img
                    src={
                      "https://cdn2.iconfinder.com/data/icons/team-and-leadership/100/team_leader_leadership_colleagues_squad_company_-13-512.png"
                    }
                    alt="Players"
                    className="players-icon"
                  />
                </Col>
                <Col>
                  <Text className="players-text">Create Squads</Text>
                </Col>
                <Col flex="auto" />
                <Col>
                  <Button
                    type="text"
                    className="arrow-button"
                    onClick={handleCreateSquad}
                  >
                    &gt;
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>

          {/* Create Players Section */}
          <div className="section">
            <Card className="players-card">
              <Row align="middle">
                <Col>
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/512/5166/5166843.png"
                    }
                    alt="Players"
                    className="players-icon"
                  />
                </Col>
                <Col>
                  <Text className="players-text">Create Players</Text>
                </Col>
                <Col flex="auto" />
                <Col>
                  <Button
                    type="text"
                    className="arrow-button"
                    onClick={handleCreatePlayers}
                  >
                    &gt;
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>

          <div className="section">
            <Card className="players-card">
              <Row align="middle">
                <Col>
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/512/1021/1021220.png"
                    }
                    alt="Players"
                    className="players-icon"
                  />
                </Col>
                <Col>
                  <Text className="players-text">Create Winners</Text>
                </Col>
                <Col flex="auto" />
                <Col>
                  <Button
                    type="text"
                    className="arrow-button"
                    onClick={handleCreateWinners}
                  >
                    &gt;
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>

          <div className="section">
            <Card className="players-card">
              <Row align="middle">
                <Col>
                  <TransactionOutlined
                    style={{ fontSize: "25px", color: "black" }}
                  />
                </Col>
                <Col>
                  <Text className="players-text"> Create Accounts</Text>
                </Col>
                <Col flex="auto" />
                <Col>
                  <Button
                    type="text"
                    className="arrow-button"
                    onClick={handleCreateAccount}
                  >
                    &gt;
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>

          {/* Winners Section */}
          <div className="section">
            <Row justify="space-between" align="middle">
              <Title level={4} className="section-title">
                Winners
              </Title>
              {/* <Button className="create-button" onClick={handleCreateWinners} >Create</Button> */}
            </Row>
            {winnersList?.map((winner) => (
              <Card className="winner-card">
                <Row align="middle">
                  <Col>
                    <div className="winner-badge">
                      <img
                        src={winner?.playerDetailsResponse?.playerImage}
                        alt="Winner"
                      />
                    </div>
                  </Col>
                  <Col>
                    <Text className="winner-name">
                      {winner?.winnerName?.name}
                    </Text>
                    <br />
                    <Text className="winner-match">
                      {winner?.matchDetailsResponse?.matchName}
                    </Text>
                  </Col>
                  <Col flex="auto" />
                  <Col>
                    <Text className="winner-prize">
                      ₹ {winner?.winnerAmount}
                    </Text>
                    <br />
                    <Button className="top-sixer-button">
                      {"Top Sixer"}
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
