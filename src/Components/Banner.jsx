import React, { useState, useEffect } from "react";
import "./Banner.css";

const Banner = ({ deadline }) => {
  const [timer, setTimer] = useState(null);

  function calculateTimeLeft() {
    // console.log(deadline);

    const difference = new Date(deadline) - new Date();

    // console.log("difff", difference);

    if (difference > 0) {
      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      setTimer(timeLeft);
    } else {
      setTimer(null);
    }
  }

  useEffect(() => {
    const t = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, []);

  const padWithZeroes = (number) => String(number).padStart(2, "0");

  return (
    timer && (
      <div className="container">
        {timer.days}d : {padWithZeroes(timer.hours)}h :{" "}
        {padWithZeroes(timer.minutes)}m : {padWithZeroes(timer.seconds)}s
      </div>
    )
  );
};

export default Banner;
