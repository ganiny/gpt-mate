"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Code, Zap, Edit3 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProductsPage() {
  const router = useRouter()

  const products = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Design Generator",
      description: "Transform text prompts into beautiful, functional designs instantly",
      features: ["Natural language processing", "Multiple design styles", "Instant generation"],
      badge: "Core Product",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Code Generator",
      description: "Get production-ready React code from your designs",
      features: ["Clean, maintainable code", "TypeScript support", "Component libraries"],
      badge: "Developer Tools",
    },
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: "Visual Editor",
      description: "Fine-tune your designs with our intuitive drag-and-drop editor",
      features: ["Real-time editing", "Component library", "Responsive design"],
      badge: "Design Tools",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Bi-directional Sync",
      description: "Seamless synchronization between design and code",
      features: ["Live preview", "Code-to-design sync", "Real-time updates"],
      badge: "Innovation",
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
                <a href="/products" className="text-foreground font-medium">
                  Products
                </a>
                <a href="/solutions" className="text-muted-foreground hover:text-foreground">
                  Solutions
                </a>
                <a href="/community" className="text-muted-foreground hover:text-foreground">
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
            <h1 className="text-4xl sm:text-6xl font-bold text-balance mb-6">Powerful AI tools for modern design</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to create, iterate, and ship beautiful designs with AI-powered assistance.
            </p>
            <Button size="lg" onClick={() => router.push("/auth/signup")} className="gap-2">
              Start creating <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="text-primary">{product.icon}</div>
                      </div>
                      <Badge variant="secondary">{product.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your design workflow?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of designers and developers who are already using GPT Mate to create amazing products.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => router.push("/auth/signup")}>
                Get started for free
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.push("/workspace")}>
                Try the workspace
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
