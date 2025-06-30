import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory, canisterId } from "./declarations/land_nft";

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" }); // Local replica

export const landActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});
