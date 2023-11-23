import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import $ from "jquery";
import BuySellComponent from "./buysellcomponent";

const WebSocketComponent = (props) => {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const { setOrderBook, setRecentTrade, setOhlc } = props;

  const URL = import.meta.env.VITE_GET_URL;

  useEffect(() => {
    const initializeStompClient = () => {
      const client = new Client({
        brokerURL: import.meta.env.VITE_BROKER_URL,
      });

      const handleConnect = (frame) => {
        setConnected(true);
        console.log("Connected: " + frame);
        client.subscribe("/topic/orderbookupdates", (orderbookupdate) => {
          console.log("Topic orderbookupdates subscribed!");
          showOrderBookUpdate(JSON.parse(orderbookupdate.body));
        });
        client.subscribe("/topic/recenttrades", (recentTrade) => {
          console.log("Topic recenttrades subscribed!");
          showRecentTradeUpdate(JSON.parse(recentTrade.body));
        });
        client.subscribe("/topic/ohlc", (ohlc) => {
          console.log("Topic ohlc subscribed!");
          showOhlcUpdate(JSON.parse(ohlc.body));
        });
      };

      const handleWebSocketError = (error) => {
        console.error("Error with websocket", error);
        // Attempt reconnection after a delay (e.g., 5 seconds)
        setTimeout(() => {
          console.log("Attempting to reconnect...");
          initializeStompClient();
        }, 5000);
      };

      const handleStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
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
        console.log("Disconnected");

        // Attempt reconnection after a delay (e.g., 5 seconds)
        setTimeout(() => {
          console.log("Attempting to reconnect...");
          initializeStompClient();
        }, 5000);
      }
    };
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const recentTradesResponse = await fetch(URL + "recenttrades");
        const recentTrades = await recentTradesResponse.json();
        const totalRecentTradesLength = recentTrades.length;
        const newestRecentTrades =
          totalRecentTradesLength > 200 ? recentTrades.slice(totalRecentTradesLength - 200) : recentTrades;

        setRecentTrade((prevRecentTrade) => [...newestRecentTrades, ...prevRecentTrade]);

        const ohlcResponse = await fetch(URL + "ohlc");
        const ohlcData = await ohlcResponse.json();
        const totalOhlcLength = ohlcData.length;
        const newestOhlc = totalOhlcLength > 200 ? ohlcData.slice(totalOhlcLength - 200) : ohlcData;

        setOhlc((prevOhlc) => [...newestOhlc, ...prevOhlc]);

        // Connect to WebSocket after fetching initial data
        if (stompClient) {
          stompClient.activate();
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [stompClient]); // Add stompClient as a dependency to run the effect when it changes

  const sendName = () => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/orderinsert",
        body: JSON.stringify({ instruction: $("#instruction").val() }),
      });
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  const showOrderBookUpdate = (message) => {
    setOrderBook((prevUpdates) => [...prevUpdates, message]);
  };

  const showRecentTradeUpdate = (message) => {
    setRecentTrade((prevUpdates) => [...prevUpdates, message]);
  };

  const showOhlcUpdate = (message) => {
    setOhlc((prevUpdates) => [...prevUpdates, message]);
  };

  return (
    <>
    <BuySellComponent {...props} sendName={sendName}/>
    </>
  );
};

export default WebSocketComponent;