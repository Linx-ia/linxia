import { AI } from "@linxia/chat"
import Chat from "@linxia/chat/chat"
import { genId } from "@linxia/utils"

export default function ChatBubble() {
  const id = genId()
  return (
    <>
      <div
        id="chat-bubble"
        className="fixed bottom-5 right-5 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-3xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div
        id="chat-popup"
        className="fixed bottom-24 right-5 flex h-[70vh] max-h-[70vh] w-[400px] flex-col rounded-2xl border bg-white text-sm shadow-md transition-all"
      >
        <div
          id="chat-input-container"
          className="h-full border-t border-gray-200 bg-gray-50 p-4"
        >
          <div className="flex justify-end sm:hidden">
            <button
              id="close-popup"
              className="cursor-pointer border-none bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
    </>
  )
}
