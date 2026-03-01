import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const scanner = ({ onScanSuccess, onClose }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    });

    scanner.render(
      (decodedText) => {
        scanner.clear(); // Stop camera after success
        onScanSuccess(decodedText);
      },
      (error) => {
        // We ignore minor scan errors to keep the log clean
      },
    );
    return () => scanner.clear(); // Cleanup on unmount
    
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "20px", textAlign: "right" }}>
        <button
          onClick={onClose}
          style={{
            color: "white",
            fontSize: "24px",
            background: "none",
            border: "none",
          }}
        >
          ✕
        </button>
      </div>
      <div id="reader" style={{ width: "100%" }}></div>
      <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
        Align QR Code inside the square
      </div>
    </div>
  );

};

export default Scanner;