"use client"

import React, { FunctionComponent, useState } from "react"
import { createRoot, Root } from "react-dom/client"

import { InitWidgetProps } from "../common/types"

type Props = {
  widget: FunctionComponent<InitWidgetProps>
}

export function CreateElement({ widget }: Props): CustomElementConstructor {
  return class WebChatBubble extends HTMLElement {
    instanceId?: string
    setIsOpen?: (isOpen: boolean) => void
    isOpen?: boolean
    root: Root
    shadowRootElement: HTMLDivElement

    constructor() {
      super()
      this.shadowRootElement = document.createElement("div")
      this.attachShadow({ mode: "open" }).appendChild(this.shadowRootElement)
      this.root = createRoot(this.shadowRootElement)
    }

    destroy() {
      this.innerHTML = ""
      if (this.instanceId) {
        ;(window as any)[this.instanceId!] = null
      }
    }

    open() {
      this.setIsOpen?.(true)
    }

    close() {
      this.setIsOpen?.(false)
    }

    Component = (props: any) => {
      const [isOpen, setIsOpen] = useState(false)
      this.setIsOpen = setIsOpen
      this.isOpen = isOpen

      return (
        <div>
          {React.createElement(widget, {
            ...props,
            isOpen,
            agentId: this.getAttribute("agent-id") || "",
          } as InitWidgetProps)}
        </div>
      )
    }

    connectedCallback() {
      this.root.render(<this.Component isOpen={this.isOpen} />)
    }

    disconnectedCallback() {
      this.destroy()
    }
  }
}

export default CreateElement
