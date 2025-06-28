import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory, canisterId } from "./declarations/land_nft";

const canisterId = "xsfk2-nx777-77774-qaala-cai";
const isLocal = true;

const agent = new HttpAgent({
  host: isLocal ? "http://127.0.0.1:4943" : "https://ic0.app",
});

if (isLocal) {
  agent.fetchRootKey().catch(err => {
    console.warn("⚠️ Could not fetch root key:", err);
  });
}

export const landActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});
