import type { ColumnType } from "kysely"

import type { AgentModelName } from "./enums"

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type Agents = {
  id: string
  userId: string
  name: string
  description: string | null
  promptSystem: string | null
  modelName: Generated<AgentModelName>
  temperature: Generated<number>
  createdAt: Generated<Timestamp>
}
export type DB = {
  Agents: Agents
}
