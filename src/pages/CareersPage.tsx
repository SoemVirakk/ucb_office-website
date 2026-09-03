import { useState, type FormEvent } from "react"
import {
  jobs,
  departments,
  locations,
  jobTypes,
  deptLabels,
  type Job,
} from "../data/jobs"
import Badge from "../components/ui/Badge"
import CareerBenefits from "../components/careers/CareerBenefits"
import JobList from "../components/careers/JobList"
import type { Page } from "../types/navigation"


interface CareersPageProps {
  navigate: (p: Page) => void
}

type AppState = "list" | "detail" | "apply" | "success"

interface AppForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  coverLetter: string
  cvFileName: string
  consent: boolean
}

const emptyForm: AppForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  coverLetter: "",
  cvFileName: "",
  consent: false,
}

const whyItems = [
  {
    icon: "📈",
    title: "Professional Growth",
    desc: "Structured career pathways, internal mobility, and leadership development programmes.",
  },
  {
    icon: "🎓",
    title: "Competitive Benefits",
    desc: "Annual training budget, sponsored certifications, and access to global banking knowledge.",
  },
  {
    icon: "🤝",
    title: "Inclusive Culture",
    desc: "A diverse team of 800+ where every voice counts. 48% of leadership roles held by women.",
  },
  {
    icon: "💚",
    title: "Meaningful Work",
    desc: "Private health insurance, flexible hours, hybrid work options, and staff banking benefits.",
  },
]

export default function CareersPage({ navigate }: CareersPageProps) {
  const [view, setView] = useState<AppState>("list")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [dept, setDept] = useState("all")
  const [location, setLocation] = useState("All Locations")
  const [jobType, setJobType] = useState("all")
  const [keyword, setKeyword] = useState("")
  const [form, setForm] = useState<AppForm>(emptyForm)
  const [errors, setErrors] = useState<Partial<AppForm>>({})
  const [talentEmail, setTalentEmail] = useState("")
  const [talentSub, setTalentSub] = useState(false)

  const filtered = jobs.filter((j) => {
    if (dept !== "all" && j.department !== dept) return false
    if (location !== "All Locations" && j.location !== location) return false
    if (jobType !== "all" && j.type !== jobType) return false
    if (
      keyword &&
      !j.title.toLowerCase().includes(keyword.toLowerCase()) &&
      !j.description.toLowerCase().includes(keyword.toLowerCase())
    )
      return false
    return true
  })

  const validate = () => {
    const e: Partial<AppForm> = {}
    if (!form.firstName.trim()) e.firstName = "Required"
    if (!form.lastName.trim()) e.lastName = "Required"
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required"
    if (!form.phone.trim()) e.phone = "Required"
    if (!form.coverLetter.trim() || form.coverLetter.length < 50)
      e.coverLetter = "At least 50 characters"
    if (!form.cvFileName) e.cvFileName = "Please select a file"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleApply = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) setView("success")
  }

  const openDetail = (job: Job) => {
    setSelectedJob(job)
    setView("detail")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const backToList = () => {
    setView("list")
    setSelectedJob(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openApply = () => {
    setView("apply")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1.5px solid #D1D5DB",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
  }

  if (view === "success") {
    return (
      <div
        style={{
          background: "#F4F6F8",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: 540,
            textAlign: "center",
            background: "#fff",
            borderRadius: 20,
            padding: "3rem",
            boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: "1.25rem" }}>🎉</div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#0A2540",
              marginBottom: "0.75rem",
            }}
          >
            Application Submitted!
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#6B7280",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            Thank you, {form.firstName}! We have received your application for{" "}
            <strong>{selectedJob?.title}</strong>. Our HR team will review your
            application and contact you at <strong>{form.email}</strong> within
            7–10 business days.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-primary"
              onClick={() => {
                setView("list")
                setForm(emptyForm)
                setSelectedJob(null)
              }}
            >
              Browse More Jobs
            </button>
            <button className="btn-outline" onClick={() => navigate("home")}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (view === "apply" && selectedJob) {
    return (
      <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
        <div style={{ background: "#0A2540", padding: "2rem 0" }}>
          <div className="container">
            <button
              onClick={() => setView("detail")}
              style={{
                background: "none",
                border: "none",
                color: "#94A3B8",
                cursor: "pointer",
                fontSize: 14,
                marginBottom: "0.75rem",
              }}
            >
              ← Back to Job Details
            </button>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>
              Apply — {selectedJob.title}
            </h1>
          </div>
        </div>
        <div
          className="container"
          style={{ padding: "2.5rem 1.5rem", maxWidth: 740 }}
        >
          <form onSubmit={handleApply} noValidate>
            <div
              className="card"
              style={{ padding: "2rem", marginBottom: "1.5rem" }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "1.5rem",
                }}
              >
                Personal Details
              </h2>
              <div
                className="grid-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    First Name <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    value={form.firstName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.firstName
                        ? "#DC2626"
                        : "#D1D5DB")
                    }
                  />
                  {errors.firstName && (
                    <div
                      style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                    >
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Last Name <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    value={form.lastName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lastName: e.target.value }))
                    }
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.lastName
                        ? "#DC2626"
                        : "#D1D5DB")
                    }
                  />
                  {errors.lastName && (
                    <div
                      style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                    >
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div
                className="grid-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Email <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.email
                        ? "#DC2626"
                        : "#D1D5DB")
                    }
                  />
                  {errors.email && (
                    <div
                      style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                    >
                      {errors.email}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Phone <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+855 12 000 000"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.phone
                        ? "#DC2626"
                        : "#D1D5DB")
                    }
                  />
                  {errors.phone && (
                    <div
                      style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                    >
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="card"
              style={{ padding: "2rem", marginBottom: "1.5rem" }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "1.5rem",
                }}
              >
                Documents
              </h2>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  CV / Resume <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <div
                  style={{
                    border: `2px dashed ${
                      errors.cvFileName ? "#DC2626" : "#D1D5DB"
                    }`,
                    borderRadius: 10,
                    padding: "1.5rem",
                    textAlign: "center",
                    background: "#FAFAFA",
                  }}
                >
                  {form.cvFileName ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 20 }}>📄</span>
                      <span
                        style={{
                          fontSize: 14,
                          color: "#374151",
                          fontWeight: 600,
                        }}
                      >
                        {form.cvFileName}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, cvFileName: "" }))
                        }
                        style={{
                          background: "none",
                          border: "none",
                          color: "#DC2626",
                          cursor: "pointer",
                          fontSize: 12,
                        }}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#6B7280",
                          marginBottom: 8,
                        }}
                      >
                        Drag and drop your CV, or
                      </div>
                      <button
                        type="button"
                        className="btn-outline"
                        style={{ fontSize: 13 }}
                        onClick={() => {
                          const mock =
                            "MyCV_" + (form.firstName || "Applicant") + ".pdf"
                          setForm((f) => ({ ...f, cvFileName: mock }))
                        }}
                      >
                        Browse File
                      </button>
                      <div
                        style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8 }}
                      >
                        PDF, DOCX up to 5 MB
                      </div>
                    </>
                  )}
                </div>
                {errors.cvFileName && (
                  <div style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}>
                    {errors.cvFileName}
                  </div>
                )}
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  Cover Letter <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <textarea
                  value={form.coverLetter}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, coverLetter: e.target.value }))
                  }
                  rows={6}
                  placeholder="Tell us why you are excited about this role and what makes you a great fit for UCB..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    borderColor: errors.coverLetter ? "#DC2626" : "#D1D5DB",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.coverLetter
                      ? "#DC2626"
                      : "#D1D5DB")
                  }
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  {errors.coverLetter && (
                    <div style={{ fontSize: 12, color: "#DC2626" }}>
                      {errors.coverLetter}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: 12,
                      color: "#9CA3AF",
                      marginLeft: "auto",
                    }}
                  >
                    {form.coverLetter.length} characters
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card"
              style={{ padding: "1.5rem", marginBottom: "1.5rem" }}
            >
              <label
                style={{
                  display: "flex",
                  gap: 12,
                  cursor: "pointer",
                  alignItems: "flex-start",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, consent: e.target.checked }))
                  }
                  style={{
                    marginTop: 3,
                    accentColor: "#009C9F",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}
                >
                  I consent to UCB collecting and processing my personal data
                  for recruitment purposes in accordance with UCB's Privacy
                  Policy. I understand my data will be kept for 12 months.{" "}
                  <span style={{ color: "#DC2626" }}>*</span>
                </span>
              </label>
            </div>

            {/* Anti-bot placeholder */}
            <div
              style={{
                padding: "1rem",
                background: "#F4F6F8",
                borderRadius: 8,
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "1.5px solid #D1D5DB",
              }}
            >
              <input
                type="checkbox"
                style={{ accentColor: "#009C9F" }}
                readOnly
                checked
              />
              <span style={{ fontSize: 14, color: "#374151" }}>
                I am not a robot
              </span>
              <div style={{ marginLeft: "auto", fontSize: 20 }}>🔒</div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={!form.consent}
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "0.875rem",
                fontSize: 16,
              }}
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (view === "detail" && selectedJob) {
    return (
      <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
            padding: "2.5rem 0",
          }}
        >
          <div className="container">
            <button
              onClick={backToList}
              style={{
                background: "none",
                border: "none",
                color: "#94A3B8",
                cursor: "pointer",
                fontSize: 14,
                marginBottom: "1rem",
              }}
            >
              ← Back to All Jobs
            </button>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Badge
                label={
                  deptLabels[selectedJob.department] ?? selectedJob.department
                }
                variant="teal"
              />
              <Badge
                label={selectedJob.type.replace("-", " ")}
                variant="blue"
              />
              {selectedJob.isUrgent && (
                <Badge label="Urgent Hire" variant="gold" />
              )}
            </div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#fff",
                marginBottom: "0.75rem",
              }}
            >
              {selectedJob.title}
            </h1>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: 14, color: "#94A3B8" }}>
                📍 {selectedJob.location}
              </span>
              <span style={{ fontSize: 14, color: "#94A3B8" }}>
                📅 Posted {selectedJob.postedDate}
              </span>
              <span style={{ fontSize: 14, color: "#94A3B8" }}>
                ⏰ Deadline {selectedJob.deadline}
              </span>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
          <div
            className="sidebar-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            <div>
              <div
                className="card"
                style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1rem",
                  }}
                >
                  About the Role
                </h2>
                <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7 }}>
                  {selectedJob.description}
                </p>
              </div>
              <div
                className="card"
                style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1rem",
                  }}
                >
                  Key Responsibilities
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {selectedJob.responsibilities.map((r, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontSize: 14,
                        color: "#374151",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          color: "#009C9F",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="card"
                style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1rem",
                  }}
                >
                  Requirements
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {selectedJob.requirements.map((r, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontSize: 14,
                        color: "#374151",
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: "#C9A84C", flexShrink: 0 }}>•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ padding: "1.75rem" }}>
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1rem",
                  }}
                >
                  Benefits
                </h2>
                <div
                  className="grid-2"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                  }}
                >
                  {selectedJob.benefits.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 8,
                        padding: "0.75rem",
                        background: "#E6F7F7",
                        borderRadius: 10,
                        fontSize: 13,
                        color: "#007B7E",
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ flexShrink: 0 }}>✦</span> {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ position: "sticky", top: 88 }}>
              <div
                className="card"
                style={{ padding: "1.5rem", marginBottom: "1rem" }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  {[
                    {
                      label: "Department",
                      value: deptLabels[selectedJob.department],
                    },
                    { label: "Location", value: selectedJob.location },
                    {
                      label: "Employment Type",
                      value: selectedJob.type.replace(/-/g, " "),
                    },
                    {
                      label: "Application Deadline",
                      value: selectedJob.deadline,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.5rem 0",
                        borderBottom: "1px solid #F4F6F8",
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: "#6B7280" }}>{item.label}</span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: "#0A2540",
                          textTransform: "capitalize",
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="btn-primary"
                  onClick={openApply}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Apply for This Job →
                </button>
              </div>
              <div
                style={{
                  padding: "1rem",
                  background: "#FDF6E3",
                  borderRadius: 12,
                  border: "1px solid #F0D99A",
                  fontSize: 13,
                  color: "#92400E",
                }}
              >
                <strong>Share this job:</strong> Forward this listing to someone
                who might be interested, or save the page URL.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540 0%, #1A3D5C 100%)",
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,156,159,0.08) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="grid-2-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(0,156,159,0.2)",
                  borderRadius: 20,
                  padding: "4px 14px",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 600, color: "#009C9F" }}
                >
                  800+ Team Members · 28 Locations
                </span>
              </div>
              <h1
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: "1.25rem",
                }}
              >
                Build Your Career With UCB Bank
              </h1>
              <p
                style={{
                  fontSize: 17,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                Join a team that is shaping the future of banking in Cambodia.
                We invest in people, celebrate growth, and welcome talent from
                every background.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href="#open-positions"
                  className="btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  See Open Positions
                </a>
                <a
                  href="mailto:hr@ucb.com.kh"
                  className="btn-white"
                  style={{ textDecoration: "none" }}
                >
                  Submit Your CV
                </a>
              </div>
            </div>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                height: 380,
                boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=640&h=440&fit=crop&auto=format"
                alt="UCB team members working together"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join UCB */}
      <section className="page-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title">Why Join UCB?</h2>
            <p className="section-subtitle">
              We believe great banking starts with great people. Here is what we
              offer.
            </p>
          </div>
          <CareerBenefits items={whyItems} />
        </div>
      </section>

      {/* Open Positions */}
      <section
        className="page-section"
        style={{ background: "#F4F6F8" }}
        id="open-positions"
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 className="section-title">Current Opportunities</h2>
            <p className="section-subtitle">
              Find your next opportunity at UCB.
            </p>
          </div>

          {/* Filters */}
          <div
            className="card"
            style={{ padding: "1.25rem", marginBottom: "1.5rem" }}
          >
            <div
              className="careers-filters"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
                gap: "1rem",
                alignItems: "end",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    marginBottom: 6,
                    letterSpacing: 0.3,
                  }}
                >
                  DEPARTMENT
                </label>
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.875rem",
                    border: "1.5px solid #D1D5DB",
                    borderRadius: 8,
                    fontSize: 14,
                    background: "#fff",
                  }}
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    marginBottom: 6,
                    letterSpacing: 0.3,
                  }}
                >
                  LOCATION
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.875rem",
                    border: "1.5px solid #D1D5DB",
                    borderRadius: 8,
                    fontSize: 14,
                    background: "#fff",
                  }}
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    marginBottom: 6,
                    letterSpacing: 0.3,
                  }}
                >
                  TYPE
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.875rem",
                    border: "1.5px solid #D1D5DB",
                    borderRadius: 8,
                    fontSize: 14,
                    background: "#fff",
                  }}
                >
                  {jobTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    marginBottom: 6,
                    letterSpacing: 0.3,
                  }}
                >
                  KEYWORD
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search roles..."
                  style={{
                    padding: "0.625rem 0.875rem",
                    border: "1.5px solid #D1D5DB",
                    borderRadius: 8,
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "inherit",
                    minWidth: 160,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                  onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                />
              </div>
            </div>
          </div>

          {/* Results count */}
          <div
            style={{ fontSize: 14, color: "#6B7280", marginBottom: "1.25rem" }}
          >
            Showing <strong>{filtered.length}</strong> position
            {filtered.length !== 1 ? "s" : ""}
            {dept !== "all" ||
            location !== "All Locations" ||
            jobType !== "all" ||
            keyword ? (
              <button
                onClick={() => {
                  setDept("all")
                  setLocation("All Locations")
                  setJobType("all")
                  setKeyword("")
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#009C9F",
                  cursor: "pointer",
                  fontSize: 13,
                  marginLeft: 8,
                }}
              >
                Clear filters
              </button>
            ) : null}
          </div>

          <JobList
            jobs={filtered}
            deptLabels={deptLabels}
            onSelect={openDetail}
            onClearFilters={() => {
              setDept("all")
              setLocation("All Locations")
              setJobType("all")
              setKeyword("")
            }}
          />
        </div>
      </section>

      {/* Talent Community */}
      <section
        style={{ background: "#009C9F", padding: "4rem 0" }}
        id="talent-community"
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            Join Our Talent Community
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "2rem",
              maxWidth: 480,
              margin: "0 auto 2rem",
            }}
          >
            No perfect match today? Subscribe to job alerts and be the first to
            hear about new opportunities at UCB.
          </p>
          {talentSub ? (
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 12,
                padding: "1rem 2rem",
                display: "inline-block",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              ✅ You are subscribed! We will notify you of new UCB roles.
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <input
                className="talent-email-input"
                type="email"
                value={talentEmail}
                onChange={(e) => setTalentEmail(e.target.value)}
                placeholder="your.email@example.com"
                style={{
                  padding: "0.75rem 1.25rem",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 15,
                  minWidth: 280,
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
              <button
                className="btn-white"
                onClick={() => {
                  if (talentEmail.includes("@")) setTalentSub(true)
                }}
                style={{ padding: "0.75rem 1.75rem" }}
              >
                Subscribe to Job Alerts
              </button>
            </div>
          )}
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              marginTop: "1rem",
            }}
          >
            By subscribing, you consent to UCB storing your email for job alert
            purposes. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
}
