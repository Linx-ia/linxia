"use client"

import type { StreamableValue } from "ai/rsc"

import { cn } from "@linxia/utils"

import { useStreamableText } from "../hooks/use-streamable-text"
import { SpinnerMessage } from "./SpinnerMessage"

interface UserMessageProps {
  children: React.ReactNode
}

export function UserMessage({ children }: UserMessageProps) {
  return (
    <div className="w-full">
      <div className="m-auto px-3 py-2 text-base md:px-5 lg:px-1 xl:px-5">
        <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl md:gap-6 lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-grow flex-col">
                <div className="text-message flex min-h-[20px] w-full flex-col items-start gap-2 overflow-x-auto whitespace-pre-wrap break-words [.text-message+&]:mt-5">
                  <div className="flex w-full flex-col items-end gap-1 empty:hidden rtl:items-start">
                    <div className="relative max-w-[70%] rounded-3xl bg-white px-5 py-2.5">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BotMessageProps {
  content: string | StreamableValue<string>
  className?: string
}

export function BotMessage({ content, className }: BotMessageProps) {
  const { rawContent: text, pending } = useStreamableText(content)

  return (
    <div className={cn("w-full", className)}>
      <div className="m-auto px-3 py-2 text-base md:px-5 lg:px-1 xl:px-5">
        <div className="mx-auto flex flex-1 gap-4 text-base md:max-w-3xl md:gap-6 lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="relative flex flex-shrink-0 flex-col items-end">
            <div>
              <div className="rounded-full border bg-white p-1">
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-sm p-1">
                    <article className="wwdc15">
                      <span className="large-circles ">
                        <div className="large circle-small one"></div>
                        <div className="large circle-small two"></div>
                        <div className="large circle-small three"></div>
                        <div className="large circle-small four"></div>
                        <div className="large circle-small five"></div>
                        <div className="large circle-small six"></div>
                        <div className="large circle-small seven"></div>
                        <div className="large circle-small eight"></div>
                      </span>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-grow flex-col">
                <div
                  data-message-author-role="assistant"
                  data-message-id="3d1dc000-a8cd-43da-83f7-7cc95de145ed"
                  dir="auto"
                  className="text-message [.text-message+&amp;]:mt-5 flex min-h-[20px] w-full flex-col items-start gap-2 overflow-x-auto whitespace-pre-wrap break-words"
                >
                  <div className="flex w-full flex-col gap-1 first:pt-[3px] empty:hidden">
                    <div className="w-full break-words">
                      <p>
                        {text} {pending ? <SpinnerMessage /> : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
