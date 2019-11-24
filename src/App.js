import React from "react";
import "./App.css";
import Header from "./components/Header/index";
import EthOverview from "./components/Eth-Overview/index";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <EthOverview></EthOverview>
    </div>
  );
}

export default App;
