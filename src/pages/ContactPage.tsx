import { useState, type CSSProperties, type FormEvent } from "react"
import Alert from "../components/ui/Alert"
import FaqAccordion from "../components/ui/FaqAccordion"
import { faqCategories } from "../data/faqs"
import type { Page } from "../types/navigation"

interface ContactPageProps {
  navigate: (p: Page) => void
}

interface FormState {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  subject?: string
  message?: string
}

const subjects = [
  "General Inquiry",
  "Account Opening",
  "Loan Application",
  "Digital Banking Support",
  "Card Issue",
  "Fraud or Security",
  "Complaint",
  "Other",
]

/** Renders contact channels, inquiry form, and support FAQs. */
export default function ContactPage({ navigate }: ContactPageProps) {
  const contactParams = new URLSearchParams(window.location.search)
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    subject: contactParams.get("subject") ?? "",
    message: contactParams.get("message") ?? "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [activeFaqCat, setActiveFaqCat] = useState("general")

  /** Validates the current form state before allowing submission. */
  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = "Full name is required."
    if (!form.phone.trim()) newErrors.phone = "Phone number is required."
    if (!form.email.trim()) newErrors.email = "Email address is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email address."
    if (!form.subject) newErrors.subject = "Please select a subject."
    if (!form.message.trim()) newErrors.message = "Message is required."
    else if (form.message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /** Handles the current online-service form submission. */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1.5px solid #D1D5DB",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    transition: "border-color 150ms",
    fontFamily: "inherit",
  }

  const activeFaqItems =
    faqCategories.find((c) => c.id === activeFaqCat)?.items ?? []

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "4rem 0 3rem",
        }}
      >
        {/* <div className="container">
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            Help & Support
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>
            We are here to help. Reach us by phone, email, or in-person at any
            UCB branch.
          </p>
        </div> */}
      </section>

      {/* Emergency alert */}
      <div className="container" style={{ padding: "1.5rem 1.5rem 0" }}>
        <Alert
          type="warning"
          title="Emergency Card Blocking"
          message="If your card is lost or stolen, call our 24-hour fraud hotline immediately: +855 23 999 911. You can also freeze your card instantly via UCB Mobile App."
        />
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        <div
          className="sidebar-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Contact form */}
          <div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#0A2540",
                marginBottom: "0.5rem",
              }}
            >
              Send Us a Message
            </h2>
            <p style={{ fontSize: 14, color: "#6B7280", marginBottom: "2rem" }}>
              We aim to respond within 1 business day.
            </p>

            {submitted ? (
              <div
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  background: "#F0FDF4",
                  borderRadius: 16,
                  border: "1px solid #BBF7D0",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: "1rem" }}>✅</div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#166534",
                    marginBottom: "0.75rem",
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ fontSize: 15, color: "#374151" }}>
                  Thank you, {form.name}. Our team will reach you at{" "}
                  {form.email} or {form.phone} within 1 business day.
                </p>
                <button
                  className="btn-primary"
                  style={{ marginTop: "1.5rem" }}
                  onClick={() => {
                    setSubmitted(false)
                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      subject: "",
                      message: "",
                    })
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} noValidate>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: 6,
                      }}
                    >
                      Full Name <span style={{ color: "#DC2626" }}>*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Sopheak Keo"
                      style={{
                        ...inputStyle,
                        borderColor: errors.name ? "#DC2626" : "#D1D5DB",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.name
                          ? "#DC2626"
                          : "#D1D5DB")
                      }
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <div
                        id="name-error"
                        style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                      >
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: 6,
                      }}
                    >
                      Phone Number <span style={{ color: "#DC2626" }}>*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="+855 12 345 678"
                      style={{
                        ...inputStyle,
                        borderColor: errors.phone ? "#DC2626" : "#D1D5DB",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.phone
                          ? "#DC2626"
                          : "#D1D5DB")
                      }
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                    {errors.phone && (
                      <div
                        id="phone-error"
                        style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                      >
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Email Address <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    style={{
                      ...inputStyle,
                      borderColor: errors.email ? "#DC2626" : "#D1D5DB",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.email
                        ? "#DC2626"
                        : "#D1D5DB")
                    }
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <div
                      id="email-error"
                      style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                    >
                      {errors.email}
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    htmlFor="subject"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Subject <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subject: e.target.value }))
                    }
                    style={{
                      ...inputStyle,
                      borderColor: errors.subject ? "#DC2626" : "#D1D5DB",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                  >
                    <option value="">Select a subject...</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <div
                      id="subject-error"
                      style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                    >
                      {errors.subject}
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Message <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    rows={5}
                    placeholder="Please describe your inquiry in detail..."
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      borderColor: errors.message ? "#DC2626" : "#D1D5DB",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.message
                        ? "#DC2626"
                        : "#D1D5DB")
                    }
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <div
                      id="message-error"
                      style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                    >
                      {errors.message}
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>
                    {form.message.length} characters
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "0.875rem",
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info sidebar */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              {
                icon: "📞",
                title: "Call Center",
                content: "+855 23 999 001",
                sub: "Mon–Sat, 8:00 AM–6:00 PM",
                href: "tel:+85523999001",
              },
              {
                icon: "🚨",
                title: "Fraud Hotline (24/7)",
                content: "+855 23 999 911",
                sub: "For lost/stolen cards and fraud",
                href: "tel:+85523999911",
                urgent: true,
              },
              {
                icon: "✉️",
                title: "Email",
                content: "info@ucb.com.kh",
                sub: "Response within 1 business day",
                href: "mailto:info@ucb.com.kh",
              },
              {
                icon: "💬",
                title: "Live Chat",
                content: "UCB Mobile App",
                sub: "Chat with us in the app",
                href: undefined,
              },
            ].map((c) => (
              <div
                key={c.title}
                className="card"
                style={{
                  padding: "1.25rem",
                  border: c.urgent ? "2px solid #FDE68A" : "1px solid #E5E7EB",
                  background: c.urgent ? "#FFFBEB" : "#fff",
                }}
              >
                <div style={{ display: "flex", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: c.urgent ? "#FDE68A" : "#E6F7F7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#9CA3AF",
                        marginBottom: 4,
                      }}
                    >
                      {c.title}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        style={{
                          fontWeight: 700,
                          fontSize: 15,
                          color: c.urgent ? "#92400E" : "#009C9F",
                          textDecoration: "none",
                        }}
                      >
                        {c.content}
                      </a>
                    ) : (
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#0A2540",
                        }}
                      >
                        {c.content}
                      </div>
                    )}
                    <div
                      style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}
                    >
                      {c.sub}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="card" style={{ padding: "1.25rem" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "0.75rem",
                }}
              >
                🏦 Visit Us In Person
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#6B7280",
                  marginBottom: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                Find your nearest UCB branch for in-person banking, account
                opening, loan consultation, and more.
              </p>
              <button
                className="btn-outline"
                onClick={() => navigate("branches")}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                Find a Branch →
              </button>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div style={{ marginTop: "4rem" }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#0A2540",
              marginBottom: "0.5rem",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: "2rem" }}>
            Find quick answers to common questions.
          </p>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFaqCat(cat.id)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: 20,
                  border: `2px solid ${
                    activeFaqCat === cat.id ? "#009C9F" : "#E5E7EB"
                  }`,
                  background: activeFaqCat === cat.id ? "#009C9F" : "#fff",
                  color: activeFaqCat === cat.id ? "#fff" : "#374151",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 150ms",
                }}
              >
                {cat.title}
              </button>
            ))}
          </div>
          <FaqAccordion items={activeFaqItems} />
        </div>
      </div>
    </div>
  )
}
