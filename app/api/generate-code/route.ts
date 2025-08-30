import { type NextRequest, NextResponse } from "next/server"
import { generateMockCode } from "@/lib/mocks"

export async function POST(request: NextRequest) {
  try {
    const { prompt, currentCode } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Generate code based on prompt
    const generatedCode = generateMockCode(prompt)

    // If currentCode is provided, simulate code modification
    let finalCode = generatedCode
    if (currentCode) {
      // In a real implementation, this would use AI to modify the existing code
      finalCode = `// Modified based on: "${prompt}"\n${currentCode}\n\n// Additional generated content:\n${generatedCode.split("\n").slice(5).join("\n")}`
    }

    return NextResponse.json({
      success: true,
      code: finalCode,
      prompt: prompt,
      generatedAt: new Date().toISOString(),
      modifications: currentCode ? ["Added new functionality", "Updated styling", "Improved structure"] : [],
    })
  } catch (error) {
    console.error("Code generation error:", error)
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 })
  }
}
