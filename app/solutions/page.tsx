"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Sparkles, Users, Building, Rocket, Target, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SolutionsPage() {
  const router = useRouter()

  const solutions = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "For Design Teams",
      description: "Accelerate your design process with AI-powered tools and collaborative features",
      features: ["Team collaboration", "Design system integration", "Version control", "Real-time feedback"],
      cta: "Explore team features",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "For Enterprises",
      description: "Scale your design operations with enterprise-grade security and management",
      features: ["SSO integration", "Advanced permissions", "Custom branding", "Priority support"],
      cta: "Contact sales",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "For Startups",
      description: "Move fast and build beautiful products with limited resources",
      features: ["Rapid prototyping", "Cost-effective scaling", "Template library", "Growth analytics"],
      cta: "Start building",
    },
  ]

  const useCases = [
    {
      title: "Rapid Prototyping",
      description: "Go from idea to interactive prototype in minutes, not hours",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Design System Creation",
      description: "Build consistent design systems with AI-generated components",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Code Handoff",
      description: "Generate production-ready code that developers love",
      icon: <ArrowRight className="w-6 h-6" />,
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
                <a href="/solutions" className="text-foreground font-medium">
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
            <h1 className="text-4xl sm:text-6xl font-bold text-balance mb-6">Solutions for every team</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a solo designer, growing team, or enterprise organization, we have the right solution for
              you.
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="text-primary">{solution.icon}</div>
                    </div>
                    <CardTitle className="text-xl">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{solution.description}</p>
                    <ul className="space-y-2 mb-6 text-left">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      {solution.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Popular use cases</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="p-6 text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="text-primary">{useCase.icon}</div>
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Choose the solution that fits your needs and start creating amazing designs today.
            </p>
            <Button size="lg" onClick={() => router.push("/auth/signup")} className="gap-2">
              Start your free trial <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
