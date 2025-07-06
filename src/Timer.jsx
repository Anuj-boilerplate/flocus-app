import React, { useState, useEffect, useRef } from "react";
import PresetModal from "./PresetModal"; // path as per your file structure


function Timer() {
  const [focusInput, setFocusInput] = useState(25);
  const [breakInput, setBreakInput] = useState(5);

  const [presets, setPresets] = useState([
  { id: 1, name: "Deep Work", focus: 50, break: 10 },
  { id: 2, name: "Chill Focus", focus: 25, break: 15 }
]);

const [showPresets, setShowPresets] = useState(false);

  const [focusDuration, setFocusDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);

  const [mode, setMode] = useState("Focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [breakPrompt, setBreakPrompt] = useState(false);
  const [snoozedTime, setSnoozedTime] = useState(0);

  const intervalRef = useRef(null);

  // 🧠 Core timer logic
  useEffect(() => {
    if (!isRunning || isPaused) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          const nextMode = mode === "Focus" ? "Break" : "Focus";

          if (nextMode === "Break") {
            setMode("Break");
            setIsPaused(true); // pause until user chooses
            setBreakPrompt(true);
            return breakDuration + snoozedTime; // include stacked time
          } else {
            setMode("Focus");
            setSnoozedTime(0); // clear snooze buffer
            return focusDuration;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused, mode, focusDuration, breakDuration, snoozedTime]);

  const startTimer = () => {
    const focusInSec = focusInput * 60;
    const breakInSec = breakInput * 60;

    setFocusDuration(focusInSec);
    setBreakDuration(breakInSec);
    setTimeLeft(focusInSec);
    setMode("Focus");
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
    setBreakPrompt(false);
    setSnoozedTime(0);
    setMode("Focus");
    setTimeLeft(focusDuration);
  };

  return (
  <div style={{ textAlign: "center", marginTop: "50px", position: "relative" }}>
    <h1>
      {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
      {String(timeLeft % 60).padStart(2, "0")}
    </h1>
    <h2>Mode: {mode}</h2>

    {!isRunning && (
      <>
        <button
          onClick={() => setShowPresets(true)}
          style={{ marginBottom: "20px" }}
        >
          Choose Preset
        </button>

        <div style={{ marginBottom: "20px" }}>
          <label>
            Focus (min):
            <input
              type="number"
              value={focusInput}
              onChange={(e) => setFocusInput(Number(e.target.value))}
              min="1"
              style={{ marginLeft: "10px", marginRight: "20px" }}
            />
          </label>
          <label>
            Break (min):
            <input
              type="number"
              value={breakInput}
              onChange={(e) => setBreakInput(Number(e.target.value))}
              min="1"
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <button
      onClick={() => {
        const name = prompt("Enter a name for this preset:");
        if (!name) return;
        setPresets((prev) => [
          ...prev,
          {
            id: Date.now(),
            name,
            focus: focusInput,
            break: breakInput,
          },
        ]);
      }}
      style={{ marginBottom: "20px" }}
    >
      Save as Preset
    </button>
      </>
    )}

    <div>
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

    {breakPrompt && (
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#222",
          color: "white",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        <p style={{ marginBottom: "10px" }}>
          Break time! What would you like to do?
        </p>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => {
            setBreakPrompt(false);
            setIsPaused(false);
          }}
        >
          Start Break
        </button>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => {
            setSnoozedTime((prev) => prev + timeLeft);
            setMode("Focus");
            setTimeLeft(focusDuration);
            setBreakPrompt(false);
            setIsPaused(false);
          }}
        >
          Snooze Break
        </button>
        <button
          onClick={() => {
            setBreakPrompt(false);
            setIsPaused(false);
            setTimeLeft(focusDuration);
            setMode("Focus");
          }}
        >
          Skip Break
        </button>
      </div>
    )}

    {showPresets && (
  <PresetModal
    presets={presets}
    onSelect={(preset) => {
      setFocusInput(preset.focus);
      setBreakInput(preset.break);
    }}
    onDelete={(id) => setPresets((prev) => prev.filter((p) => p.id !== id))}
    onClose={() => setShowPresets(false)}
  />
)}

  </div>
);

}

export default Timer;
