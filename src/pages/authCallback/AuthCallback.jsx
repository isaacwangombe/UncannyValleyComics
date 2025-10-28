import { useEffect } from "react";
import axios from "axios";

export default function AuthCallback() {
  // const backendUrl = "http://127.0.0.1:8000";

  const backendUrl = import.meta.env.VITE_API_URL_SHORT;

  useEffect(() => {
    axios
      .get(backendUrl + "/dj-rest-auth/user/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Logged in user:", res.data);
        // e.g. store user info in context or redirect
      })
      .catch((err) => console.error("Login failed:", err));
  }, []);

  return <p>Finishing sign-in...</p>;
}
