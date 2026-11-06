export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  credits_balance: number;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export type SubscriptionPlanTier = 'starter' | 'pro' | 'enterprise' | 'lifetime';

export interface UserSubscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string;
  plan_tier: SubscriptionPlanTier;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIGenerationLog {
  id: string;
  user_id: string;
  prompt: string;
  response: string;
  model_used: string;
  credits_cost: number;
  tokens_used?: number;
  created_at: string;
}

export interface PlanConfig {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  creditsPerMonth: number;
  stripePriceIdMonthly: string;
  stripePriceIdYearly: string;
  features: string[];
  popular?: boolean;
}
