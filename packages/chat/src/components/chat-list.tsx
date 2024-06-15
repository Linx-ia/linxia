import { UIState } from "../lib/actions"

export interface ChatListProps {
  messages: UIState
}

export default function ChatList({ messages }: ChatListProps) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative h-full">
      {messages.map((message, index) => (
        <div key={message.id}>
          {message.display}
          {index < messages.length - 1}
        </div>
      ))}
    </div>
  )
}
