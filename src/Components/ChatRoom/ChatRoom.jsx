import React, { useEffect, useState, useCallback } from "react";
import {
  connectWebSocket,
  disconnectWebSocket,
  sendMessage,
  getMatchMessages,
} from "../../Service/chatApi";

const ChatComponent = ({ bidId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState("");

  // Message handler callback
  const handleMessageReceived = useCallback((message) => {
    if (message?.messages) {
      setMessages((prev) =>
        Array.isArray(message.messages)
          ? [...prev, ...message.messages]
          : [...prev, message]
      );
    } else {
      setMessages((prev) => [...prev, message]);
    }
  }, []);

  // WebSocket connection management
  useEffect(() => {
    const connect = () => {
      try {
        connectWebSocket(
          (message) => handleMessageReceived(message),
          () => {
            setIsConnected(true);
            setConnectionError("");
            // Fetch existing messages when connected
            getMatchMessages(bidId);
          }
        );
      } catch (error) {
        setConnectionError("Failed to connect to chat server");
        setIsConnected(false);
      }
    };

    connect();

    return () => {
      disconnectWebSocket();
      setIsConnected(false);
    };
  }, [bidId, handleMessageReceived]);

  const handleSendMessage = () => {
    if (!messageContent.trim()) return;

    try {
      sendMessage(bidId, messageContent);
      setMessageContent("");
    } catch (error) {
      setConnectionError("Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h2>Match Chat ({isConnected ? "Connected" : "Connecting..."})</h2>

      {connectionError && (
        <div className="connection-error">
          {connectionError}
          <button onClick={() => window.location.reload()}>
            Retry Connection
          </button>
        </div>
      )}

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message-bubble">
              <div className="message-header">
                <span className="username">{msg.username || "System"}</span>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="message-content">{msg.messageContent}</div>
            </div>
          ))
        )}
      </div>

      <div className="message-input">
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={!isConnected}
        />
        <button
          onClick={handleSendMessage}
          disabled={!isConnected || !messageContent.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
