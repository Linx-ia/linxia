import { ButtonScrollToBottom } from "./button-scroll-to-bottom"
import PromptFome from "./prompt-form"

export interface ChatPanelProps {
  id?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export default function ChatPanel({
  id,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
}: ChatPanelProps) {
  return (
    <div className="w-full pl-0 pr-0 dark:border-white/20 md:w-[calc(100%-.5rem)] md:border-transparent md:pt-0 md:dark:border-transparent">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="m-auto px-3 text-base md:px-5 lg:px-1 xl:px-5">
        <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl md:gap-6 lg:max-w-[40rem] xl:max-w-[48rem]">
            <PromptFome input={input} setInput={setInput} />
          </div>
        </div>
      </div>
    </div>
  )
}
