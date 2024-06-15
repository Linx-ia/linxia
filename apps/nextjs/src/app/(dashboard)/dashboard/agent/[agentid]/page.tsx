import { AI } from "@linxia/chat"
import Chat from "@linxia/chat/chat"
import { genId } from "@linxia/utils"

export default function AgentPage() {
  const id = genId()
  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <div className="relative -top-32 z-0 flex h-full w-full overflow-hidden">
        <Chat id={id} className="pt-36" />
      </div>
    </AI>
  )
}
