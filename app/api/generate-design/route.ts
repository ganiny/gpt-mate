import { type NextRequest, NextResponse } from "next/server"
import { getMockDesign, generateMockCode } from "@/lib/mocks"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockDesign = getMockDesign(prompt)

    if (mockDesign) {
      return NextResponse.json({
        success: true,
        design: {
          id: mockDesign.id,
          title: mockDesign.title,
          description: mockDesign.description,
          preview: mockDesign.preview,
          category: mockDesign.category,
          prompt: prompt,
          generatedAt: new Date().toISOString(),
        },
        code: mockDesign.code,
      })
    }

    // Generate fallback design for unknown prompts
    const fallbackCode = generateMockCode(prompt)
    return NextResponse.json({
      success: true,
      design: {
        id: Date.now().toString(),
        title: `Generated Design: ${prompt}`,
        description: `AI-generated design based on your prompt: "${prompt}"`,
        preview: "/placeholder.svg?height=400&width=600&query=" + encodeURIComponent(prompt),
        category: "custom",
        prompt: prompt,
        generatedAt: new Date().toISOString(),
      },
      code: fallbackCode,
    })
  } catch (error) {
    console.error("Design generation error:", error)
    return NextResponse.json({ error: "Failed to generate design" }, { status: 500 })
  }
}
