import React, { useState, useEffect } from "react";
import "./HomeApp.css";
import Medicine from "./components/Medicine";
import Stationery from "./components/Stationery";
import Groceries from "./components/Groceries";
import Clothings from "./components/Clothings";
import Profile from "./components/Profile";
import Header from "./components/Header";
import ReactDOM from "react-dom";
import axios from "axios";
import ViewProduct from "./components/ViewProduct";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const HomeApp = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:7000/getallProducts").then((res) => {
      setData(res.body);
    });
  }, []);

  const medicine = () => {
    console.log("med");

    ReactDOM.render(<Medicine />, document.getElementById("root"));
  };

  const stationery = () => {
    console.log("stat");
    ReactDOM.render(
      <Stationery />,

      document.getElementById("root")
    );
  };
  const clothings = () => {
    console.log("cloth");
    ReactDOM.render(
      <Clothings />,

      document.getElementById("root")
    );
  };
  const groceries = () => {
    console.log("groceries");
    ReactDOM.render(
      <Groceries />,

      document.getElementById("root")
    );
  };
  return (
    <>
      <Header user={undefined} userId={undefined} />

      <div className="App">
        <div className="med button-app" onClick={medicine}>
          Medicine
        </div>
        <div className="stat button-app" onClick={stationery}>
          Stationery
        </div>
        <div className="clot button-app" onClick={clothings}>
          Clothings
        </div>
        <div className="groc button-app" onClick={groceries}>
          Groceries
        </div>
      </div>
    </>
  );
};

export default HomeApp;
