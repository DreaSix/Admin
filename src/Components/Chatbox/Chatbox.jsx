import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import { Button, Card, Modal, message } from "antd"; // Using Ant Design buttons

import "./Chatbox.scss";
import { bidService } from "../../Service/BidService";
import { matchDetails } from "../../Service/MatchDetailsService";

const ChatBox = ({
  currentBidId,
  playerData,
  matchPlayerDetails,
  getPlayerDetailsByMatchId,
  setSelectedPlayer,
}) => {
  console.log("matchPlayerDetails", matchPlayerDetails);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(Cookies.get("username"));
  const [client, setClient] = useState(null);
  const [visible, setVisible] = useState(false);
  const [lastBid, setLastBid] = useState(null); // Store last valid bid for the popup
  const [unSoldModal, setUnSoldModal] = useState(false);

  useEffect(() => {
    if (!currentBidId) return;
    const accessToken = Cookies.get("jwtToken");

    const fetchOldMessages = async () => {
      try {
        const response = await axios.get(
          `process.env.REACT_APP_API_BASE_URL/api/chat/chat/getMatchMessages/${currentBidId}`,
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
    const socket = new SockJS("process.env.REACT_APP_API_BASE_URL/ws");
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
          console.log("No valid bid");
        }
      }

      if (message === "UnSold") {
        setUnSoldModal(true);
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
      userId: lastBid?.userId,
    };

    const matchDetails = matchPlayerDetails?.find((match) =>
      Object.values(match?.playersDtoMap || {}).find(
        (player) => player?.playerId === playerData?.playerId
      )
    );
    bidService
      .soldPlayer(matchDetails?.id, payload)
      .then((response) => {
        getPlayerDetailsByMatchId();
        setVisible(false);
        setMessages([]);
        sendMessage("Done");
        setSelectedPlayer();

        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleUnsoldConfirmSale = () => {
    const params = {
      playerId: playerData?.playerId,
    };
    const matchDetails = matchPlayerDetails?.find((match) =>
      Object.values(match?.playersDtoMap || {}).find(
        (player) => player?.playerId === playerData?.playerId
      )
    );
    bidService
      .unSoldPlayer(matchDetails?.id, params)
      .then((response) => {
        getPlayerDetailsByMatchId();
        sendMessage("Un Sold Done");
        setUnSoldModal(false);
        setMessages([]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleUnSoldDenySale = () => {
    setMessages((prevMessages) =>
      prevMessages.filter(
        (msg) => msg.message !== "UnSold" && msg.message !== "Un Sold Deny"
      )
    );
    sendMessage("Un Sold Deny");
    setUnSoldModal(false);
  };

  const handleDenySale = () => {
    setMessages((prevMessages) =>
      prevMessages.filter(
        (msg) => msg.message !== "Sold" && msg.message !== "Deny"
      )
    );
    sendMessage("Deny");
    setVisible(false);
  };

  const handleUnsoldClose = () => {
    setUnSoldModal(false);
  };

  const handleBidOver = () => {
    matchDetails
      .completeBid(matchPlayerDetails[0]?.matchDetailsResponse?.matchId)
      .then((response) => {
        sendMessage("Un Sold Done");
        getPlayerDetailsByMatchId();
        setSelectedPlayer();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const filteredMessages = messages?.filter(
    (message) =>
      message?.message !== "UnSold" &&
      message?.message !== "Un Sold Deny" &&
      message?.message !== "Sold" &&
      message?.message !== "Deny"
  );

  return (
    <main>
      <body className="chat-container">
        <div className="bids-section">
          {filteredMessages.map((bid, index) =>
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
            {/* <Button
              className="action-btn any-one"
              onClick={() => sendMessage(3)}
            >
              3
            </Button> */}
            <Button
              className="action-btn unsold"
              onClick={() => sendMessage("Sold")}
            >
              Sold
            </Button>
            <Button
              className="action-btn unsold"
              onClick={() => sendMessage("UnSold")}
            >
              Unsold
            </Button>
            <Button
              className="action-btn match-done"
              onClick={() => handleBidOver()}
            >
              Complete Bid
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
                src={playerData?.playerImage}
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
                style={{ backgroundColor: "red", border: "none" }}
              >
                Deny
              </Button>
              <Button
                className="actionButton confirmButton"
                onClick={handleConfirmSale}
                style={{ backgroundColor: "green", border: "none" }}
              >
                OK
              </Button>
            </div>
          </Card>
        </Modal>

        <Modal
          open={unSoldModal}
          onCancel={handleUnsoldClose}
          footer={null}
          className="customModal"
        >
          <Card className="playerCard">
            <div className="cardContent">
              <img
                src={playerData?.playerImage}
                alt={playerData?.playerName}
                className="playerImage"
              />
              <div className="playerInfo">
                <p className="playerName">{playerData?.playerName}</p>
              </div>
            </div>
            <div className="cardContent">
              <div className="playerInfo">
                <p className="playerName">Un Sold</p>
              </div>
            </div>

            <div className="buttonGroup">
              <Button
                className="actionButton denyButton"
                onClick={handleUnSoldDenySale}
                style={{ backgroundColor: "red", border: "none" }}
              >
                Deny
              </Button>
              <Button
                className="actionButton confirmButton"
                onClick={handleUnsoldConfirmSale}
                style={{ backgroundColor: "green", border: "none" }}
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
