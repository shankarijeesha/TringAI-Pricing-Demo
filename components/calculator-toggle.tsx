"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type CalculatorType = "chatbot" | "voicebot"

interface CalculatorContextType {
  activeCalculator: CalculatorType
  setActiveCalculator: (type: CalculatorType) => void
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined)

export function useCalculator() {
  const context = useContext(CalculatorContext)
  if (!context) {
    throw new Error("useCalculator must be used within a CalculatorProvider")
  }
  return context
}

interface CalculatorProviderProps {
  children: ReactNode
  defaultCalculator?: CalculatorType
}

export function CalculatorProvider({ children, defaultCalculator = "chatbot" }: CalculatorProviderProps) {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(defaultCalculator)

  return (
    <CalculatorContext.Provider value={{ activeCalculator, setActiveCalculator }}>
      {children}
    </CalculatorContext.Provider>
  )
}

interface CalculatorToggleProps {
  className?: string
}

export function CalculatorToggle({ className }: CalculatorToggleProps) {
  const { activeCalculator, setActiveCalculator } = useCalculator()

  return (
    <div className={cn("inline-flex rounded-md bg-white p-1", className)}>
      <button
        onClick={() => setActiveCalculator("chatbot")}
        className={cn(
          "px-8 py-3 text-sm font-medium rounded-md transition-colors",
          activeCalculator === "chatbot" ? "bg-amber-400 text-white" : "bg-white text-gray-700 hover:bg-gray-100",
        )}
      >
        Chatbot
      </button>
      <button
        onClick={() => setActiveCalculator("voicebot")}
        className={cn(
          "px-8 py-3 text-sm font-medium rounded-md transition-colors",
          activeCalculator === "voicebot" ? "bg-amber-400 text-white" : "bg-white text-gray-700 hover:bg-gray-100",
        )}
      >
        Voicebot
      </button>
    </div>
  )
}

