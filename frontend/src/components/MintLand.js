import React, { useState } from "react";
import { landActor } from "../agent";
import { uploadFileToIPFS } from "../utils/uploadToPinata";

function MintLand({ principal }) {
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [size, setSize] = useState("");
  const [file, setFile] = useState(null);
  const [mintedId, setMintedId] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [loading, setLoading] = useState(false);

  if (!principal) {
    return <p>🔒 Please connect your wallet to mint land.</p>;
  }

  const handleMint = async () => {
    if (!name || !coordinates || !size || !file) {
      alert("Please fill in all fields and upload a file.");
      return;
    }

    setLoading(true);
    try {
      const ipfsHash = await uploadFileToIPFS(file);
      setIpfsHash(ipfsHash);

      const metadata = {
        name,
        coordinates,
        size,
        media_hash: ipfsHash,
      };

      const result = await landActor.mint(metadata);
      const id = Number(result);
      setMintedId(id);
      alert(`✅ Land minted with ID ${id}`);
    } catch (err) {
      console.error("❌ Minting failed:", err);
      alert("Minting failed. See console.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛠️ Mint New Virtual Land</h2>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Coordinates" value={coordinates} onChange={(e) => setCoordinates(e.target.value)} /><br />
      <input placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} /><br />
      <input type="file" accept=".jpg,.png,.jpeg,.glb" onChange={(e) => setFile(e.target.files[0])} /><br /><br />

      <button onClick={handleMint} disabled={loading}>
        {loading ? "Minting..." : "🚀 Mint Land"}
      </button>

      {mintedId !== null && (
        <div>
          <p>✅ Minted Land ID: <strong>{mintedId}</strong></p>
          <p>
            🌐 IPFS: <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} target="_blank" rel="noreferrer">View</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default MintLand;
