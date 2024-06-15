import { useEffect, useState } from "react"
import type { StreamableValue } from "ai/rsc"
import { readStreamableValue } from "ai/rsc"

export const useStreamableText = (
  content: string | StreamableValue<string>,
) => {
  const [rawContent, setRawContent] = useState(
    typeof content === "string" ? content : "",
  )
  const [pending, setPending] = useState(false)

  useEffect(() => {
    void (async () => {
      if (typeof content === "object") {
        setPending(true) // Set pending to true when starting
        let value = ""
        for await (const delta of readStreamableValue(content)) {
          console.log("delta")
          console.log(delta)

          if (typeof delta === "string") {
            setRawContent((value = value + delta))
          }
        }
        setPending(false) // Set pending to false when done
      }
    })()
  }, [content])

  return { rawContent, pending }
}
