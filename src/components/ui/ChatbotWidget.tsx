import { useState, useRef, useEffect, type FormEvent } from "react"
import { exchangeRates } from "../../data/exchangeRates"
import { branches } from "../../data/branches"
import type { LocaleCode } from "../../types/localization"
import type { Page } from "../../types/navigation"

interface ChatbotWidgetProps {
  navigate: (p: Page) => void
  lang: LocaleCode
}

interface Btn {
  label: string
  labelKm?: string
  action: string
  variant?: "primary" | "outline" | "danger"
}

interface Row {
  label: string
  value: string
}

interface ChatMessage {
  id: string
  from: "bot" | "user" | "system"
  text: string
  textKm?: string
  ts: number
  buttons?: Btn[]
  rows?: Row[]
  isCard?: boolean
  isError?: boolean
  isEmergency?: boolean
  navigateTo?: Page
  navLabel?: string
}

const SENSITIVE =
  /\b(password|pin\b|otp\b|cvv\b|card.?number|account.?number|secret)\b|\b\d{12,16}\b/i

/** Creates a lightweight unique id for local chat messages. */
const id = () => Math.random().toString(36).slice(2)

const QUICK_ACTIONS: Btn[] = [
  {
    label: "📍 Find Branch / ATM",
    labelKm: "📍 រកសាខា / ម៉ាស៊ីន ATM",
    action: "find-branch",
  },
  {
    label: "💱 Exchange Rates",
    labelKm: "💱 អត្រាប្តូរប្រាក់",
    action: "exchange-rates",
  },
  {
    label: "💰 Product Information",
    labelKm: "💰 ព័ត៌មានផលិតផល",
    action: "product-info",
  },
  {
    label: "🧮 Loan Calculator",
    labelKm: "🧮 ម៉ាស៊ីនគណនាប្រាក់កម្ចី",
    action: "loan-calculator",
  },
  {
    label: "📱 Digital Banking Help",
    labelKm: "📱 ជំនួយធនាគារឌីជីថល",
    action: "digital-banking",
  },
  {
    label: "☎️ Contact Customer Service",
    labelKm: "☎️ ទំនាក់ទំនងអតិថិជន",
    action: "contact-support",
  },
]

/** Builds scripted chatbot replies for selected quick actions. */
function getBotReplies(action: string, uiLang: LocaleCode): ChatMessage[] {
  const km = uiLang === "km"

  const menu: ChatMessage = {
    id: id(),
    from: "bot",
    text: "How else can I help you?",
    textKm: "តើខ្ញុំអាចជួយអ្វីបន្ថែមទៀត?",
    ts: Date.now(),
    buttons: QUICK_ACTIONS,
  }

  switch (action) {
    case "welcome":
      return [
        {
          id: id(),
          from: "bot",
          text: "👋 Welcome to UCB Virtual Assistant!\n\nI can help you find branches, check exchange rates, explore products, use calculators, and more.",
          textKm:
            "👋 សូមស្វាគមន៍មកកាន់ជំនួយការនិម្មិតរបស់ UCB!\n\nខ្ញុំអាចជួយអ្នករកសាខា ពិនិត្យអត្រាប្តូរប្រាក់ ស្វែងរកផលិតផល និងច្រើនទៀត។",
          ts: Date.now(),
        },
        {
          id: id(),
          from: "bot",
          text: "What would you like help with today?",
          textKm: "តើអ្នកចង់ជំនួយអ្វីថ្ងៃនេះ?",
          ts: Date.now() + 10,
          buttons: QUICK_ACTIONS,
        },
      ]

    case "find-branch": {
      const nearby = branches.filter((b) => b.type === "branch").slice(0, 3)
      return [
        {
          id: id(),
          from: "bot",
          text: "Here are UCB branches in Phnom Penh. For your nearest location, use our branch finder:",
          textKm:
            "នេះជាសាខា UCB នៅភ្នំពេញ។ ប្រើម៉ាស៊ីនស្វែងរកសាខារបស់យើងសម្រាប់ទីតាំងជិតបំផុត:",
          ts: Date.now(),
          isCard: true,
          rows: nearby.flatMap((b) => [
            { label: "🏦 " + b.name, value: b.province },
            { label: "📍", value: b.address },
            { label: "⏰", value: b.hours },
          ]),
          navigateTo: "branches",
          navLabel: "View All Branches & ATMs →",
        },
        menu,
      ]
    }

    case "exchange-rates": {
      const top5 = exchangeRates.rates.slice(0, 5)
      return [
        {
          id: id(),
          from: "bot",
          text: `Current UCB exchange rates (USD base) · Updated: ${exchangeRates.lastUpdated}`,
          textKm: `អត្រាប្តូរប្រាក់ UCB បច្ចុប្បន្ន (មូលដ្ឋាន USD) · ធ្វើបច្ចុប្បន្នភាព: ${exchangeRates.lastUpdated}`,
          ts: Date.now(),
          isCard: true,
          rows: [
            { label: "Currency", value: "Buy / Sell" },
            ...top5.map((r) => ({
              label: `${r.flag} ${r.currency}`,
              value: `${r.buy.toFixed(4)} / ${r.sell.toFixed(4)}`,
            })),
          ],
          navigateTo: "rates",
          navLabel: "Full Rates & Calculator →",
        },
        {
          id: id(),
          from: "bot",
          text: "⚠️ Rates are indicative and subject to change without notice.",
          ts: Date.now() + 10,
        },
        menu,
      ]
    }

    case "product-info":
      return [
        {
          id: id(),
          from: "bot",
          text: "Which products are you interested in?",
          textKm: "តើអ្នកចាប់អារម្មណ៍លើផលិតផលណា?",
          ts: Date.now(),
          buttons: [
            {
              label: "👤 Personal Banking",
              labelKm: "👤 ធនាគារផ្ទាល់ខ្លួន",
              action: "personal-products",
            },
            {
              label: "🏢 Business Banking",
              labelKm: "🏢 ធនាគារអាជីវកម្ម",
              action: "business-products",
            },
            { label: "💸 Loans", labelKm: "💸 ប្រាក់កម្ចី", action: "loan-info" },
            { label: "💳 Cards", labelKm: "💳 កាត", action: "card-info" },
          ],
        },
      ]

    case "personal-products":
      return [
        {
          id: id(),
          from: "bot",
          text: "UCB Personal Banking products:",
          textKm: "ផលិតផលធនាគារផ្ទាល់ខ្លួន UCB:",
          ts: Date.now(),
          isCard: true,
          rows: [
            { label: "💵 Savings Account", value: "From USD 1 · 2.0% p.a." },
            { label: "📋 Current Account", value: "USD or KHR · No minimum" },
            { label: "🔒 Fixed Deposit", value: "Up to 6.25% p.a. (USD)" },
            { label: "🎓 UCB Junior", value: "For under-18s · 2.5% p.a." },
          ],
          navigateTo: "products",
          navLabel: "Browse All Personal Products →",
        },
        menu,
      ]

    case "business-products":
      return [
        {
          id: id(),
          from: "bot",
          text: "UCB Business Banking products:",
          textKm: "ផលិតផលធនាគារអាជីវកម្ម UCB:",
          ts: Date.now(),
          isCard: true,
          rows: [
            { label: "🏢 Business Current Account", value: "USD / KHR / THB" },
            { label: "💼 SME Loan", value: "From 9.5% p.a. · Up to USD 500k" },
            { label: "🌐 Trade Finance", value: "LC, SBLC, BG available" },
            { label: "👥 Payroll Services", value: "Bulk salary disbursement" },
          ],
          navigateTo: "products",
          navLabel: "Browse All Business Products →",
        },
        menu,
      ]

    case "loan-info":
      return [
        {
          id: id(),
          from: "bot",
          text: "UCB loan products at a glance:",
          textKm: "ផលិតផលប្រាក់កម្ចី UCB:",
          ts: Date.now(),
          isCard: true,
          rows: [
            {
              label: "🏠 Home Loan",
              value: "7.5% – 10.0% p.a. · up to 25 yrs",
            },
            {
              label: "👤 Personal Loan",
              value: "12% – 18% p.a. · up to 5 yrs",
            },
            { label: "🚗 Auto Loan", value: "9% – 13% p.a. · up to 7 yrs" },
            { label: "🏢 SME Loan", value: "9.5% – 14% p.a. · up to 10 yrs" },
          ],
          navigateTo: "rates",
          navLabel: "View Rates & Apply →",
        },
        menu,
      ]

    case "card-info":
      return [
        {
          id: id(),
          from: "bot",
          text: "UCB card products:",
          textKm: "ផលិតផលកាត UCB:",
          ts: Date.now(),
          isCard: true,
          rows: [
            { label: "💳 Visa Classic Debit", value: "Free · KHR & USD" },
            {
              label: "💎 Visa Platinum Debit",
              value: "Lounge access · Insurance",
            },
            {
              label: "🌟 Visa Classic Credit",
              value: "USD 500 limit · Rewards",
            },
            {
              label: "✨ Visa Platinum Credit",
              value: "USD 5,000 limit · Cashback",
            },
          ],
          navigateTo: "products",
          navLabel: "Explore Cards →",
        },
        menu,
      ]

    case "loan-calculator":
      return [
        {
          id: id(),
          from: "bot",
          text: "Use our interactive loan calculator to estimate your monthly repayments — just enter your loan amount, rate, and term.",
          textKm: "ប្រើម៉ាស៊ីនគណនាប្រាក់កម្ចីដើម្បីប៉ាន់ស្មានការទូទាត់ប្រចាំខែ។",
          ts: Date.now(),
          navigateTo: "rates",
          navLabel: "Open Loan Calculator →",
        },
        {
          id: id(),
          from: "bot",
          text: "📌 Quick reference: Home Loan from 7.5% | Personal from 12% | SME from 9.5%\n\nAll results are estimates only — final rates subject to credit assessment.",
          ts: Date.now() + 10,
        },
        menu,
      ]

    case "digital-banking":
      return [
        {
          id: id(),
          from: "bot",
          text: "UCB Mobile App — available on iOS and Android:\n\n1️⃣ Download from App Store or Google Play\n2️⃣ Register with your UCB account number and ID\n3️⃣ Set up biometric login (fingerprint or Face ID)\n4️⃣ Enable transaction notifications for security",
          textKm:
            "UCB Mobile App — មានលើ iOS និង Android:\n\n1️⃣ ទាញយកពី App Store ឬ Google Play\n2️⃣ ចុះឈ្មោះជាមួយលេខគណនី UCB និង ID\n3️⃣ ដំឡើងការចូលដោយ biometric\n4️⃣ បើកការជូនដំណឹងប្រតិបត្តិការ",
          ts: Date.now(),
          navigateTo: "digital-banking",
          navLabel: "Learn More About Digital Banking →",
        },
        {
          id: id(),
          from: "bot",
          text: "🔐 Tip: UCB will never ask for your OTP or password. Enable instant transaction alerts for maximum security.",
          ts: Date.now() + 10,
        },
        menu,
      ]

    case "contact-support":
      return [
        {
          id: id(),
          from: "bot",
          text: "UCB Customer Service:",
          textKm: "សេវាអតិថិជន UCB:",
          ts: Date.now(),
          isCard: true,
          rows: [
            { label: "📞 Call Center", value: "+855 23 999 001" },
            { label: "⏰ Hours", value: "Mon–Sat, 8:00 AM–6:00 PM" },
            { label: "✉️ Email", value: "info@ucb.com.kh" },
            { label: "🚨 Fraud Hotline", value: "+855 23 999 911 (24/7)" },
          ],
          navigateTo: "contact",
          navLabel: "Send a Message →",
        },
        menu,
      ]

    case "report-fraud":
      return [
        {
          id: id(),
          from: "bot",
          text: "🚨 FRAUD & EMERGENCY\n\nIf you suspect fraud or your card is lost or stolen, call our 24/7 hotline immediately:\n\n📞 +855 23 999 911\n\nWe will block your card within minutes.",
          ts: Date.now(),
          isEmergency: true,
          buttons: [
            {
              label: "📞 Call Fraud Hotline",
              action: "noop",
              variant: "danger",
            },
            {
              label: "🔒 Report Phishing / Scam",
              action: "go-security",
              variant: "outline",
            },
          ],
          navigateTo: "security",
          navLabel: "Security Center →",
        },
        {
          id: id(),
          from: "bot",
          text: "Steps to take:\n1. Do not share any further information\n2. Call +855 23 999 911\n3. Visit your nearest UCB branch with your ID\n4. Change your Internet Banking password from a trusted device",
          ts: Date.now() + 10,
        },
      ]

    case "go-security":
      return [
        {
          id: id(),
          from: "bot",
          text: "Opening UCB Security Center...",
          ts: Date.now(),
          navigateTo: "security",
        },
      ]

    case "escalate":
      return [
        {
          id: id(),
          from: "bot",
          text: "I'll connect you with a UCB customer service representative. Choose how you'd like to reach us:",
          textKm: "ខ្ញុំនឹងភ្ជាប់អ្នកជាមួយអ្នកតំណាងសេវាអតិថិជន UCB:",
          ts: Date.now(),
          buttons: [
            {
              label: "📞 Call +855 23 999 001",
              action: "noop",
              variant: "primary",
            },
            {
              label: "✉️ Send a Message",
              action: "go-contact",
              variant: "outline",
            },
            {
              label: "🚨 Emergency Fraud Line",
              action: "report-fraud",
              variant: "danger",
            },
          ],
        },
      ]

    case "go-contact":
      return [
        {
          id: id(),
          from: "bot",
          text: "Opening the contact form...",
          ts: Date.now(),
          navigateTo: "contact",
        },
      ]

    case "main-menu":
      return [
        {
          id: id(),
          from: "bot",
          text: "Main menu — what can I help you with?",
          textKm: "ម៉ឺនុយចម្បង — ខ្ញុំអាចជួយអ្នកអ្វី?",
          ts: Date.now(),
          buttons: QUICK_ACTIONS,
        },
      ]

    default:
      return [
        {
          id: id(),
          from: "bot",
          text: "I'm sorry, I didn't quite understand that. I can best help with branch locations, exchange rates, product info, loan calculators, and digital banking. Would you like to speak to a customer service agent?",
          ts: Date.now(),
          buttons: [
            {
              label: "🙋 Yes, connect me",
              action: "escalate",
              variant: "primary",
            },
            {
              label: "↩ Back to Menu",
              action: "main-menu",
              variant: "outline",
            },
          ],
        },
      ]
  }
}

/** Returns a scripted chatbot answer for recognized user keywords. */
function getKeywordReply(text: string): string {
  const t = text.toLowerCase()
  if (/\b(loan|borrow|mortgage|credit|km|repay)/i.test(t)) return "loan-info"
  if (/\b(account|open|savings|deposit|current)\b/i.test(t))
    return "personal-products"
  if (/\b(atm|branch|location|near|where)\b/i.test(t)) return "find-branch"
  if (/\b(exchange|rate|currency|usd|khr|dollar|riel)\b/i.test(t))
    return "exchange-rates"
  if (/\b(app|mobile|download|internet bank|online)\b/i.test(t))
    return "digital-banking"
  if (/\b(card|debit|visa|credit card)\b/i.test(t)) return "card-info"
  if (/\b(hi|hello|good morning|good afternoon|hey|howdy)\b/i.test(t))
    return "welcome-back"
  if (/\b(block|stolen|lost|fraud|scam|phish)\b/i.test(t)) return "report-fraud"
  if (/\b(business|company|sme|corporate|trade)\b/i.test(t))
    return "business-products"
  if (/\b(calculator|calculat|estimate|repayment)\b/i.test(t))
    return "loan-calculator"
  return "fallback"
}

/** Renders the customer-help chatbot widget and message flow. */
export default function ChatbotWidget({ navigate, lang }: ChatbotWidgetProps) {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [typing, setTyping] = useState(false)
  const [inputText, setInputText] = useState("")
  const [privacyDismissed, setPrivacyDismissed] = useState(false)
  const [chatLang, setChatLang] = useState<LocaleCode>(lang)
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem("ucb_chat_v1")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [unread, setUnread] = useState(0)
  const initialized = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      sessionStorage.setItem("ucb_chat_v1", JSON.stringify(messages.slice(-50)))
    } catch {}
  }, [messages])

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    if (messagesEndRef.current && open && !minimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, typing, open, minimized])

  /** Queues chatbot messages so replies appear with a short delay. */
  const addMessages = (msgs: ChatMessage[], delay = 700) => {
    setTyping(true)
    // Stagger replies so the conversation reads in the same order as the queue.
    msgs.forEach((msg, i) => {
      setTimeout(
        () => {
          setMessages((prev) => [...prev, msg])
          if (i === msgs.length - 1) setTyping(false)
          if (!open) setUnread((u) => u + 1)
          if (msg.navigateTo) {
            setTimeout(() => navigate(msg.navigateTo!), 400)
          }
        },
        delay + i * 600,
      )
    })
  }

  /** Opens the chatbot panel and clears unread message state. */
  const handleOpen = () => {
    setOpen(true)
    setMinimized(false)
    if (!initialized.current) {
      initialized.current = true
      addMessages(getBotReplies("welcome", chatLang), 500)
    }
  }

  /** Handles a chatbot quick action and appends the scripted response. */
  const handleAction = (action: string) => {
    if (action === "noop") return
    const replies = getBotReplies(action, chatLang)
    if (action === "welcome-back") {
      setMessages((prev) => [
        ...prev,
        {
          id: id(),
          from: "bot",
          text: "👋 Hello again! How can I help?",
          ts: Date.now(),
          buttons: QUICK_ACTIONS,
        },
      ])
      return
    }
    addMessages(replies)
  }

  /** Handles free-text chatbot submission and appends a matching response. */
  const handleSend = (e?: FormEvent) => {
    e?.preventDefault()
    const text = inputText.trim()
    if (!text) return

    // Security check
    if (SENSITIVE.test(text)) {
      setInputText("")
      const warn: ChatMessage = {
        id: id(),
        from: "system",
        text: "🔒 For your security, please do not share passwords, PINs, OTPs, CVVs, or card/account numbers in this chat. UCB staff will never ask for these.",
        ts: Date.now(),
        isError: true,
      }
      setMessages((prev) => [...prev, warn])
      return
    }

    const userMsg: ChatMessage = {
      id: id(),
      from: "user",
      text,
      ts: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInputText("")

    const action = getKeywordReply(text)
    addMessages(
      getBotReplies(
        action === "welcome-back" ? "welcome-back" : action,
        chatLang,
      ),
    )
  }

  /** Returns message text for the active chatbot language. */
  const txt = (msg: ChatMessage) =>
    chatLang === "km" && msg.textKm ? msg.textKm : msg.text
  /** Returns button text for the active chatbot language. */
  const btnLabel = (b: Btn) =>
    chatLang === "km" && b.labelKm ? b.labelKm : b.label

  /** Renders a user-authored chatbot message bubble. */
  const BubbleUser = ({ msg }: { msg: ChatMessage }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "0.625rem",
        gap: 8,
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          maxWidth: "78%",
          background: "#009C9F",
          color: "#fff",
          borderRadius: "18px 18px 4px 18px",
          padding: "0.625rem 0.875rem",
          fontSize: 14,
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {msg.text}
      </div>
    </div>
  )

  /** Renders a bot-authored chatbot message bubble. */
  const BubbleBot = ({ msg }: { msg: ChatMessage }) => (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: "0.625rem",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          flexShrink: 0,
          background: "linear-gradient(135deg, #009C9F, #007B7E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        U
      </div>
      <div
        style={{
          maxWidth: "82%",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            background: msg.isEmergency
              ? "#FFF5F5"
              : msg.isError
                ? "#FFFBEB"
                : "#fff",
            border: msg.isEmergency
              ? "1.5px solid #FCA5A5"
              : msg.isError
                ? "1.5px solid #FDE68A"
                : "1px solid #E5E7EB",
            borderRadius: "18px 18px 18px 4px",
            padding: "0.625rem 0.875rem",
            fontSize: 14,
            lineHeight: 1.6,
            color: msg.isEmergency ? "#DC2626" : "#0A2540",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          {txt(msg)}
        </div>

        {/* Card rows */}
        {msg.rows && msg.rows.length > 0 && (
          <div
            style={{
              background: "#F4F6F8",
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid #E5E7EB",
            }}
          >
            {msg.rows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 8,
                  padding: "0.5rem 0.75rem",
                  fontSize: 12,
                  borderBottom:
                    i < msg.rows!.length - 1 ? "1px solid #E5E7EB" : "none",
                  background: i === 0 ? "#E6F7F7" : undefined,
                  fontWeight: i === 0 ? 700 : 400,
                }}
              >
                <span style={{ color: "#374151" }}>{row.label}</span>
                <span
                  style={{
                    color: "#0A2540",
                    fontWeight: 600,
                    textAlign: "right",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Navigate link */}
        {msg.navigateTo && msg.navLabel && (
          <button
            onClick={() => {
              navigate(msg.navigateTo!)
              setOpen(false)
            }}
            style={{
              alignSelf: "flex-start",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#009C9F",
              fontSize: 13,
              fontWeight: 600,
              padding: 0,
              textDecoration: "underline",
            }}
          >
            {msg.navLabel}
          </button>
        )}

        {/* Action buttons */}
        {msg.buttons && msg.buttons.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.375rem",
              marginTop: 2,
            }}
          >
            {msg.buttons.map((btn) => (
              <button
                key={btn.action + btn.label}
                onClick={() => {
                  if (btn.action === "noop") return
                  const userEcho: ChatMessage = {
                    id: id(),
                    from: "user",
                    text: btn.label,
                    ts: Date.now(),
                  }
                  setMessages((prev) => [...prev, userEcho])
                  handleAction(btn.action)
                }}
                style={{
                  padding: "0.375rem 0.75rem",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: btn.action === "noop" ? "default" : "pointer",
                  border:
                    btn.variant === "danger"
                      ? "1.5px solid #FCA5A5"
                      : btn.variant === "primary"
                        ? "none"
                        : "1.5px solid #009C9F",
                  background:
                    btn.variant === "primary"
                      ? "#009C9F"
                      : btn.variant === "danger"
                        ? "#FFF5F5"
                        : "#fff",
                  color:
                    btn.variant === "primary"
                      ? "#fff"
                      : btn.variant === "danger"
                        ? "#DC2626"
                        : "#009C9F",
                  transition: "all 120ms",
                  whiteSpace: "nowrap",
                }}
              >
                {btnLabel(btn)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  /** Renders a system notice inside the chatbot transcript. */
  const BubbleSystem = ({ msg }: { msg: ChatMessage }) => (
    <div style={{ textAlign: "center", margin: "0.5rem 0" }}>
      <div
        style={{
          display: "inline-block",
          fontSize: 12,
          color: "#92400E",
          background: "#FFFBEB",
          border: "1px solid #FDE68A",
          borderRadius: 8,
          padding: "0.5rem 0.875rem",
          maxWidth: "90%",
        }}
      >
        {msg.text}
      </div>
    </div>
  )

  /** Renders the animated chatbot typing indicator. */
  const TypingIndicator = () => (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: "0.625rem",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          flexShrink: 0,
          background: "linear-gradient(135deg, #009C9F, #007B7E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        U
      </div>
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: "18px 18px 18px 4px",
          padding: "0.75rem 1rem",
          display: "flex",
          gap: 4,
          alignItems: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <span
          className="ucb-dot"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#009C9F",
            display: "inline-block",
          }}
        />
        <span
          className="ucb-dot ucb-dot-2"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#009C9F",
            display: "inline-block",
          }}
        />
        <span
          className="ucb-dot ucb-dot-3"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#009C9F",
            display: "inline-block",
          }}
        />
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes ucbBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 1; }
          30% { transform: translateY(-5px); opacity: 0.7; }
        }
        .ucb-dot { animation: ucbBounce 1.2s ease-in-out infinite; }
        .ucb-dot-2 { animation-delay: 0.2s; }
        .ucb-dot-3 { animation-delay: 0.4s; }
        @keyframes ucbSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ucb-chat-panel { animation: ucbSlideUp 200ms ease-out; }
        @keyframes ucbPop {
          0% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .ucb-unread-badge { animation: ucbPop 200ms ease-out; }
        @media (max-width: 520px) {
          .ucb-chat-panel {
            position: fixed !important;
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 20px 20px 0 0 !important;
            height: 88dvh !important;
            max-height: 88dvh !important;
          }
          .ucb-launcher { bottom: 16px !important; right: 16px !important; }
        }
      `}</style>

      {/* Launcher button */}
      {(!open || minimized) && (
        <button
          className="ucb-launcher"
          onClick={handleOpen}
          aria-label="Open UCB Virtual Assistant"
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 900,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #009C9F, #007B7E)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,156,159,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 22,
            transition: "transform 150ms, box-shadow 150ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)"
            e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,156,159,0.55)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,156,159,0.45)"
          }}
        >
          💬
          {unread > 0 && (
            <div
              className="ucb-unread-badge"
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#DC2626",
                color: "#fff",
                fontSize: 11,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #fff",
              }}
            >
              {unread > 9 ? "9+" : unread}
            </div>
          )}
        </button>
      )}

      {/* Tooltip */}
      {(!open || minimized) && (
        <div
          style={{
            position: "fixed",
            bottom: 92,
            right: 28,
            zIndex: 899,
            background: "#0A2540",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            padding: "0.375rem 0.75rem",
            borderRadius: 8,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          Need help? 👋
          <div
            style={{
              position: "absolute",
              bottom: -5,
              right: 22,
              width: 10,
              height: 10,
              background: "#0A2540",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      )}

      {/* Chat panel */}
      {open && !minimized && (
        <div
          className="ucb-chat-panel"
          role="dialog"
          aria-modal="true"
          aria-label="UCB Virtual Assistant"
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 901,
            width: 380,
            height: 560,
            maxHeight: "80dvh",
            background: "#F4F6F8",
            borderRadius: 20,
            boxShadow: "0 16px 64px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
              padding: "1rem 1.25rem",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #009C9F, #007B7E)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 13,
                    color: "#fff",
                  }}
                >
                  UCB
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>
                    UCB Virtual Assistant
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#4ADE80",
                      }}
                    />
                    <span
                      style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}
                    >
                      Online · Typically replies instantly
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {/* Lang toggle */}
                <button
                  onClick={() =>
                    setChatLang((l) =>
                      l === "en" ? "km" : l === "km" ? "zh-CN" : "en",
                    )
                  }
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "none",
                    borderRadius: 6,
                    padding: "3px 8px",
                    minWidth: 44,
                    minHeight: 44,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    cursor: "pointer",
                    letterSpacing: 0.3,
                  }}
                  aria-label="Toggle language"
                >
                  {chatLang === "en"
                    ? "ខ្មែរ"
                    : chatLang === "km"
                      ? "中文"
                      : "EN"}
                </button>
                <button
                  onClick={() => setMinimized(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    fontSize: 18,
                    padding: "2px 6px",
                    borderRadius: 6,
                  }}
                  aria-label="Minimize chat"
                >
                  ─
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    fontSize: 18,
                    padding: "2px 6px",
                    borderRadius: 6,
                  }}
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Emergency shortcut */}
            <button
              onClick={() => {
                const userEcho: ChatMessage = {
                  id: id(),
                  from: "user",
                  text: "🚨 Block Lost Card / Report Fraud",
                  ts: Date.now(),
                }
                setMessages((prev) => [...prev, userEcho])
                addMessages(getBotReplies("report-fraud", chatLang))
              }}
              style={{
                marginTop: "0.75rem",
                width: "100%",
                textAlign: "center",
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(252,165,165,0.4)",
                borderRadius: 8,
                padding: "0.5rem",
                fontSize: 12,
                fontWeight: 700,
                color: "#FCA5A5",
                cursor: "pointer",
                letterSpacing: 0.3,
              }}
            >
              🚨 Block Lost Card / Report Fraud — Call +855 23 999 911
            </button>
          </div>

          {/* Privacy notice */}
          {!privacyDismissed && (
            <div
              style={{
                background: "#FFFBEB",
                borderBottom: "1px solid #FDE68A",
                padding: "0.625rem 1rem",
                flexShrink: 0,
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 14, flexShrink: 0 }}>🔒</span>
              <p
                style={{
                  fontSize: 11,
                  color: "#92400E",
                  lineHeight: 1.5,
                  flex: 1,
                }}
              >
                <strong>Privacy:</strong> Do not send passwords, PINs, OTPs,
                card numbers, CVVs, or account details in this chat.
              </p>
              <button
                onClick={() => setPrivacyDismissed(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#92400E",
                  cursor: "pointer",
                  fontSize: 14,
                  flexShrink: 0,
                  padding: 0,
                }}
              >
                ✕
              </button>
            </div>
          )}

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.length === 0 && !typing && (
              <div
                style={{
                  textAlign: "center",
                  color: "#9CA3AF",
                  fontSize: 13,
                  marginTop: "2rem",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>💬</div>
                <div>Starting chat...</div>
              </div>
            )}
            {messages.map((msg) =>
              msg.from === "user" ? (
                <BubbleUser key={msg.id} msg={msg} />
              ) : msg.from === "system" ? (
                <BubbleSystem key={msg.id} msg={msg} />
              ) : (
                <BubbleBot key={msg.id} msg={msg} />
              ),
            )}
            {typing && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSend}
            style={{
              background: "#fff",
              borderTop: "1px solid #E5E7EB",
              padding: "0.75rem 1rem",
              flexShrink: 0,
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            <input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                chatLang === "km" ? "វាយសំណួររបស់អ្នក..." : "Type your message..."
              }
              aria-label="Chat message"
              maxLength={400}
              style={{
                flex: 1,
                padding: "0.625rem 0.875rem",
                border: "1.5px solid #E5E7EB",
                borderRadius: 20,
                fontSize: 14,
                outline: "none",
                fontFamily: "inherit",
                resize: "none",
                transition: "border-color 150ms",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || typing}
              aria-label="Send message"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background: inputText.trim() && !typing ? "#009C9F" : "#E5E7EB",
                color: inputText.trim() && !typing ? "#fff" : "#9CA3AF",
                cursor: inputText.trim() && !typing ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
                transition: "all 150ms",
              }}
            >
              ➤
            </button>
          </form>

          {/* Footer */}
          <div
            style={{
              background: "#fff",
              borderTop: "1px solid #F4F6F8",
              padding: "0.375rem 1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 10, color: "#9CA3AF" }}>
              Secured by UCB · Session only · Not for sensitive data
            </span>
            <button
              onClick={() => {
                setMessages([])
                initialized.current = false
                sessionStorage.removeItem("ucb_chat_v1")
                setTimeout(() => {
                  initialized.current = true
                  addMessages(getBotReplies("welcome", chatLang), 300)
                }, 100)
              }}
              style={{
                fontSize: 10,
                color: "#9CA3AF",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Clear chat
            </button>
          </div>
        </div>
      )}

      {/* Minimized pill */}
      {open && minimized && (
        <button
          onClick={() => setMinimized(false)}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 901,
            background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
            color: "#fff",
            borderRadius: 30,
            padding: "0.625rem 1.25rem",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #009C9F, #007B7E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            UCB
          </div>
          <span>UCB Assistant</span>
          {unread > 0 && (
            <div
              style={{
                background: "#DC2626",
                color: "#fff",
                borderRadius: "50%",
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              {unread}
            </div>
          )}
          <span style={{ fontSize: 12, opacity: 0.7 }}>▲</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: 16,
              padding: "0 0 0 4px",
            }}
            aria-label="Close chat"
          >
            ✕
          </button>
        </button>
      )}
    </>
  )
}
