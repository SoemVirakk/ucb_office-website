import { useState } from "react"

interface FaqItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            style={{
              border: `1px solid ${isOpen ? "#009C9F" : "#E5E7EB"}`,
              borderRadius: 10,
              overflow: "hidden",
              transition: "border-color 200ms",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                background: isOpen ? "#E6F7F7" : "#fff",
                border: "none",
                padding: "1rem 1.25rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 200ms",
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#0A2540",
                  lineHeight: 1.4,
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: isOpen ? "#009C9F" : "#F4F6F8",
                  color: isOpen ? "#fff" : "#6B7280",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 300,
                  transition: "all 200ms",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div
                id={`faq-answer-${i}`}
                style={{
                  padding: "0 1.25rem 1.25rem",
                  borderTop: "1px solid #E6F7F7",
                }}
              >
                <p
                  style={{
                    margin: "1rem 0 0",
                    fontSize: 14,
                    color: "#374151",
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
