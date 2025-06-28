import React, { useState } from "react";
import MintLand from "./components/MintLand";
import Marketplace from "./components/Marketplace";
import OwnedLands from "./components/OwnedLands";

function App() {
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(true);

  const connectPlug = async () => {
    setLoading(true);
    if (!window.ic || !window.ic.plug) {
      alert("❌ Plug Wallet not found. Please install it from https://plugwallet.ooo");
      setLoading(false);
      return;
    }

    try {
      const connected = await window.ic.plug.requestConnect({
        whitelist: ["uxrrr-q7777-77774-qaaaq-cai"], // ⛳️ Replace with your actual canister ID
      });

      if (connected) {
        const userPrincipal = await window.ic.plug.getPrincipal();
        setPrincipal(userPrincipal.toText());
      }
    } catch (err) {
      console.error("❌ Connection failed", err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🌍 Virtual Land Registry (ICP)</h1>

      {loading ? (
        <p>🔄 Connecting to wallet...</p>
      ) : principal ? (
        <p>✅ Connected as: <code>{principal}</code></p>
      ) : (
        <button onClick={connectPlug}>🔐 Connect Plug Wallet</button>
      )}

      <MintLand principal={principal} />
      <Marketplace principal={principal} />
      <OwnedLands principal={principal} />
    </div>
  );
}

export default App;
