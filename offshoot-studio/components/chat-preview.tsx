"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TextStrikethroughIcon,
  Link01Icon,
  LeftToRightListNumberIcon,
  RightToLeftListBulletIcon,
  PlusSignIcon,
  MailAtSign01Icon,
  MoreHorizontalIcon,
  MailSend01Icon,
} from "@hugeicons/core-free-icons"

const TYPING_MESSAGE = "Welcome @htcreative! see you at stand-up!"
const TYPING_INTERVAL_MS = 60

function renderTypedMessage(visible: string) {
  const mention = "@htcreative"
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

interface ChatPreviewProps {
  onHeightReport?: (height: number) => void
}

export function ChatPreview({ onHeightReport }: ChatPreviewProps) {
  const [visibleLength, setVisibleLength] = useState(0)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || !onHeightReport) return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height
      if (typeof height === "number") onHeightReport(height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onHeightReport])

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
      className="mt-4 rounded-lg overflow-hidden border border-border bg-[#F7F7F4] dark:bg-background shadow-sm min-h-[270px] flex flex-col"
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
            Tiger Team Studios
          </span>
        </div>
      </div>

      {/* Context */}
      <div className="px-3 pt-2 pb-1">
        <p className="text-xs text-muted-foreground leading-relaxed">
          This conversation is just between{" "}
          <span className="text-blue-600">@Tiger Team Studios</span>. Check out their
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
              <HugeiconsIcon icon={TextBoldIcon} className="size-3.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Italic"
            >
              <HugeiconsIcon icon={TextItalicIcon} className="size-3.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Underline"
            >
              <HugeiconsIcon icon={TextUnderlineIcon} className="size-3.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Strikethrough"
            >
              <HugeiconsIcon icon={TextStrikethroughIcon} className="size-3.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Link"
            >
              <HugeiconsIcon icon={Link01Icon} className="size-3.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Numbered list"
            >
              <HugeiconsIcon icon={LeftToRightListNumberIcon} className="size-3.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
              aria-label="Bullet list"
            >
              <HugeiconsIcon icon={RightToLeftListBulletIcon} className="size-3.5" strokeWidth={2} />
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
                <HugeiconsIcon icon={PlusSignIcon} className="size-4" strokeWidth={2} />
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
                <HugeiconsIcon icon={MailAtSign01Icon} className="size-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/80"
                aria-label="More"
              >
                <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" strokeWidth={2} />
              </button>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                aria-label="Send"
              >
                <HugeiconsIcon icon={MailSend01Icon} className="size-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
