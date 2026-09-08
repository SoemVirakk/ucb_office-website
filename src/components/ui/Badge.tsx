interface BadgeProps {
  label: string
  variant?: "teal" | "gold" | "red" | "blue" | "gray" | "navy"
}

const variantStyles: Record<string, { bg: string color: string }> = {
  teal: { bg: "#E6F7F7", color: "#007B7E" },
  gold: { bg: "#FDF6E3", color: "#92681E" },
  red: { bg: "#FEF2F2", color: "#991B1B" },
  blue: { bg: "#EFF6FF", color: "#1D4ED8" },
  gray: { bg: "#F4F6F8", color: "#6B7280" },
  navy: { bg: "#EDF2FB", color: "#1A3D5C" },
}

/** Renders a small semantic badge. */
export default function Badge({ label, variant = "teal" }: BadgeProps) {
  const s = variantStyles[variant] ?? variantStyles.teal
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: s.bg,
        color: s.color,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 11,
        padding: "3px 8px",
        letterSpacing: 0.3,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  )
}
