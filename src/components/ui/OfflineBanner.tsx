interface OfflineBannerProps {
  message: string
}

export default function OfflineBanner({ message }: OfflineBannerProps) {
  return (
    <div role="status" aria-live="polite" style={{ background: "#FEF3C7", borderBottom: "1px solid #FDE68A", color: "#92400E", padding: "0.625rem 1rem", textAlign: "center", fontSize: 13, fontWeight: 600 }}>
      {message}
    </div>
  )
}