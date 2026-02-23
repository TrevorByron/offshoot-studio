import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-zinc-200">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="mb-12 md:mb-16">
          <h3 className="font-semibold text-xl md:text-2xl mb-4 max-w-md leading-snug">
            Have a project in mind? Let's work together, we're always open to a chat.
          </h3>
          <a
            href="#cta"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-transparent bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Book a call
          </a>
        </div>
        <div className="w-full">
          <p className="mb-4 font-geist-mono text-[12px] text-left text-muted-foreground">
            © 2025 Tiger Team Studios
          </p>
          <Image
            src="/logo-NASA.svg"
            alt="Tiger Team Studios"
            width={1200}
            height={200}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </footer>
  )
}
