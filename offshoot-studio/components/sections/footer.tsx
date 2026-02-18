import { Separator } from "@/components/ui/separator"
import { Mail, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Offshoot Studio
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
                <a href="#services" className="hover:text-foreground transition-colors">
                  Rapid Prototyping (AI-Augmented)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Embedded Design Engineering
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
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
                  href="mailto:hello@offshootstudio.com"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  hello@offshootstudio.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/offshoot-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li className="mt-4">San Francisco, CA</li>
            </ul>
          </div>
        </div>
        <Separator className="mb-8" />
        <div className="text-left md:text-center text-sm text-muted-foreground">
          © 2025 Offshoot Studio
        </div>
      </div>
    </footer>
  )
}
