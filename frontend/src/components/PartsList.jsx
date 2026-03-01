import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PartsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const [packageName, setPackageName] = useState("");

  useEffect(() => {
    // Fetch parts for this specific package
    axios
      .get(`http://10.0.0.203:5000/api/frames/${id}/parts`)
      .then((res) => setParts(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div style={{ padding: "15px" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ← Back to Inventory
      </button>

      <h2>Package Contents</h2>
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
            <span>{part.scanned ? "✅" : "📦"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsList;
