export interface LeadershipMember {
  id: string
  name: string
  title: string
  bio: string
  image: string
  category: "board" | "executive"
}

export const leadership: LeadershipMember[] = [
  {
    id: "ceo",
    name: "Sovannara Chea",
    title: "President & Chief Executive Officer",
    bio: "Sovannara brings over 25 years of banking leadership across Southeast Asia. Prior to UCB, he held executive roles at ACLEDA Bank and ANZ Royal Bank. He holds an MBA from INSEAD and has championed UCB's digital transformation since 2018.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
    category: "executive",
  },
  {
    id: "cfo",
    name: "Ly Channary",
    title: "Chief Financial Officer",
    bio: "Channary is a CFA charterholder with 18 years of experience in banking finance and treasury across Cambodia and Singapore. She oversees financial reporting, balance sheet management, and investor relations at UCB.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format",
    category: "executive",
  },
  {
    id: "cto",
    name: "Dara Pich",
    title: "Chief Technology Officer",
    bio: "Dara leads UCB's technology and digital strategy, having previously built fintech platforms at Wing Money and Grab Financial. He holds a Master's in Computer Science from NUS Singapore and is passionate about making banking accessible through technology.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
    category: "executive",
  },
  {
    id: "cro",
    name: "Rathana Kim",
    title: "Chief Risk Officer",
    bio: "Rathana oversees enterprise risk management, compliance, and internal audit. With 15 years of risk experience and a background in NBC supervision, she ensures UCB maintains the highest standards of governance and regulatory adherence.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format",
    category: "executive",
  },
  {
    id: "coo",
    name: "Vicheka Heng",
    title: "Chief Operating Officer",
    bio: "Vicheka leads operations, branch network expansion, and customer service across UCB's 28 locations. He spent 12 years at BRED Bank Cambodia before joining UCB in 2020 to drive operational excellence and geographic growth.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&auto=format",
    category: "executive",
  },
  {
    id: "chief-people",
    name: "Sreymom Noun",
    title: "Chief People & Culture Officer",
    bio: "Sreymom leads talent strategy, learning & development, and organisational culture at UCB. With a doctorate in Organisational Psychology from the University of Melbourne, she is committed to building UCB into Cambodia's most inclusive and people-first workplace.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&auto=format",
    category: "executive",
  },
  {
    id: "board-chair",
    name: "H.E. Bopha Meas",
    title: "Board Chairperson",
    bio: "H.E. Bopha Meas is a prominent Cambodian business leader and entrepreneur with over 30 years of investment experience. She chairs the UCB Board of Directors and chairs the Board Risk Committee.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=300&fit=crop&auto=format",
    category: "board",
  },
  {
    id: "board-independent",
    name: "Dr. Piseth Lim",
    title: "Independent Non-Executive Director",
    bio: "Dr. Piseth Lim is an economist and governance expert who has advised the National Bank of Cambodia and the World Bank. He chairs UCB's Board Audit Committee and serves on the Remuneration Committee.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format",
    category: "board",
  },
]
