"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link2,
  ListOrdered,
  List,
  Plus,
  AtSign,
  MoreHorizontal,
  Send,
} from "lucide-react"

const TYPING_MESSAGE = "Welcome @offshoot! see you at stand-up!"
const TYPING_INTERVAL_MS = 60

function renderTypedMessage(visible: string) {
  const mention = "@offshoot"
  const idx = visible.indexOf(mention)
  if (idx === -1) {
    return visible
  }
  const before = visible.slice(0, idx)
  const after = visible.slice(idx + mention.length)
  return (
    <>
      {before}
      <span className="text-blue-600">{mention}</span>
      {after}
    </>
  )
}

export function ChatPreview() {
  const [visibleLength, setVisibleLength] = useState(0)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasEnteredViewport(true)
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasEnteredViewport || visibleLength >= TYPING_MESSAGE.length) return
    const t = setInterval(() => {
      setVisibleLength((n) => {
        if (n >= TYPING_MESSAGE.length) return n
        return n + 1
      })
    }, TYPING_INTERVAL_MS)
    return () => clearInterval(t)
  }, [hasEnteredViewport, visibleLength])

  const visibleText = TYPING_MESSAGE.slice(0, visibleLength)

  return (
    <div
      ref={containerRef}
      className="mt-4 rounded-lg overflow-hidden border border-border bg-card shadow-sm h-[270px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b border-border">
        <div className="size-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 overflow-hidden">
          <Image
            src="/slack-logo.png"
            alt="Slack"
            width={40}
            height={40}
            className="rounded-lg w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-sm text-card-foreground truncate">
            Offshoot Studio
          </span>
        </div>
      </div>

      {/* Context */}
      <div className="px-3 pt-2 pb-1">
        <p className="text-xs text-muted-foreground leading-relaxed">
          This conversation is just between{" "}
          <span className="text-blue-600">@Offshoot Studio</span>. Check out their
          profile to learn more about them.
        </p>
      </div>

      {/* Message input */}
      <div className="p-3 border-t border-border flex-1 flex flex-col">
        <div className="rounded-lg border border-border bg-muted overflow-hidden flex-1 flex flex-col">
          {/* Formatting toolbar */}
          <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border">
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Bold"
            >
              <Bold className="size-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Italic"
            >
              <Italic className="size-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Underline"
            >
              <Underline className="size-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Strikethrough"
            >
              <Strikethrough className="size-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Link"
            >
              <Link2 className="size-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Numbered list"
            >
              <ListOrdered className="size-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Bullet list"
            >
              <List className="size-3.5" />
            </button>
          </div>
          {/* Message text */}
          <div className="px-3 py-2 min-h-[2.5rem] flex-1 flex items-center">
            <span className="text-sm text-card-foreground">
              {renderTypedMessage(visibleText)}
              <span
                className="chat-typing-cursor ml-0.5 inline-block w-0.5 h-4 bg-foreground align-middle"
                aria-hidden
              />
            </span>
          </div>
          {/* Bottom toolbar */}
          <div className="flex items-center justify-between gap-2 px-2 py-1.5 border-t border-border">
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
                aria-label="Add"
              >
                <Plus className="size-4" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80 px-1.5 text-xs font-medium"
                aria-label="Text"
              >
                Aa
              </button>
              <button
                type="button"
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
                aria-label="Emoji"
              >
                <span className="text-sm">😊</span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
                aria-label="Mention"
              >
                <AtSign className="size-4" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
                aria-label="More"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                aria-label="Send"
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
