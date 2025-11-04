// src/pages/auth/GoogleCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeGoogleLogin } from "../../api";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");

    if (access && refresh) {
      completeGoogleLogin(access, refresh);
    } else {
      console.error("Missing tokens from Google redirect");
      navigate("/login");
    }
  }, [navigate]);

  return <div>🔄 Signing you in with Google...</div>;
}
