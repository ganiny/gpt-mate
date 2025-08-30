"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowLeft, Star, Eye, Download, Plus } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

interface Template {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  tags: string[]
  isPopular: boolean
  views: number
  downloads: number
}

export default function TemplatesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const mockTemplates: Template[] = [
    {
      id: "1",
      title: "Modern Landing Page",
      description: "Clean and modern landing page template with hero section and features",
      thumbnail: "/ecommerce-website-homepage.png",
      category: "landing-page",
      tags: ["modern", "clean", "business"],
      isPopular: true,
      views: 1250,
      downloads: 89,
    },
    {
      id: "2",
      title: "Dashboard Template",
      description: "Comprehensive dashboard with charts, tables, and analytics",
      thumbnail: "/task-management-app-interface.png",
      category: "dashboard",
      tags: ["dashboard", "analytics", "admin"],
      isPopular: true,
      views: 980,
      downloads: 67,
    },
    {
      id: "3",
      title: "Portfolio Website",
      description: "Personal portfolio template for developers and designers",
      thumbnail: "/frontend-developer-portfolio-modern-clean.png",
      category: "portfolio",
      tags: ["portfolio", "personal", "creative"],
      isPopular: false,
      views: 750,
      downloads: 45,
    },
    {
      id: "4",
      title: "Weather App",
      description: "Beautiful weather application with forecasts and animations",
      thumbnail: "/weather-dashboard.png",
      category: "mobile-app",
      tags: ["weather", "mobile", "app"],
      isPopular: false,
      views: 620,
      downloads: 32,
    },
  ]

  const categories = [
    { id: "all", label: "All Templates", count: mockTemplates.length },
    { id: "landing-page", label: "Landing Pages", count: 1 },
    { id: "dashboard", label: "Dashboards", count: 1 },
    { id: "portfolio", label: "Portfolios", count: 1 },
    { id: "mobile-app", label: "Mobile Apps", count: 1 },
  ]

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (templateId: string) => {
    router.push(`/workspace?template=${templateId}`)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-2 mr-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold">Templates</h1>
            </div>
            <Button onClick={() => router.push("/templates/create")} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Template
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-5">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-sm">
                    {category.label} ({category.count})
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Popular Templates Section */}
          {selectedCategory === "all" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Popular Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTemplates
                  .filter((template) => template.isPopular)
                  .map((template) => (
                    <Card
                      key={template.id}
                      className="group cursor-pointer hover:shadow-lg transition-all duration-200"
                    >
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={template.thumbnail || "/placeholder.svg"}
                          alt={template.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-secondary text-secondary-foreground">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                          <Button
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            onClick={() => handleUseTemplate(template.id)}
                          >
                            Use Template
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{template.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex gap-1">
                            {template.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {template.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {template.downloads}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* All Templates */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory === "all" ? "All Templates" : categories.find((c) => c.id === selectedCategory)?.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200">
                  <div className="relative h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={template.thumbnail || "/placeholder.svg"}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {template.isPopular && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => handleUseTemplate(template.id)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm mb-1 line-clamp-1">{template.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{template.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {template.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {template.downloads}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
