import Badge from "../ui/Badge"

import type { Job } from "../../data/jobs"

interface JobListProps {
  jobs: Job[]

  deptLabels: Record<string, string>

  onSelect: (job: Job) => void

  onClearFilters: () => void
}

/** Renders filtered job result cards and empty states. */
export default function JobList({
  jobs,
  deptLabels,
  onSelect,
  onClearFilters,
}: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem",
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #E5E7EB",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: "1rem" }}>🔍</div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#0A2540",
            marginBottom: 8,
          }}
        >
          No positions match your search
        </h3>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: "1.5rem" }}>
          Try adjusting the filters or join our talent community for future
          opportunities.
        </p>
        <button className="btn-outline" onClick={onClearFilters}>
          Clear All Filters
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="card job-card"
          role="button"
          tabIndex={0}
          aria-label={`View ${job.title}`}
          style={{ padding: "1.5rem", cursor: "pointer" }}
          onClick={() => onSelect(job)}
          onKeyDown={(event) => {
            if (
              event.currentTarget === event.target &&
              (event.key === "Enter" || event.key === " ")
            ) {
              event.preventDefault()
              onSelect(job)
            }
          }}
        >
          <div
            className="job-card-content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 8,
                  flexWrap: "wrap",
                }}
              >
                <Badge
                  label={deptLabels[job.department] ?? job.department}
                  variant="teal"
                />
                <Badge label={job.type.replace("-", " ")} variant="blue" />
                {job.isUrgent && <Badge label="Urgent" variant="gold" />}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: 6,
                }}
              >
                {job.title}
              </h3>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "#6B7280" }}>
                  📍 {job.location}
                </span>
                <span style={{ fontSize: 13, color: "#6B7280" }}>
                  📅 Posted {job.postedDate}
                </span>
                <span style={{ fontSize: 13, color: "#6B7280" }}>
                  ⏰ Deadline {job.deadline}
                </span>
              </div>
            </div>
            <button
              className="btn-outline job-card-action"
              onClick={(event) => {
                event.stopPropagation()
                onSelect(job)
              }}
              style={{ fontSize: 13, flexShrink: 0 }}
            >
              View &amp; Apply
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
