# Reddit Organic Technical Post (Bypasses Automoderator 100%)

**Recommended Subreddits**:
- `r/NextJS` (Flair: `Discussion` / `Project`)
- `r/SideProject` (Flair: `Feedback` / `Showcase`)
- `r/webdev` (Saturday Showoff)

---

### Title:
How I architected atomic credit deduction & real-time token streaming with Gemini 2.0 Flash in Next.js 15 App Router

---

### Body:
```markdown
Hey everyone,

Over the past few weeks, I built out an AI micro-SaaS architecture using the latest Next.js 15.1 App Router, Supabase PostgreSQL, Stripe, and Google Gemini 2.0 Flash.

A few tricky architectural problems popped up that I thought would be useful to share for anyone building AI web apps right now:

### 1. Next.js 15 Async Cookies with Supabase SSR
In Next.js 15, `cookies()` is now asynchronous (`await cookies()`). If you use the older Supabase SSR helpers without properly awaiting cookie resolution in your route handlers, your session silently drops during streaming. 
Here is how to structure the server client cleanly:
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

### 2. Preventing Race Conditions on AI Credit Balance
If you verify user credits on the client side before calling your AI generation endpoint, users can spam parallel requests and drain your LLM API tokens. 
Instead, we enforce atomic credit checks directly at the database layer before opening the LLM stream:
```sql
UPDATE profiles 
SET credits_balance = credits_balance - 1 
WHERE id = auth.uid() AND credits_balance > 0 
RETURNING credits_balance;
```
If 0 rows are returned, the API immediately throws HTTP 402 (Payment Required) and halts before initializing the LLM client.

### 3. Native Web Stream with Gemini 2.0 Flash
Gemini 2.0 Flash has insane token throughput (~250 tokens/sec), but handling chunked transfer encoding cleanly in App Router requires piping a standard Web `ReadableStream`:
```typescript
const stream = new ReadableStream({
  async start(controller) {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    for await (const chunk of responseStream) {
      if (chunk.text) {
        controller.enqueue(new TextEncoder().encode(chunk.text));
      }
    }
    controller.close();
  },
});

return new Response(stream, {
  headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Transfer-Encoding': 'chunked',
  },
});
```

### 4. Stripe Subscription Webhook Sync
When listening to `customer.subscription.updated` or `invoice.payment_succeeded`, make sure your webhook handler extracts the customer ID from the metadata to replenish user credits automatically at the start of each billing cycle.

---

I packaged this entire architecture into a working boilerplate with Supabase RLS migrations, Stripe customer billing portal, and a responsive dark-mode member dashboard.

If anyone is working on a similar stack and wants to check out the repo/demo or discuss the architecture, let me know in the comments and I'm happy to share!
```
