"use client"

import { useEffect, useState } from "react"
import { useUIState } from "ai/rsc"

import { cn } from "@linxia/utils"

import ChatList from "./components/chat-list"
import ChatPanel from "./components/chat-panel"
import EmptyScreen from "./components/empty-screen"
import { useLocalStorage } from "./hooks/use-local-storage"
import { useScrollAnchor } from "./hooks/use-scroll-anchor"
import type { Message } from "./lib/type"

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[]
  id?: string
}

export default function Chat({ id, className }: ChatProps) {
  const [messages] = useUIState()
  const [input, setInput] = useState("")

  const [_, setNewChatId] = useLocalStorage("newChatId", id)

  useEffect(() => {
    setNewChatId(id)
  })

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()
  return (
    <div
      className={cn(
        "relative flex h-full max-w-full flex-1 flex-col overflow-hidden",
        className,
      )}
      ref={scrollRef}
    >
      <main className="transition-width relative h-full w-full flex-1 overflow-auto">
        <div
          tabIndex={0}
          role="presentation"
          className="flex h-full flex-col focus-visible:outline-0"
        >
          <div className="flex-1 overflow-hidden" ref={messagesRef}>
            <div className="react-scroll-to-bottom-auto">
              <div className="p-0">
                <div className="flex flex-col pb-9 text-sm">
                  {messages.length ? (
                    <ChatList messages={messages} />
                  ) : (
                    <EmptyScreen />
                  )}
                </div>
              </div>
            </div>
          </div>

          <ChatPanel
            id={id}
            input={input}
            setInput={setInput}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
          <div className="text-token-text-secondary relative px-2 py-2 text-center text-xs md:px-[60px]">
            <span>Feito por Linxia</span>
          </div>
        </div>
      </main>
    </div>
  )
}
