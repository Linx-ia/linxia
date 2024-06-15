import { openai } from "@ai-sdk/openai"
import type { CoreMessage } from "ai"
import {
  createAI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
  streamUI,
} from "ai/rsc"

import { genId } from "@linxia/utils"

import { BotMessage, UserMessage } from "../components/message"
import { SpinnerMessage } from "../components/SpinnerMessage"
import type { Chat, Message } from "./type"

export interface AIState {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

async function submitUserMessage(content: string) {
  "use server"

  console.log("ccccccccc")
  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: genId(),
        role: "user",
        content,
      },
    ],
  })

  let textStream: ReturnType<typeof createStreamableValue<string>>
  let textNode: React.ReactNode

  const result = await streamUI({
    model: openai("gpt-3.5-turbo"),
    initial: <SpinnerMessage />,
    system: `Você é um assistente para apoiar o usuário`,
    messages: aiState.get().messages.map((message) => ({
      role: message.role,
      content: message.content,
      name: message.name,
    })) as CoreMessage[],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("")
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: genId(),
              role: "assistant",
              content,
            },
          ],
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
  })

  return {
    id: genId(),
    display: result.value,
  }
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: genId(), messages: [] },
  // eslint-disable-next-line @typescript-eslint/require-await
  onGetUIState: async () => {
    "use server"
    console.log("aaaa")

    const session = null

    if (session) {
      const aiState = getAIState() as Chat

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  onSetAIState: async () => {
    "use server"
    console.log("bbbbbb")

    const session = null

    if (session) {
      {
        /*
      const { chatId, messages } = state;

      const createdAt = new Date();
      const userId = session as string;
      const path = `/chat/${chatId}`;

      const firstMessageContent = messages[0].content as string;
      const title = firstMessageContent.substring(0, 100);
       
      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path,
      };
      */
      }
    } else {
      return
    }
  },
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.id}-${index}`,
      display:
        message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <BotMessage content={message.content} />
        ) : null,
    }))
}
