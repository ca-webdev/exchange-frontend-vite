import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import $ from "jquery";
import BuySellComponent from "./buysellcomponent";

const WebSocketComponent = (props) => {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const {
    setOrderBook,
    setRecentTrade,
    setOhlc,
    setUserTrade,
    setOrderUpdate,
    setPositionpnl,
    showPopup,
  } = props;

  const URL = import.meta.env.VITE_GET_URL;

  // Function to subscribe to topics
  const subscribeTopics = (client) => {
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
    client.subscribe("/topic/usertrades", (usertrade) => {
      console.log("Topic usertrades subscribed!");
      showUserTrade(JSON.parse(usertrade.body));
    });
    client.subscribe("/topic/orderupdates", (orderUpdate) => {
      console.log("Topic orderupdates subscribed!");
      showGroupOrderUpdate(JSON.parse(orderUpdate.body));
    });
    client.subscribe("/topic/positionpnl", (positionpnl) => {
      console.log("Topic positionpnl subscribed!");
      showPositionpnl(JSON.parse(positionpnl.body));
    });
  };

  useEffect(() => {
    const initializeStompClient = () => {
      const client = new Client({
        brokerURL: import.meta.env.VITE_BROKER_URL,
      });

      const handleConnect = (frame) => {
        setConnected(true);
        console.log("Connected: " + frame);
        subscribeTopics(client);
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
      }
    };
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch initial data and connect to WebSocket
      try {
        const recentTradesResponse = await fetch(URL + "recenttrades");
        const recentTrades = await recentTradesResponse.json();
        const totalRecentTradesLength = recentTrades.length;
        const newestRecentTrades =
          totalRecentTradesLength > 200
            ? recentTrades.slice(totalRecentTradesLength - 200)
            : recentTrades;

        setRecentTrade((prevRecentTrade) => [
          ...newestRecentTrades,
          ...prevRecentTrade,
        ]);

        const ohlcResponse = await fetch(URL + "ohlc");
        const ohlcData = await ohlcResponse.json();
        const totalOhlcLength = ohlcData.length;
        const newestOhlc =
          totalOhlcLength > 200
            ? ohlcData.slice(totalOhlcLength - 200)
            : ohlcData;

        setOhlc((prevOhlc) => [...newestOhlc, ...prevOhlc]);

        const orderUpdatesResponse = await fetch(URL + "orderupdates");
        const orderUpdatesData = await orderUpdatesResponse.json();

        if (typeof orderUpdatesData === "object" && orderUpdatesData !== null) {
          // Iterate over keys of the dictionary
          for (const key in orderUpdatesData) {
            if (Object.hasOwnProperty.call(orderUpdatesData, key)) {
              const update = orderUpdatesData[key];
              if (Array.isArray(update)) {
                update.forEach((item) => {
                  showGroupOrderUpdate(item);
                });
              }
            }
          }
        } else {
          // Handle the case where orderUpdatesData is not a dictionary
          console.error(
            "Unexpected data format for order updates:",
            orderUpdatesData
          );
        }

        const positionpnlResponse = await fetch(URL + "positionpnl");
        const positionpnlData = await positionpnlResponse.json();

        setPositionpnl(positionpnlData);

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
    const sideValue = $("#side").val();
    const priceValue = parseFloat($("#price").val());
    const sizeValue = parseFloat($("#size").val());

    fetch(URL + "orderinsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        side: sideValue,
        price: priceValue,
        size: sizeValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        showPopup(data.message);
        console.log("POST request successful", data);
      })
      .catch((error) => {
        showPopup(error.message);
        console.error("Error making POST request:", error);
      });
  };

  const groupOrderUpdatesById = (newOrderUpdate) => {
    setOrderUpdate((prevGroupedOrderUpdates) => {
      const index = prevGroupedOrderUpdates.findIndex(
        (group) => group.orderId === newOrderUpdate.orderId
      );

      if (index === -1) {
        return [
          ...prevGroupedOrderUpdates,
          {
            ...newOrderUpdate,
            orderStatus: newOrderUpdate.orderStatus,
            filledSizes: newOrderUpdate.filledSize,
            filledData: [
              {
                filledPrice: newOrderUpdate.filledPrice,
                filledSize: newOrderUpdate.filledSize,
              },
            ],
          },
        ];
      } else {
        return prevGroupedOrderUpdates.map((group, i) =>
          i === index
            ? {
                ...group,
                orderStatus: newOrderUpdate.orderStatus,
                filledSizes: newOrderUpdate.filledSize,
                filledData:
                  group.filledData.find(
                    (data) => data.filledSize === newOrderUpdate.filledSize
                  ) === undefined
                    ? [
                        ...group.filledData,
                        {
                          filledPrice: newOrderUpdate.filledPrice,
                          filledSize: newOrderUpdate.filledSize,
                        },
                      ].sort((a, b) => a.filledSize - b.filledSize)
                    : group.filledData,
              }
            : group
        );
      }
    });
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

  const showGroupOrderUpdate = (message) => {
    groupOrderUpdatesById(message);
  };

  const showUserTrade = (message) => {
    setUserTrade((prevUpdates) => [...prevUpdates, message]);
  };

  const showPositionpnl = (message) => {
    setPositionpnl(message);
  };


  return (
    <>
      <BuySellComponent {...props} sendName={sendName} />
    </>
  );
};

export default WebSocketComponent;
