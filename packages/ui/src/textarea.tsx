import * as React from "react";

import { cn } from "@linxia/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `border-control 
          flex 
          w-full 
          rounded-md 
          border 
          border-input 
          px-3 
          py-2 
          text-sm 
          ring-offset-background 
          file:border-0 
          file:bg-transparent 
          file:text-sm 
          file:font-medium 
          placeholder:text-muted-foreground
          focus:border-input
          focus-visible:outline-none 
          focus-visible:ring-2 
          focus-visible:ring-ring 
          focus-visible:ring-offset-2 
          disabled:cursor-not-allowed 
          disabled:opacity-50`,
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);
Textarea.displayName = "textarea";

export { Textarea };
