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

  labelZh?: string

  links: DropdownLink[]

  active: boolean

  activePath?: string

  lang: LocaleCode

  onNavigate: (link: DropdownLink) => void

  onOpen?: () => void
}

/** Renders an accessible desktop header dropdown menu. */
export default function HeaderDropdown({
  label,
  labelKm,
  labelZh,
  links,
  active,
  activePath,
  lang,
  onNavigate,
  onOpen,
}: HeaderDropdownProps) {
  const [open, setOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /** Closes the dropdown when the pointer moves outside it. */
    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setOpen(false)
    }

    /** Closes the dropdown when Escape is pressed. */
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

  /** Adds keyboard controls for opening and moving through the dropdown. */
  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()

      setOpen((value) => {
        if (!value) onOpen?.()
        return !value
      })
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()

      onOpen?.()
      setOpen(true)
    }
  }

  return (
    <div ref={dropdownRef} className="header-dropdown">
      <button
        className="btn-ghost"
        onClick={() =>
          setOpen((value) => {
            if (!value) onOpen?.()
            return !value
          })
        }
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="true"
        aria-expanded={open}
        className={`btn-ghost header-dropdown__trigger${active ? " is-active" : ""}`}
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
          className={`header-dropdown__chevron${open ? " is-open" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="header-dropdown__menu"
        >
          {links.map((link) => (
            <button
              key={link.path}
              role="menuitem"
              onClick={() => {
                onNavigate(link)
                setOpen(false)
              }}
              className={`header-dropdown__item${activePath === link.path ? " is-active" : ""}`}
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
