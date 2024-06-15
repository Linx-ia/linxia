import * as React from "react"
import Textarea, { TextareaAutosizeProps } from "react-textarea-autosize"

import { cn } from "@linxia/utils"

export type TextareaPropsChat = TextareaAutosizeProps &
  React.RefAttributes<HTMLTextAreaElement>

const TextareaChat = React.forwardRef<HTMLTextAreaElement, TextareaPropsChat>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        className={cn(
          `text-token-text-primary 
          mx-1 
          flex 
          max-h-52 
          w-full 
          resize-none 
          rounded-md 
          border-0 
          bg-transparent 
          px-0 
          py-2 
          text-sm 
          ring-offset-background 
          file:border-0 
          file:bg-transparent 
          file:text-sm 
          file:font-medium 
          placeholder:text-muted-foreground 
          focus:ring-0 
          focus-visible:outline-none 
          focus-visible:ring-0 
          disabled:cursor-not-allowed 
          disabled:opacity-50`,
          className,
        )}
        {...props}
        ref={ref}
      />
    )
  },
)
TextareaChat.displayName = "TextareaChat"

export { TextareaChat }
