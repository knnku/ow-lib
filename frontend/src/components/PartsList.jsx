import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Scanner from "./Scanner";

const PartsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  // const [packageName, setPackageName] = useState("");
  // const [isScanning, setIsScanning] = useState(false); <=== main scanner link(depreciated for rfid)

  useEffect(() => {
    // Fetch parts for this specific package
    axios
      .get(`/api/frames/${id}/parts`)
      .then((res) => setParts(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div style={{ padding: "15px" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ← Back to Inventory
      </button>

      <div className="header">
        <h2>Parts List</h2>
        {/* Image/Icon Button to trigger camera */}
        <button
          // onClick={() => setIsScanning(!isScanning)}
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
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeft: part.scanned ? "5px solid green" : "5px solid #ccc",
              backgroundColor: part.status === "scanned" ? "#00d833" : "white",
            }}
          >
            <div>
              <div style={{ fontWeight: "bold" }}>{part.part_number}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {part.description}
              </div>
            </div>
            <span>"📦"</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PartsList;
