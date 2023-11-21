import "./App.css";
import Dashboard from "./pages/dashboard";
import WebSocketComponent from "./components/websocketcomponent";

function App(props) {
  return (
    <>
      <WebSocketComponent />
      <Dashboard {...props} />
    </>
  );
}

export default App;
