import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PhonePeReturn() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    (async () => {
      try {
        const url = new URL(window.location.href);
        const txn = url.searchParams.get("txn");
        const email = url.searchParams.get("email");
        const sig = url.searchParams.get("sig");
        const purpose = url.searchParams.get("purpose") || "workshop";

        if (!txn || !email || !sig) {
          navigate("/demo?showDemo=1", { replace: true });
          return;
        }

        const endpoint = `/api/payment/${purpose}/confirm?txn=${encodeURIComponent(
          txn
        )}&email=${encodeURIComponent(email)}&sig=${encodeURIComponent(sig)}`;
        const res = await fetch(endpoint);
        const data = await res.json().catch(() => null);

        if (res.ok && data?.success) {
          if (data.accessToken) localStorage.setItem("azorix_token", data.accessToken);
          localStorage.setItem("azorix_email", email);
          setMessage("Transaction successful. Opening your demo...");
          setTimeout(() => navigate("/demo?showDemo=1", { replace: true }), 800);
          return;
        }

        setMessage("Payment verification failed. Redirecting to demo...");
        setTimeout(() => navigate("/demo?showDemo=1", { replace: true }), 800);
      } catch {
        navigate("/demo?showDemo=1", { replace: true });
      }
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div className="text-lg">{message}</div>
    </div>
  );
}
