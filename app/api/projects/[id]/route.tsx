import { type NextRequest, NextResponse } from "next/server"

// Mock project storage (same as in route.ts - in real app, this would be shared from database)
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = mockProjects.find((p) => p.id === params.id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      project,
    })
  } catch (error) {
    console.error("Project fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const projectIndex = mockProjects.findIndex((p) => p.id === params.id)

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Update project
    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      project: mockProjects[projectIndex],
    })
  } catch (error) {
    console.error("Project update error:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectIndex = mockProjects.findIndex((p) => p.id === params.id)

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Remove project
    const deletedProject = mockProjects.splice(projectIndex, 1)[0]

    return NextResponse.json({
      success: true,
      project: deletedProject,
    })
  } catch (error) {
    console.error("Project deletion error:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
