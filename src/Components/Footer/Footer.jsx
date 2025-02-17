import { BookOutlined, DollarCircleOutlined, HomeOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons"
import React from "react"
import { Link } from "react-router-dom"
import "./Footer.scss"

const Footer = () => {
    return(
        <div className="bottom-nav">
        <div className="nav-item">
          <Link to="/">
            <HomeOutlined style={{ fontSize: '24px' }} />
            <p>Home</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/users">
            <TeamOutlined style={{ fontSize: '24px' }} />
            <p>Users</p>
          </Link>
        </div>
        <div className="nav-item">  
          <Link to="/auction-page">
            <TrophyOutlined style={{ fontSize: '24px' }} />
            <p>Auction</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/transactions">
            <DollarCircleOutlined style={{ fontSize: '24px' }} />
            <p>Transactions</p>
          </Link>
        </div>
      </div>
    )
}


export default Footer;