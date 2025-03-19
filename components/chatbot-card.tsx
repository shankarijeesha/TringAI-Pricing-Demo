"use client"

import { Plus } from "lucide-react"
import { useCalculator } from "@/components/calculator-toggle"

export default function ChatbotCard({ onAddChatbot }: { onAddChatbot: () => void }) {
  const { setActiveCalculator } = useCalculator()

  return (
    <div className="rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 p-6 shadow-sm flex flex-col">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-gray-800">Smart Chatbot for</h3>
        <h3 className="text-xl font-bold text-indigo-600 mb-4">Instant Engagement</h3>
      </div>

      <p className="text-sm text-gray-600 mb-6 text-center">
        Let your voicebot handle incoming calls, then seamlessly transfer queries or follow-ups to the{" "}
        <span className="font-medium">Chatbot</span> for instant responses and continued assistance 24\7
      </p>

      <button
        onClick={onAddChatbot}
        className="w-full flex items-center justify-center py-3 rounded-md border-2 border-amber-400 text-amber-500 font-medium mb-6 hover:bg-amber-50 transition-colors"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Chatbot
      </button>

      <div className="flex-grow w-full flex items-center justify-center">
        <div className="relative w-full max-w-xs">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zjgZkMRIPdt3ZGAhaWtO13kf0BD1rM.png"
            alt="Smart Chatbot for Instant Engagement"
            className="mx-auto w-full"
          />
        </div>
      </div>
    </div>
  )
}

