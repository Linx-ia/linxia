import { Spinner } from "@linxia/ui"

export function SpinnerMessage() {
  return (
    <div className="flex h-[24px] flex-1 flex-row items-center space-y-2 overflow-hidden">
      <Spinner className="animate-spin" />
    </div>
  )
}
