import type { CoreMessage } from "ai"

export type Message = CoreMessage & {
  id: string
  name?: string
}

interface BaseChat {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type Chat = BaseChat & Record<string, string | number | Date | Message[]>

interface BaseMessageState {
  role: string
  content: string
  name: Date
}
export type MessageState = BaseMessageState & Record<string, string | Date>
