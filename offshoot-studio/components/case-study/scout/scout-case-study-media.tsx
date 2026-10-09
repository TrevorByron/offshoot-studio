"use client"

import ScoutClaudeChatMockup from "./ScoutClaudeChatMockup"
import ScoutRefinementMotion from "./ScoutRefinementMotion"

export type ScoutCaseStudyMediaKind =
  | "scoutClaudeResearch"
  | "scoutClaudeVision"
  | "scoutClaudeScaffold"
  | "scoutRefinement"

/** Narrative vision prompt + response from the portfolio review Scout Fuel case study. */
const NARRATIVE_VISION_PROMPT =
  "describe the ideal software to support all this. tell the story again but explain what the imaginary software is doing so simplify this job"

const NARRATIVE_VISION_RESPONSE = `I pull into the office at 5:30 AM, and instead of staring at three monitors full of spreadsheets, I open one dashboard. FuelCommand has already been working while I slept.

The system automatically ingested last night's fuel transactions, cross-referenced them against real-time pricing data at every truck stop within 50 miles of where each driver fueled up, and flagged the exceptions. There's a clean alert: "Driver 31 - Overpaid $47 at TA in Reno. Flying J 12 miles prior was $0.31/gal cheaper." The system shows me it already sent Driver 31 a gentle automated message: "Hey Tom, heads up - next time you're in this area, check the fuel app for better rates nearby." It learns which drivers need coaching and which ones just had no choice.

I click into the efficiency dashboard. FuelCommand has already correlated Driver 23's 8% MPG drop with maintenance records and flagged that his truck is 2,000 miles overdue for a tire rotation. It created a maintenance ticket automatically. It also noticed his average speed increased 4 mph this month-probably driving more aggressively. The system queued him for the next defensive driving refresher but wants my approval first. I click "approve."

At 7 AM, dispatch calls about the Memphis to Phoenix urgent run. But before I can even open my routing tool, FuelCommand is already showing me the answer. It analyzed which trucks are available, their current fuel economy trends, their locations, and their fuel levels. It recommends Truck 17 with Driver 42-she's got the best fuel efficiency rating on western routes, and the truck just came out of maintenance.

More importantly, the system has already calculated the optimal fuel stops. It's not just looking at our negotiated rates-it's pulling live pricing from our fuel card network, factoring in current traffic patterns, considering the load weight, accounting for elevation changes (Phoenix is uphill from Memphis), and even checking which stations have shorter wait times based on historical data. Three perfect stops pop up on the map with precise timing: "Refuel in Little Rock (47% capacity, $3.58/gal), Albuquerque (43% capacity, $3.62/gal), arrive Phoenix with 22% remaining."

I send the route to Driver 42's tablet with one click. She gets turn-by-turn navigation with the fuel stops pre-programmed. If she deviates or if prices change dramatically mid-route, the system will automatically recalculate and notify her of better options.

Mid-morning, I'm not on the phone with the fuel card company-FuelCommand already caught those DEF retail purchases and sent me a weekly anomaly report. It even drafted a message for the safety manager to include in Friday's driver meeting, with specific examples and the cost impact. I just review and approve it.

The idling report is automated now. FuelCommand tracks every truck in real-time via telematics integration. When Driver 8 idled for 4.2 hours yesterday, the system texted him at hour 2: "Extended idle detected. If waiting for load, consider shutting down. Current idle cost: $8." It logged the location, cross-referenced it with our customer database, and automatically added it to the detention time report I send to that shipper monthly. It's even calculating the total annual idling cost per customer so I can negotiate better terms.

The system already knows there's a problem customer who's costing us $4,200/year in idle time.

For the weekly fuel bid review, I don't spend lunch building comparison spreadsheets. FuelCommand has a vendor evaluation module. I upload the three proposals, and it instantly models them against our actual historical consumption patterns-every route, every gallon, every price point from the last 12 months. It shows me:

Vendor A: Projected annual savings $23,400 (2.1% reduction)
Vendor B: Projected annual savings $41,200 (3.7% reduction)
Vendor C: Projected annual cost increase $8,900 (marketing fluff, poor coverage on our actual routes)

It even highlights the risk factors: "Vendor B has limited stations on I-80 through Nebraska-would require route modifications on 12% of loads."

The quarterly budget forecast that used to take me six hours? FuelCommand has a predictive modeling engine. It's already tracking DOE diesel projections, our planned route expansions, the three new trucks in the fleet, seasonal variations, and even correlating factors I never thought of-like how El Nino patterns affect fuel prices in the Southwest. It generates the forecast in 30 seconds. My job is to review the assumptions, make strategic adjustments (maybe I know we're bidding on a new contract the AI doesn't), and export it to the CFO. Ninety minutes instead of a full day.

At 4 PM, Driver 38 doesn't call me panicking in Wyoming. FuelCommand saw his fuel level dropping and calculated his range 45 minutes ago. It sent an automatic alert to his tablet: "Low fuel warning. Next recommended stop: TA Travel Center, Rawlins, WY - 43 miles. You will arrive with 18% fuel remaining at current consumption rate. Maintain 60 mph."

He taps "Navigate" and it routes him there. If he'd been in real danger of running out, the system would have escalated to me AND dispatch simultaneously with suggested intervention options.

The system also flagged the route issue automatically: "Route WY-87 North has insufficient fuel coverage for standard truck range. Recommend route optimization or fuel capacity requirements." It's already drafting a route modification proposal for me to review.

Before I leave at 5 PM (not 6, because I'm not drowning in manual data entry), I open the executive dashboard. FuelCommand has already prepared everything for Monday's meeting:

Current cost per mile: $1.23
Budget variance: -2.3% (color-coded green)
YoY efficiency improvement: 4.7%
Driver performance rankings (anonymized, but identifying top performers and those needing coaching)
Top 5 cost-saving opportunities identified by AI analysis
Projected savings if all recommendations implemented: $127,000 annually

But here's the beautiful part: FuelCommand doesn't just report the past. It's prescriptive. It tells me:
"Next week's forecast: 15 loads running through California. Current CA diesel prices are 8% above national average. Recommend: (1) Refuel maximum capacity before entering CA on all westbound loads. (2) Consider route modifications for 3 loads that could avoid CA entirely with <50 mile detour. (3) Estimated savings: $1,840."
I click "Approve All" and the recommendations get pushed to the affected drivers' route plans automatically.

The software also learns from every decision. When I override a recommendation (maybe I know a particular truck stop always has long lines, even if the price is good), it notes my feedback and adjusts future suggestions. When drivers report issues ("This station's pumps were broken"), it updates its database in real-time for all drivers.

There's even a mobile app where drivers can see their personal fuel efficiency scores, compete on leaderboards, and earn recognition for smart fueling decisions. Gamification has cut my "driver education" workload by 60% because they're training each other.

What FuelCommand actually does:

Automated transaction monitoring with real-time price comparison and exception alerts
Predictive maintenance integration that correlates fuel efficiency with vehicle health
Dynamic route optimization with multi-variable fuel stop planning (price, location, timing, traffic, load weight, weather)
Real-time driver guidance via mobile app with automated coaching
Proactive alerting for low fuel, extended idling, off-route fueling
Vendor analysis modeling that simulates proposals against actual data
Predictive budgeting with external data integration (weather, fuel markets, economic indicators)
Customer cost tracking for detention time and idle-related expenses
Prescriptive recommendations not just reporting, but telling me what to DO
Machine learning that improves with every decision and every mile

I'm no longer a data archaeologist digging through spreadsheets. I'm a strategic operator making high-value decisions based on intelligence the software provides. The software handles the 1,000 micro-optimizations. I handle the 10 strategic moves that actually transform the business.

My job went from "hunt for pennies in transaction logs" to "deploy AI-identified savings opportunities and negotiate better deals with the leverage of perfect information."

And I leave at 5 PM, because the software works 24/7 and I don't have to.`

const V1_SCAFFOLD_USER_PROMPT =
  "can you write a prompt for cursor to build an app that looks like this? its just for prototyping purposes. no need for a back end. a shadcn project is already setup so it just needs to pull in shadcn components"

const V1_SCAFFOLD_ASSISTANT_REPLY = `You are building a FuelCommand prototype - a fleet fuel management dashboard for trucking companies. This is a frontend-only prototype using React, TypeScript, and shadcn/ui components. Use mock data throughout.

PROJECT STRUCTURE:
Create the following main views/pages:
1. Dashboard (Home) - Main overview with key metrics
2. Live Fleet Map - Real-time truck locations and fuel status
3. Fuel Transactions - Recent transactions with alerts
4. Driver Performance - Rankings and efficiency scores
5. Route Optimizer - Tool for planning optimal fuel stops
6. Budget & Forecasting - Predictive analytics view
7. Alerts & Recommendations - AI-generated action items

DESIGN REQUIREMENTS:
- Dark mode professional dashboard aesthetic
- Use Tailwind for styling, shadcn/ui for all components
- Mobile responsive but optimized for desktop (this is a workstation tool)
- Color coding: Green for good/savings, Red for overspend/alerts, Yellow for warnings
- Professional trucking/logistics color palette

DASHBOARD VIEW:
Top row KPI cards (use Card component):
- Current Cost Per Mile: $1.23 (with trend indicator ↓ 2.3%)
- Monthly Fuel Spend: $387,450 (vs budget: -2.3%)
- Fleet Average MPG: 6.8 (YoY improvement: +4.7%)
- Active Alerts: 7 (clickable, goes to alerts page)

Main content area (grid layout):
- Recent Fuel Transactions table (last 10, with alert badges for overspend)
- Top 5 Cost-Saving Opportunities (list with estimated savings amounts)
- Weekly Fuel Price Trends (line chart - use recharts)
- Driver Efficiency Leaderboard (top 5 drivers with scores)

LIVE FLEET MAP VIEW:
- Full-width map placeholder (just a div with bg-gray-800 for now, add text "Map Integration Point")
- Sidebar with list of trucks (use ScrollArea)
- Each truck card shows: Truck ID, Driver name, Current fuel level (progress bar), Next recommended stop, Status badge (On Route, Refueling, Idle, Low Fuel)
- Filter controls: All Trucks, Low Fuel Only, Idling, Off-Route

FUEL TRANSACTIONS VIEW:
Data table (use Table component) with columns:
- Date/Time
- Driver Name
- Truck ID
- Location
- Station Brand
- Gallons
- Price/Gallon
- Total Cost
- Variance (vs optimal price, color coded)
- Alert Badge (if overspent)

Filters above table:
- Date range picker
- Driver dropdown
- Station brand dropdown
- Show only alerts toggle

DRIVER PERFORMANCE VIEW:
- Leaderboard table with columns: Rank, Driver Name, Truck ID, Avg MPG, Fuel Cost/Mile, Idle Time, Efficiency Score (0-100)
- Sortable columns
- Color-coded efficiency scores (>90 green, 70-90 yellow, <70 red)
- Individual driver detail modal (click on row) showing:
  - Monthly trend chart
  - Recent trips
  - Coaching recommendations
  - Badge achievements

ROUTE OPTIMIZER VIEW:
Form interface (use Form components):
- Origin (Input)
- Destination (Input)
- Truck Selection (Select dropdown)
- Load Weight (Input with unit)
- Calculate Route (Button)

Results panel (shown after calculate):
- Recommended fuel stops (3-4 cards) showing:
  - Station name/brand
  - Location
  - Estimated price/gallon
  - Refuel amount (gallons)
  - Distance from previous stop
  - Estimated arrival time with fuel %
- Total trip cost estimate
- Savings vs alternative routes

BUDGET & FORECASTING VIEW:
- Time period selector (tabs: This Month, Quarter, Year)
- Budget vs Actual chart (use recharts bar chart)
- Forecast model card showing:
  - Predicted next month spend
  - Confidence interval
  - Key factors affecting forecast (list)
- Historical trends line chart
- Scenario analysis tool (simple form to adjust variables like fuel price, mileage, efficiency)

ALERTS & RECOMMENDATIONS VIEW:
List of actionable items (use Alert component):
Each alert card contains:
- Priority badge (High, Medium, Low)
- Alert type icon
- Description
- Estimated savings/cost
- Action buttons (Approve, Dismiss, View Details)

Example alerts:
- "Driver 31 consistently refueling at non-preferred stations. Potential monthly savings: $340"
- "Truck 17 MPG decreased 12% - maintenance required"
- "15 loads next week through California - optimize pre-CA refueling. Savings: $1,840"
- "Vendor B proposal review - potential annual savings: $41,200"

NAVIGATION:
- Sidebar navigation (use Sheet or permanent sidebar)
- Logo/brand at top
- Nav items with icons for each view
- User profile section at bottom

MOCK DATA:
Generate realistic mock data:
- 40-50 trucks with IDs (T001-T050)
- Driver names
- Fuel transactions from past 30 days
- Coordinates for US interstate routes
- Fuel prices ranging $3.20-$4.50/gallon
- Station brands: TA/Petro, Pilot Flying J, Loves, Shell, etc.

COMPONENTS TO USE:
- Card, CardHeader, CardTitle, CardContent
- Table, TableHeader, TableBody, TableRow, TableCell
- Button, Badge, Alert, AlertTitle, AlertDescription
- Select, Input, Label, Form
- Tabs, TabsList, TabsTrigger, TabsContent
- ScrollArea, Separator
- Progress (for fuel level bars)
- Dialog (for modals)
- Charts from recharts (LineChart, BarChart, AreaChart)

Start with the Dashboard view and navigation structure. Make it look professional and data-rich like a real fleet management system would. Use realistic numbers and mock data that tells a coherent story.`

export function ScoutCaseStudyMedia({ kind }: { kind: ScoutCaseStudyMediaKind }) {
  switch (kind) {
    case "scoutClaudeResearch":
      return <ScoutClaudeChatMockup activationIndex={0} />
    case "scoutClaudeVision":
      return (
        <ScoutClaudeChatMockup
          theme="light"
          activationIndex={1}
          userMessage={NARRATIVE_VISION_PROMPT}
          assistantMessage={NARRATIVE_VISION_RESPONSE}
          awaitingSendHint="Click Send for a design vision in narrative form"
          headerTitle="Design vision"
          headerMeta="Narrative"
          ariaLabel="Simulated chat in light mode for narrative vision: a software design prompt types into the composer, then waits for Send."
        />
      )
    case "scoutClaudeScaffold":
      return (
        <ScoutClaudeChatMockup
          activationIndex={3}
          userMessage={V1_SCAFFOLD_USER_PROMPT}
          assistantMessage={V1_SCAFFOLD_ASSISTANT_REPLY}
          awaitingSendHint="Click Send for a Cursor-ready V1 scaffold prompt"
          headerTitle="Ideate"
          headerMeta="V1"
          ariaLabel="Simulated chat: user asks for a prompt to build a runnable V1 from the design vision narrative; assistant replies with a Cursor-ready scaffold prompt."
        />
      )
    case "scoutRefinement":
      return <ScoutRefinementMotion />
    default:
      return null
  }
}
