"use client"

import React, { useState } from "react"

import * as Icons from "@linxia/ui"

type Props = {
  isOpen?: boolean
  children: React.ReactNode
}

export default function ChatBubbleContent({
  isOpen: initialIsOpen,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(initialIsOpen || false)

  const handleToggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button
        onClick={handleToggleOpen}
        id="chat-bubble"
        className="fixed bottom-5 right-5 flex h-20 w-20 cursor-pointer items-center justify-center text-3xl"
      >
        <article className="wwdc15">
          <span className="large-circles ">
            <div className="large circle one"></div>
            <div className="large circle two"></div>
            <div className="large circle three"></div>
            <div className="large circle four"></div>
            <div className="large circle five"></div>
            <div className="large circle six"></div>
            <div className="large circle seven"></div>
            <div className="large circle eight"></div>
          </span>
        </article>
        {isOpen && (
          <div className="absolute z-50">
            <Icons.Close className="h-10 w-10 font-black text-white" />
          </div>
        )}
      </button>

      {isOpen && <>{children}</>}
    </div>
  )
}
