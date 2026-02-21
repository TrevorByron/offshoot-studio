"use client"

import { Layers } from "lucide-react"

export function HomemadeMVPPreview() {
  return (
    <div
      className="mt-4 rounded-lg border border-border bg-card shadow-sm h-[270px] flex flex-col overflow-hidden"
    >
      <div className="flex items-center gap-3 p-3 border-b border-border">
        <div className="size-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
          <Layers className="size-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-sm text-card-foreground truncate">
            Prototype
          </span>
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          {["Login", "Dashboard", "Settings", "Profile"].map((label, i) => (
            <div
              key={i}
              className="bg-muted/80 rounded border border-dashed border-border p-3 flex items-center justify-center"
            >
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-muted/50 rounded border border-dashed border-border flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Wireframe</span>
        </div>
      </div>
    </div>
  )
}
