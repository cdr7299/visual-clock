import React, { useState, useEffect } from "react";
import "./styles.css";
import ClockImg from "./images.jpeg";

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString
    })
  );
}

function Clock({ label, date, tz }) {
  const hours = tz ? convertTZ(date, tz).getHours() : date.getHours();
  const minutes = tz ? convertTZ(date, tz).getMinutes() : date.getMinutes();
  const seconds = tz ? convertTZ(date, tz).getSeconds() : date.getSeconds();
  let hoursAngle = (30 * (hours % 12)) % 360;
  let minutesAngle = (6 * (minutes % 60)) % 360;
  let secondsAngle = (6 * (seconds % 60)) % 360;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "50px"
      }}
    >
      <label
        style={{
          marginBottom: "30px",
          fontSize: "30px",
          fontFamily: "cursive",
          fontWeight: "bold",
          letterSpacing: "0.07em"
        }}
      >
        {label}
      </label>
      <div
        style={{
          height: "250px",
          width: "250px",
          backgroundImage: `url("${ClockImg}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          position: "relative"
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center"
        }}
      >
        <div
          style={{
            height: "70px",
            backgroundColor: "black",
            top: "47%",
            left: "50%",
            width: "2px",
            position: "absolute",
            transform: `translateY(10%) rotate(${secondsAngle + 180}deg)`,
            transformOrigin: "0% 0%"
          }}
        ></div>
        <div
          style={{
            height: "30px",
            backgroundColor: "black",
            top: "47%",
            left: "51%",
            width: "7px",
            position: "absolute",
            transform: `translateY(10%) rotate(${hoursAngle + 180}deg)`,
            transformOrigin: "0% 0%"
          }}
        ></div>
        <div
          style={{
            height: "50px",
            backgroundColor: "black",
            top: "47%",
            left: "50%",
            width: "5px",
            position: "absolute",
            transform: `translateY(10%) rotate(${minutesAngle + 180}deg)`,
            transformOrigin: "0% 0%"
          }}
        ></div>
      </div>
      {`${hours} : ${minutes} : ${seconds}`}
    </div>
  );
}

//Implememt a clock for  India, washinton D.C and Canberra,

// India

// Australia = India  +  5 hours and 30 minutes

// Washington DC = India - 10 hours and 30 minutes

export default function App() {
  const [date, setDate] = useState(new Date());
  const [timerId, setTimerId] = useState();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    setTimerId(timer);
  }, []);

  return (
    <div className="App">
      <h1>World Time Clocks</h1>
      <Clock label="India" date={date} />
      <Clock label="Washington" date={date} tz={"America/New_York"} />
      <Clock label="India" date={date} />
    </div>
  );
}
