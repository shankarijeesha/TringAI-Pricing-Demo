"use client"

import { useState } from "react"
import { Check, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCalculator } from "@/components/calculator-toggle"

type PricingTab = "chatbot" | "voicebot"

// Chatbot plans data
const CHATBOT_PLANS = [
  {
    name: "Intelligence",
    description: "for support automation",
    price: 1999,
    features: ["60 free chats", "2 chatbots", "Widget customisation", "Lead generation", "CRM integration"],
    addons: ["AI on WhatsApp", "Upto 200 extra chats", "No Tring AI branding"],
    ctaText: "Start free trial",
    highlight: false,
  },
  {
    name: "Super Intelligence",
    description: "for lead generation",
    price: 6999,
    features: ["250 free chats", "10 chatbots", "Lead generation", "CRM integration", "Widget customisation"],
    addons: ["AI on WhatsApp", "Upto 1,000 extra chats", "No Tring AI branding"],
    ctaText: "Sign up",
    highlight: false,
  },
  {
    name: "Enterprise",
    description: "for lead generation",
    price: null, // null means "Talk to sales"
    features: [
      "1,000+ free chats",
      "Unlimited chatbots",
      "Lead generation",
      "CRM integration",
      "Widget customisation",
      "No Tring AI branding",
    ],
    addons: ["AI on WhatsApp", "Unlimited extra chats"],
    ctaText: "Contact sales",
    highlight: true,
  },
]

// Voicebot plans data
const VOICEBOT_PLANS = [
  {
    name: "Fluent",
    description: null,
    price: 14999,
    features: [
      "Lead Gen",
      "CRM Integration",
      "Real Time Booking",
      "1500 Mins",
      "₹6 per Extra Minute",
      "Voice Customization",
    ],
    notIncluded: ["Multi-lingual"],
    ctaText: "Choose Plan",
    highlight: false,
  },
  {
    name: "Lucid",
    description: null,
    price: 39999,
    features: [
      "Lead Gen",
      "CRM Integration",
      "Real Time Booking",
      "5000 Mins",
      "₹5 per Extra Minute",
      "Advanced Voice Customization",
      "Multi-lingual",
    ],
    notIncluded: [],
    ctaText: "Choose Plan",
    highlight: false,
  },
  {
    name: "Eloquent (Enterprise)",
    description: null,
    price: null, // null means "Talk to sales"
    features: [
      "Lead Gen",
      "CRM Integration",
      "Real Time Booking",
      "10,000+ Mins",
      "Talk to Sales for Extra Mins Cost",
      "Advanced Voice Customization",
      "Multi-lingual",
    ],
    notIncluded: [],
    ctaText: "Choose Plan",
    highlight: true,
  },
]

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<PricingTab>("chatbot")
  const { setActiveCalculator } = useCalculator()

  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById("calculator-section")
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleTabChange = (tab: PricingTab) => {
    setActiveTab(tab)
    setActiveCalculator(tab)
  }

  return (
    <section className="w-full pb-16 pt-0">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-md bg-white p-1 w-[400px] text-center border border-[#FDB51B]">
            <button
              onClick={() => handleTabChange("chatbot")}
              className={cn(
                "px-8 py-3 text-[18px] font-medium rounded-md transition-colors w-full",
                activeTab === "chatbot" ? "bg-amber-400 text-white" : "bg-white text-gray-700 hover:bg-gray-100",
              )}
            >
              Chatbot
            </button>
            <button
              onClick={() => handleTabChange("voicebot")}
              className={cn(
                "px-8 py-3 text-[18px] font-medium rounded-md transition-colors w-full",
                activeTab === "voicebot" ? "bg-amber-400 text-white" : "bg-white text-gray-700 hover:bg-gray-100",
              )}
            >
              Voicebot
            </button>
          </div>
        </div>

        {/* Chatbot Pricing Cards */}
        {activeTab === "chatbot" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto mx-40">
            {CHATBOT_PLANS.map((plan, index) => (
              <div
                key={`chatbot-${index}`}
                className={cn("rounded-lg p-6 shadow-sm", plan.highlight ? "bg-indigo-600 text-white" : "bg-white")}
              >
                <h3 className={cn("text-xl font-bold", plan.highlight ? "text-white" : "text-indigo-600")}>
                  {plan.name}
                </h3>
                <p className={cn("text-sm", plan.highlight ? "text-indigo-200" : "text-gray-500")}>
                  {plan.description}
                </p>

                <div className="my-4">
                  {plan.price ? (
                    <>
                      <span className="text-3xl font-bold">₹{plan.price.toLocaleString()}</span>
                      <span className={plan.highlight ? "text-indigo-200" : "text-gray-500"}>/month</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">Talk to sales</span>
                  )}
                </div>

                <button
                  onClick={scrollToCalculator}
                  className={cn(
                    "mb-6 w-full text-sm text-left underline cursor-pointer",
                    plan.highlight ? "text-amber-400" : "text-indigo-600",
                  )}
                >
                  {plan.price ? "Calculate your price" : "Contact us"}
                </button>

                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={`chatbot-feature-${index}-${featureIndex}`} className="flex items-start">
                      <Check className={cn("mr-2 h-5 w-5", plan.highlight ? "text-amber-400" : "text-green-500")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.addons && plan.addons.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-3 font-medium">Addons</h4>
                    <ul className="space-y-3">
                      {plan.addons.map((addon, addonIndex) => (
                        <li key={`chatbot-addon-${index}-${addonIndex}`} className="flex items-start">
                          {plan.highlight ? (
                            <Check className="mr-2 h-5 w-5 text-amber-400" />
                          ) : (
                            <Plus className="mr-2 h-5 w-5 text-gray-400" />
                          )}
                          <span>{addon}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className={cn(
                    "mt-4 w-full rounded-md py-3 text-center font-medium transition-colors",
                    plan.highlight
                      ? "bg-amber-400 text-white hover:bg-amber-500"
                      : "border-2 border-amber-400 text-amber-500 hover:bg-amber-50",
                  )}
                >
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Voicebot Pricing Cards */}
        {activeTab === "voicebot" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto mx-40">
            {VOICEBOT_PLANS.map((plan, index) => (
              <div
                key={`voicebot-${index}`}
                className={cn("rounded-lg p-6 shadow-sm", plan.highlight ? "bg-indigo-600 text-white" : "bg-white")}
              >
                <h3 className={cn("text-xl font-bold", plan.highlight ? "text-white" : "text-indigo-600")}>
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className={cn("text-sm", plan.highlight ? "text-indigo-200" : "text-gray-500")}>
                    {plan.description}
                  </p>
                )}

                <div className="my-4">
                  {plan.price ? (
                    <>
                      <span className="text-3xl font-bold">₹ {plan.price.toLocaleString()}</span>
                      <div className={plan.highlight ? "text-indigo-200" : "text-gray-500"}>Month</div>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">Talk to sales</span>
                  )}
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={`voicebot-feature-${index}-${featureIndex}`} className="flex items-start">
                      <Check className={cn("mr-2 h-5 w-5", plan.highlight ? "text-white" : "text-indigo-600")} />
                      <span>{feature}</span>
                    </li>
                  ))}

                  {plan.notIncluded &&
                    plan.notIncluded.map((feature, featureIndex) => (
                      <li
                        key={`voicebot-not-included-${index}-${featureIndex}`}
                        className="flex items-start text-gray-500"
                      >
                        <X className="mr-2 h-5 w-5 text-gray-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>

                <button
                  onClick={() => {
                    setActiveCalculator("voicebot")
                    scrollToCalculator()
                  }}
                  className={cn(
                    "mt-4 w-full rounded-md py-3 text-center font-medium transition-colors",
                    plan.highlight
                      ? "bg-amber-400 text-white hover:bg-amber-500"
                      : "border-2 border-amber-400 text-amber-500 hover:bg-amber-50",
                  )}
                >
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

