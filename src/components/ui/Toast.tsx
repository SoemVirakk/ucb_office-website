import {
  useState,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"

export interface ToastMessage {
  id: string
  type: "success" | "error" | "warning" | "info"
  message: string
  title?: string
  duration?: number
}

interface ToastContextType {
  showToast: (msg: Omit<ToastMessage, "id">) => void
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

const icons = { success: "✅", error: "🚫", warning: "⚠️", info: "ℹ️" }
const colors = {
  success: { bg: "#F0FDF4", border: "#BBF7D0", title: "#166534" },
  error: { bg: "#FEF2F2", border: "#FECACA", title: "#991B1B" },
  warning: { bg: "#FDF6E3", border: "#FDE68A", title: "#92400E" },
  info: { bg: "#EFF6FF", border: "#BFDBFE", title: "#1E40AF" },
}

function ToastItem({
  toast,
  onClose,
}: {
  toast: ToastMessage
  onClose: () => void
}) {
  const s = colors[toast.type]
  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 12,
        padding: "0.875rem 1rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        minWidth: 300,
        maxWidth: 400,
        animation: "slideIn 200ms ease",
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0 }}>{icons[toast.type]}</span>
      <div style={{ flex: 1 }}>
        {toast.title && (
          <div
            style={{
              fontWeight: 700,
              fontSize: 13,
              color: s.title,
              marginBottom: 2,
            }}
          >
            {toast.title}
          </div>
        )}
        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
          {toast.message}
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#9CA3AF",
          fontSize: 18,
          padding: 0,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ×
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((msg: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).slice(2)
    const duration = msg.duration ?? 4000
    setToasts((t) => [...t, { ...msg, id }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration)
  }, [])

  const remove = (id: string) => setToasts((t) => t.filter((x) => x.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 300,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
          ))}
        </div>,
        document.body,
      )}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  )
}
