import { useState } from "react"
import BranchCard from "../components/cards/BranchCard"
import { branches, provinces } from "../data/branches"
import type { Branch } from "../data/branches"

type TypeFilter = "all" | "branch" | "atm" | "24h-atm" | "cdm"

export default function BranchesPage() {
  const [search, setSearch] = useState("")
  const [province, setProvince] = useState("all")
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all")
  const [selected, setSelected] = useState<Branch | null>(null)

  const filtered = branches.filter((b) => {
    const matchSearch =
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase())
    const matchProv = province === "all" || b.province === province
    const matchType = typeFilter === "all" || b.type === typeFilter
    return matchSearch && matchProv && matchType
  })

  const typeButtons: { id: TypeFilter label: string }[] = [
    { id: "all", label: "All" },
    { id: "branch", label: "🏦 Branch" },
    { id: "atm", label: "💳 ATM" },
    { id: "24h-atm", label: "🌙 24-hr ATM" },
    { id: "cdm", label: "💵 Cash Deposit" },
  ]

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            Branches & ATMs
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.7)",
              marginBottom: "2rem",
            }}
          >
            Find UCB branches, ATMs, and cash deposit machines across Cambodia.
          </p>
          {/* Search + filter row */}
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <input
              type="search"
              placeholder="Search by name or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: "1 1 260px",
                padding: "0.75rem 1.25rem",
                borderRadius: 10,
                border: "none",
                fontSize: 14,
                outline: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              aria-label="Search branches and ATMs"
            />
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: 10,
                border: "none",
                fontSize: 14,
                background: "#fff",
                cursor: "pointer",
                outline: "none",
                minWidth: 180,
              }}
              aria-label="Filter by province"
            >
              <option value="all">All Provinces</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Type filter */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "0.875rem 0",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}
        >
          {typeButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setTypeFilter(btn.id)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: 20,
                border: `2px solid ${
                  typeFilter === btn.id ? "#009C9F" : "#E5E7EB"
                }`,
                background: typeFilter === btn.id ? "#009C9F" : "#fff",
                color: typeFilter === btn.id ? "#fff" : "#374151",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 150ms",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        <div
          className={selected ? "sidebar-layout" : ""}
          style={{
            display: "grid",
            gridTemplateColumns: selected ? "1fr 380px" : "1fr",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          <div>
            {/* Map placeholder */}
            <div
              style={{
                height: 340,
                background: "linear-gradient(135deg, #E6F7F7, #F4F6F8)",
                borderRadius: 16,
                border: "2px solid #D1D5DB",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontSize: 56 }}>🗺️</span>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#0A2540",
                    marginBottom: 4,
                  }}
                >
                  Interactive Map
                </div>
                <div style={{ fontSize: 13, color: "#6B7280" }}>
                  Showing {filtered.length} location
                  {filtered.length !== 1 ? "s" : ""}
                </div>
              </div>
              {/* Map pin dots */}
              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                {filtered.slice(0, 5).map((b) => (
                  <div
                    key={b.id}
                    title={b.name}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background:
                        b.type === "branch"
                          ? "#009C9F"
                          : b.type.includes("atm")
                            ? "#1D4ED8"
                            : "#C9A84C",
                      cursor: "pointer",
                    }}
                  />
                ))}
                {filtered.length > 5 && (
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                    +{filtered.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* List */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0A2540" }}>
                {filtered.length} Location{filtered.length !== 1 ? "s" : ""}{" "}
                Found
              </h2>
            </div>
            <div
              className="grid-2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.875rem",
              }}
            >
              {filtered.map((b) => (
                <BranchCard
                  key={b.id}
                  branch={b}
                  selected={selected?.id === b.id}
                  onClick={() => setSelected(selected?.id === b.id ? null : b)}
                />
              ))}
              {filtered.length === 0 && (
                <div
                  style={{
                    gridColumn: "1/-1",
                    textAlign: "center",
                    padding: "3rem",
                    color: "#9CA3AF",
                    fontSize: 15,
                  }}
                >
                  No locations found. Try adjusting your filters.
                </div>
              )}
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={{ position: "sticky", top: 88 }}>
              <div className="card" style={{ padding: "1.75rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#009C9F",
                        letterSpacing: 0.5,
                        marginBottom: 6,
                      }}
                    >
                      {selected.province.toUpperCase()}
                    </div>
                    <h2
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#0A2540",
                        lineHeight: 1.3,
                      }}
                    >
                      {selected.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close detail"
                    style={{
                      background: "#F4F6F8",
                      border: "none",
                      borderRadius: 8,
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      color: "#6B7280",
                      fontSize: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ×
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {[
                    { icon: "📍", label: "Address", value: selected.address },
                    {
                      icon: "🕐",
                      label: "Opening Hours",
                      value: selected.hours,
                    },
                    { icon: "📞", label: "Phone", value: selected.phone },
                  ].map((item) => (
                    <div key={item.label}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#9CA3AF",
                          letterSpacing: 0.4,
                          marginBottom: 4,
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ fontSize: 15, flexShrink: 0 }}>
                          {item.icon}
                        </span>
                        <span
                          style={{
                            fontSize: 14,
                            color: "#374151",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#9CA3AF",
                      letterSpacing: 0.4,
                      marginBottom: "0.625rem",
                    }}
                  >
                    SERVICES
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selected.services.map((s) => (
                      <span
                        key={s}
                        style={{
                          background: "#F4F6F8",
                          borderRadius: 6,
                          padding: "4px 10px",
                          fontSize: 12,
                          color: "#374151",
                          fontWeight: 500,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps?q=${selected.lat},${selected.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  Get Directions →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
