import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PartsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const [scanStatus, setScanStatus] = useState({
    message: "Ready to scan parts...",
    isError: false,
  });

  const keystrokeBuffer = useRef("");

  // Fetch initial parts list for this frame package
  useEffect(() => {
    axios
      .get(`/api/frames/${id}/parts`)
      .then((res) => setParts(res.data))
      .catch((err) => {
        console.error("Failed to load parts:", err);
        setScanStatus({
          message: "Failed to load parts for this frame.",
          isError: true,
        });
      });
  }, [id]);

  // Handle scanned Part EPC
  const handlePartScan = (scannedEpc) => {
    const cleanEpc = scannedEpc.trim().toUpperCase();
    console.log(`Part EPC Scanned: ${cleanEpc}`);

    // Check if the scanned EPC matches any part in current list
    const matchedPart = parts.find(
      (p) =>
        (p.part_epc && p.part_epc.trim().toUpperCase() === cleanEpc) ||
        (p.part_uid && p.part_uid.trim().toUpperCase() === cleanEpc),
    );

    if (!matchedPart) {
      setScanStatus({
        message: `Tag not recognized or does not belong to this frame (${cleanEpc})`,
        isError: true,
      });
      return;
    }

    if (matchedPart.status === "scanned") {
      setScanStatus({
        message: `Already scanned: ${matchedPart.description}`,
        isError: false,
      });
      return;
    }

    // Mark part as scanned locally
    setParts((prevParts) =>
      prevParts.map((p) =>
        p.part_uid === matchedPart.part_uid ? { ...p, status: "scanned" } : p,
      ),
    );

    setScanStatus({
      message: `Verified: ${matchedPart.description} (${matchedPart.part_uid})`,
      isError: false,
    });
  };

  // Keyboard listener for USB/HID RFID Reader
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore keystrokes inside form inputs
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.key === "Enter") {
        const scannedTag = keystrokeBuffer.current.trim();
        keystrokeBuffer.current = "";

        if (scannedTag.length > 0) {
          handlePartScan(scannedTag);
        }
      } else if (e.key.length === 1) {
        keystrokeBuffer.current += e.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [parts]);

  // Calculate completion progress
  const scannedCount = parts.filter((p) => p.status === "scanned").length;
  const totalCount = parts.length;
  const isComplete = totalCount > 0 && scannedCount === totalCount;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "15px",
          padding: "8px 14px",
          cursor: "pointer",
        }}
      >
        ← Back to Inventory
      </button>

      <h2>Current Frame: {id}</h2>

      {/* Live Scan Feedback Banner */}
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontWeight: "bold",
          backgroundColor: scanStatus.isError ? "#FFEBEE" : "#E8F5E9",
          color: scanStatus.isError ? "#C62828" : "#2E7D32",
          border: `1px solid ${scanStatus.isError ? "#EF9A9A" : "#A5D6A7"}`,
        }}
      >
        {scanStatus.message}
      </div>

      {/* Progress Counter */}
      <div style={{ marginBottom: "15px", fontSize: "14px", color: "#555" }}>
        <strong>Scanned:</strong> {scannedCount} / {totalCount}{" "}
        {isComplete && (
          <span style={{ color: "#2E7D32", fontWeight: "bold" }}>
            — Frame Complete! 🎉
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {parts.map((part) => {
          const isScanned = part.status === "scanned";
          return (
            <div
              key={part.part_uid}
              style={{
                padding: "14px 18px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderLeft: isScanned
                  ? "6px solid #2E7D32"
                  : "6px solid #B0BEC5",
                backgroundColor: isScanned ? "#E8F5E9" : "#FFFFFF",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "background-color 0.2s ease",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", color: "#333" }}>
                  {part.part_uid}
                </div>
                <div
                  style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}
                >
                  {part.description}
                </div>
                {part.part_epc && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      marginTop: "2px",
                    }}
                  >
                    Tag: {part.part_epc}
                  </div>
                )}
              </div>
              <span style={{ fontSize: "20px" }}>
                {isScanned ? "✅" : "📦"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartsList;
