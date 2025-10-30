// src/pages/login/AuthCallback.jsx
import { useEffect } from "react";
import { apiGetUser } from "../../api";

export default function AuthCallback() {
  useEffect(() => {
    (async () => {
      try {
        const user = await apiGetUser();
        if (user) {
          console.log("✅ Logged in user:", user);
          window.location.href = "/admin";
        } else {
          console.warn("⚠️ User not found, redirecting to login...");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Login verification failed:", err);
        window.location.href = "/login";
      }
    })();
  }, []);

  return <p>Finishing sign-in...</p>;
}
