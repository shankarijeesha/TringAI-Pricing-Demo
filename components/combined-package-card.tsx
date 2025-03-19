"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

interface CombinedPackageCardProps {
  chatbotPlan: {
    name: string
    price: number
  }
  voicebotPlan: {
    name: string
    price: number
  }
  onClose?: () => void
}

export default function CombinedPackageCard({ chatbotPlan, voicebotPlan, onClose }: CombinedPackageCardProps) {
  const [isMonthly, setIsMonthly] = useState(true)

  const totalPrice = chatbotPlan.price + voicebotPlan.price

  return (
    <div className="rounded-xl bg-indigo-600 p-6 shadow-sm text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
          <div className="flex items-center w-[300px] bg-indigo-700 rounded-full p-1">
            <button
              className={cn(
                "px-3 py-1 text-[16px] font-medium rounded-full transition-colors w-full",
                isMonthly ? "bg-white text-indigo-600" : "text-white",
              )}
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-3 py-1 text-[16px] font-medium rounded-full transition-colors w-full",
                !isMonthly ? "bg-white text-indigo-600" : "text-white",
              )}
              onClick={() => setIsMonthly(false)}
            >
              Yearly
            </button>
          </div>
      </div>
       <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold">Your custom package</h3>                
       </div>

      {/* Chatbot Plan */}
      <div className="flex justify-start flex-col items-start mb-6 bg-indigo-500/70 p-4 rounded-lg">
        <h4 className="text-2xl font-bold text-amber-400 mb-1">{chatbotPlan.name}</h4>
        <p className="text-base text-white mb-6">plus addons</p>
        <div className="text-2xl font-bold">
          ₹{chatbotPlan.price.toLocaleString()} <span className="text-sm font-normal">/month</span>
        </div>
      </div>

      {/* Plus sign divider */}
      <div className="flex justify-center mb-4">
        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <Plus className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Voicebot Plan */}
      <div className="mb-6 bg-indigo-500/70 p-4 rounded-lg">
        <h4 className="text-2xl font-bold text-amber-400 mb-1">{voicebotPlan.name}</h4>
        <p className="text-base text-white mb-6">plus addons</p>
        <div className="text-2xl font-bold">
          ₹{voicebotPlan.price.toLocaleString()} <span className="text-sm font-normal">/month</span>
        </div>
      </div>

      {/* Total */}
      <div className="mb-6 flex flex-col items-center">
        <div className="text-3xl font-bold">
          ₹{totalPrice.toLocaleString()} <span className="text-2xl font-normal">/month</span>
        </div>
        <p className="text-base text-white">does not include applicable taxes</p>
        <button className="text-xs text-amber-400 underline">Share this price</button>
      </div>

      <button className="w-full py-3 rounded-md bg-amber-400 text-white font-medium hover:bg-amber-500 transition-colors mt-auto">
        Sign up
      </button>
    </div>
  )
}

