import React from "react";
import LoggedOutRouter from "./routers/logged-out-router";

function App() {
  return (
    <div className="App">
      <header className=" text-xl text-white">
        <h1 className=" bg-green-300">hello there</h1>
        <LoggedOutRouter />
      </header>
    </div>
  );
}

export default App;
