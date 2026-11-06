# Developer Community Distribution Playbook: ApexSaaS AI & AutoFlow AI

---

## Post 1: Reddit (`r/SideProject` & `r/NextJS`)

**Suggested Subreddits**:
- `r/SideProject` (Flair: *Showcase* / *Product*)
- `r/NextJS` (Flair: *Showoff Saturday* / *Project*)
- `r/SaaS` (Flair: *Launch* / *Feedback*)

### Title:
> I built a production Next.js 15 + Supabase + Stripe + Gemini 2.0 micro-SaaS boilerplate so you don't waste 200 hours on plumbing

### Body:
```markdown
Hey everyone,

Like a lot of developers here, whenever I have an idea for an AI app, I find myself spending 2-3 weeks building the exact same boilerplate stuff before writing a single line of actual product logic:
- Configuring Next.js 15 App Router with server cookie handling and zero hydration errors
- Setting up PostgreSQL with Row Level Security (RLS) policies so users can't snoop on other users
- Writing database triggers so new signups automatically get 50 starter credits
- Listening to Stripe webhook events (`checkout.session.completed`, `customer.subscription.updated`, invoice renewals)
- Handling streaming completions from LLMs token-by-token using `ReadableStream`

I finally got fed up and packaged my entire battle-tested stack into **ApexSaaS AI**.

### 🛠 The Stack:
- **Framework**: Next.js 15.1 (App Router), React 19, Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL, RLS policies, automated 50-credit trigger on signup)
- **Payments**: Stripe (Checkout sessions, customer billing portal, recurring subscriptions, webhook sync)
- **AI Streaming**: Pre-wired for both **Google Gemini 2.0 Flash** (`@google/genai`) and **OpenAI GPT-4o** (`openai`)
- **Dashboard**: Complete responsive dark-theme member dashboard with credit meters and an interactive streaming playground
- **Type Safety**: 100% strict TypeScript (no loose `any` types)

### 💡 Why Gemini 2.0 Flash?
Gemini 2.0 Flash has insane token throughput (~250 tokens/sec) and negligible API cost compared to older models, making it the perfect default engine for micro-SaaS tools where margin matters.

### 📦 Source & Demo:
I've made the full codebase available on Gumroad. To celebrate the release, I set up a 50% discount code (`LAUNCH50`) for the first 20 builders:

👉 **Starter Kit & Live Demo**: https://samabdus.gumroad.com/l/apexsaas-ai/LAUNCH50

Would love feedback from the community on the architecture or any features you'd like to see added to the boilerplate!
```

---

## Post 2: Indie Hackers & Dev.to

### Title:
> How I architected a Next.js 15 + Supabase + Stripe + Gemini 2.0 SaaS Starter Kit in 2026

### Body:
```markdown
The hardest part about launching an AI micro-SaaS isn't the AI model—it's the unglamorous glue code:
1. Ensuring Supabase auth tokens refresh properly across Next.js 15 async Server Components (`await cookies()`).
2. Deducting credits atomically in PostgreSQL before streaming tokens so users don't run up your API bill.
3. Managing Stripe customer portal redirects and webhook verification signatures.

Here is how I structured the solution in **ApexSaaS AI**:

### 1. Atomic Credit Deductions with Postgres RLS:
Instead of verifying credits in frontend code, every AI generation request hits `/api/ai/generate` which checks `profiles.credits_balance > 0`, decrements 1 credit in the transaction, and writes an audit log to `ai_generations`.

### 2. Multi-LLM Streaming:
Using standard Web API `ReadableStream` piped directly into Next.js Route Handlers. This works identically for Google GenAI (`gemini-2.0-flash`) and OpenAI (`gpt-4o-mini`).

### 3. Turnkey Launch:
If you want to skip the 200 hours of plumbing for your next project, you can grab the complete production codebase here with 50% off using code **LAUNCH50**:
👉 https://samabdus.gumroad.com/l/apexsaas-ai/LAUNCH50
```
