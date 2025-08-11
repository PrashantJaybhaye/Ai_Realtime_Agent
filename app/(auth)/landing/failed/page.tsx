"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleUnlock = () => {
    if (!secret.trim()) {
      triggerError("Password is required!");
      return;
    }
    if (secret.trim().toLowerCase() === "7736") {
      window.location.href = "/sign-up";
    } else {
      triggerError("Incorrect password!");
    }
  };

  const triggerError = (message: string) => {
    setError(message);
    setShake(true);
    setTimeout(() => setShake(false), 400); // stop shake after animation
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecret(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <style jsx global>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
        .shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>

      <div className="text-center space-y-8">
        <div>
          <h1 className="text-9xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mt-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mt-2">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Secret access key"
            value={secret}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`w-64 px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground placeholder:text-center focus:outline-none focus:ring-2 focus:ring-ring ${
              shake ? "shake border-destructive" : ""
            }`}
          />
          <div>
            <Button onClick={handleUnlock} variant="outline">
              Access
            </Button>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
