import React, { useState, useEffect } from "react";
import MintLand from "./components/MintLand";
import Marketplace from "./components/Marketplace";
import OwnedLands from "./components/OwnedLands";

function App() {
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(true);

  const connectPlug = async () => {
    setLoading(true);

    if (!window.ic || !window.ic.plug) {
      alert("❌ Plug Wallet not found. Please install it from plugwallet.ooo");
      setLoading(false);
      return;
    }

    try {
      const connected = await window.ic.plug.requestConnect({
        whitelist: ["wykia-ph777-77774-qaama-cai"], // Replace if needed
      });

      if (connected) {
        const userPrincipal = await window.ic.plug.getPrincipal();
        setPrincipal(userPrincipal.toText());
      }
    } catch (error) {
      console.error("❌ Plug Wallet connection failed:", error);
    }

    setLoading(false);
  };

  // ✅ Automatically try to connect on mount
  useEffect(() => {
    connectPlug();
  }, []);

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

      <hr />
      <MintLand principal={principal} />
      <hr />
      <Marketplace principal={principal} />
      <hr />
      {principal && <OwnedLands principal={principal} />}
    </div>
  );
}

export default App;
