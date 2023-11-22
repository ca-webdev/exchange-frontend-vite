import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import $ from 'jquery';

const WebSocketComponent = (props) => {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const { setOrderBook, setRecentTrade } = props;

  useEffect(() => {
    const initializeStompClient = () => {
      const client = new Client({
        brokerURL: import.meta.env.VITE_BROKER_URL
      });

      const handleConnect = (frame) => {
        setConnected(true);
        console.log('Connected: ' + frame);
        client.subscribe('/topic/orderbookupdates', (orderbookupdate) => {
          console.log("Topic orderbookupdates subscribed!")
          showOrderBookUpdate(JSON.parse(orderbookupdate.body));
        });
        client.subscribe('/topic/recenttrades', (recentTrade) => {
          console.log("Topic recenttrades subscribed!")
          showRecentTradeUpdate(JSON.parse(recentTrade.body));
        });
      };

      const handleWebSocketError = (error) => {
        console.error('Error with websocket', error);
      };

      const handleStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      };

      client.onConnect = handleConnect;
      client.onWebSocketError = handleWebSocketError;
      client.onStompError = handleStompError;

      setStompClient(client);
    };

    initializeStompClient();

    // Cleanup on component unmount
    return () => {
      if (stompClient) {
        stompClient.deactivate();
        setConnected(false);
        console.log('Disconnected');
      }
    };
  }, []); // Empty dependency array to run the effect only once

  const connect = () => {
    if (stompClient) {
      stompClient.activate();
    }
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate();
      setConnected(false);
      console.log('Disconnected');
    }
  };

  const sendName = () => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: '/app/orderinsert',
        body: JSON.stringify({ 'instruction': $('#instruction').val() })
      });
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  };

  const showOrderBookUpdate = (message) => {
    setOrderBook((prevUpdates) => [...prevUpdates, message]);
  };

  const showRecentTradeUpdate = (message) => {
    setRecentTrade((prevUpdates) => [...prevUpdates, message]);
  };

  return (
    <div>
      <button onClick={connect} disabled={connected}>
        Connect
      </button>
      <button onClick={disconnect} disabled={!connected}>
        Disconnect
      </button>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" id="instruction" />
        <button onClick={sendName}>Send</button>
      </form>
    </div>
  );
};

export default WebSocketComponent;