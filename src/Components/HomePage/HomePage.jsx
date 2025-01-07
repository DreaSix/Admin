import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Typography, Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import './HomePage.scss';
// import Header from "../Header/Header";
import Footer from "../Footer/Footer"
import { matchDetails } from "../../Service/MatchDetailsService";

const HomePage = () => {
  console.log('leela')
  const { Title, Text } = Typography;
  const [matches, setMatches] = useState([])

  const navigate = useNavigate();  // Create navigate function

  // Function to navigate to Create Match page
  const handleCreateMatch = () => {
    navigate('/create-match');
  };
  const handleCreateWinners = () => {
    navigate('/create-winners');
  };

  const handleCreatePlayers = () => {
    navigate('/create-players');
  };

  const handleUsers = () => {
    navigate('/users');
  };

  const handleTransactions = () => {
    navigate('/transactions');
  };

  const handleDeposite = () => {
    navigate('/deposite');
  };

  const handleWithdrawl = () => {
    navigate('/withdrawl');
  };

  const handleNewUsers = () => {
    navigate('/new-users');
  };

  const handleCreateSquad = () => {
    navigate('/matchs-page');
  };

  const onClickMatchImage = (matchId) => {
    navigate(`/match-details/${matchId}`);
  };
  
  // useEffect(() => {
  //   getAllMatches()
  // }, [])

  // const getAllMatches = () => {
  //   matchDetails.getAllMatches()
  //     .then(response => {
  //       setMatches(response?.data)
  //     })
  //     .catch(error => {
  //       console.log('error', error)
  //     })
  // }

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
    <div>
    <div>
      {/* <Header/> */}
    </div>
    <div className="dashboard-container">
      {/* Matches Section */}
      <div className="section">
      <Row justify="space-between" align="middle">
        <Title level={4} className="section-title">
          Matches
        </Title>
      </Row>
      <Carousel {...settings}>
        {matches.map((match) => (
          <Card key={match.matchId} className="match-card">
            <img
              onClick={() => onClickMatchImage(match.matchId)}
              src= {match?.matchImage ? 
                `data:image/jpeg;base64,${match?.matchImage}` : 
                "https://i.pinimg.com/originals/a1/de/a2/a1dea2cf213703688b3d040e1c112a53.png"
              }
              alt="Match"
              className="match-image"
            />
            <Row justify="space-between" align="middle" className="match-info">
              <Text className="match-title">
                {match.teamOneName} {match.teamTwoName ? `vs ${match.teamTwoName}` : ""}
              </Text>
              <Text className="match-timer">{match.countdownEndTime}</Text>
            </Row>
          </Card>
        ))}
      </Carousel>
    </div>

      <div className="section buttons-section">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Button style={{backgroundColor:"green", color:"white"}} className="action-button deposit-button"   onClick={handleDeposite}>Deposit</Button>
          </Col>
          <Col span={8}>
            <Button style={{backgroundColor:"Red", color:"white"}} className="action-button withdraw-button"  onClick={handleWithdrawl} >Withdrawal</Button>
          </Col>
          <Col span={8}>
            <Button style={{backgroundColor:"blue", color:"white"}} className="action-button newuser-button" onClick={handleNewUsers}>New User</Button>
          </Col>
        </Row>
      </div>

      <div className="section">
        <Card className="players-card">
          <Row align="middle">
            <Col>
              <img style={{borderRadius:""}} src={"https://cdn-icons-png.flaticon.com/512/1099/1099700.png"} alt="Players" className="players-icon" />
            </Col>
            <Col>
              <Text  className="players-text">Create Match</Text>
            </Col>
            <Col flex="auto" />
            <Col>
              <Button type="text" className="arrow-button" onClick={handleCreateMatch}>
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
              <img src={"https://cdn2.iconfinder.com/data/icons/team-and-leadership/100/team_leader_leadership_colleagues_squad_company_-13-512.png"} alt="Players" className="players-icon" />
            </Col>
            <Col>
              <Text className="players-text">Create Squads</Text>
            </Col>
            <Col flex="auto" />
            <Col>
              <Button type="text" className="arrow-button" onClick={handleCreateSquad}>
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
              <img src={"https://cdn-icons-png.flaticon.com/512/5166/5166843.png"} alt="Players" className="players-icon" />
            </Col>
            <Col>
              <Text className="players-text">Create Players</Text>
            </Col>
            <Col flex="auto" />
            <Col>
              <Button type="text" className="arrow-button" onClick={handleCreatePlayers}>
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
              <img src={"https://cdn-icons-png.flaticon.com/512/1021/1021220.png"} alt="Players" className="players-icon" />
            </Col>
            <Col>
              <Text className="players-text">Create Winners</Text>
            </Col>
            <Col flex="auto" />
            <Col>
              <Button type="text" className="arrow-button" onClick={handleCreateWinners}>
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
        <Card className="winner-card">
          <Row align="middle">
            <Col>
              <div className="winner-badge">
                <img src={"http://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"} alt="Winner" />
              </div>
            </Col>
            <Col>
              <Text className="winner-name">Aditya Chatterjee</Text>
              <br />
              <Text className="winner-match">ENG vs IND</Text>
            </Col>
            <Col flex="auto" />
            <Col>
              <Text className="winner-prize">₹ 45,000</Text>
              <br />
              <Button className="top-sixer-button">Top Sixer</Button>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default HomePage;
