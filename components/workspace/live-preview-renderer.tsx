"use client"
import { useState, useMemo, useCallback } from "react"
import EditableElement from "./editable-element" // Import EditableElement component

interface LivePreviewRendererProps {
  code: string
  onCodeChange?: (newCode: string) => void
  onError?: (error: string) => void
}

const componentTemplates = {
  "landing-page": {
    component: (onEdit: (path: string, newValue: string, oldValue: string) => void) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <EditableElement
              path="hero.title"
              onEdit={onEdit}
              className="text-5xl font-bold text-gray-900 mb-6"
              elementType="h1"
            >
              Welcome to Our Platform
            </EditableElement>
            <EditableElement
              path="hero.subtitle"
              onEdit={onEdit}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              elementType="p"
            >
              Build amazing experiences with our cutting-edge tools and services
            </EditableElement>
            <div className="flex gap-4 justify-center">
              <EditableElement
                path="hero.primaryButton"
                onEdit={onEdit}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                elementType="button"
                editableProps={["backgroundColor", "color", "borderRadius"]}
              >
                Get Started
              </EditableElement>
              <EditableElement
                path="hero.secondaryButton"
                onEdit={onEdit}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                elementType="button"
                editableProps={["backgroundColor", "color", "borderColor"]}
              >
                Learn More
              </EditableElement>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </div>
                <EditableElement
                  path={`features.${i}.title`}
                  onEdit={onEdit}
                  className="text-xl font-semibold mb-2"
                  elementType="h3"
                >
                  Feature {i}
                </EditableElement>
                <EditableElement
                  path={`features.${i}.description`}
                  onEdit={onEdit}
                  className="text-gray-600"
                  elementType="p"
                >
                  Description of amazing feature {i} that helps users achieve their goals
                </EditableElement>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    code: `export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build amazing experiences with our cutting-edge tools and services
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Feature {i}</h3>
              <p className="text-gray-600">
                Description of amazing feature {i} that helps users achieve their goals
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
  },

  dashboard: {
    component: (onEdit: (path: string, newValue: string, oldValue: string) => void) => (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <EditableElement
                path="header.title"
                onEdit={onEdit}
                className="text-2xl font-bold text-gray-900"
                elementType="h1"
              >
                Dashboard
              </EditableElement>
              <EditableElement
                path="header.button"
                onEdit={onEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                elementType="button"
                editableProps={["backgroundColor", "color"]}
              >
                New Project
              </EditableElement>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {["Total Users", "Revenue", "Projects", "Growth"].map((metric, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <EditableElement
                  path={`metrics.${i}.label`}
                  onEdit={onEdit}
                  className="text-sm font-medium text-gray-500 mb-2"
                  elementType="h3"
                >
                  {metric}
                </EditableElement>
                <EditableElement
                  path={`metrics.${i}.value`}
                  onEdit={onEdit}
                  className="text-3xl font-bold text-gray-900"
                  elementType="p"
                >
                  {["1,234", "$12,345", "56", "+12%"][i]}
                </EditableElement>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    code: `export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">New Project</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {["Total Users", "Revenue", "Projects", "Growth"].map((metric, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{metric}</h3>
              <p className="text-3xl font-bold text-gray-900">
                {["1,234", "$12,345", "56", "+12%"][i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
  },

  form: {
    component: (onEdit: (path: string, newValue: string, oldValue: string) => void) => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <EditableElement
            path="form.title"
            onEdit={onEdit}
            className="text-2xl font-bold text-center mb-6"
            elementType="h2"
          >
            Contact Us
          </EditableElement>
          <form className="space-y-4">
            <div>
              <EditableElement
                path="form.nameLabel"
                onEdit={onEdit}
                className="block text-sm font-medium text-gray-700 mb-1"
                elementType="label"
              >
                Name
              </EditableElement>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <EditableElement
                path="form.emailLabel"
                onEdit={onEdit}
                className="block text-sm font-medium text-gray-700 mb-1"
                elementType="label"
              >
                Email
              </EditableElement>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <EditableElement
              path="form.submitButton"
              onEdit={onEdit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              elementType="button"
              editableProps={["backgroundColor", "color"]}
            >
              Send Message
            </EditableElement>
          </form>
        </div>
      </div>
    ),
    code: `export default function ContactForm() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}`,
  },

  card: {
    component: (onEdit: (path: string, newValue: string, oldValue: string) => void) => (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm">
          <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400"></div>
          <div className="p-6">
            <EditableElement path="card.title" onEdit={onEdit} className="text-xl font-bold mb-2" elementType="h3">
              Product Card
            </EditableElement>
            <EditableElement path="card.description" onEdit={onEdit} className="text-gray-600 mb-4" elementType="p">
              This is a beautiful product card with an attractive design and clean layout.
            </EditableElement>
            <div className="flex items-center justify-between">
              <EditableElement
                path="card.price"
                onEdit={onEdit}
                className="text-2xl font-bold text-green-600"
                elementType="span"
                editableProps={["color"]}
              >
                $99
              </EditableElement>
              <EditableElement
                path="card.button"
                onEdit={onEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                elementType="button"
                editableProps={["backgroundColor", "color"]}
              >
                Buy Now
              </EditableElement>
            </div>
          </div>
        </div>
      </div>
    ),
    code: `export default function ProductCard() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm">
        <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400"></div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">Product Card</h3>
          <p className="text-gray-600 mb-4">
            This is a beautiful product card with an attractive design and clean layout.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">$99</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  },
}

// EditableElement component is imported above

export function LivePreviewRenderer({ code, onCodeChange, onError }: LivePreviewRendererProps) {
  const [error, setError] = useState<string | null>(null)

  const componentType = useMemo(() => {
    if (!code) return "landing-page"

    const lowerCode = code.toLowerCase()
    if (lowerCode.includes("dashboard") || lowerCode.includes("metric") || lowerCode.includes("activity")) {
      return "dashboard"
    }
    if (lowerCode.includes("form") || lowerCode.includes("contact") || lowerCode.includes("input")) {
      return "form"
    }
    if (lowerCode.includes("card") || lowerCode.includes("product") || lowerCode.includes("price")) {
      return "card"
    }
    return "landing-page"
  }, [code])

  const handleEdit = useCallback(
    (path: string, newValue: string, oldValue: string) => {
      if (onCodeChange && componentTemplates[componentType as keyof typeof componentTemplates]) {
        const template = componentTemplates[componentType as keyof typeof componentTemplates]
        let updatedCode = template.code

        // Update the code with the new value
        if (path.includes("style.")) {
          // Handle style updates
          const styleProp = path.split(".").pop()
          const elementPath = path.replace(`.style.${styleProp}`, "")
          // Add inline style to the code
          updatedCode = updatedCode.replace(
            /className="([^"]*)"/g,
            `className="$1" style={{${styleProp}: "${newValue}"}}`,
          )
        } else {
          // Handle text updates
          updatedCode = updatedCode.replace(new RegExp(oldValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), newValue)
        }

        onCodeChange(updatedCode)
      }
    },
    [componentType, onCodeChange],
  )

  const template = componentTemplates[componentType as keyof typeof componentTemplates]

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-red-50">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-600 font-semibold mb-2">Preview Error</div>
          <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded overflow-auto whitespace-pre-wrap max-h-40">
            {error}
          </pre>
          <p className="text-xs text-gray-500 mt-2">Fix the code errors to see the live preview</p>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p>No component to render</p>
          <p className="text-xs mt-1">Ask the AI to generate a design</p>
        </div>
      </div>
    )
  }

  return <div className="h-full w-full overflow-auto">{template.component(handleEdit)}</div>
}
