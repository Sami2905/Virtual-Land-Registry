/* global BigInt */
import React, { useEffect, useState } from "react";
import { landActor } from "../agent";

function Marketplace({ principal }) {
  const [listings, setListings] = useState([]);
  const [landId, setLandId] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const result = await landActor.get_listings();
      setListings(result);
    } catch (err) {
      console.error("❌ Failed to fetch listings:", err);
    }
  };

  const listLand = async () => {
    if (!landId || !price) {
      alert("Please enter land ID and price.");
      return;
    }

    setLoading(true);
    try {
      await landActor.list_land(BigInt(landId), BigInt(price));
      alert("✅ Land listed!");
      fetchListings();
    } catch (err) {
      console.error("❌ Listing failed:", err);
      alert("Listing failed.");
    }
    setLoading(false);
  };

  const buyLand = async (id) => {
    try {
      await landActor.buy_land(BigInt(id));
      alert(`✅ You bought land ID ${id}`);
      fetchListings();
    } catch (err) {
      console.error("❌ Buying failed:", err);
      alert("Buying failed.");
    }
  };

  if (!principal) {
    return <p>🔒 Please connect Plug wallet to use the marketplace.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏪 Marketplace</h2>

      <div>
        <h4>💼 List Your Land</h4>
        <input placeholder="Land ID" value={landId} onChange={(e) => setLandId(e.target.value)} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button onClick={listLand} disabled={loading}>
          {loading ? "Listing..." : "💸 List"}
        </button>
      </div>

      <h4>🛍️ Available Listings</h4>
      {listings.length === 0 ? (
        <p>No listings yet.</p>
      ) : (
        <ul>
          {listings.map((l, i) => (
            <li key={i}>
              🧱 ID: {Number(l.id)} | 💰 {Number(l.price)} ICP{" "}
              <button onClick={() => buyLand(l.id)}>Buy</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Marketplace;
