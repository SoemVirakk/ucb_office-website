import { useState } from "react"

interface AlertProps {
  type?: "info" | "success" | "warning" | "error"
  title?: string
  message: string
  dismissible?: boolean
}

const typeStyles = {
  info: { bg: "#EFF6FF", border: "#BFDBFE", icon: "ℹ️", titleColor: "#1E40AF" },
  success: {
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: "✅",
    titleColor: "#166534",
  },
  warning: {
    bg: "#FDF6E3",
    border: "#FDE68A",
    icon: "⚠️",
    titleColor: "#92400E",
  },
  error: {
    bg: "#FEF2F2",
    border: "#FECACA",
    icon: "🚫",
    titleColor: "#991B1B",
  },
}

/** Renders an alert message with optional dismissal. */
export default function Alert({
  type = "info",
  title,
  message,
  dismissible = false,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  const s = typeStyles[type]

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 10,
        padding: "1rem 1.25rem",
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>
        {s.icon}
      </span>
      <div style={{ flex: 1 }}>
        {title && (
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: s.titleColor,
              marginBottom: 4,
            }}
          >
            {title}
          </div>
        )}
        <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
          {message}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9CA3AF",
            padding: 2,
            fontSize: 16,
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
