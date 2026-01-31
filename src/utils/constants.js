export const BASE_URL =
  location.hostname == "localhost" ? import.meta.env.VITE_API_URL : "/api";
import { Crown, Star, Rocket } from "lucide-react";
//["ignored", "interested"];
export const CONNECTION_REQUESTS = {
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  INTERESTED: "interested",
  IGNORED: "ignored",
};

const PACKAGES_ENUM = {
   BASIC: "basic",
  PREMIUM: "premium",
  PRO: "pro",
};

export const plans = {
  basic: {
    name: PACKAGES_ENUM.BASIC,
    price: { monthly: 0, annual: 0 },
    color: "from-blue-500 to-cyan-600",
    // icon: <Star className="w-6 h-6" />,
    features: [
      { text: "10 Likes per day", included: true },
      { text: "Basic Filters (Age, Distance)", included: true },
      { text: "See who liked you", included: false },
      { text: "Rewind (Undo swipe)", included: false },
      { text: "Super Likes", included: false },
      { text: "Boost Profile", included: false },
      { text: "Advanced Filters", included: false },
      { text: "Read Receipts", included: false },
      { text: "Priority Support", included: false },
      { text: "Travel Mode", included: false },
    ],
    cta: "Current Plan",
    popular: false,
  },
  premium: {
    name: PACKAGES_ENUM.PREMIUM,
    price: { monthly: 199, annual: 1999 },
    color: "from-pink-500 to-orange-500",
    // icon: <Crown className="w-6 h-6" />,
    features: [
      { text: "Unlimited Likes", included: true },
      { text: "See who liked you", included: true },
      { text: "5 Super Likes per week", included: true },
      { text: "1 Boost per month", included: true },
      { text: "Advanced Filters", included: true },
      { text: "Rewind (Unlimited)", included: true },
      { text: "Read Receipts", included: false },
      { text: "Priority Support", included: true },
      { text: "Travel Mode", included: false },
      { text: "Concierge Service", included: false },
    ],
    cta: "Upgrade Now",
    popular: true,
  },
  pro: {
    name: PACKAGES_ENUM.PRO,
    price: { monthly: 399, annual: 3999 },
    color: "from-purple-600 to-pink-600",
    // icon: <Rocket className="w-6 h-6" />,
    features: [
      { text: "Everything in Premium", included: true },
      { text: "Unlimited Super Likes", included: true },
      { text: "Unlimited Boosts", included: true },
      { text: "Top Picks Daily", included: true },
      { text: "Read Receipts", included: true },
      { text: "Travel Mode", included: true },
      { text: "Concierge Service", included: true },
      { text: "Profile Review & Optimization", included: true },
      { text: "Priority in Search Results", included: true },
      { text: "24/7 VIP Support", included: true },
    ],
    cta: "Go Pro",
    popular: false,
  },
};


export const API_END_POINTS={
  USER:"/user",
  AUTH:"/auth",
  FEED:"/feed",
  CONNECTION:"/connections",
 ORDER:"/orders"
}