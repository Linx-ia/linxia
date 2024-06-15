import { genId } from "@linxia/utils"

import Chat from "./chat"
import { InitWidgetProps } from "./common/types"
import ChatBubbleContent from "./components/chat-bubble-content"
import { AI } from "./lib/actions"

export type ChatBoxStandardProps = InitWidgetProps & {
  instanceId?: string
  isOpen?: boolean
}

export function ChatBubble(props: ChatBoxStandardProps) {
  const id = genId()

  return (
    <ChatBubbleContent isOpen={props.isOpen}>
      <div
        id="chat-popup"
        className="fixed bottom-24 right-5 flex h-[70vh] max-h-[70vh] w-[400px] flex-col rounded-2xl border bg-white text-sm shadow-md transition-all"
      >
        <div
          id="chat-input-container"
          className="h-full border-t border-gray-200 bg-gray-50 p-6 md:p-4"
        >
          <div className="flex justify-end sm:hidden">
            <button
              id="close-popup"
              className="cursor-pointer border-none bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <AI initialAIState={{ chatId: id, messages: [] }}>
            <div className="relative z-0 flex h-full w-full overflow-hidden">
              <Chat id={id} />
            </div>
          </AI>
        </div>
      </div>
    </ChatBubbleContent>
  )
}
