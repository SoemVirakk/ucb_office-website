import type { CSSProperties } from "react"

interface PaginationProps {
  total: number
  perPage: number
  current: number
  onChange: (n: number) => void
}

export default function Pagination({
  total,
  perPage,
  current,
  onChange,
}: PaginationProps) {
  const pages = Math.ceil(total / perPage)
  if (pages <= 1) return null

  const getPages = () => {
    const arr: (number | "...")[] = []
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= current - 1 && i <= current + 1)) {
        arr.push(i)
      } else if (arr[arr.length - 1] !== "...") {
        arr.push("...")
      }
    }
    return arr
  }

  const btnBase: CSSProperties = {
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    fontSize: 14,
    transition: "background 150ms",
  }

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        style={{
          ...btnBase,
          background: "#F4F6F8",
          color: current === 1 ? "#D1D5DB" : "#0A2540",
          cursor: current === 1 ? "not-allowed" : "pointer",
        }}
        aria-label="Previous page"
      >
        ‹
      </button>
      {getPages().map((p, i) =>
        p === "..." ? (
          <span
            key={i}
            style={{
              ...btnBase,
              cursor: "default",
              color: "#9CA3AF",
              background: "none",
            }}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            aria-current={p === current ? "page" : undefined}
            style={{
              ...btnBase,
              background: p === current ? "#009C9F" : "#F4F6F8",
              color: p === current ? "#fff" : "#0A2540",
            }}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === pages}
        style={{
          ...btnBase,
          background: "#F4F6F8",
          color: current === pages ? "#D1D5DB" : "#0A2540",
          cursor: current === pages ? "not-allowed" : "pointer",
        }}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}
