import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = ({ onScanSuccess, onClose, parts = [] }) => {
  const scannerRef = useRef(null);
  const lastScannedRef = useRef(null);

  // AUdio files
  const errorSound = useRef(new Audio('/scan-fail.mp3'));
  const successSound = useRef(new Audio('/scan-success.mp3'));

  useEffect(() => {
    // We use a small timeout to ensure the DOM element is fully painted
    const timeout = setTimeout(() => {
      const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        // Important for mobile:
        aspectRatio: 1.0,
        rememberLastUsedCamera: true,
        supportedScanTypes: [0], // 0 means camera only
      });

      scanner.render(
        (decodedText) => {
          const cleanCode = decodedText.trim().toLowerCase();

          // 2. Continuous Scan Logic: Only act if it's a NEW code
          if (lastScannedRef.current !== cleanCode) {
            lastScannedRef.current = cleanCode;

            // Check if part belongs to this bag (passed in via props)
            const isMatch = parts.some(
              (p) => p.part_uid.toLowerCase() === cleanCode,
            );

            if (isMatch) {
              successSound.current.play();
              window.navigator.vibrate(100); // Pulse for success
              onScanSuccess(cleanCode); // Update DB/State
            } else {
              errorSound.current.play();
              window.navigator.vibrate([100, 50, 100]); // Double-buzz for error
              alert(`Error: Part ${cleanCode} does not belong to this bag!`);
            }

            // 3. Reset the "last scanned" after 2 seconds so they can scan it again if needed
            setTimeout(() => {
              lastScannedRef.current = null;
            }, 2000);
          }
        },
        (error) => {
          /* ignore */
        },
      );

      scannerRef.current = scanner;
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((e) => console.error("Cleanup error", e));
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold" }}>SCANNING...</span>
        <button
          onClick={onClose}
          style={{
            color: "white",
            backgroundColor: "#444",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        >
          Close
        </button>
      </div>

      {/* This DIV is what the scanner looks for */}
      <div
        id="reader"
        style={{ width: "100%", backgroundColor: "black" }}
      ></div>

      <div
        style={{
          padding: "40px",
          color: "#888",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        Align the QR code inside the box to automatically identify the frame
        bag.
      </div>
    </div>
  );
};

export default Scanner;
