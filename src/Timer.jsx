import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const focusDuration = 0.1 * 60;
  const breakDuration = 0.1 * 60;

  const [mode, setMode] = useState("Focus");
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);

  // 🧠 Core timer effect
  useEffect(() => {
    if (!isRunning || isPaused) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          const nextMode = mode === "Focus" ? "Break" : "Focus";
          const nextDuration = nextMode === "Focus" ? focusDuration : breakDuration;
          setMode(nextMode);
          return nextDuration;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup: clear interval on unmount or change
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused, mode]);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    if (!isRunning || isPaused) return;
    setIsPaused(true);
  };

  const continueTimer = () => {
    if (!isPaused) return;
    setIsPaused(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(mode === "Focus" ? focusDuration : breakDuration);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>
        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
        {String(timeLeft % 60).padStart(2, "0")}
      </h1>
      <h2>Mode: {mode}</h2>
      <button onClick={startTimer} disabled={isRunning && !isPaused}>
        Start
      </button>
      <button onClick={pauseTimer} disabled={!isRunning || isPaused}>
        Pause
      </button>
      <button onClick={continueTimer} disabled={!isPaused}>
        Continue
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
