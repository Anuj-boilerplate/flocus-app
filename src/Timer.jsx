import React, { useState, useRef } from "react";

// This is a React functional component called Timer
function Timer() {
  // State to keep track of the time left (in seconds)
  const [timeLeft, setTimeLeft] = useState(60); // default 60 seconds
  // State to know if the timer is running
  const [isRunning, setIsRunning] = useState(false);
  // State to know if the timer is paused
  const [isPaused, setIsPaused] = useState(false);
  // useRef to store the interval ID so we can clear it later
  const intervalRef = useRef(null);

  // Function to start the timer
  const startTimer = () => {
    if (isRunning) return; // If already running, do nothing
    setIsRunning(true);
    setIsPaused(false);

    // Set up an interval to decrease timeLeft every second
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current); // Stop when time is up
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1; // Decrease time by 1
      });
    }, 1000); // 1000 milliseconds = 1 second
  };

  // Function to pause the timer
  const pauseTimer = () => {
    if (!isRunning || isPaused) return; // Only pause if running and not already paused
    clearInterval(intervalRef.current); // Stop the interval
    setIsPaused(true);
  };

  // Function to continue the timer after pausing
  const continueTimer = () => {
    if (!isPaused) return; // Only continue if paused
    setIsPaused(false);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Function to reset the timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(60); // Reset to 60 seconds
    setIsRunning(false);
    setIsPaused(false);
  };

  // The JSX returned by this component (the UI)
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Timer: {timeLeft} seconds</h1>
      <button onClick={startTimer} disabled={isRunning && !isPaused}>
        Start
      </button>
      <button onClick={pauseTimer} disabled={!isRunning || isPaused}>
        Pause
      </button>
      <button onClick={continueTimer} disabled={!isPaused}>
        Continue
      </button>
      <button onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}

export default Timer;