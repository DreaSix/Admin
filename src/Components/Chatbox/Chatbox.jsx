import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import { Button } from "antd"; // Using Ant Design buttons

import "./Chatbox.scss";

const ChatBox = ({ currentBidId }) => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(Cookies.get("username"));
  const [client, setClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("newMessage", newMessage);

          // Sort messages by timestamp in ascending order
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

      // Append the new message to the state
      setMessages([
        ...messages,
        { username, messageContent: message.toString() },
      ]);
    } else {
      console.error("Cannot send message: STOMP connection not active.");
    }
  };

  console.log("messages", messages);

  return (
    <main>
      <body className="chat-container">
        <div className="bids-section">
          {messages.map((bid, index) =>
            bid?.username?.username === username ? (
              <div className="bid-card" key={index}>
                <div className="bid-user">{bid?.name?.charAt(0)}</div>
                <div className="bid-info">
                  <span className="bid-name">{bid?.name}</span>
                  <span className="bid-amount">{bid?.message}</span>
                </div>
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
        {/* {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.username === username ? "own" : ""}`}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))} */}
        {/* <div className="chat-buttons bidding-footer">
        {[50, 100, 200, 500].map((amount) => (
          <Button
            key={amount}
            className="send-btn"
            onClick={() => sendMessage(amount)}
          >
            +{amount}
          </Button>
        ))}
      </div> */}

        <div className="actions-footer">
          <div className="actions">
            <Button className="action-btn unsold" onClick={() => sendMessage(1)}>1</Button>
            <Button className="action-btn any-one" onClick={() => sendMessage(2)}>2</Button>
            <Button className="action-btn any-one" onClick={() => sendMessage("Any One")}>Any One</Button>
            <Button className="action-btn last-chance" onClick={() => sendMessage("Last Chance")}>Last Chance</Button>
            <Button className="action-btn all-drop" onClick={() => sendMessage("All Drop ?")}>All Drop ?</Button>
            <Button className="action-btn unsold" onClick={() => sendMessage("Sold")}>Sold</Button>
            <Button className="action-btn unsold" onClick={() => sendMessage("Un sold")}>Unsold</Button>
          </div>
        </div>
      </body>
    </main>
  );
};

export default ChatBox;
