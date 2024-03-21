import React, { useEffect, useState } from "react";
import Styles from "./CountDownTimer.module.css";

const CountDownTimer = () => {
  const [targetDateTime, setTargetDateTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleDateTimeChange = (e) => {
    setTargetDateTime(e.target.value);
  };

  useEffect(() => {
    const targetDate = new Date(targetDateTime).getTime();
    const currentDate = new Date().getTime();
    const timeDifference = targetDate - currentDate;

    if (isActive) {
      setRemainingTime(timeDifference);
      const id = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [remainingTime, isActive]);

  const toggleCountdown = () => {
    setIsActive(!isActive);
    clearInterval(intervalId);
    setIntervalId(0);
    setRemainingTime(0);
  };

  const formatTime = () => {
    let seconds = Math.floor((remainingTime / 1000) % 60);
    let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  return (
    <div className={Styles.CountDownTimer}>
      <h1>
        Countdown <span>Timer</span>
      </h1>
      <input
        type="datetime-local"
        value={targetDateTime}
        onChange={handleDateTimeChange}
      />
      <div className={Styles.buttons}>
        <button
          onClick={
            targetDateTime && new Date(targetDateTime).getTime() > Date.now()
              ? toggleCountdown
              : () => alert("Please enter a future date and time!")
          }
        >
          {isActive ? "Reset" : "Start"}
        </button>
      </div>
      <div className={Styles.counter}>
        <div>
          <span>{formatTime().days}</span>
          <label>Days</label>
        </div>
        <div>
          <span>{formatTime().hours}</span>
          <label>Hours</label>
        </div>
        <div>
          <span>{formatTime().minutes}</span>
          <label>Minutes</label>
        </div>
        <div>
          <span>{formatTime().seconds}</span>
          <label>Seconds</label>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
