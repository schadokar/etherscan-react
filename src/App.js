import React from "react";
import "./App.css";
// import the header component
import Header from "./components/Header/index";
// import the eth-overview component
import EthOverview from "./components/Eth-Overview/index";

function App() {
  return (
    <div className="App">
      <Header />
      <EthOverview />
    </div>
  );
}

export default App;
