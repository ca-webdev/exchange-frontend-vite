import { useState } from 'react';
import Dashboard from "./pages/dashboard";
import WebSocketComponent from "./components/websocketcomponent";

import "./App.css";

function App(props) {
  const [orderbook, setOrderBook] = useState([]);
  const [recentTrade, setRecentTrade] = useState([]);
  const [ohlc, setOhlc] = useState([]);
  console.log("orderbook", orderbook);
  return (
    <>
      <WebSocketComponent setOrderBook={setOrderBook} setRecentTrade={setRecentTrade} setOhlc={setOhlc} />
      <Dashboard {...props} orderbook={orderbook} recentTrade={recentTrade} ohlc={ohlc} />
    </>
  );
}

export default App;
