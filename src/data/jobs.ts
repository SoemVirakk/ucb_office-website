export interface Job {
  id: string
  title: string
  department: "technology" | "operations" | "finance" | "risk" | "hr" | "marketing" | "branch-banking" | "credit"
  location: string
  type: "full-time" | "part-time" | "contract" | "internship"
  postedDate: string
  deadline: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  isUrgent?: boolean
}

export const jobs: Job[] = [
  {
    id: "senior-software-engineer",
    title: "Senior Software Engineer (Core Banking)",
    department: "technology",
    location: "Phnom Penh",
    type: "full-time",
    postedDate: "2026-08-15",
    deadline: "2026-09-30",
    description:
      "We are looking for a Senior Software Engineer to join our Core Banking Technology team. You will design, build, and maintain mission-critical banking systems that serve over 200,000 customers across Cambodia.",
    responsibilities: [
      "Architect and develop scalable microservices for core banking operations",
      "Collaborate with product and business teams to define technical requirements",
      "Conduct code reviews and mentor junior engineers",
      "Ensure high availability (99.99%) and performance of banking APIs",
      "Integrate with NBC payment systems, FAST, and international SWIFT networks",
      "Lead incident response and post-mortem processes",
    ],
    requirements: [
      "Bachelor's degree in Computer Science, Engineering, or related field",
      "5+ years of software engineering experience, ideally in fintech or banking",
      "Proficiency in Java, Python, or Go; experience with Spring Boot or similar frameworks",
      "Strong knowledge of relational databases (PostgreSQL, Oracle) and caching (Redis)",
      "Experience with Kubernetes, Docker, and CI/CD pipelines",
      "Understanding of PCI DSS compliance and data security best practices",
    ],
    benefits: [
      "Competitive salary with annual performance review",
      "Private health insurance for you and your family",
      "13th-month salary + KPI bonus",
      "Sponsored training and professional certifications (AWS, GCP)",
      "Flexible working hours with 2 WFH days per week",
      "18 days annual leave + public holidays",
    ],
    isUrgent: true,
  },
  {
    id: "credit-analyst",
    title: "Credit Analyst — SME Lending",
    department: "credit",
    location: "Phnom Penh",
    type: "full-time",
    postedDate: "2026-08-20",
    deadline: "2026-10-15",
    description:
      "Join our SME Lending team as a Credit Analyst. You will evaluate loan applications from small and medium enterprises, assess creditworthiness, and make recommendations that support UCB's responsible lending growth.",
    responsibilities: [
      "Analyse SME financial statements, cash flow, and business plans",
      "Conduct site visits and meet with business owners",
      "Prepare detailed credit proposals for approval committees",
      "Monitor loan performance and flag early warning indicators",
      "Maintain up-to-date knowledge of NBC credit regulations",
      "Build and maintain relationships with SME clients",
    ],
    requirements: [
      "Bachelor's degree in Finance, Accounting, Economics, or Business Administration",
      "2+ years of credit analysis or SME banking experience",
      "Strong financial modelling and spreadsheet skills",
      "Khmer and English proficiency (written and spoken)",
      "NBC credit guidelines knowledge preferred",
      "Motorcycle licence or car licence preferred for site visits",
    ],
    benefits: [
      "Competitive base salary with performance bonus",
      "Group health insurance and accident insurance",
      "Annual training budget for professional development",
      "Career path to Credit Manager within 3–5 years",
      "Staff banking benefits (preferential loan rates)",
    ],
  },
  {
    id: "branch-manager-siem-reap",
    title: "Branch Manager — Siem Reap",
    department: "branch-banking",
    location: "Siem Reap",
    type: "full-time",
    postedDate: "2026-08-10",
    deadline: "2026-09-25",
    description:
      "UCB is opening a new branch in Siem Reap and we need an experienced Branch Manager to lead operations, build the local customer base, and deliver exceptional service to individuals and businesses in the tourism hub of Cambodia.",
    responsibilities: [
      "Oversee day-to-day branch operations and ensure compliance with UCB policies",
      "Drive branch sales targets for deposits, loans, and digital banking products",
      "Lead, coach, and develop a team of 8–12 branch staff",
      "Build strong relationships with local businesses and community organisations",
      "Manage branch P&L and report to Regional Manager",
      "Ensure a world-class customer experience at every touchpoint",
    ],
    requirements: [
      "Bachelor's degree in Business, Finance, or related field; MBA is an advantage",
      "5+ years of banking experience, with at least 2 years in a leadership role",
      "Track record of meeting and exceeding sales targets",
      "Strong interpersonal skills and community network in Siem Reap region",
      "Fluency in Khmer; English proficiency required; Mandarin is an advantage",
      "Willingness to relocate to Siem Reap",
    ],
    benefits: [
      "Competitive salary with branch performance bonus",
      "Relocation allowance and housing support",
      "Private health insurance (staff + family)",
      "Company vehicle or transport allowance",
      "Fast-track career development programme",
    ],
    isUrgent: true,
  },
  {
    id: "digital-product-manager",
    title: "Digital Product Manager — Mobile Banking",
    department: "technology",
    location: "Phnom Penh",
    type: "full-time",
    postedDate: "2026-08-25",
    deadline: "2026-10-10",
    description:
      "Shape the future of UCB Mobile Banking as our Digital Product Manager. You will own the product roadmap, define user stories, collaborate with engineering teams, and ensure we deliver delightful, secure, and accessible experiences to our customers.",
    responsibilities: [
      "Own the UCB Mobile App product roadmap and backlog",
      "Translate business goals and user research into actionable product requirements",
      "Work cross-functionally with engineering, design, compliance, and operations",
      "Define KPIs, track performance, and iterate based on data",
      "Conduct user interviews and usability testing sessions",
      "Manage relationships with third-party API providers and fintech partners",
    ],
    requirements: [
      "Bachelor's degree; MBA or equivalent product management certification is a plus",
      "3+ years of product management experience in mobile apps or fintech",
      "Strong understanding of agile/scrum methodologies",
      "Analytical mindset with experience using data tools (Amplitude, Mixpanel, etc.)",
      "Excellent written and verbal communication skills in English",
      "Experience with banking regulations or financial products is a plus",
    ],
    benefits: [
      "Top-of-market salary for digital talent",
      "Equity-style incentive scheme tied to digital product growth",
      "Annual conference budget (Bangkok, Singapore)",
      "Unlimited professional learning subscription (Coursera, Udemy)",
      "Hybrid work model",
    ],
  },
  {
    id: "risk-compliance-officer",
    title: "Risk & Compliance Officer",
    department: "risk",
    location: "Phnom Penh",
    type: "full-time",
    postedDate: "2026-08-05",
    deadline: "2026-09-20",
    description:
      "Help UCB maintain its position as one of Cambodia's most trusted banks. As a Risk & Compliance Officer, you will ensure all operations adhere to NBC regulations, AML/CFT requirements, and international best practices.",
    responsibilities: [
      "Monitor compliance with NBC regulations, AML/CFT laws, and internal policies",
      "Conduct risk assessments and support the annual internal audit process",
      "Train staff on compliance obligations and update procedures as regulations evolve",
      "Prepare and submit regulatory reports to the National Bank of Cambodia",
      "Investigate suspicious transactions and file STRs as required",
      "Support the Chief Risk Officer in enterprise risk management initiatives",
    ],
    requirements: [
      "Bachelor's degree in Law, Finance, Accounting, or related field",
      "2+ years of compliance, audit, or risk management experience in banking",
      "Knowledge of NBC laws, AML/CFT regulations, and FATF guidelines",
      "CAMS certification or equivalent is an advantage",
      "Strong attention to detail and analytical skills",
      "Bilingual (Khmer and English)",
    ],
    benefits: [
      "Salary commensurate with qualifications and experience",
      "CAMS and other professional certification sponsorship",
      "Private health insurance",
      "Clear career progression to Senior Compliance Officer",
    ],
  },
  {
    id: "hr-business-partner",
    title: "HR Business Partner",
    department: "hr",
    location: "Phnom Penh",
    type: "full-time",
    postedDate: "2026-08-18",
    deadline: "2026-10-01",
    description:
      "Join UCB's People & Culture team as an HR Business Partner. You will work closely with department heads across our technology, branch banking, and operations divisions to attract, develop, and retain top talent.",
    responsibilities: [
      "Partner with business units to understand talent needs and develop HR strategies",
      "Lead end-to-end recruitment for mid-to-senior roles across assigned departments",
      "Support performance management cycles and succession planning",
      "Manage employee relations cases and ensure compliance with Cambodian labour law",
      "Analyse people data and present insights to leadership",
      "Champion UCB's inclusive culture and employee wellbeing initiatives",
    ],
    requirements: [
      "Bachelor's degree in HR, Business, Psychology, or related field",
      "3+ years of HRBP or generalist HR experience, ideally in banking or financial services",
      "Strong knowledge of Cambodian labour law",
      "Excellent interpersonal and influencing skills",
      "Proficiency in English and Khmer",
      "Experience with HRIS systems (SAP SuccessFactors, Workday) is a plus",
    ],
    benefits: [
      "Competitive salary and annual bonus",
      "Private health insurance",
      "HR professional development fund",
      "Flexible working arrangements",
      "20 days annual leave",
    ],
  },
  {
    id: "marketing-digital-specialist",
    title: "Digital Marketing Specialist",
    department: "marketing",
    location: "Phnom Penh",
    type: "full-time",
    postedDate: "2026-08-28",
    deadline: "2026-10-05",
    description:
      "Drive UCB's digital presence across Facebook, TikTok, and Google as our Digital Marketing Specialist. You will plan and execute campaigns that acquire new customers, grow brand awareness, and support our expanding digital banking products.",
    responsibilities: [
      "Plan and execute paid social campaigns (Facebook, TikTok, Instagram)",
      "Manage Google Ads and SEO for UCB.com.kh",
      "Create compelling content in Khmer and English for digital channels",
      "Analyse campaign performance using Meta Ads Manager, Google Analytics",
      "Collaborate with product teams on digital banking acquisition campaigns",
      "Monitor social media channels and engage with UCB community",
    ],
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "2+ years of digital marketing experience; banking or fintech experience preferred",
      "Hands-on experience with Meta Ads Manager and Google Ads",
      "Creative eye and ability to produce or brief content in Khmer and English",
      "Data-driven mindset with strong reporting skills",
      "Video content and short-form video experience is a plus",
    ],
    benefits: [
      "Competitive salary with performance incentives",
      "Annual marketing conference attendance budget",
      "Creative tools subscription (Adobe Creative Cloud, Canva Pro)",
      "Private health insurance",
    ],
  },
  {
    id: "operations-intern",
    title: "Banking Operations Intern",
    department: "operations",
    location: "Phnom Penh",
    type: "internship",
    postedDate: "2026-09-01",
    deadline: "2026-09-30",
    description:
      "UCB's internship programme gives outstanding university students a real-world view of banking operations. You will rotate through trade operations, payment processing, and back-office functions over a 3-month programme with mentorship from experienced bankers.",
    responsibilities: [
      "Support daily payment and settlement operations",
      "Assist with document verification and account maintenance tasks",
      "Participate in process improvement projects under senior staff guidance",
      "Prepare reports and data analysis using Excel",
      "Attend structured learning sessions on banking fundamentals",
    ],
    requirements: [
      "Currently enrolled in a Finance, Accounting, Economics, or Business degree (Year 3 or 4)",
      "GPA 3.0 or above (or equivalent)",
      "Eager to learn and highly detail-oriented",
      "Basic English proficiency; Khmer is the working language",
      "Available for a minimum 3-month full-time placement",
    ],
    benefits: [
      "Monthly stipend of USD 150–200",
      "Mentorship from senior bankers",
      "Internship certificate and performance reference letter",
      "Priority consideration for graduate recruitment at UCB",
    ],
  },
]

export const departments = [
  { id: "all", label: "All Departments" },
  { id: "technology", label: "Technology" },
  { id: "credit", label: "Credit" },
  { id: "branch-banking", label: "Branch Banking" },
  { id: "risk", label: "Risk & Compliance" },
  { id: "operations", label: "Operations" },
  { id: "hr", label: "Human Resources" },
  { id: "marketing", label: "Marketing" },
  { id: "finance", label: "Finance" },
]

export const locations = [
  "All Locations",
  "Phnom Penh",
  "Siem Reap",
  "Sihanoukville",
  "Battambang",
  "Kampong Cham",
]

export const jobTypes = [
  { id: "all", label: "All Types" },
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
]

export const deptLabels: Record<string, string> = {
  technology: "Technology",
  operations: "Operations",
  finance: "Finance",
  risk: "Risk & Compliance",
  hr: "Human Resources",
  marketing: "Marketing",
  "branch-banking": "Branch Banking",
  credit: "Credit",
}
