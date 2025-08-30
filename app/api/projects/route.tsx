import { type NextRequest, NextResponse } from "next/server"

// Mock project storage (in a real app, this would be a database)
const mockProjects: any[] = [
  {
    id: "1",
    title: "E-commerce Landing Page",
    description: "Modern landing page for online store",
    thumbnail: "/ecommerce-website-homepage.png",
    code: `import { Button } from '@/components/ui/button'
export default function EcommercePage() {
  return <div className="min-h-screen bg-background"><h1>E-commerce Landing Page</h1><Button>Shop Now</Button></div>
}`,
    prompt: "modern ecommerce landing page",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    isStarred: true,
    category: "Landing Page",
  },
  {
    id: "2",
    title: "Task Management Dashboard",
    description: "Clean dashboard for productivity app",
    thumbnail: "/task-management-app-interface.png",
    code: `import { Card } from '@/components/ui/card'
export default function TaskDashboard() {
  return <div className="min-h-screen bg-background"><h1>Task Dashboard</h1><Card>Tasks here</Card></div>
}`,
    prompt: "task management dashboard",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    isStarred: false,
    category: "Dashboard",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") // In real app, get from auth
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const starred = searchParams.get("starred")

    let filteredProjects = [...mockProjects]

    // Apply filters
    if (search) {
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category && category !== "all") {
      filteredProjects = filteredProjects.filter((project) => project.category.toLowerCase() === category.toLowerCase())
    }

    if (starred === "true") {
      filteredProjects = filteredProjects.filter((project) => project.isStarred)
    }

    // Sort by updatedAt (most recent first)
    filteredProjects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

    return NextResponse.json({
      success: true,
      projects: filteredProjects,
      total: filteredProjects.length,
    })
  } catch (error) {
    console.error("Projects fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, code, prompt, thumbnail, category } = await request.json()

    if (!title || !code) {
      return NextResponse.json({ error: "Title and code are required" }, { status: 400 })
    }

    const newProject = {
      id: Date.now().toString(),
      title,
      description: description || "",
      code,
      prompt: prompt || "",
      thumbnail: thumbnail || "/placeholder.svg?height=400&width=600",
      category: category || "Custom",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isStarred: false,
    }

    mockProjects.unshift(newProject)

    return NextResponse.json({
      success: true,
      project: newProject,
    })
  } catch (error) {
    console.error("Project creation error:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
