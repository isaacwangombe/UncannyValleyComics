import React, { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { apiFetch } from "../../api";
import { Container, Card, Button, Badge, Spinner } from "react-bootstrap";

const AdminScannerPage = () => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sound effects
  const beepSuccess = new Audio("/sounds/success-beep.mp3");
  const beepFail = new Audio("/sounds/error-beep.mp3");

  useEffect(() => {
    startScanner();

    return () => {
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, []);

  const startScanner = async () => {
    setScanning(true);
    codeReader.current = new BrowserQRCodeReader();

    try {
      const devices = await BrowserQRCodeReader.listVideoInputDevices();
      const camera = devices[0]?.deviceId;

      if (!camera) {
        alert("No camera found.");
        return;
      }

      codeReader.current.decodeFromVideoDevice(
        camera,
        videoRef.current,
        (result) => {
          if (result) {
            handleDecode(result.getText());
          }
        }
      );
    } catch (e) {
      console.error("Camera error:", e);
      alert("Camera initialization failed.");
    }
  };

  const handleDecode = async (text) => {
    if (!scanning) return;
    setScanning(false);

    console.log("QR detected:", text);

    // Extract UUID from URL
    const code = text.split("/").pop();

    if (!code || code.length < 8) {
      beepFail.play();
      setResult({ error: "Invalid QR code." });
      return;
    }

    setLoading(true);

    try {
      const res = await apiFetch(`/events/scan/${code}/`);
      setResult(res);

      if (res.valid) beepSuccess.play();
      else beepFail.play();
    } catch (err) {
      beepFail.play();
      setResult({ error: "Invalid or unauthorized scan." });
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setResult(null);
    setScanning(true);
  };

  return (
    <Container className="py-5 text-center">
      <h2 className="mb-4">Admin Ticket Scanner</h2>

      <Card className="p-3 shadow mx-auto" style={{ maxWidth: "600px" }}>
        {!result && (
          <>
            <video
              ref={videoRef}
              style={{
                width: "100%",
                borderRadius: "12px",
                border: "2px solid #ddd",
              }}
            ></video>

            <p className="mt-3 text-muted">
              Point a ticket QR code at the camera.
            </p>
          </>
        )}

        {loading && (
          <div className="py-3">
            <Spinner animation="border" />
            <p>Verifying ticket...</p>
          </div>
        )}

        {result && (
          <div className="py-4">
            {result.error ? (
              <>
                <Badge bg="danger" className="fs-5 px-3 py-2">
                  INVALID QR / NOT AUTHORIZED
                </Badge>
                <p className="mt-3">{result.error}</p>
              </>
            ) : (
              <>
                <h4>{result.event}</h4>
                <Badge
                  bg={result.valid ? "success" : "danger"}
                  className="fs-5 px-3 py-2"
                >
                  {result.valid ? "VALID TICKET" : "ALREADY USED"}
                </Badge>

                <p className="mt-3">
                  Ticket ID: <strong>{result.ticket_id}</strong>
                </p>

                {result.used && (
                  <p className="text-danger">
                    Used at: {new Date(result.used_at).toLocaleString()}
                  </p>
                )}
              </>
            )}

            <Button variant="dark" className="mt-4" onClick={resetScanner}>
              Scan Another
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default AdminScannerPage;
