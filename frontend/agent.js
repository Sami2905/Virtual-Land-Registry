import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "./declarations/land_nft";

// ✅ Hardcoded canister ID (your deployed one)
const canisterId = "uxrrr-q7777-77774-qaaaq-cai";

// Toggle for local development
const isLocal = true;

// 👇 Use Plug’s agent if connected, else fallback to HttpAgent
let agent;

if (window.ic && window.ic.plug && window.ic.plug.agent) {
  agent = window.ic.plug.agent;
} else {
  agent = new HttpAgent({
    host: isLocal ? "http://127.0.0.1:4943" : "https://ic0.app",
  });

  if (isLocal) {
    agent.fetchRootKey();
  }
}

// ✅ Export actor to interact with the land_nft canister
export const landActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});
