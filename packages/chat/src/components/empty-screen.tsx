import { useUIState } from "ai/rsc"

import { LogoLinx } from "@linxia/ui"

import { AI } from "../lib/actions"

export default function EmptyScreen() {
  const [messages, setMessages] = useUIState<typeof AI>()

  const exampleMessages = [
    {
      heading: "What are the dsa ds",
      subheading: "trending memecoins today?",
      message: `What are the trending memecoins today?`,
    },
    {
      heading: "What is the price of",
      subheading: "$DOGE right now?",
      message: "What is the price of $DOGE right now?",
    },
    {
      heading: "I would like to buy",
      subheading: "42 $DOGE",
      message: `I would like to buy 42 $DOGE`,
    },
    {
      heading: "What are some",
      subheading: `recent events about $DOGE?`,
      message: `What are some recent events about $DOGE?`,
    },
  ]

  return (
    <div className="relative h-full">
      <div className="text-token-text-primary flex h-full flex-col items-center justify-center">
        <LogoLinx />
        <div>
          <div className="mt-12 flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
            {messages.length === 0 &&
              exampleMessages.map((example, index) => (
                <div
                  key={example.heading}
                  className={`max-w-3xl flex-wrap items-stretch justify-center gap-4 ${
                    index > 1 && "hidden sm:flex"
                  }`}
                >
                  <button className="relative flex w-40 flex-col gap-2 rounded-2xl border bg-white px-3 pb-4 pt-3 text-start align-top text-[15px] shadow-md transition">
                    <div className="break-word line-clamp-3 text-balance text-gray-600">
                      {example.heading}
                    </div>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
