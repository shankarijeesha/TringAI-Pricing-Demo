"use client"

import { Plus } from "lucide-react"
import { useCalculator } from "@/components/calculator-toggle"

export default function VoicebotCard({ onAddVoicebot }: { onAddVoicebot: () => void }) {
  const { setActiveCalculator } = useCalculator()

  return (
    <div className="rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 p-6 shadow-sm flex flex-col items-center text-center">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-indigo-600">AI Voice for</h3>
        <h3 className="text-xl font-bold text-indigo-600 mb-4">Instant Engagement</h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Enhance your chatbot with a voicebot to handle calls, answer queries, and engage customers through natural
        human-like conversations
      </p>

      <button
        onClick={onAddVoicebot}
        className="w-full flex items-center justify-center py-3 rounded-md border-2 border-amber-400 text-amber-500 font-medium mb-6 hover:bg-amber-50 transition-colors"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Voicebot
      </button>

      <div className="flex-grow w-full flex items-center justify-center">
        <div className="relative w-full max-w-xs">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CK6YXqYVCQX1G4LDroHV7giDj5y0On.png"
            alt="Voicebot interface with audio waveforms and chat messages"
            className="mx-auto w-full"
          />
        </div>
      </div>
    </div>
  )
}

