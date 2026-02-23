import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, Linkedin01Icon } from "@hugeicons/core-free-icons"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Tiger Team Studios
            </h3>
            <p className="text-sm text-muted-foreground">
              Strategic design engineering for companies that move fast
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#pricing-how-we-work" className="hover:text-foreground transition-colors">
                  Rapid Prototyping (AI-Augmented)
                </a>
              </li>
              <li>
                <a href="#pricing-how-we-work" className="hover:text-foreground transition-colors">
                  Embedded Design Engineering
                </a>
              </li>
              <li>
                <a href="#pricing-how-we-work" className="hover:text-foreground transition-colors">
                  0-to-1 Design Refinement
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:hello@htcreative.com"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <HugeiconsIcon icon={Mail01Icon} className="size-4" strokeWidth={2} />
                  hello@htcreative.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/ht-creative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <HugeiconsIcon icon={Linkedin01Icon} className="size-4" strokeWidth={2} />
                  LinkedIn
                </a>
              </li>
              <li className="mt-4">San Francisco, CA</li>
            </ul>
          </div>
        </div>
        <Separator className="mb-8" />
        <div className="text-left md:text-center text-sm text-muted-foreground">
          © 2025 Tiger Team Studios
        </div>
      </div>
    </footer>
  )
}
