import React, { useEffect, useState } from "react";
import { landActor } from "../agent";

export default function OwnedLands({ principal }) {
  const [ownedLands, setOwnedLands] = useState([]);

  const fetchOwnedLands = async () => {
    let lands = [];
    let i = 0;

    // Try fetching metadata until we hit an error (assumes sequential IDs)
    while (true) {
      try {
        const owner = await landActor.get_owner(i);
        if (owner.toText() === principal) {
          const metadata = await landActor.get_metadata(i);
          lands.push({ id: i, ...metadata });
        }
        i++;
      } catch (err) {
        break; // Stop when out-of-range or failed to decode
      }
    }

    setOwnedLands(lands);
  };

  useEffect(() => {
    if (principal) {
      fetchOwnedLands();
    }
  }, [principal]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🧭 Your Owned Lands</h2>
      {ownedLands.length === 0 ? (
        <p>No land NFTs owned yet.</p>
      ) : (
        <ul>
          {ownedLands.map((land) => (
            <li key={land.id} style={{ marginBottom: "10px" }}>
              <strong>#{land.id}</strong><br />
              📍 <strong>Name:</strong> {land.name}<br />
              🗺️ <strong>Coords:</strong> {land.coordinates}<br />
              📐 <strong>Size:</strong> {land.size}<br />
              🧾 <strong>Media Hash:</strong> {land.media_hash}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
