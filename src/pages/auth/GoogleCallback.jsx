// src/pages/auth/GoogleCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");

    if (access && refresh) {
      // ✅ Save JWT tokens in localStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      console.log("✅ Google login successful — tokens saved!");
      // Redirect to homepage after saving
      navigate("/", { replace: true });
    } else {
      console.error("❌ Missing tokens from Google redirect");
      navigate("/login");
    }
  }, [navigate]);

  return <div>🔄 Signing you in with Google...</div>;
}
