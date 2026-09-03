import { Component, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  title: string
  message: string
  retryLabel: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main role="alert" aria-live="assertive" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 480 }}>
          <div style={{ fontSize: 48, marginBottom: "1rem" }}>⚠️</div>
          <h1 style={{ color: "#0A2540", fontSize: 26, marginBottom: "0.75rem" }}>{this.props.title}</h1>
          <p style={{ color: "#6B7280", lineHeight: 1.7, marginBottom: "1.5rem" }}>{this.props.message}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>{this.props.retryLabel}</button>
        </div>
      </main>
    )
  }
}