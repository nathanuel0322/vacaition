import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Recommendations from "../components/home/Recommendations";
import "../assets/css/results.css";

export default function Results({ resultsdata }) {
  const navigate = useNavigate();

  return (
    <div id="resultscontainer" className="container my-0 mx-auto flex flex-col items-center justify-center">
      <div className="results-page-title my-8 text-2xl font-medium text-black">
        {/* Here are the three destinations you might like! */}
        {resultsdata.plan[0]["description"]["title"] + "!"}
      </div>
      <Recommendations resultsdata={resultsdata} />
      <button className="my-8 text-[1.25rem] px-8 text-black" id="find-people" onClick={() => navigate("/signup")} >
        Want a custom itinerary? Join us
      </button>
    </div>
  );
}
