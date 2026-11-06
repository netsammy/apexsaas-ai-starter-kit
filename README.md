<div align="center">

# ⚡ ApexSaaS AI — Next.js 15 AI Micro-SaaS Starter Kit

**Ship your production AI Micro-SaaS in 24 hours, not 3 months.**  
Pre-wired with Next.js 15 App Router, Supabase Auth & PostgreSQL, Stripe Subscriptions, and Google Gemini 2.0 / OpenAI streaming.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Subscriptions-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Gemini 2.0](https://img.shields.io/badge/Google-Gemini_2.0_Flash-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Gumroad 50% Off](https://img.shields.io/badge/Early_Bird-50%25_OFF_(LAUNCH50)-ff424d?style=for-the-badge&logo=gumroad)](https://samabdus.gumroad.com/l/apexsaas-ai/LAUNCH50)

<br/>

[Live Product Page](https://samabdus.gumroad.com/l/apexsaas-ai) • [Claim 50% Off Early Bird](https://samabdus.gumroad.com/l/apexsaas-ai/LAUNCH50) • [Architecture](#-architecture) • [Quickstart](#-5-minute-quickstart)

</div>

---

## 💡 Why ApexSaaS AI?

Whenever founders start building an AI tool, **80% of development time disappears into plumbing** before writing a single feature:
- ❌ Configuring Next.js 15 App Router with server cookie handling and zero hydration errors
- ❌ Setting up PostgreSQL with Row Level Security (RLS) policies so users can't see each other's data
- ❌ Writing database triggers so new signups automatically get **50 starter credits**
- ❌ Listening to Stripe webhook events (`checkout.session.completed`, `customer.subscription.updated`, invoice renewals)
- ❌ Handling token-by-token streaming from Google Gemini & OpenAI using `ReadableStream`

**ApexSaaS AI** solves all of this out-of-the-box so you can launch in hours instead of weeks.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 15.1.7 (App Router, Server Actions, Edge Routes)
- **UI & Styling**: Tailwind CSS, Lucide React, Cyber Dark Theme
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Automated Credit Triggers)
- **Payments**: Stripe (Checkout Sessions, Customer Billing Portal, Verified Webhook Handlers)
- **AI Engines**:
  - Google Gemini 2.0 Flash & Gemini 1.5 Pro via `@google/genai`
  - OpenAI GPT-4o & GPT-4o-mini via official `openai` SDK
- **Member Dashboard**: Live credit meters, interactive streaming chat playground, subscription manager
- **Type Safety**: 100% strict TypeScript (zero loose `any` types)

---

## 🚀 5-Minute Quickstart

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/netsammy/apexsaas-ai-starter-kit.git
cd apexsaas-ai-starter-kit
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

GEMINI_API_KEY=AIzaSy...
OPENAI_API_KEY=sk-...
```

### 3. Setup Supabase Database & Auth Trigger

1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to the **SQL Editor**.
3. Copy and paste the entire contents of `supabase/schema.sql`.
4. Click **Run**.
   - This sets up `profiles`, `subscriptions`, `credit_transactions`, and `ai_generations` tables with strict RLS policies.
   - It also establishes the `handle_new_user()` trigger which automatically gives **50 free credits** to every new signup.

### 4. Setup Stripe Webhook (Local Testing)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your landing page, interactive AI generator, and billing portal.

---

## 📦 Commercial Licenses

- **ApexSaaS AI Starter ($79)**: Single commercial SaaS product.
- **ApexSaaS AI Unlimited Pro ($149)**: Unlimited commercial SaaS products + full agency client rights.

👉 **Get the complete production package with 50% off (Code `LAUNCH50`):**  
[https://samabdus.gumroad.com/l/apexsaas-ai/LAUNCH50](https://samabdus.gumroad.com/l/apexsaas-ai/LAUNCH50)

---

## ⭐ Star the Repo!
If you find this starter kit helpful, please give it a star! It helps other indie hackers discover it.
