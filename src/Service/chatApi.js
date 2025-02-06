import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [bidId, setBidId] = useState(uuidv4());
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/public", (message) => {
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
        });
      },
    });

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, []);

  const sendMessage = () => {
    if (stompClient && messageContent.trim()) {
      stompClient.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify({ bidId, messageContent }),
      });
      setMessageContent("");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg.messageContent}</p>
        ))}
      </div>
      <input
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
