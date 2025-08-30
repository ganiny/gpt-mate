"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles, Search, Heart, MessageCircle, Share2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CommunityPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const featuredProjects = [
    {
      title: "Keyboard Canvas",
      author: "Sarah Chen",
      image: "/keyboard-interface-design.png",
      category: "Interface",
      likes: 234,
      views: 1200,
      comments: 18,
    },
    {
      title: "Virtual Teleportation Portal App",
      author: "Michael Rodriguez",
      image: "/futuristic-portal-app.png",
      category: "Mobile",
      likes: 189,
      views: 890,
      comments: 12,
    },
    {
      title: "Pixel Editor",
      author: "Emma Wilson",
      image: "/pixel-art-editor.png",
      category: "Tool",
      likes: 156,
      views: 670,
      comments: 8,
    },
    {
      title: "Sunrise Sunset Animation",
      author: "David Kim",
      image: "/sunrise-sunset-animation.png",
      category: "Animation",
      likes: 298,
      views: 1450,
      comments: 24,
    },
    {
      title: "E-commerce Dashboard",
      author: "Lisa Park",
      image: "/ecommerce-website-homepage.png",
      category: "Dashboard",
      likes: 167,
      views: 780,
      comments: 15,
    },
    {
      title: "Weather App Interface",
      author: "John Smith",
      image: "/weather-dashboard.png",
      category: "Mobile",
      likes: 203,
      views: 950,
      comments: 19,
    },
  ]

  const categories = ["All", "Interface", "Mobile", "Dashboard", "Animation", "Tool", "Landing Page"]

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
                <a href="/community" className="text-foreground font-medium">
                  Community
                </a>
                <a href="/resources" className="text-muted-foreground hover:text-foreground">
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
            <h1 className="text-4xl sm:text-6xl font-bold text-balance mb-6">
              Discover amazing designs from our community
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get inspired by thousands of designs created by designers and developers around the world.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "All" ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-secondary/80"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Featured this week</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-48 bg-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {project.author}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {project.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {project.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {project.comments}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load more designs
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Share your creations</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of creators and showcase your designs to inspire others.
            </p>
            <Button size="lg" onClick={() => router.push("/auth/signup")} className="gap-2">
              Start creating <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
