import { useState } from "react";
import Dashboard from "./pages/dashboard";
import WebSocketComponent from "./components/websocketcomponent";
import NavBar from "./components/navbar";
import PopupMessage from "./components/popupmessage";

import "./App.css";

function App(props) {
  const [orderBook, setOrderBook] = useState([]);
  const [recentTrade, setRecentTrade] = useState([]);
  const [ohlc, setOhlc] = useState([]);
  const [orderupdate, setOrderUpdate] = useState([]);
  const [usertrade, setUserTrade] = useState([]);
  const [positionpnl, setPositionpnl] = useState({});
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (message) => {
    console.log("message", message);
    setPopupMessage(message);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <NavBar />
      <WebSocketComponent
        setOrderBook={setOrderBook}
        setRecentTrade={setRecentTrade}
        setOhlc={setOhlc}
        setOrderUpdate={setOrderUpdate}
        setUserTrade={setUserTrade}
        setPositionpnl={setPositionpnl}
        showPopup={showPopup}
      />
      <Dashboard
        {...props}
        orderBook={orderBook}
        recentTrade={recentTrade}
        ohlc={ohlc}
        orderupdate={orderupdate}
        usertrade={usertrade}
        positionpnl={positionpnl}
        showPopup={showPopup}
      />
      {isPopupVisible && (
        <PopupMessage message={popupMessage} onClose={hidePopup} />
      )}
    </>
  );
}

export default App;
