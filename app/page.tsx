"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function WhatsAppChatStarter() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Ensure component is mounted before showing theme toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow only numbers, +, and spaces
    const cleanValue = value.replace(/[^0-9+\s]/g, "")
    setPhoneNumber(cleanValue)
  }

  const handleStartChat = () => {
    if (!phoneNumber.trim()) return

    setIsLoading(true)

    // Clean the phone number (remove spaces and ensure it starts with +)
    let cleanNumber = phoneNumber.replace(/\s/g, "")
    if (!cleanNumber.startsWith("+")) {
      cleanNumber = "+" + cleanNumber
    }

    // Open WhatsApp chat in new tab
    const whatsappUrl = `https://wa.me/${cleanNumber.substring(1)}`
    window.open(whatsappUrl, "_blank")

    // Reset loading state after a short delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleStartChat()
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300">
        {/* Dark Mode Toggle - Made More Prominent */}
        <div className="fixed top-4 right-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 bg-background border-2 hover:bg-accent"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                <span className="text-xs font-medium">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span className="text-xs font-medium">Dark</span>
              </>
            )}
          </Button>
        </div>

        {/* Main Container */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-center space-y-8">
            {/* WhatsApp Icon */}
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/20 transition-colors duration-300">
                <MessageCircle className="h-12 w-12 text-green-600 dark:text-green-400 transition-colors duration-300" />
              </div>
            </div>

            {/* App Title */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground transition-colors duration-300">
                Quick WhatsApp Chat
              </h1>
              <p className="text-muted-foreground text-sm md:text-base transition-colors duration-300">
                Start a chat without saving the contact
              </p>
            </div>

            {/* Input and Button Container */}
            <div className="space-y-4">
              {/* Phone Number Input */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter phone number with country code (e.g. +923001234567)"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  onKeyPress={handleKeyPress}
                  className="h-14 text-center text-lg rounded-xl border-2 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200 shadow-sm bg-background text-foreground"
                  maxLength={20}
                />
              </div>

              {/* Start Chat Button */}
              <Button
                onClick={handleStartChat}
                disabled={!phoneNumber.trim() || isLoading}
                className="w-full h-14 text-lg font-semibold rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {isLoading ? "Opening Chat..." : "Start Chat"}
              </Button>
            </div>

            {/* Helper Text */}
            <div className="text-xs text-muted-foreground space-y-1 transition-colors duration-300">
              <p>Include country code (e.g., +1 for US, +44 for UK)</p>
              <p>No need to save the contact first</p>
            </div>
          </div>
        </div>
      </div>
      {/* Privacy Notice - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 w-full text-center py-2 text-xs text-muted-foreground opacity-80 bg-background pointer-events-none z-50">
        This app does not collect, store, or share any personal data. All actions happen locally in your browser.
      </div>
    </>
  )
}
