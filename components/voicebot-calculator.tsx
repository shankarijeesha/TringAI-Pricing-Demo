"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Voicebot plan pricing details
const VOICEBOT_PLANS = {
  fluent: {
    basePrice: 14999,
    includedMinutes: 1500,
    extraMinutePrice: 6,
    name: "Fluent",
    maxMinutes: 5000,
    ctaText: "Choose Plan",
  },
  lucid: {
    basePrice: 39999,
    includedMinutes: 5000,
    extraMinutePrice: 5,
    name: "Lucid",
    maxMinutes: 10000,
    ctaText: "Choose Plan",
  },
}

export default function VoicebotCalculator({
  onClose,
  onPlanChange,
}: {
  onClose?: () => void
  onPlanChange?: (name: string, price: number) => void
}) {
  const [selectedPlan, setSelectedPlan] = useState<"fluent" | "lucid">("fluent")
  const [minuteCount, setMinuteCount] = useState(1500)
  const [totalPrice, setTotalPrice] = useState(VOICEBOT_PLANS.fluent.basePrice)
  const [pricePerMinute, setPricePerMinute] = useState(17.5) // Changed to 17.5 as per previous implementation
  const [selectedFeatures, setSelectedFeatures] = useState({
    multipleLanguages: false,
    cloudTelephony: true,
    customVoice: true,
    noTringBranding: false,
  })

  // Calculate total price whenever inputs change
  useEffect(() => {
    const plan = VOICEBOT_PLANS[selectedPlan]
    let price = plan.basePrice

    // Calculate extra minutes cost
    const extraMinutes = Math.max(0, minuteCount - plan.includedMinutes)
    price += extraMinutes * plan.extraMinutePrice

    // Add feature costs
    if (selectedFeatures.customVoice) {
      price += 1500 // Additional cost for custom voice
    }

    if (selectedFeatures.multipleLanguages) {
      price += 2500 // Additional cost for multiple languages
    }

    setTotalPrice(price)

    // Set base price per minute to 17.5 (not 20.0)
    let minutePrice = 17.5 // Base rate
    if (selectedFeatures.customVoice) minutePrice += 2.5
    if (selectedFeatures.multipleLanguages) minutePrice += 1.5
    setPricePerMinute(minutePrice)
  }, [minuteCount, selectedPlan, selectedFeatures])

  // Separate useEffect for onPlanChange to avoid infinite loops
  useEffect(() => {
    // Only call onPlanChange if it exists
    if (onPlanChange) {
      onPlanChange(VOICEBOT_PLANS[selectedPlan].name, totalPrice)
    }
  }, [totalPrice, selectedPlan, onPlanChange])

  const toggleFeature = (feature: keyof typeof selectedFeatures) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }))
  }

  const decrementMinutes = () => {
    if (minuteCount > 100) {
      setMinuteCount((prev) => prev - 100)
    }
  }

  const incrementMinutes = () => {
    if (minuteCount < VOICEBOT_PLANS[selectedPlan].maxMinutes) {
      setMinuteCount((prev) => prev + 100)
    }
  }

  // Update the isPlanDisabled function to check against 4900 for the fluent plan
  const isPlanDisabled = (planKey: "fluent" | "lucid") => {
    if (planKey === "fluent") {
      return minuteCount > 4900 // Disable fluent plan when minutes exceed 4900
    }
    return minuteCount > VOICEBOT_PLANS[planKey].maxMinutes
  }

  // Auto-select the appropriate plan based on minute count
  useEffect(() => {
    if (minuteCount > 4900 && minuteCount <= VOICEBOT_PLANS.lucid.maxMinutes) {
      setSelectedPlan("lucid")
    } else if (minuteCount <= 4900) {
      // Only switch back to fluent if we're within its limits
      if (selectedPlan === "lucid" && minuteCount <= 4900) {
        setSelectedPlan("fluent")
      }
    }
  }, [minuteCount, selectedPlan])

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-indigo-600">Voicebot</h3>
        {/* <CheckCircle className="h-6 w-6 text-indigo-600 fill-indigo-600" /> */}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Plan</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (!isPlanDisabled("fluent")) {
                setSelectedPlan("fluent")
                // Set to the included minutes if current count exceeds max
                if (minuteCount > VOICEBOT_PLANS.fluent.maxMinutes) {
                  setMinuteCount(VOICEBOT_PLANS.fluent.includedMinutes)
                }
              }
            }}
            disabled={isPlanDisabled("fluent")}
            className={cn(
              "py-2 px-4 rounded-md text-sm font-medium relative",
              selectedPlan === "fluent" && !isPlanDisabled("fluent")
                ? "bg-indigo-600 text-white"
                : isPlanDisabled("fluent")
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {isPlanDisabled("fluent") && (
              <span className="absolute -top-2 -right-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </span>
            )}
            Fluent
          </button>
          <button
            onClick={() => {
              if (!isPlanDisabled("lucid")) {
                setSelectedPlan("lucid")
                // Ensure minute count is at least the included amount
                if (minuteCount < VOICEBOT_PLANS.lucid.includedMinutes) {
                  setMinuteCount(VOICEBOT_PLANS.lucid.includedMinutes)
                }
              }
            }}
            disabled={isPlanDisabled("lucid")}
            className={cn(
              "py-2 px-4 rounded-md text-sm font-medium relative",
              selectedPlan === "lucid" && !isPlanDisabled("lucid")
                ? "bg-indigo-600 text-white"
                : isPlanDisabled("lucid")
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {isPlanDisabled("lucid") && (
              <span className="absolute -top-2 -right-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </span>
            )}
            Lucid
          </button>
        </div>
        {minuteCount > VOICEBOT_PLANS.lucid.maxMinutes && (
          <div className="mt-2 text-xs text-red-500">
            Minute count exceeds maximum limit. Please contact sales for Enterprise plan.
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of minutes
          <span className="text-xs text-gray-500 ml-1">
            (Includes {VOICEBOT_PLANS[selectedPlan].includedMinutes} free minutes)
          </span>
        </label>
        <div className="flex items-center bg-gray-100 rounded-md">
          <button onClick={decrementMinutes} className="flex-none px-3 py-2 text-gray-500 hover:text-gray-700">
            <Minus className="h-5 w-5" />
          </button>
          <input
            type="number"
            value={minuteCount}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value) || VOICEBOT_PLANS[selectedPlan].includedMinutes
              // Limit the maximum value
              const limitedValue = Math.min(value, VOICEBOT_PLANS[selectedPlan].maxMinutes)
              setMinuteCount(limitedValue)
            }}
            className="w-full bg-transparent border-0 text-center focus:ring-0"
          />
          <button
            onClick={incrementMinutes}
            className="flex-none h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-1"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-medium mb-3">Basics</h4>
          <div className="space-y-3">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedFeatures.multipleLanguages}
                onChange={() => toggleFeature("multipleLanguages")}
                className="rounded border-gray-300 text-indigo-600 mt-0.5"
              />
              <span className="ml-2 text-sm">Multiple languages</span>
            </label>
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedFeatures.cloudTelephony}
                onChange={() => toggleFeature("cloudTelephony")}
                className="rounded border-gray-300 text-indigo-600 mt-0.5"
              />
              <span className="ml-2 text-sm">Cloud telephony</span>
            </label>
            <div className="bg-gray-50 px-2 py-1 text-xs text-gray-500 rounded">Plivo</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Addons</h4>
          <div className="space-y-3">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedFeatures.customVoice}
                onChange={() => toggleFeature("customVoice")}
                className="rounded border-gray-300 text-indigo-600 mt-0.5"
              />
              <span className="ml-2 text-sm">Custom voice</span>
            </label>
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedFeatures.noTringBranding}
                onChange={() => toggleFeature("noTringBranding")}
                className="rounded border-gray-300 text-indigo-600 mt-0.5"
              />
              <span className="ml-2 text-sm">No Tring AI branding</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">AI Call + Custom Voice</h4>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="rounded-md bg-gray-50 p-2">
            <div className="text-indigo-600 font-bold text-sm">Tring AI</div>
            <div className="text-gray-500 text-xs">Chatbot</div>
          </div>
          <div className="rounded-md bg-gray-50 p-2">
            <div className="text-gray-700 font-bold text-sm">Plivo</div>
            <div className="text-gray-500 text-xs">Telephony</div>
          </div>
          <div className="rounded-md bg-gray-50 p-2">
            <div className="text-gray-700 font-bold text-sm">ElevenLabs</div>
            <div className="text-gray-500 text-xs">Custom voice</div>
          </div>
        </div>

        <div className="text-lg font-bold text-indigo-600 mb-2">
          ₹{pricePerMinute.toFixed(1)}
          <span className="text-sm font-normal">/minute</span>
        </div>

        {/* Progress bar */}
        <div className="h-8 w-full rounded-md overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 bg-indigo-600 flex items-center" style={{ width: "40%" }}>
            <span className="text-xs text-white ml-2 flex items-center">
              <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
              Tring AI
            </span>
          </div>
          <div
            className="absolute top-0 bottom-0 bg-blue-500 flex items-center justify-center"
            style={{ width: "30%", left: "40%" }}
          >
            <span className="text-xs text-white flex items-center">
              <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
              Plivo
            </span>
          </div>
          {selectedFeatures.customVoice && (
            <div
              className="absolute right-0 top-0 bottom-0 bg-orange-500 flex items-center justify-end"
              style={{ width: "30%" }}
            >
              <span className="text-xs text-white mr-2 flex items-center">
                <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
                ElevenLabs
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Base Plan ({VOICEBOT_PLANS[selectedPlan].name})</span>
            <span>₹{VOICEBOT_PLANS[selectedPlan].basePrice}</span>
          </div>

          {minuteCount > VOICEBOT_PLANS[selectedPlan].includedMinutes && (
            <div className="flex justify-between">
              <span>Extra Minutes ({minuteCount - VOICEBOT_PLANS[selectedPlan].includedMinutes})</span>
              <span>
                ₹
                {(minuteCount - VOICEBOT_PLANS[selectedPlan].includedMinutes) *
                  VOICEBOT_PLANS[selectedPlan].extraMinutePrice}
              </span>
            </div>
          )}

          {selectedFeatures.customVoice && (
            <div className="flex justify-between">
              <span>Custom Voice</span>
              <span>₹1,500</span>
            </div>
          )}

          {selectedFeatures.multipleLanguages && (
            <div className="flex justify-between">
              <span>Multiple Languages</span>
              <span>₹2,500</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-2 mt-2 font-medium flex justify-between">
            <span>Total Monthly Cost</span>
            <span className="text-indigo-600">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button className="w-full py-3 rounded-md text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors mt-auto">
        {VOICEBOT_PLANS[selectedPlan].ctaText}
      </button>
    </div>
  )
}

