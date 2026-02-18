# Offshoot Studio - Project Brief

## Overview

Offshoot Studio is a strategic design engineering service for Series A+ companies. We function as a parallel team that validates ideas, scales capacity, and refines products—without disrupting core development work.

## Core Positioning

- **Tagline**: "Your parallel team for the ideas your core team doesn't have time for"
- **Target Market**: Series A+ companies, established startups, innovation teams at larger companies
- **Key Differentiator**: AI-augmented design engineering with strategic product thinking. We use AI tools (Cursor, Claude, v0) to build 3-5x faster than traditional agencies, but bring human judgment for strategy, taste, and craft that AI cannot replicate.

## Services Offered

### 1. Rapid Prototyping (AI-Augmented)

- **Timeline**: 3-6 weeks
- **Pricing**: $8k-$15k
- **What**: Validate product ideas before committing engineering resources
- **Deliverable**: Working coded prototype (React/TypeScript) that's user-testable with realistic interactions
- **Process**: Strategy session → AI-augmented build → user testing → iteration → handoff with docs
- **Perfect for**: New feature validation, investor demos, testing ideas outside the roadmap, de-risking big bets

### 2. Embedded Design Engineering

- **Timeline**: 3+ weeks (flexible)
- **Pricing**: $8k-$15k per engagement
- **What**: Senior design-eng capacity without W2 overhead
- **Deliverable**: Feature design through production implementation, integrated with their team
- **Process**: Integration week → daily collaboration → build & ship → handoff
- **Perfect for**: Critical feature builds, temporary capacity scaling, product launches, short-term sprints

### 3. 0-to-1 Design Refinement

- **Timeline**: 3-8 weeks
- **Pricing**: $10k-$15k
- **What**: Transform scrappy MVPs into professional products
- **Deliverable**: Redesigned core flows, design system, rebuilt with clean React architecture
- **Process**: Product audit → redesign & rebuild → polish → handoff with documentation
- **Perfect for**: Post-launch polish, pre-fundraise credibility, moving upmarket, scaling after early traction

## Value Propositions

### Strategic Thinking First

- Help clients figure out what to build, not just execute what they ask for
- Every engagement starts with strategy, not Figma
- The thinking work is half the value

### AI-Augmented Speed

- Use Cursor, Claude, v0, and other AI tools to build 3-5x faster
- Bring human judgment AI can't replace: product strategy, design taste, architectural decisions
- "AI gives you what you ask for. We help you figure out what to ask for."

### Production-Ready Work

- All code is clean, documented, and production-quality
- No throwaway prototypes—teams can build from our foundation
- Design + engineering in one person = no handoff friction

### No Overhead

- Start immediately (no 2-3 month hiring process)
- No benefits, payroll, or employment commitment
- Defined scope with clear timelines
- Senior-level from day one

## Target Customer Profile

### Good Fit:

- Series A+ companies with funding but limited bandwidth
- Core team maxed out on roadmap but has ideas worth testing
- Needs senior design-eng capacity without hiring delays
- Built scrappy V1, now needs professional polish to scale
- Showing work to investors, enterprise customers, or senior hires
- Values strategic product thinking as much as execution

### Works With:

- Founders and CEOs (thinking partners, not just vendors)
- Product leaders (running experiments outside core roadmap)
- Engineering leaders (need design-eng capacity without hiring overhead)
- Innovation teams (exploring adjacent products or new markets)

### Industries:

- B2B SaaS (primary)
- Fintech
- Developer tools
- Complex workflows, data visualization, technical products

## Competitive Positioning

### vs. Design Agencies

- No account managers, project managers, or junior designers
- One senior design engineer who thinks and builds
- No bureaucracy or handoff lag
- AI-augmented speed at fraction of agency cost

### vs. Hiring Full-Time

- Start immediately vs. 2-3 month hiring process
- No payroll, benefits, or employment risk
- Defined scope vs. open-ended commitment
- Senior-level from day one vs. onboarding ramp

### vs. AI Tools (Lovable, v0, Cursor alone)

- AI tools require knowing exactly what to build
- We help shape fuzzy ideas through strategic conversation
- AI makes generic patterns; we make opinionated decisions
- AI leaves messy code; we leave production-quality foundations
- "AI tools are DIY. We're the strategic partner."

## Brand Voice & Tone

- Confident but not arrogant
- Direct and clear, no fluff
- Technical but accessible
- Emphasizes transformation and outcomes
- Honest about fit (not for everyone)
- Speaks to senior decision-makers
- Short sentences, active voice
- Numbers and specifics when possible

## Key Messages

- "Great ideas die on the backlog" - Acknowledges the core problem
- "Think of us as your R&D team on demand" - Positions the solution
- "Strategic thinking is the service. The prototype is the artifact." - Emphasizes value beyond deliverables
- "We use AI to move 3-5x faster. But we bring the judgment AI can't replace." - Differentiates from pure AI tools
- "No handoff lag, no translation loss" - Design + engineering in one person

## Proof Points / Case Study Themes

- Rapid validation: "4 weeks to validation vs. 3 months of internal debate"
- Cost efficiency: "Saved 4 months of wasted effort" / "Best $10k we ever spent"
- Business impact: "40% increase in activation" / "Closed $400k enterprise deal"
- Speed to market: "Shipped on time without derailing the roadmap"
- Professional polish: "Went from 'founders built this' to 'real company'"

## Tech Stack

- **Design**: Figma, user research, interaction design
- **Code**: React, TypeScript, Next.js, Tailwind CSS
- **Prototyping**: Framer, functional prototypes, design systems
- **AI Tools**: Cursor, Claude, v0, GitHub Copilot
- **Collaboration**: Slack, Linear, GitHub, Notion

## Component Library

### CaseStudyCard Component

A reusable component for displaying case studies with an image mockup. Located at `components/case-study-card.tsx`.

**Props:**
- `title` (string, required): The case study title
- `badge` (string, optional): Badge text displayed below the title
- `description` (string[], required): Array of paragraph strings for the description
- `imageBackground` (string, required): URL/path to the background image
- `imageScreenshot` (string, required): URL/path to the screenshot image displayed in the browser mockup
- `imagePosition` ("left" | "right", optional): Position of the image relative to content. Default: "right"
- `imageAlt` (string, optional): Alt text for the screenshot image

**Usage Example:**

```tsx
import { CaseStudyCard } from "@/components/case-study-card"

// Image on the right (default)
<CaseStudyCard
  title="Project Name"
  badge="Service Type"
  description={[
    "First paragraph of description.",
    "Second paragraph of description.",
    "Third paragraph of description.",
  ]}
  imageBackground="/background-image.png"
  imageScreenshot="/screenshot.png"
  imagePosition="right"
  imageAlt="Project screenshot"
/>

// Image on the left
<CaseStudyCard
  title="Project Name"
  badge="Service Type"
  description={["Description paragraph 1", "Description paragraph 2"]}
  imageBackground="/background-image.png"
  imageScreenshot="/screenshot.png"
  imagePosition="left"
/>
```

**Features:**
- Responsive layout (stacks on mobile, side-by-side on desktop)
- Browser window mockup with styled frame
- Supports both left and right image positioning
- Maintains consistent styling with the rest of the site

## Business Model

- Project-based engagements (minimum 3 weeks)
- All pricing ranges from $8k-$15k per engagement
- 2-3 projects per quarter capacity
- 2-3 week typical lead time
- Flexible repeat engagements (many clients work with us multiple times)

## What We're NOT

- Not a full-service agency with large teams
- Not a dev shop (no backend/infrastructure work as primary service)
- Not for pre-seed/seed startups (pricing doesn't fit their budget)
- Not for maintenance/support work
- Not for projects under 3 weeks
- Not a replacement for hiring long-term (we help bridge gaps, not fill permanent roles)
