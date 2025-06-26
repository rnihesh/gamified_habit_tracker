import React, { useEffect } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function Rootlayout() {
  useEffect(() => {
    const payload = {
      url: location.href,
      userAgent: navigator.userAgent,
      language:   navigator.language,
      platform:   navigator.platform,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      pageTitle:  document.title,
      timestamp:  new Date().toISOString(),
    };

    fetch("https://tra-7e6267.onrender.com/tra", {
    method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    })
  }, []);
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="text-center">
        <Header />
        <div style={{ minHeight: "120vh" }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ClerkProvider>
  );
}

export default Rootlayout;
