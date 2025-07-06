import React from "react";
import ReactDOM from "react-dom";

export default function PresetModal({ presets, onSelect, onDelete, onClose }) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      {/* Overlay to block background interaction */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backdropFilter: "blur(8px)", // 💥 BLUR MAGIC
          backgroundColor: "rgba(0,0,0,0.3)", // Semi-transparent
          zIndex: 999,
  }}
/>

      {/* Modal content */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#1e1e1e",
          padding: "30px",
          borderRadius: "16px",
          color: "#fff",
          zIndex: 1000,
          width: "300px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Select a Preset</h2>

        {presets.length === 0 ? (
          <p style={{ marginBottom: "20px" }}>No presets saved.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {presets.map((preset) => (
              <li
                key={preset.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  borderBottom: "1px solid #444",
                  paddingBottom: "5px",
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onSelect(preset);
                    onClose();
                  }}
                >
                  <strong>{preset.name}</strong> – {preset.focus}/{preset.break}
                </div>
                <button
                  onClick={() => onDelete(preset.id)}
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    padding: "2px 6px",
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "8px 12px",
            background: "#444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </>,
    modalRoot
  );
}
