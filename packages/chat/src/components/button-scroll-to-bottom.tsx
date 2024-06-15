"use client"

import { Button, type ButtonProps } from "@linxia/ui"
import * as Icons from "@linxia/ui"
import { cn } from "@linxia/utils"

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps) {
  return (
    <Button
      type={"outline"}
      size="icon"
      className={cn(
        "absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2",
        isAtBottom ? "opacity-0" : "opacity-100",
        className,
      )}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <Icons.ArrowRight />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}
