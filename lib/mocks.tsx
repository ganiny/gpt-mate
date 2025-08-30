export interface MockDesign {
  id: string
  title: string
  description: string
  preview: string
  code: string
  category: string
}

export const mockDesigns: Record<string, MockDesign> = {
  "home page of saudi governmental authority": {
    id: "1",
    title: "Saudi Government Portal",
    description: "Modern governmental authority homepage with Arabic/English support",
    preview: "/saudi-government-portal-homepage.png",
    code: `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SaudiGovPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-green-800 text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-800 font-bold text-xl">🇸🇦</span>
            </div>
            <h1 className="text-2xl font-bold">المملكة العربية السعودية</h1>
          </div>
          <nav className="flex gap-6">
            <a href="#" className="hover:text-green-200">الخدمات</a>
            <a href="#" className="hover:text-green-200">عن الوزارة</a>
            <a href="#" className="hover:text-green-200">اتصل بنا</a>
          </nav>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto p-6">
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            خدمات إلكترونية متطورة
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            نقدم أفضل الخدمات الحكومية الرقمية لخدمة المواطنين والمقيمين
          </p>
          <Button size="lg" className="bg-green-700 hover:bg-green-800">
            ابدأ الآن
          </Button>
        </section>
        
        <section className="grid md:grid-cols-3 gap-6 py-12">
          <Card>
            <CardHeader>
              <CardTitle>الخدمات الإلكترونية</CardTitle>
            </CardHeader>
            <CardContent>
              <p>احصل على جميع الخدمات الحكومية بسهولة ويسر</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>الدعم الفني</CardTitle>
            </CardHeader>
            <CardContent>
              <p>فريق دعم متخصص لمساعدتك في جميع الأوقات</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>الأمان والخصوصية</CardTitle>
            </CardHeader>
            <CardContent>
              <p>حماية عالية المستوى لبياناتك الشخصية</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}`,
    category: "government",
  },

  "liquid glass styled login page": {
    id: "2",
    title: "Liquid Glass Login",
    description: "Modern glassmorphism login interface with fluid animations",
    preview: "/liquid-glass-login-page-glassmorphism.png",
    code: `import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LiquidGlassLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/abstract-liquid-background.png')] bg-cover bg-center opacity-20"></div>
      
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </CardTitle>
          <p className="text-white/80">Sign in to your account</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email"
              className="backdrop-blur-sm bg-white/10 border-white/30 text-white placeholder:text-white/60"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password"
              className="backdrop-blur-sm bg-white/10 border-white/30 text-white placeholder:text-white/60"
            />
          </div>
          
          <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
            Sign In
          </Button>
          
          <div className="text-center">
            <a href="#" className="text-white/80 hover:text-white text-sm">
              Forgot your password?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}`,
    category: "auth",
  },

  "portfolio for a frontend developer": {
    id: "3",
    title: "Frontend Developer Portfolio",
    description: "Clean and modern portfolio showcasing frontend development skills",
    preview: "/frontend-developer-portfolio-modern-clean.png",
    code: `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function FrontendPortfolio() {
  const projects = [
    { title: 'E-commerce Platform', tech: ['React', 'Next.js', 'Stripe'], image: '/ecommerce-website-homepage.png' },
    { title: 'Task Management App', tech: ['Vue.js', 'Firebase', 'Tailwind'], image: '/task-management-app-interface.png' },
    { title: 'Weather Dashboard', tech: ['React', 'D3.js', 'API'], image: '/weather-dashboard.png' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Alex Johnson</h1>
          <nav className="flex gap-6">
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#projects" className="text-gray-600 hover:text-gray-900">Projects</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="text-center py-20">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-8"></div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Frontend Developer</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            I create beautiful, responsive web applications with modern technologies. 
            Passionate about user experience and clean code.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">View My Work</Button>
            <Button variant="outline" size="lg">Download CV</Button>
          </div>
        </section>

        <section id="projects" className="py-20">
          <h3 className="text-3xl font-bold mb-12">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}`,
    category: "portfolio",
  },
}

export function getMockDesign(prompt: string): MockDesign | null {
  const normalizedPrompt = prompt.toLowerCase().trim()
  return mockDesigns[normalizedPrompt] || null
}

export function generateMockCode(prompt: string): string {
  const design = getMockDesign(prompt)
  if (design) {
    return design.code
  }

  const normalizedPrompt = prompt.toLowerCase()

  // Landing page variations
  if (
    normalizedPrompt.includes("landing") ||
    normalizedPrompt.includes("homepage") ||
    normalizedPrompt.includes("home page")
  ) {
    return `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Your Brand</h1>
          <nav className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Build Something Amazing
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create beautiful, responsive web applications with modern technologies and AI-powered tools.
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Fast Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Build applications 10x faster with our AI-powered tools</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Modern Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Beautiful, responsive designs that work on all devices</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Intuitive interface that anyone can master quickly</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}`
  }

  // Dashboard variations
  if (
    normalizedPrompt.includes("dashboard") ||
    normalizedPrompt.includes("admin") ||
    normalizedPrompt.includes("analytics")
  ) {
    return `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button>New Project</Button>
        </div>
      </header>
      
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <Badge variant="secondary" className="mt-1">+12% from last month</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <Badge variant="secondary" className="mt-1">+8% from last month</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <Badge variant="secondary" className="mt-1">+23% from last month</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,901</div>
              <Badge variant="secondary" className="mt-1">+5% from last month</Badge>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">U</span>
                  </div>
                  <div>
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-gray-600">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">$</span>
                  </div>
                  <div>
                    <p className="font-medium">Payment received</p>
                    <p className="text-sm text-gray-600">5 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <span className="text-lg mb-1">+</span>
                  <span>Add User</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <span className="text-lg mb-1">📊</span>
                  <span>View Reports</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <span className="text-lg mb-1">⚙️</span>
                  <span>Settings</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <span className="text-lg mb-1">📧</span>
                  <span>Send Email</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}`
  }

  // Form variations
  if (
    normalizedPrompt.includes("form") ||
    normalizedPrompt.includes("contact") ||
    normalizedPrompt.includes("signup") ||
    normalizedPrompt.includes("login")
  ) {
    return `import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Get In Touch</CardTitle>
          <p className="text-center text-gray-600">We'd love to hear from you</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="What's this about?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea 
              id="message" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Tell us more..."
            ></textarea>
          </div>
          <Button className="w-full">Send Message</Button>
        </CardContent>
      </Card>
    </div>
  )
}`
  }

  // E-commerce variations
  if (
    normalizedPrompt.includes("shop") ||
    normalizedPrompt.includes("store") ||
    normalizedPrompt.includes("ecommerce") ||
    normalizedPrompt.includes("product")
  ) {
    return `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ProductStore() {
  const products = [
    { name: 'Wireless Headphones', price: '$99', image: '/diverse-people-listening-headphones.png' },
    { name: 'Smart Watch', price: '$299', image: '/modern-smartwatch.png' },
    { name: 'Laptop Stand', price: '$49', image: '/laptop-stand.png' },
    { name: 'Bluetooth Speaker', price: '$79', image: '/audio-speaker.png' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TechStore</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Search</Button>
            <Button variant="ghost">Cart (0)</Button>
            <Button>Sign In</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest Tech Products</h2>
          <p className="text-xl mb-6">Discover amazing deals on cutting-edge technology</p>
          <Button size="lg" variant="secondary">Shop Now</Button>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-8">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}`
  }

  // Generic fallback with better structure
  return `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function GeneratedComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Generated Design
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Created from your prompt: "${prompt}"
          </p>
          <Badge variant="secondary" className="mb-8">Generated Component</Badge>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This component was generated based on your prompt. You can click on any text to edit it directly!
              </p>
              <Button>Try Editing This Button</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bi-directional Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Changes you make in the preview will automatically update the code editor, and vice versa.
              </p>
              <Button variant="outline">Edit This Text Too</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sample Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                This is sample content that you can edit by clicking on it. The live preview system 
                allows for real-time editing and synchronization with the code.
              </p>
              <div className="flex gap-4">
                <Button>Primary Action</Button>
                <Button variant="outline">Secondary Action</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}`
}
