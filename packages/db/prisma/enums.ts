export const AgentModelName = {
  gpt_3_5_turbo: "gpt_3_5_turbo",
} as const
export type AgentModelName =
  (typeof AgentModelName)[keyof typeof AgentModelName]
