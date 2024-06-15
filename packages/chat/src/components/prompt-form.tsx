import React from "react"
import { useActions, useUIState } from "ai/rsc"

import { Button, TextareaChat } from "@linxia/ui"
import * as Icons from "@linxia/ui"
import { genId } from "@linxia/utils"

import { useEnterSubmit } from "../hooks/use-enter-submit"
import { AI } from "../lib/actions"
import { UserMessage } from "./message"

export default function PromptFom({
  input,
  setInput,
}: {
  input: string
  setInput: (value: string) => void
}) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [_, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target["message"]?.blur()
        }

        const value = input.trim()
        setInput("")
        if (!value) return

        // Optimistically add user message UI
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: genId(),
            display: <UserMessage>{value}</UserMessage>,
          },
        ])

        // Submit and get response message
        const responseMessage = await submitUserMessage(value)
        setMessages((currentMessages) => [...currentMessages, responseMessage])
      }}
      className="w-full"
    >
      <div className="relative flex h-full max-w-full flex-1 flex-col">
        <div className="absolute bottom-full left-0 right-0"></div>
        <div className="flex w-full items-center">
          <div className="flex w-full flex-col gap-1.5 rounded-[26px] border bg-white p-1.5 transition-colors">
            <div className="flex items-end">
              <Button
                type={"outline"}
                className="flex items-center justify-center rounded-full px-2"
                sizeIcon={"lg"}
                icon={<Icons.Plus />}
              />

              <TextareaChat
                ref={inputRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                className="text-base"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                name="message"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                htmlType="submit"
                className="rounded-full px-2"
                sizeIcon={"lg"}
                icon={<Icons.ArrowRight />}
                disabled={input === ""}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
