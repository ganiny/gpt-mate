"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, BookOpen, Video, FileText, Download, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResourcesPage() {
  const router = useRouter()

  const resources = [
    {
      type: "Guide",
      title: "Getting Started with GPT Mate",
      description: "Learn the basics of AI-powered design generation",
      icon: <BookOpen className="w-5 h-5" />,
      badge: "Beginner",
      link: "#",
    },
    {
      type: "Tutorial",
      title: "Advanced Prompt Engineering",
      description: "Master the art of writing effective design prompts",
      icon: <Video className="w-5 h-5" />,
      badge: "Advanced",
      link: "#",
    },
    {
      type: "Documentation",
      title: "API Reference",
      description: "Complete documentation for GPT Mate API",
      icon: <FileText className="w-5 h-5" />,
      badge: "Developer",
      link: "#",
    },
    {
      type: "Template",
      title: "Design System Starter Kit",
      description: "Pre-built components and design tokens",
      icon: <Download className="w-5 h-5" />,
      badge: "Template",
      link: "#",
    },
  ]

  const categories = [
    {
      title: "Getting Started",
      description: "New to GPT Mate? Start here",
      count: 12,
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: "Tutorials",
      description: "Step-by-step video guides",
      count: 24,
      icon: <Video className="w-6 h-6" />,
    },
    {
      title: "API Documentation",
      description: "Technical reference and guides",
      count: 8,
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "Templates",
      description: "Ready-to-use design templates",
      count: 36,
      icon: <Download className="w-6 h-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">GPT Mate</span>
              </div>
              <nav className="hidden md:flex gap-6">
                <a href="/products" className="text-muted-foreground hover:text-foreground">
                  Products
                </a>
                <a href="/solutions" className="text-muted-foreground hover:text-foreground">
                  Solutions
                </a>
                <a href="/community" className="text-muted-foreground hover:text-foreground">
                  Community
                </a>
                <a href="/resources" className="text-foreground font-medium">
                  Resources
                </a>
                <a href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push("/auth/login")}>
                Log in
              </Button>
              <Button onClick={() => router.push("/auth/signup")}>Get started for free</Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-balance mb-6">Resources to help you succeed</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to master GPT Mate and create amazing designs with AI.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Browse by category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <div className="text-primary">{category.icon}</div>
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-2">{category.description}</p>
                    <Badge variant="secondary">{category.count} resources</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Featured resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <div className="text-primary">{resource.icon}</div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{resource.type}</p>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </div>
                      </div>
                      <Badge variant="outline">{resource.badge}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      View resource <ExternalLink className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to start learning?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Dive into our resources and become a GPT Mate expert in no time.
            </p>
            <Button size="lg" onClick={() => router.push("/auth/signup")} className="gap-2">
              Get started for free <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
