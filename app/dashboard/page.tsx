"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreHorizontal,
  Calendar,
  Star,
  Folder,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"

interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  lastModified: string
  isStarred: boolean
  category: string
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const mockProjects: Project[] = [
    {
      id: "1",
      title: "E-commerce Landing Page",
      description: "Modern landing page for online store",
      thumbnail: "/ecommerce-website-homepage.png",
      lastModified: "2 hours ago",
      isStarred: true,
      category: "Landing Page",
    },
    {
      id: "2",
      title: "Task Management Dashboard",
      description: "Clean dashboard for productivity app",
      thumbnail: "/task-management-app-interface.png",
      lastModified: "1 day ago",
      isStarred: false,
      category: "Dashboard",
    },
    {
      id: "3",
      title: "Weather App Interface",
      description: "Beautiful weather forecast app",
      thumbnail: "/weather-dashboard.png",
      lastModified: "3 days ago",
      isStarred: true,
      category: "Mobile App",
    },
    {
      id: "4",
      title: "Portfolio Website",
      description: "Personal portfolio for developer",
      thumbnail: "/frontend-developer-portfolio-modern-clean.png",
      lastModified: "1 week ago",
      isStarred: false,
      category: "Portfolio",
    },
  ]

  const handleCreateProject = () => {
    router.push("/workspace")
  }

  const handleProjectClick = (projectId: string) => {
    router.push(`/workspace?project=${projectId}`)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">GPT Mate</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={handleCreateProject} className="gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/auth/account")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/templates")}>
                    <Folder className="mr-2 h-4 w-4" />
                    Templates
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 border-r bg-muted/30 min-h-[calc(100vh-4rem)]">
            <div className="p-6">
              <nav className="space-y-2">
                <Button variant="secondary" className="w-full justify-start gap-2">
                  <Grid3X3 className="w-4 h-4" />
                  All Projects
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Star className="w-4 h-4" />
                  Starred
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  Recent
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Folder className="w-4 h-4" />
                  Templates
                </Button>
              </nav>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Categories</h3>
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                    Landing Pages
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                    Dashboards
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                    Mobile Apps
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                    Portfolios
                  </Button>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-medium mb-2">Upgrade to Pro</h3>
                <p className="text-sm text-muted-foreground mb-3">Get unlimited projects and advanced AI features</p>
                <Button size="sm" className="w-full">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Your Projects</h1>
                  <p className="text-muted-foreground">Manage and organize your design projects</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleCreateProject}>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Plus className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Create New Project</h3>
                      <p className="text-sm text-muted-foreground">Start from scratch or use a template</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Assistant</h3>
                      <p className="text-sm text-muted-foreground">Get design suggestions and help</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Folder className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Browse Templates</h3>
                      <p className="text-sm text-muted-foreground">Explore our template library</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Projects Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {mockProjects.map((project) => (
                <Card
                  key={project.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
                  onClick={() => handleProjectClick(project.id)}
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={project.thumbnail || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          {project.isStarred && (
                            <div className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            </div>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full p-0 hover:bg-background/90"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm line-clamp-1">{project.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {project.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{project.lastModified}</span>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={project.thumbnail || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{project.title}</h3>
                          {project.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{project.lastModified}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {mockProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Folder className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6">Create your first project to get started</p>
                <Button onClick={handleCreateProject} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create New Project
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
