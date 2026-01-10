import React, { useState } from "react";
import { FullPageLoader } from "../components/Loader";
import { 
  Crown, 
  Star, 
  Zap, 
  Check, 
  X, 
  Sparkles,
  Flame,
  Heart,
  Users,
  MessageCircle,
  Globe,
  Shield,
  Award,
  Rocket,
  Clock,
  Filter,
  Eye,
  Badge,
  TrendingUp,
  ChevronLeft
} from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import useUpgrade from "../hooks/useUpgrade";
import {plans} from "../utils/constants";

const UpgradePack = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'annual'
  const {payNow,loading} = useUpgrade()

 

  const handleUpgrade = async (PLAN) => {
    //alert(`Upgrading to ${plan} plan...`);
    // In real app, integrate with payment gateway
    console.log('plan selected',PLAN)
    await payNow(PLAN)
  };

  const calculateSavings = (plan) => {
    const monthly = plans[plan].price.monthly;
    const annual = plans[plan].price.annual;
    const annualMonthlyEquivalent = annual / 12;
    return Math.round(((monthly - annualMonthlyEquivalent) / monthly) * 100);
  };

  const popularBadge = (
    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center">
        <Flame className="w-3 h-3 mr-1" />
        MOST POPULAR
      </div>
    </div>
  );

  if(loading){
    return <FullPageLoader isLoading={loading} />
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-ghost hover:bg-gray-800/50 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-center">
                <Crown className="w-8 h-8 mr-3" />
                Upgrade Your Experience
              </h1>
              <p className="text-gray-400 mt-2">
                Unlock premium features to find better matches
              </p>
            </div>

            <div className="w-20"></div>
          </div>

          {/* Stats Banner */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">10x</div>
                  <div className="text-sm text-gray-400">More Matches</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">89%</div>
                  <div className="text-sm text-gray-400">Response Rate</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2.5M+</div>
                  <div className="text-sm text-gray-400">Premium Members</div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-1 inline-flex border border-gray-700/50">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingCycle === "monthly"
                    ? "bg-gradient-to-r from-pink-500 to-orange-500"
                    : "hover:bg-gray-700/50"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-full transition-all flex items-center ${
                  billingCycle === "annual"
                    ? "bg-gradient-to-r from-pink-500 to-orange-500"
                    : "hover:bg-gray-700/50"
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                  Save up to 50%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Card */}
            <div className="relative">
              <div className={`card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl h-full transition-all duration-300 ${
                selectedPlan === "basic" ? "ring-2 ring-blue-500" : ""
              }`}>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center`}>
                      {plans.basic.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{plans.basic.name}</h3>
                      <p className="text-gray-400 text-sm">Free Forever</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">₹0</span>
                      <span className="text-gray-400 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Perfect for getting started</p>
                  </div>

                  <button
                    onClick={() => handleUpgrade(plans.basic.name)}
                    className="btn btn-outline w-full rounded-full mb-6"
                  >
                    {plans.basic.cta}
                  </button>

                  <div className="space-y-3">
                    {plans.basic.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mr-3" />
                        )}
                        <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Card - Highlighted */}
            <div className="relative">
              {plans.premium.popular && popularBadge}
              <div className={`card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-pink-500/30 rounded-2xl h-full transform scale-105 transition-all duration-300 shadow-2xl shadow-pink-500/20 ${
                selectedPlan === "premium" ? "ring-2 ring-pink-500" : ""
              }`}>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center`}>
                      {plans.premium.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{plans.premium.name}</h3>
                      <p className="text-gray-400 text-sm">Most Popular</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">₹{plans.premium.price[billingCycle]}</span>
                      <span className="text-gray-400 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    </div>
                    {billingCycle === "annual" && (
                      <div className="mt-2">
                        <span className="text-green-400 text-sm">
                          <Check className="w-4 h-4 inline mr-1" />
                          Save {calculateSavings("premium")}% vs monthly
                        </span>
                        <p className="text-gray-400 text-xs mt-1">
                          ₹{Math.round(plans.premium.price.annual / 12)}/month equivalent
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleUpgrade(plans.premium.name)}
                    className="btn bg-gradient-to-r from-pink-500 to-orange-500 border-none w-full rounded-full mb-6 hover:opacity-90"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {plans.premium.cta}
                  </button>

                  <div className="space-y-3">
                    {plans.premium.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mr-3" />
                        )}
                        <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Card */}
            <div className="relative">
              <div className={`card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl h-full transition-all duration-300 ${
                selectedPlan === "pro" ? "ring-2 ring-purple-500" : ""
              }`}>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center`}>
                      {plans.pro.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{plans.pro.name}</h3>
                      <p className="text-gray-400 text-sm">Ultimate Experience</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">₹{plans.pro.price[billingCycle]}</span>
                      <span className="text-gray-400 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    </div>
                    {billingCycle === "annual" && (
                      <div className="mt-2">
                        <span className="text-green-400 text-sm">
                          <Check className="w-4 h-4 inline mr-1" />
                          Save {calculateSavings("pro")}% vs monthly
                        </span>
                        <p className="text-gray-400 text-xs mt-1">
                          ₹{Math.round(plans.pro.price.annual / 12)}/month equivalent
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleUpgrade("pro")}
                    className="btn bg-gradient-to-r from-purple-600 to-pink-600 border-none w-full rounded-full mb-6 hover:opacity-90"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    {plans.pro.cta}
                  </button>

                  <div className="space-y-3">
                    {plans.pro.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mr-3" />
                        )}
                        <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-700/50">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/50">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Basic</th>
                  <th className="p-4 text-center bg-pink-500/10">Premium</th>
                  <th className="p-4 text-center">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Daily Likes", basic: "10", premium: "Unlimited", pro: "Unlimited" },
                  { feature: "Super Likes", basic: "0", premium: "5/week", pro: "Unlimited" },
                  { feature: "Profile Boost", basic: "0", premium: "1/month", pro: "Unlimited" },
                  { feature: "See Who Liked You", basic: "❌", premium: "✅", pro: "✅" },
                  { feature: "Rewind", basic: "❌", premium: "✅", pro: "✅" },
                  { feature: "Advanced Filters", basic: "Basic", premium: "✅", pro: "✅" },
                  { feature: "Read Receipts", basic: "❌", premium: "❌", pro: "✅" },
                  { feature: "Travel Mode", basic: "❌", premium: "❌", pro: "✅" },
                  { feature: "Priority Support", basic: "❌", premium: "✅", pro: "VIP 24/7" },
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-800/30" : "bg-gray-800/10"}>
                    <td className="p-4">{row.feature}</td>
                    <td className="p-4 text-center">{row.basic}</td>
                    <td className="p-4 text-center bg-pink-500/5">{row.premium}</td>
                    <td className="p-4 text-center">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will be applied at the end of your current billing cycle."
              },
              {
                q: "Is there a free trial for Premium/Pro?",
                a: "We offer a 7-day free trial for Premium and Pro plans. No credit card required for Basic plan."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit/debit cards, UPI, Net Banking, and popular digital wallets."
              },
              {
                q: "Will I get a refund if I cancel?",
                a: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked."
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Find Your Perfect Match?</h3>
            <p className="text-gray-400 mb-6">Join millions who found love with premium features</p>
            <button
              onClick={() => handleUpgrade("premium")}
              className="btn bg-gradient-to-r from-pink-500 to-orange-500 border-none text-lg px-8 rounded-full hover:opacity-90"
            >
              <Crown className="w-5 h-5 mr-2" />
              Start Your Free Trial
            </button>
            <p className="text-gray-500 text-sm mt-4">7-day free trial • Cancel anytime</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradePack;