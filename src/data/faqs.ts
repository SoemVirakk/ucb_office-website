export interface FaqItem {
  q: string
  a: string
}

export interface FaqCategory {
  id: string
  title: string
  items: FaqItem[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    title: "General Banking",
    items: [
      {
        q: "How do I open an account with UCB?",
        a: "You can open an account online via the UCB Mobile App (eKYC, takes under 10 minutes) or visit any UCB branch with your National ID or Passport and a proof of address.",
      },
      {
        q: "What are UCB's banking hours?",
        a: "Most branches are open Monday–Friday 8:00 AM–5:00 PM and Saturday 8:00 AM–12:00 PM. Some branches have extended hours. ATMs are available 24/7.",
      },
      {
        q: "Can foreigners open a bank account at UCB?",
        a: "Yes. Foreigners with a valid passport and long-stay visa (type E or EB) can open a savings or current account at any UCB branch.",
      },
      {
        q: "Is my money insured?",
        a: "Yes. Deposits are protected under the Cambodia Deposit Guarantee Corporation (CDGC) scheme up to KHR 30 million per depositor.",
      },
      {
        q: "How do I update my personal information?",
        a: "Visit any UCB branch with your updated documents, or for address changes, use UCB Internet Banking under Profile > Update Information.",
      },
    ],
  },
  {
    id: "digital",
    title: "Digital Banking",
    items: [
      {
        q: "How do I register for UCB Mobile Banking?",
        a: 'Download the UCB Mobile App from the App Store or Google Play, tap "Register," enter your account number and registered mobile number, and complete OTP verification.',
      },
      {
        q: "What should I do if I forget my mobile banking PIN?",
        a: 'On the login screen, tap "Forgot PIN" and reset it via OTP to your registered mobile number. If you can\'t receive the OTP, visit any UCB branch.',
      },
      {
        q: "Is UCB Mobile Banking available in Khmer?",
        a: "Yes. Switch the language to ភាសាខ្មែរ in the app's Settings > Language.",
      },
      {
        q: "What is the daily transfer limit?",
        a: "The default daily transfer limit is USD 5,000. You can request an increase up to USD 20,000 via the app or at any branch.",
      },
      {
        q: "Are my online banking sessions secure?",
        a: "Yes. UCB uses 256-bit SSL encryption, biometric authentication, OTP for transactions, and automatic session timeout after 15 minutes of inactivity.",
      },
    ],
  },
  {
    id: "loans",
    title: "Loans",
    items: [
      {
        q: "How long does loan approval take?",
        a: "Personal loans typically take 1–3 business days. Home loans and SME loans may take 5–10 business days depending on documentation completeness.",
      },
      {
        q: "Can I repay my loan early?",
        a: "Yes. Early repayment is allowed. An early repayment fee may apply — please check your loan agreement or contact your loan officer.",
      },
      {
        q: "What collateral is required for a business loan?",
        a: "For SME loans under USD 30,000, no collateral may be required. For larger amounts, property, vehicles, or fixed deposits are accepted as collateral.",
      },
      {
        q: "How do I check my loan balance?",
        a: "Log in to UCB Mobile App or Internet Banking and navigate to Loans > My Loans to see your outstanding balance, next payment date, and schedule.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Fraud",
    items: [
      {
        q: "What should I do if I suspect fraud on my account?",
        a: "Call our 24-hour fraud hotline immediately at +855 23 999 911. You can also freeze your card instantly via UCB Mobile App > Cards > Freeze Card.",
      },
      {
        q: "UCB will never ask for your PIN or OTP. If someone calls claiming to be UCB and asks for this, what should you do?",
        a: "Hang up immediately. UCB staff will never ask for your PIN, OTP, or full card number. Report the call to +855 23 999 911.",
      },
      {
        q: "How can I protect myself from phishing?",
        a: "Always access UCB Internet Banking by typing www.ucb.com.kh directly in your browser. UCB emails always come from @ucb.com.kh. Never click links in SMS or email claiming to be from UCB.",
      },
      {
        q: "Can I temporarily block my debit or credit card?",
        a: "Yes. Open UCB Mobile App > Cards > [select card] > Freeze Card. You can unfreeze at any time. For permanent cancellation, call +855 23 999 001.",
      },
    ],
  },
  {
    id: "accounts",
    title: "Account Opening",
    items: [
      {
        q: "What documents do I need to open a personal savings account?",
        a: "You need a valid National ID or Passport and a proof of address (utility bill, rental agreement, or an official letter). A recent passport photo may also be required.",
      },
      {
        q: "What is the minimum initial deposit?",
        a: "There is no minimum balance for UCB Savings Account. For Current Account, the minimum initial deposit is USD 100 or KHR 400,000.",
      },
      {
        q: "Can I open a joint account?",
        a: "Yes. Joint accounts are available. Both account holders must be present at a branch with their identification documents.",
      },
      {
        q: "How do I close my account?",
        a: "Visit any UCB branch with your ID and account details. Account closure is processed same-day and remaining funds are returned by cash or bank draft.",
      },
    ],
  },
]
