import { useState } from 'react';
import Dashboard from "./pages/dashboard";
import WebSocketComponent from "./components/websocketcomponent";

import "./App.css";

function App(props) {
  const [orderbook, setOrderBook] = useState([]);
  const [recentTrade, setRecentTrade] = useState([]);
  console.log("orderbook", orderbook);
  console.log("recentTrade", recentTrade);
  return (
    <>
      <WebSocketComponent setOrderBook={setOrderBook} setRecentTrade={setRecentTrade} />
      <Dashboard {...props} orderbook={orderbook} recentTrade={recentTrade} />
    </>
  );
}

export default App;
