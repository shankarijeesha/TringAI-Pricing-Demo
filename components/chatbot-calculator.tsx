"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Plan pricing details
const PLANS = {
  intelligence: {
    basePrice: 1999,
    includedChats: 60,
    extraChatPrice: 10,
    name: "Intelligence",
    maxChats: 200, // Maximum chats allowed for this plan
    ctaText: "Get Started with This Plan",
  },
  superIntelligence: {
    basePrice: 6999,
    includedChats: 250,
    extraChatPrice: 8,
    name: "Super Intelligence",
    maxChats: 1000, // Maximum chats allowed for this plan
    ctaText: "Start free trial",
  },
}

export default function ChatbotCalculator({
  onClose,
  onPlanChange,
}: {
  onClose?: () => void
  onPlanChange?: (name: string, price: number) => void
}) {
  const [selectedPlan, setSelectedPlan] = useState<"intelligence" | "superIntelligence">("intelligence")
  const [chatCount, setChatCount] = useState(60)
  const [totalPrice, setTotalPrice] = useState(PLANS.intelligence.basePrice)
  const [pricePerChat, setPricePerChat] = useState(0)
  const [selectedFeatures, setSelectedFeatures] = useState({
    leadGeneration: true,
    crmIntegration: false,
    aiWhatsApp: false,
    noTringBranding: false,
  })

  // Calculate total price whenever inputs change
  useEffect(() => {
    const plan = PLANS[selectedPlan]
    let price = plan.basePrice

    // Calculate extra chats cost
    const extraChats = Math.max(0, chatCount - plan.includedChats)
    price += extraChats * plan.extraChatPrice

    // Add WhatsApp integration cost (0.5 rupees per chat)
    if (selectedFeatures.aiWhatsApp) {
      price += chatCount * 0.5
    }

    setTotalPrice(price)

    // Calculate price per chat based on the selected plan
    const baseChatPrice = selectedPlan === "intelligence" ? 10.0 : 8.0
    const chatPrice = selectedFeatures.aiWhatsApp ? baseChatPrice + 0.5 : baseChatPrice
    setPricePerChat(chatPrice)
  }, [chatCount, selectedPlan, selectedFeatures])

  // Separate useEffect for onPlanChange to avoid infinite loops
  useEffect(() => {
    // Only call onPlanChange if it exists
    if (onPlanChange) {
      onPlanChange(PLANS[selectedPlan].name, totalPrice)
    }
  }, [totalPrice, selectedPlan, onPlanChange])

  // Check if a plan should be disabled based on chat count
  const isPlanDisabled = (planKey: "intelligence" | "superIntelligence") => {
    return chatCount > PLANS[planKey].maxChats
  }

  // Auto-select the appropriate plan based on chat count
  useEffect(() => {
    if (chatCount > PLANS.intelligence.maxChats && chatCount <= PLANS.superIntelligence.maxChats) {
      setSelectedPlan("superIntelligence")
    } else if (chatCount <= PLANS.intelligence.maxChats) {
      // Only switch back to intelligence if we're within its limits
      if (selectedPlan === "superIntelligence" && chatCount <= PLANS.intelligence.maxChats) {
        setSelectedPlan("intelligence")
      }
    }
  }, [chatCount])

  const toggleFeature = (feature: keyof typeof selectedFeatures) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }))
  }

  const decrementChats = () => {
    if (chatCount > PLANS[selectedPlan].includedChats) {
      setChatCount((prev) => prev - 10)
    }
  }

  const incrementChats = () => {
    // Allow incrementing up to the maximum of the highest plan
    if (chatCount < PLANS.superIntelligence.maxChats) {
      setChatCount((prev) => prev + 10)
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col relative">
      {/* Close button in top-right corner */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close calculator"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
      )}

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-indigo-600">Chatbot</h3>
        {/* <CheckCircle className="h-6 w-6 text-indigo-600 fill-indigo-600" /> */}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Plan</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (!isPlanDisabled("intelligence")) {
                setSelectedPlan("intelligence")
                // Set to the included chats if current count exceeds max
                if (chatCount > PLANS.intelligence.maxChats) {
                  setChatCount(PLANS.intelligence.includedChats)
                }
              }
            }}
            disabled={isPlanDisabled("intelligence")}
            className={cn(
              "py-2 px-4 rounded-md text-sm font-medium relative",
              selectedPlan === "intelligence" && !isPlanDisabled("intelligence")
                ? "bg-indigo-600 text-white"
                : isPlanDisabled("intelligence")
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {isPlanDisabled("intelligence") && (
              <span className="absolute -top-2 -right-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </span>
            )}
            Intelligence
          </button>
          <button
            onClick={() => {
              if (!isPlanDisabled("superIntelligence")) {
                setSelectedPlan("superIntelligence")
                // Ensure chat count is at least the included amount
                if (chatCount < PLANS.superIntelligence.includedChats) {
                  setChatCount(PLANS.superIntelligence.includedChats)
                }
              }
            }}
            disabled={isPlanDisabled("superIntelligence")}
            className={cn(
              "py-2 px-4 rounded-md text-sm font-medium relative",
              selectedPlan === "superIntelligence" && !isPlanDisabled("superIntelligence")
                ? "bg-indigo-600 text-white"
                : isPlanDisabled("superIntelligence")
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {isPlanDisabled("superIntelligence") && (
              <span className="absolute -top-2 -right-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </span>
            )}
            Super Intelligence
          </button>
        </div>
        {chatCount > PLANS.superIntelligence.maxChats && (
          <div className="mt-2 text-xs text-red-500">
            Chat count exceeds maximum limit. Please contact sales for Enterprise plan.
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of chats
          <span className="text-xs text-gray-500 ml-1">(Includes {PLANS[selectedPlan].includedChats} free chats)</span>
        </label>
        <div className="flex items-center bg-gray-100 rounded-lg h-[50px]">
          <div className="flex-1 flex items-start justify-start pl-4">
            <input
              type="number"
              value={chatCount}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value) || PLANS[selectedPlan].includedChats
                const limitedValue = Math.min(value, PLANS.superIntelligence.maxChats)
                setChatCount(limitedValue)
              }}
              className="w-20 bg-transparent border-0 text-left focus:ring-0 text-gray-900 font-medium text-lg p-0"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={decrementChats}
              className="flex-none w-8 h-8 flex items-center bg-white rounded-full justify-center text-gray-500 hover:text-gray-700"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              onClick={incrementChats}
              disabled={chatCount >= PLANS.superIntelligence.maxChats}
              className={cn(
                "flex-none w-8 h-8 rounded-full flex items-center justify-center mr-2",
                chatCount >= PLANS.superIntelligence.maxChats
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#4f46e5] text-white hover:bg-[#4338ca]",
              )}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        {chatCount > PLANS[selectedPlan].maxChats && (
          <div className="mt-1 text-xs text-amber-500">This chat count requires a higher plan.</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-medium mb-3">Basics</h4>
          <div className="space-y-3">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedFeatures.leadGeneration}
                onChange={() => toggleFeature("leadGeneration")}
                className="w-4 h-4 rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] mt-0.5"
              />
              <span className="ml-2 text-sm">Lead generation</span>
            </label>
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedFeatures.crmIntegration}
                onChange={() => toggleFeature("crmIntegration")}
                className="w-4 h-4 rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] mt-0.5"
              />
              <span className="ml-2 text-sm">CRM integration</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Addons</h4>
          <div className="space-y-3">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedFeatures.aiWhatsApp}
                onChange={() => toggleFeature("aiWhatsApp")}
                className="w-4 h-4 rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] mt-0.5"
              />
              <span className="ml-2 text-sm">AI on WhatsApp</span>
            </label>
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedFeatures.noTringBranding}
                onChange={() => toggleFeature("noTringBranding")}
                className="w-4 h-4 rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] mt-0.5"
              />
              <span className="ml-2 text-sm">No Tring AI branding</span>
            </label>
          </div>
        </div>
      </div>

      {/* AI Chat + WhatsApp section - updated to match the image */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">AI Chat + WhatsApp</h4>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-md bg-gray-50 p-2">
            <div className="text-indigo-600 font-medium text-sm">Tring AI</div>
            <div className="text-gray-500 text-xs">Chatbot</div>
          </div>
          <div className="rounded-md bg-gray-50 p-2">
            <div className="text-gray-700 font-medium text-sm">Meta</div>
            <div className="text-gray-500 text-xs">WhatsApp Business API</div>
          </div>
        </div>

        <div className="text-lg font-bold text-indigo-600 mb-2">₹{pricePerChat.toFixed(1)}</div>

        {/* Progress bar - updated to match the image */}
        <div className="h-8 w-full rounded-md overflow-hidden relative">
          {selectedFeatures.aiWhatsApp ? (
            <>
              <div className="absolute left-0 top-0 bottom-0 bg-[#4f46e5] flex items-center" style={{ width: "80%" }}>
                <span className="text-xs text-white ml-2 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
                  Tring AI
                </span>
              </div>
              <div
                className="absolute right-0 top-0 bottom-0 bg-green-500 flex items-center justify-end"
                style={{ width: "20%" }}
              >
                <span className="text-xs text-white mr-2 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
                  Meta
                </span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 bg-[#4f46e5] flex items-center">
              <span className="text-xs text-white ml-2 flex items-center">
                <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
                Tring AI
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Base Plan ({PLANS[selectedPlan].name})</span>
            <span>₹{PLANS[selectedPlan].basePrice}</span>
          </div>

          {chatCount > PLANS[selectedPlan].includedChats && (
            <div className="flex justify-between">
              <span>Extra Chats ({chatCount - PLANS[selectedPlan].includedChats})</span>
              <span>₹{(chatCount - PLANS[selectedPlan].includedChats) * PLANS[selectedPlan].extraChatPrice}</span>
            </div>
          )}

          {selectedFeatures.aiWhatsApp && (
            <div className="flex justify-between">
              <span>AI on WhatsApp ({chatCount} chats)</span>
              <span>₹{chatCount * 0.5}</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-2 mt-2 font-medium flex justify-between">
            <span>Total Monthly Cost</span>
            <span className="text-indigo-600">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        className={cn(
          "w-full py-3 rounded-md text-white font-medium transition-colors mt-auto",
          chatCount > PLANS.superIntelligence.maxChats
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700",
        )}
        disabled={chatCount > PLANS.superIntelligence.maxChats}
      >
        {chatCount > PLANS.superIntelligence.maxChats
          ? "Contact Sales for Enterprise Plan"
          : PLANS[selectedPlan].ctaText}
      </button>
    </div>
  )
}

