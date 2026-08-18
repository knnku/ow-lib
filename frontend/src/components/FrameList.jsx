import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FrameList = () => {
  const [frames, setFrames] = useState([]);
  const navigate = useNavigate();

  const [scanStatus, setScanStatus] = useState({
    message: "Ready for scan",
    isError: false,
  }); //rfid
  
  // Buffer ref to collect fast HID keystrokes without causing re-renders
  const keystrokeBuffer = useRef("");

  useEffect(() => {
    axios
      .get(`/api/frames`)
      .then((res) => setFrames(res.data))
      .catch((err) =>
        console.error("Error fetching frame data from backend: ", err),
      );
  }, []);
 
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore keystrokes if the user happens to type into a regular text input or textarea
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.key === "Enter") {
        const scannedTag = keystrokeBuffer.current.trim();
        keystrokeBuffer.current = ""; // Reset buffer immediately

        if (scannedTag.length > 0) {
          handleFrameScan(scannedTag);
        }
      } else if (e.key.length === 1) {
        // Accumulate alphanumeric characters from the reader
        keystrokeBuffer.current += e.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [frames]);

  const handleFrameScan = (scannedEpc) => {
    setScanStatus({ message: `Scanned: ${scannedEpc}`, isError: false });

    // Match against loaded frames (checking rfid_tag or polymorphic epc field)
    const matchedFrame = frames.find(
      (f) =>
        f.epc === scannedEpc ||
        f.rfid_tag_id === scannedEpc ||
        f.tf_package_id === scannedEpc,
    );

    if (matchedFrame) {
      setScanStatus({
        message: `Matched Frame: ${matchedFrame.name}`,
        isError: false,
      });
      navigate(`/frames/${matchedFrame.tf_package_id}/parts`);
    } else {
      // Fallback: Query backend directly if tags are resolved via an RFID route
      axios
        .get(`/api/rfid/resolve/${scannedEpc}`)
        .then((res) => {
          if (res.data && res.data.entity_type === "FRAME") {
            navigate(`/frames/${res.data.entity_id}/parts`);
          } else {
            setScanStatus({
              message: `Tag ${scannedEpc} is not a valid frame tag`,
              isError: true,
            });
          }
        })
        .catch(() => {
          setScanStatus({
            message: `Frame tag not found (${scannedEpc})`,
            isError: true,
          });
        });
    }
  };

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "#f4f7f6",
        minHeight: "100vh",
      }}
    >
      {/* --- GLOBAL SCAN HEADER --- */}
      <header
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <button
          // onClick={() => setIsScanning(true)}
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "#28a745", // Green for "Action"
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          SCAN
        </button>
      </header>

      {/* --- FRAME LIST --- */}

      <div
        style={{
          padding: "12px",
          backgroundColor: "#f4f7f6",
          minHeight: "100vh",
        }}
      >
        <header style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
            Inventory
          </h1>
          <p style={{ color: "#666", fontSize: "14px" }}>
            {frames.length} Packages Found
          </p>
        </header>

        {/* Vertical Stack for Mobile */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {frames.map((frame) => (
            <div
              key={frame.tf_package_id}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                border: "1px solid #eee",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "18px", color: "#1a1a1a" }}>
                  {frame.name}
                </h3>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    backgroundColor: "#E3F2FD",
                    color: "#1976D2",
                    textTransform: "uppercase",
                  }}
                >
                  {frame.status}
                </span>
              </div>

              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                {frame.frame_type} • {frame.supplier}
              </p>

              <div
                style={{
                  marginTop: "8px",
                  padding: "12px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "14px", color: "#444" }}>
                  Progress
                </span>
                <span style={{ fontWeight: "bold" }}>
                  0 / {frame.part_qty} Parts
                </span>
              </div>

              {/* Large Mobile Button */}
              <button
                onClick={() => {
                  console.log(
                    "Button Clicked! Navigating to ID:",
                    frame.tf_package_id,
                  );
                  navigate(`/frames/${frame.tf_package_id}/parts`);
                }}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "14px",
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                SELECT
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};;

export default FrameList;
