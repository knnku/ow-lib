import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Scanner from "./Scanner";

const PartsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  // const [packageName, setPackageName] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Fetch parts for this specific package
    axios
      .get(`http://10.0.0.203:5000/api/frames/${id}/parts`)
      .then((res) => setParts(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const markAsScanned = async (partUid) => {

    try {
      // Update Backend (Ensure this route exists in your Node.js index.js!)
      await axios.put(`http://10.0.0.203:5000/api/parts/scan/${partUid}`);

      // Update Frontend state immediately
      setParts((prevParts) =>
        prevParts.map((p) =>
          // Use .trim() just in case the scanner added a hidden space
          p.part_uid.trim() === partUid.trim()
            ? { ...p, status: "scanned" } // This MUST match 'scanned' exactly
            : p,
        ),
      );

    } catch (err) {
      console.error("Error updating part status:", err);
      alert("Failed to save scan to database.");
    }
  };

  const handlePartScan = (qrCode) => {
    alert("Scanning: " + qrCode);
    // 1. Look for the part in our local state
    const partExists = parts.find((p) => p.part_uid === qrCode);

    if (partExists) {
      // 2. If it's the right part, update it!
      markAsScanned(qrCode);
      setIsScanning(false); // Close camera after successful scan
      alert(`Found: ${partExists.description}`);
    } else {
      alert("This part doesn't belong to this bag!");
    }
  };

  return (
    <div style={{ padding: "15px" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ← Back to Inventory
      </button>

      <div className="header">
        <h2>Parts List</h2>
        {/* Image/Icon Button to trigger camera */}
        <button
          onClick={() => setIsScanning(!isScanning)}
          className="scan-trigger"
        >
          SCAN
        </button>
      </div>

      <h2>Current Frame:{}</h2>
      <h3>Parts List</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {parts.map((part) => (
          <div
            key={part.part_id}
            style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeft: part.scanned ? "5px solid green" : "5px solid #ccc",
            }}
          >
            <div>
              <div style={{ fontWeight: "bold" }}>{part.part_number}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {part.description}
              </div>
            </div>
            <span>{part.status === 'scanned' ? "✅" : "📦"}</span>
          </div>
        ))}
      </div>
      {isScanning ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Scanner
            onScanSuccess={handlePartScan}
            onClose={() => setIsScanning(false)}
          />
          <button
            onClick={() => setIsScanning(false)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            CLOSE CAMERA
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default PartsList;
