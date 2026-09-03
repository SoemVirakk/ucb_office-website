interface CareerBenefit {
  icon: string

  title: string

  desc: string
}

interface CareerBenefitsProps {
  items: CareerBenefit[]
}

export default function CareerBenefits({ items }: CareerBenefitsProps) {
  return (
    <div
      className="grid-4"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.5rem",
      }}
    >
      {items.map((item) => (
        <div
          key={item.title}
          style={{
            padding: "2rem 1.5rem",
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E5E7EB",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: "1rem" }}>{item.icon}</div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#0A2540",
              marginBottom: 8,
            }}
          >
            {item.title}
          </h3>
          <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  )
}
