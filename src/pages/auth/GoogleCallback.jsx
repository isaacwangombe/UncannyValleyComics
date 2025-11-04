// src/pages/auth/GoogleCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");

    if (access && refresh) {
      // ✅ Save JWT tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      console.log("✅ Tokens saved from Google redirect");

      // ✅ Redirect to homepage or previous page
      navigate("/", { replace: true });
    } else {
      console.error("❌ Missing tokens in Google redirect URL");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h5>🔄 Signing you in with Google...</h5>
      <p>Please wait a moment...</p>
    </div>
  );
};

export default GoogleCallback;
