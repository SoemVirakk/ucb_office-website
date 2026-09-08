/* Loading, Empty, and Error state components */

/** Renders a full-page loading state. */
export function PageLoader({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingState message={message} />
    </div>
  )
}

/** Renders a compact section loading state. */
export function SectionLoader({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite">
      <LoadingState message={message} />
    </div>
  )
}

/** Renders spinner text for loading buttons. */
export function ButtonLoadingState({ label }: { label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span aria-hidden="true" className="button-spinner" />
      {label}
    </span>
  )
}

/** Renders a generic card skeleton placeholder. */
export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card-skeleton skeleton" aria-hidden="true">
      <div className="card-skeleton-icon" />
      <div className="card-skeleton-line card-skeleton-line-wide" />
      {Array.from({ length: lines }, (_, index) => (
        <div key={index} className="card-skeleton-line" />
      ))}
    </div>
  )
}

/** Renders a generic table skeleton placeholder. */
export function TableSkeleton({
  rows = 5,
  columns = 4,
}: {
  rows?: number
  columns?: number
}) {
  return (
    <div
      className="table-skeleton skeleton"
      role="status"
      aria-label="Loading table"
    >
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} className="table-skeleton-row">
          {Array.from({ length: columns }, (_, column) => (
            <span key={column} />
          ))}
        </div>
      ))}
    </div>
  )
}

/** Renders a configurable loading state. */
export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: "3px solid #E5E7EB",
          borderTopColor: "#009C9F",
          borderRadius: "50%",
          animation: "spin 700ms linear infinite",
        }}
      />
      <p style={{ fontSize: 14, color: "#6B7280", fontWeight: 500 }}>
        {message}
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/** Renders an empty-result state with optional action. */
export function EmptyState({
  icon = "📭",
  title = "Nothing here yet",
  description,
  action,
}: {
  icon?: string
  title?: string
  description?: string
  action?: { label: string onClick: () => void }
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 24,
          background: "#F4F6F8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
        }}
      >
        {icon}
      </div>
      <div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#0A2540",
            marginBottom: 8,
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontSize: 14,
              color: "#6B7280",
              maxWidth: 360,
              lineHeight: 1.7,
            }}
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <button
          className="btn-primary"
          onClick={action.onClick}
          style={{ marginTop: "0.5rem" }}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

/** Renders an error state with optional retry action. */
export function ErrorState({
  title = "Something went wrong",
  description = "We encountered an error loading this content. Please try again.",
  onRetry,
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 24,
          background: "#FEF2F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
        }}
      >
        ⚠️
      </div>
      <div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#991B1B",
            marginBottom: 8,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "#6B7280",
            maxWidth: 360,
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      </div>
      {onRetry && (
        <button
          className="btn-outline"
          onClick={onRetry}
          style={{ marginTop: "0.5rem" }}
        >
          Try Again
        </button>
      )}
    </div>
  )
}

/** Renders a skeleton card with configurable line count. */
export function SkeletonCard() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "1.5rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "#F4F6F8",
            animation: "pulse 1.5s ease infinite",
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: 14,
              background: "#F4F6F8",
              borderRadius: 4,
              marginBottom: 6,
              animation: "pulse 1.5s ease infinite",
            }}
          />
          <div
            style={{
              height: 10,
              background: "#F4F6F8",
              borderRadius: 4,
              width: "60%",
              animation: "pulse 1.5s ease infinite",
            }}
          />
        </div>
      </div>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            height: 10,
            background: "#F4F6F8",
            borderRadius: 4,
            marginBottom: 8,
            width: i === 3 ? "70%" : "100%",
            animation: "pulse 1.5s ease infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
