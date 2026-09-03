import { useEffect, useRef, useState, type KeyboardEvent } from "react"

import type { LocaleCode } from "../../types/localization"

type DropdownLink = {
  label: string

  labelKm?: string

  labelZh?: string

  page: string

  path: string
}

interface HeaderDropdownProps {
  label: string

  labelKm?: string

  links: DropdownLink[]

  active: boolean

  activePath?: string

  lang: LocaleCode

  onNavigate: (link: DropdownLink) => void
}

export default function HeaderDropdown({
  label,
  labelKm,
  labelZh,
  links,
  active,
  activePath,
  lang,
  onNavigate,
}: HeaderDropdownProps) {
  const [open, setOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)

      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()

      setOpen((value) => !value)
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()

      setOpen(true)
    }
  }

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button
        className="btn-ghost"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          fontSize: 14,

          fontWeight: active ? 600 : 500,

          color: active ? "#009C9F" : "#0A2540",

          padding: "0.5rem 0.75rem",

          width: 112,

          justifyContent: "center",

          gap: 4,
        }}
      >
        {lang === "km"
          ? (labelKm ?? label)
          : lang === "zh-CN"
            ? (labelZh ?? label)
            : label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 150ms",
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            zIndex: 60,

            background: "#fff",
            borderRadius: 14,
            border: "1px solid #E5E7EB",

            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            padding: "0.5rem",
            minWidth: 220,
          }}
        >
          {links.map((link) => (
            <button
              key={link.path}
              role="menuitem"
              onClick={() => {
                onNavigate(link)
                setOpen(false)
              }}
              style={{
                display: "block",
                width: "100%",
                padding: "0.7rem 0.875rem",
                border: "none",

                borderRadius: 8,
                cursor: "pointer",
                textAlign: "left",

                background:
                  activePath === link.path ? "#E6F7F7" : "transparent",

                color: activePath === link.path ? "#009C9F" : "#0A2540",

                fontSize: 14,
                fontWeight: 600,
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#F4F6F8"
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "transparent"
              }}
            >
              {lang === "km"
                ? (link.labelKm ?? link.label)
                : lang === "zh-CN"
                  ? (link.labelZh ?? link.label)
                  : link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
