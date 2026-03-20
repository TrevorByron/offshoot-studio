import Image from "next/image"
import Link from "next/link"
import { BookACallLink } from "@/components/book-a-call-link"

interface FooterProps {
  variant?: "default" | "dark"
}

/** Footer always uses light-mode colors so it looks the same on dark pages (e.g. case studies). */
export function Footer({ variant = "default" }: FooterProps) {
  return (
    <footer className="border-t border-zinc-300 pb-20 bg-zinc-200 text-zinc-900 dark:bg-zinc-200 dark:text-zinc-900 dark:border-zinc-300">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="mb-12 md:mb-16">
          <h3 className="font-semibold text-xl md:text-2xl mb-4 max-w-md leading-snug">
            Have a project in mind? Let's work together, we're always open to a chat.
          </h3>
          <BookACallLink className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-transparent bg-[#1A1A1A] px-6 text-sm font-medium text-white transition-all hover:bg-[#2a2a2a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:ring-offset-2">
            Book a call
          </BookACallLink>
        </div>
        <div className="w-full">
          <p className="mb-4 font-geist-mono text-[12px] text-left text-zinc-600 dark:text-zinc-600">
            © 2025 Tiger Team Studios
            {" · "}
            <Link
              href="/play"
              className="hover:text-zinc-900 dark:hover:text-zinc-900 transition-colors"
            >
              Play
            </Link>
          </p>
          <Link href="/" className="block hover:opacity-90 transition-opacity">
            <Image
              src="/logo-NASA.svg"
              alt="Tiger Team Studios"
              width={1200}
              height={200}
              className="w-full h-auto object-contain"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
