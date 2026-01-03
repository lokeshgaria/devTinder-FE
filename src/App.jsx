import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
 
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Feed />
      </div>
    </>
  );
}

export default App;
