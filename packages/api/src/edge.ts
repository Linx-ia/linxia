import { agentRouter } from "./router/agent";
import { createTRPCRouter } from "./trpc";

// Deployed to /trpc/edge/**
export const edgeRouter = createTRPCRouter({
  agent: agentRouter,
});
