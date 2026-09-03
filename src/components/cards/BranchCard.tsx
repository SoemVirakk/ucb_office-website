import Badge from "../ui/Badge"
import type { Branch } from "../../data/branches"

interface BranchCardProps {
  branch: Branch
  selected?: boolean
  onClick?: () => void
}

const typeConfig: Record<string, {
  label: string
  variant: "teal" | "blue" | "gold" | "gray"
}> = {
  branch: { label: "Branch", variant: "teal" },
  atm: { label: "ATM", variant: "blue" },
  cdm: { label: "Cash Deposit", variant: "gold" },
  "24h-atm": { label: "24-hr ATM", variant: "gray" },
}

export default function BranchCard({
  branch,
  selected,
  onClick,
}: BranchCardProps) {
  const config = typeConfig[branch.type] ?? {
    label: branch.type,
    variant: "gray" as const,
  }

  return (
    <div
      onClick={onClick}
      style={{
        padding: "1.25rem",
        borderRadius: 12,
        border: `2px solid ${selected ? "#009C9F" : "#E5E7EB"}`,
        background: selected ? "#E6F7F7" : "#fff",
        cursor: "pointer",
        transition: "all 150ms",
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      aria-pressed={selected}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <h3
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#0A2540",
            lineHeight: 1.3,
            flex: 1,
            marginRight: 8,
          }}
        >
          {branch.name}
        </h3>
        <Badge label={config.label} variant={config.variant} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>📍</span>
          <span style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>
            {branch.address}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13 }}>🕐</span>
          <span style={{ fontSize: 13, color: "#6B7280" }}>{branch.hours}</span>
        </div>
        {branch.type === "branch" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13 }}>📞</span>
            <span style={{ fontSize: 13, color: "#009C9F", fontWeight: 500 }}>
              {branch.phone}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
