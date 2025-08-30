"use client"

import type React from "react"
import Link from "next/link"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Code, Palette, Zap } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      if (!user) {
        router.push("/auth/login")
      } else {
        router.push(`/workspace?prompt=${encodeURIComponent(prompt)}`)
      }
    }
  }

  const examples = ["Onboarding flow", "Data dashboard", "Gradient gallery"]

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Design",
      description: "Generate beautiful designs from simple text prompts",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Generation",
      description: "Get production-ready React code instantly",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Visual Editor",
      description: "Fine-tune your designs with our intuitive editor",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Bi-directional Sync",
      description: "Changes in design reflect in code and vice versa",
    },
  ]

  const communityProjects = [
    {
      title: "Keyboard Canvas",
      author: "Sarah Chen",
      image: "/keyboard-interface-design.png",
      category: "Interface",
    },
    {
      title: "Virtual Teleportation Portal App",
      author: "Michael Rodriguez",
      image: "/futuristic-portal-app.png",
      category: "Mobile",
    },
    {
      title: "Pixel Editor",
      author: "Emma Wilson",
      image: "/pixel-art-editor.png",
      category: "Tool",
    },
    {
      title: "Sunrise Sunset Animation",
      author: "David Kim",
      image: "/sunrise-sunset-animation.png",
      category: "Animation",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">GPT Mate</span>
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  Products
                </Link>
                <Link href="/solutions" className="text-muted-foreground hover:text-foreground">
                  Solutions
                </Link>
                <Link href="/community" className="text-muted-foreground hover:text-foreground">
                  Community
                </Link>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                  Resources
                </Link>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => router.push("/auth/login")}>
                    Log in
                  </Button>
                  <Button onClick={() => router.push("/auth/signup")}>Get started for free</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-balance mb-6">Prompt it. Then push it with GPT Mate.</h1>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="What do you want to make?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-14 text-lg pr-12 bg-card border-2 focus:border-primary"
                />
                <Button type="submit" size="sm" className="absolute right-2 top-2 h-10">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {examples.map((example) => (
                <Badge
                  key={example}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => setPrompt(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Make your ideas real with AI. Start with a design and prompt your way to a functional prototype, fast.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="text-primary">{feature.icon}</div>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Projects */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Explore what our community is building with GPT Mate
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {communityProjects.map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="h-40 bg-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {project.author}</p>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline">See more</Button>
            </div>
          </div>
        </section>

        {/* Playground Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your playground for new ideas</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore every big, wild, wacky, and teeny-tiny idea to find the best ones to run with. Create
                high-fidelity prototypes to help everyone see your vision.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Make anything</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                        <Code className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Foundations</p>
                        <p className="text-sm text-muted-foreground">67 Components</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                        <Palette className="w-4 h-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">UI Library</p>
                        <p className="text-sm text-muted-foreground">120 Components</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Keep everything looking and feeling like your product</h3>
                <p className="text-muted-foreground mb-6">
                  Add styling context from your Figma library to stay visually consistent with your design system. From
                  there, you can set custom rules or assets to a frame to make it feel like your own style.
                </p>
                <Button>Learn more</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
