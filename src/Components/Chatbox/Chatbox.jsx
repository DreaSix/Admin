import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import { Button, Card, Modal, message } from "antd"; // Using Ant Design buttons

import "./Chatbox.scss";
import { bidService } from "../../Service/BidService";

const ChatBox = ({ currentBidId, playerData, matchPlayerDetails, getPlayerDetailsByMatchId }) => {
  console.log('matchPlayerDetails', matchPlayerDetails)
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(Cookies.get("username"));
  const [client, setClient] = useState(null);
  const [visible, setVisible] = useState(false);
  const [lastBid, setLastBid] = useState(null); // Store last valid bid for the popup

  useEffect(() => {
    if (!currentBidId) return;
    const accessToken = Cookies.get("jwtToken");

    const fetchOldMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/chat/chat/getMatchMessages/${currentBidId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const sortedMessages = response?.data?.data?.responseDTOList.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching old messages:", error);
      }
    };

    fetchOldMessages();
  }, [currentBidId]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);
          const sortedMessages = [...newMessage?.responseDTOList].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );

          setMessages(sortedMessages);
        });

        setClient(stompClient);
      },
      onStompError: (error) => {
        console.error("STOMP Error:", error);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const findLastValidBid = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const bid = messages[i];
      if (!isNaN(bid.message) && bid.message > 3) {
        return bid;
      }
    }
    return null;
  };

  const sendMessage = (message) => {
    if (client && client.connected) {
      const messageData = {
        username,
        userId: Cookies.get("userId"),
        bidId: currentBidId,
        messageContent: message.toString(),
      };

      client.publish({
        destination: "/app/chat/sendMessage",
        body: JSON.stringify(messageData),
      });

      setMessages([...messages, { username, message: message.toString() }]);

      if (message === "Sold") {
        const lastValidBid = findLastValidBid();
        console.log("lastValidBid", lastValidBid);
        if (lastValidBid) {
          setLastBid(lastValidBid);
          setVisible(true);
        } else {
          message.error("No valid bid found!");
        }
      }
    } else {
      console.error("Cannot send message: STOMP connection not active.");
    }
  };

  const handleConfirmSale = () => {
    const payload = {
      playerId: playerData?.playerId,
      soldPrice: lastBid?.message,
      status: "SOLD",
      userId: lastBid?.userId
    }

    const matchDetails = matchPlayerDetails?.find(match => (
      Object.values(match?.playersDtoMap || {}).find(
        (player) => player?.playerId === playerData?.playerId
      )    
    ))
    bidService.soldPlayer(matchDetails?.id, payload)
      .then(response => {
        getPlayerDetailsByMatchId()
        setVisible(false);
        
        sendMessage("Done")
        setMessages([]);
        console.log('response', response)
      })
      .catch(error => {
        console.log('error', error)
      })
  };

  const handleDenySale = () => {
    setMessages(messages.filter((msg) => msg.message !== "Sold"));
    sendMessage("Deny")
    setVisible(false);
  };

  return (
    <main>
      <body className="chat-container">
        <div className="bids-section">
          {messages.map((bid, index) =>
            bid?.username === username ? (
              <div className="own-bid-card" key={index}>
                <div className="bid-info">
                  <span className="bid-name">{bid?.name}</span>
                  <span className="bid-amount">{bid?.message}</span>
                </div>
                <div className="bid-user">{bid?.name?.charAt(0)}</div>
              </div>
            ) : (
              <div className="bid-card" key={index}>
                <div className="bid-user">{bid?.name?.charAt(0)}</div>
                <div className="bid-info">
                  <span className="bid-name">{bid?.name}</span>
                  <span className="bid-amount">{bid?.message}</span>
                </div>
              </div>
            )
          )}
        </div>

        <div className="actions-footer">
          <div className="actions">
            <Button
              className="action-btn any-one"
              onClick={() => sendMessage(1)}
            >
              1
            </Button>
            <Button
              className="action-btn any-one"
              onClick={() => sendMessage(2)}
            >
              2
            </Button>
            <Button
              className="action-btn last-chance"
              onClick={() => sendMessage("Last Chance")}
            >
              Last Chance
            </Button>
            <Button
              className="action-btn all-drop"
              onClick={() => sendMessage("All Drop ?")}
            >
              All Drop ?
            </Button>
            <Button
              className="action-btn any-one"
              onClick={() => sendMessage(3)}
            >
              3
            </Button>
            <Button
              className="action-btn unsold"
              onClick={() => sendMessage("Sold")}
            >
              Sold
            </Button>
            <Button
              className="action-btn unsold"
              onClick={() => sendMessage("Un sold")}
            >
              Unsold
            </Button>
          </div>
        </div>

        <Modal
          open={visible}
          onCancel={handleDenySale}
          footer={null}
          className="customModal"
        >
          <Card className="playerCard">
            <div className="cardContent">
              <img
                src={`data:image/jpeg;base64,${playerData?.playerImage}`}
                alt={playerData?.playerName}
                className="playerImage"
              />
              <div className="playerInfo">
                <p className="playerName">{playerData?.playerName}</p>
                
              </div>
            </div>
            <div className="cardContent">
              <div className="playerInfo">
                <p className="playerName">Sold to: {lastBid?.name}</p>
                <p className="playerPrice">Price: ₹{lastBid?.message}</p>
              </div>
            </div>

            <div className="buttonGroup">
              <Button
                className="actionButton denyButton"
                onClick={handleDenySale}
                style={{backgroundColor: "red", border: "none"}}
              >
                Deny
              </Button>
              <Button
                className="actionButton confirmButton"
                onClick={handleConfirmSale}
                style={{backgroundColor: "green", border: "none"}}
              >
                OK
              </Button>
            </div>
          </Card>
        </Modal>
      </body>
    </main>
  );
};

export default ChatBox;
