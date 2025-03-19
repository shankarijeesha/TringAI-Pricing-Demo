"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Navigation items with their dropdown menus
const navigationItems = [
  {
    name: "Products",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { name: "AI Chatbot", href: "#", description: "Engage visitors with intelligent conversations" },
      { name: "Knowledge Base", href: "#", description: "Centralize your company information" },
      { name: "Analytics Dashboard", href: "#", description: "Track performance and insights" },
      { name: "Integrations", href: "#", description: "Connect with your favorite tools" },
    ],
  },
  {
    name: "Industry",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { name: "E-commerce", href: "#", description: "Boost sales and customer satisfaction" },
      { name: "Healthcare", href: "#", description: "Streamline patient communication" },
      { name: "Finance", href: "#", description: "Enhance client services and support" },
      { name: "Education", href: "#", description: "Improve student engagement" },
      { name: "Real Estate", href: "#", description: "Automate property inquiries" },
    ],
  },
  {
    name: "Features",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { name: "AI-Powered Responses", href: "#", description: "Smart, contextual conversations" },
      { name: "Multi-Channel Support", href: "#", description: "Connect across platforms" },
      { name: "Analytics & Reporting", href: "#", description: "Measure performance and ROI" },
      { name: "Customization", href: "#", description: "Brand your chatbot experience" },
    ],
  },
  {
    name: "Use Cases",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { name: "Customer Support", href: "#", description: "24/7 automated assistance" },
      { name: "Lead Generation", href: "#", description: "Convert visitors into customers" },
      { name: "FAQ Automation", href: "#", description: "Answer common questions instantly" },
      { name: "Appointment Booking", href: "#", description: "Streamline scheduling process" },
    ],
  },
  { name: "Case Study", href: "#", hasDropdown: false },
  { name: "Pricing", href: "#", hasDropdown: false },
]

// Add toggle options
const toggleOptions = [
  { id: 'voice', label: 'Voice Bot' },
  { id: 'chat', label: 'Chat Bot' }
]

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeToggle, setActiveToggle] = useState('chat')
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)
      ) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo_new.png" alt="Tring AI" width={120} height={120} />
            {/* <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                      fill="white"
                    />
                    <path
                      d="M8 12C8 12.5523 7.55228 13 7 13C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11C7.55228 11 8 11.4477 8 12Z"
                      fill="#6366F1"
                    />
                    <path
                      d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
                      fill="#6366F1"
                    />
                    <path
                      d="M18 12C18 12.5523 17.5523 13 17 13C16.4477 13 16 12.5523 16 12C16 11.4477 16.4477 11 17 11C17.5523 11 18 11.4477 18 12Z"
                      fill="#6366F1"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <span className="text-xl font-semibold">Tring AI</span> */}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <div key={item.name} className="relative" ref={(el) => (dropdownRefs.current[item.name] = el)}>
              <button
                className="flex items-center space-x-1 text-base font-medium text-gray-700 hover:text-gray-900"
                onClick={() => item.hasDropdown && toggleDropdown(item.name)}
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
              >
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      activeDropdown === item.name ? "rotate-180" : "",
                    )}
                  />
                )}
              </button>

              {/* Dropdown Menu */}
              {item.hasDropdown && (
                <div
                  className={cn(
                    "absolute left-0 mt-2 w-64 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out",
                    activeDropdown === item.name
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none",
                  )}
                >
                  {item.dropdownItems?.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className="block px-4 py-3 text-sm hover:bg-gray-50"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-medium text-gray-800">{dropdownItem.name}</div>
                      {dropdownItem.description && (
                        <div className="mt-1 text-xs text-gray-500">{dropdownItem.description}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA and Language Selector */}
        <div className="hidden md:flex items-center space-x-4">
         
          <Link
            href="#"
            className="rounded-md g bg-[#FDB51B] px-6 py-2.5 text-base font-medium text-white shadow-[0_4px_10px_rgba(253,181,27,0.5)] hover:bg-[#FDB51B]/90 hover:shadow-[0_6px_15px_rgba(253,181,27,0.6)] transition-all duration-300"
          >
            Book a Demo
          </Link>

          <Link
            href="#"
            className="rounded-md border-2 border-[#FDB51B] bg-white px-6 py-2.5 text-base font-medium text-[#FDB51B] shadow-[0_4px_10px_rgba(253,181,27,0.15)] hover:bg-[#FDB51B]/5 hover:shadow-[0_6px_15px_rgba(253,181,27,0.25)] transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 bg-white md:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 pb-2">
                <button
                  className="flex w-full items-center justify-between py-2 text-base font-medium text-gray-700"
                  onClick={() => item.hasDropdown && toggleDropdown(item.name)}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180" : "",
                      )}
                    />
                  )}
                </button>

                {/* Mobile Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="mt-2 ml-4 space-y-2 animate-accordion-down">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="text-sm font-medium text-gray-800">{dropdownItem.name}</div>
                        {dropdownItem.description && (
                          <div className="mt-1 text-xs text-gray-500">{dropdownItem.description}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="#"
              className="mt-4 block rounded-full bg-[#FDB51B] px-6 py-2.5 text-center text-sm font-medium text-white shadow-[0_4px_10px_rgba(253,181,27,0.5)] hover:bg-[#FDB51B]/90 hover:shadow-[0_6px_15px_rgba(253,181,27,0.6)] transition-all duration-300"
            >
              Book a Demo
            </Link>

            {/* Mobile Bot Toggle */}
            <div className="flex rounded-full border border-[#E8E6F6] p-0.5 mt-4">
              {toggleOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveToggle(option.id)}
                  className={cn(
                    "flex-1 px-8 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeToggle === option.id
                      ? "bg-[#FDB51B] text-white"
                      : "text-[#6B7280] hover:text-gray-900"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <Link
              href="#"
              className="block rounded-full border-2 border-[#FDB51B] bg-white px-6 py-2.5 text-center text-sm font-medium text-[#FDB51B] shadow-[0_4px_10px_rgba(253,181,27,0.15)] hover:bg-[#FDB51B]/5 hover:shadow-[0_6px_15px_rgba(253,181,27,0.25)] transition-all duration-300"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

