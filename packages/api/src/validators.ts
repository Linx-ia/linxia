import * as z from "zod";

/**
 * Shared validators used in both the frontend and backend
 */

const AgentModelName = {
  gpt_3_5_turbo: "gpt_3_5_turbo",
} as const;

type AgentModelName = (typeof AgentModelName)[keyof typeof AgentModelName];

export const createAgentSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
  description: z.string().optional(),
  promptSystem: z.string().optional(),
  modelName: z.nativeEnum(AgentModelName).default(AgentModelName.gpt_3_5_turbo),
  temperature: z.number().default(0),
});
export type CreateProject = z.infer<typeof createAgentSchema>;
