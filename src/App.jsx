import { useState } from 'react';
import Dashboard from "./pages/dashboard";
import WebSocketComponent from "./components/websocketcomponent";
import NavBar from "./components/navbar";

import "./App.css";

function App(props) {
  const [orderbook, setOrderBook] = useState([]);
  const [recentTrade, setRecentTrade] = useState([]);
  const [ohlc, setOhlc] = useState([]);
  const [orderupdate, setOrderUpdate] = useState([]);
  const [usertrade, setUserTrade] = useState([]);
  console.log("orderbook", orderbook);

  return (
    <>
      <NavBar />
      <WebSocketComponent setOrderBook={setOrderBook} setRecentTrade={setRecentTrade} setOhlc={setOhlc} setOrderUpdate={setOrderUpdate} setUserTrade={setUserTrade}/>
      <Dashboard {...props} orderbook={orderbook} recentTrade={recentTrade} ohlc={ohlc} orderupdate={orderupdate} usertrade={usertrade} />
    </>
  );
}

export default App;
