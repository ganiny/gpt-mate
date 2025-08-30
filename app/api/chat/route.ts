import { type NextRequest, NextResponse } from "next/server"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Generate contextual AI responses based on the message
    let aiResponse = ""

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
      aiResponse =
        "I'm here to help you create amazing designs! You can ask me to generate components, modify existing code, or provide design suggestions. Try prompts like 'create a modern login page' or 'add a hero section to my landing page'."
    } else if (lowerMessage.includes("color") || lowerMessage.includes("style")) {
      aiResponse =
        "Great question about styling! I can help you with color schemes, typography, and layout. Our design system uses a modern cyan and pink palette. Would you like me to suggest some color combinations or help you style a specific component?"
    } else if (
      lowerMessage.includes("component") ||
      lowerMessage.includes("create") ||
      lowerMessage.includes("build")
    ) {
      aiResponse =
        "I'd be happy to help you create a component! Could you be more specific about what you'd like to build? For example, 'create a pricing section' or 'build a contact form with validation'."
    } else if (lowerMessage.includes("responsive") || lowerMessage.includes("mobile")) {
      aiResponse =
        "Responsive design is crucial! I always generate components that work well on all devices using Tailwind's responsive utilities. Would you like me to show you how to make a specific component more mobile-friendly?"
    } else if (lowerMessage.includes("error") || lowerMessage.includes("bug") || lowerMessage.includes("fix")) {
      aiResponse =
        "I can help you debug and fix issues! Please share the specific error or describe what's not working as expected. I'll analyze the code and provide a solution."
    } else {
      // Generic helpful response
      aiResponse = `I understand you're asking about "${message}". I can help you generate React components, modify existing code, suggest design improvements, or answer questions about web development. What specific aspect would you like me to focus on?`
    }

    const response: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: response,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
