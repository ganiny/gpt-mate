"use client"
import { useState, useEffect, Suspense, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, Eye, Code, Download, Share, Save, Sparkles, Loader2, Copy, Check, Zap } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import { apiClient, type ChatMessage } from "@/lib/api-client"
import { CodeEditor } from "@/components/workspace/code-editor"
import { DesignPreview } from "@/components/workspace/design-preview"
import { useToast } from "@/hooks/use-toast"

function WorkspaceContent() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // State management
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [currentCode, setCurrentCode] = useState("")
  const [currentDesign, setCurrentDesign] = useState<any>(null)
  const [projectTitle, setProjectTitle] = useState("Untitled Project")
  const [isSaving, setIsSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "error">("synced")

  // Get initial prompt from URL
  const initialPrompt = searchParams?.get("prompt")
  const projectId = searchParams?.get("project")
  const templateId = searchParams?.get("template")

  const handleCodeChange = useCallback((newCode: string) => {
    setSyncStatus("syncing")
    setCurrentCode(newCode)

    // Simulate sync delay
    setTimeout(() => {
      setSyncStatus("synced")
    }, 300)
  }, [])

  const handleCodeChangeFromPreview = useCallback(
    (newCode: string) => {
      setSyncStatus("syncing")
      setCurrentCode(newCode)

      // Add AI message about the change
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "I've updated the code based on your preview edits. The changes are now synchronized between the preview and code editor.",
        timestamp: new Date().toISOString(),
      }
      setChatMessages((prev) => [...prev, aiMessage])

      setTimeout(() => {
        setSyncStatus("synced")
        toast({
          title: "Code Updated",
          description: "Changes from preview have been synced to the code editor",
        })
      }, 300)
    },
    [toast],
  )

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your AI design assistant. Tell me what you'd like to create and I'll generate a beautiful design with code for you. Try something like 'create a modern landing page' or 'build a dashboard with charts'. You can also edit elements directly in the live preview!",
      timestamp: new Date().toISOString(),
    }
    setChatMessages([welcomeMessage])

    // Handle initial prompt from homepage
    if (initialPrompt) {
      handleGenerateDesign(initialPrompt)
    }

    // Load existing project if projectId is provided
    if (projectId) {
      loadProject(projectId)
    }

    // Load template if templateId is provided
    if (templateId) {
      loadTemplate(templateId)
    }
  }, [initialPrompt, projectId, templateId])

  const loadProject = async (id: string) => {
    try {
      const response = await apiClient.getProject(id)
      if (response.success) {
        setCurrentCode(response.project.code)
        setProjectTitle(response.project.title)
        setCurrentDesign({
          title: response.project.title,
          description: response.project.description,
          preview: response.project.thumbnail,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load project",
        variant: "destructive",
      })
    }
  }

  const loadTemplate = async (id: string) => {
    // Mock template loading - in real app, this would fetch from templates API
    const templates: Record<string, any> = {
      "1": {
        title: "Modern Landing Page",
        code: `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Component() {
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
            Create beautiful, responsive web applications with modern technologies.
          </p>
          <Button size="lg" className="mr-4">Get Started</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </main>
    </div>
  )
}`,
      },
    }

    const template = templates[id]
    if (template) {
      setCurrentCode(template.code)
      setProjectTitle(template.title)
      setCurrentDesign({
        title: template.title,
        description: "Template-based design",
        preview: "/placeholder.svg?height=400&width=600",
      })
    }
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isSending) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: currentMessage,
      timestamp: new Date().toISOString(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    const messageToSend = currentMessage
    setCurrentMessage("")
    setIsSending(true)

    try {
      // Check if this is a design generation request
      if (
        messageToSend.toLowerCase().includes("create") ||
        messageToSend.toLowerCase().includes("build") ||
        messageToSend.toLowerCase().includes("generate") ||
        messageToSend.toLowerCase().includes("make")
      ) {
        await handleGenerateDesign(messageToSend)
      } else {
        // Regular chat message
        const response = await apiClient.sendChatMessage(messageToSend, chatMessages)
        if (response.success) {
          setChatMessages((prev) => [...prev, response.message])
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleGenerateDesign = async (prompt: string) => {
    setIsGenerating(true)

    // Add user message if not already added
    if (!chatMessages.some((msg) => msg.content === prompt && msg.role === "user")) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: prompt,
        timestamp: new Date().toISOString(),
      }
      setChatMessages((prev) => [...prev, userMessage])
    }

    try {
      const response = await apiClient.generateDesign(prompt)
      if (response.success) {
        setCurrentDesign(response.design)
        setCurrentCode(response.code)
        setProjectTitle(response.design.title)

        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `I've generated "${response.design.title}" for you! You can see the design preview on the right, and switch to the code tab to view and edit the React code. In Live preview mode, you can click on text elements to edit them directly - changes will sync automatically to the code editor!`,
          timestamp: new Date().toISOString(),
        }
        setChatMessages((prev) => [...prev, aiMessage])
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while generating the design. Please try again with a different prompt.",
        timestamp: new Date().toISOString(),
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveProject = async () => {
    if (!currentCode || !user) return

    setIsSaving(true)
    try {
      const response = await apiClient.createProject({
        title: projectTitle,
        description: currentDesign?.description || "",
        code: currentCode,
        prompt: currentDesign?.prompt || "",
        thumbnail: currentDesign?.preview || "/placeholder.svg?height=400&width=600",
        category: currentDesign?.category || "Custom",
      })

      if (response.success) {
        toast({
          title: "Success",
          description: "Project saved successfully!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopyCode = async () => {
    if (currentCode) {
      await navigator.clipboard.writeText(currentCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-2 mr-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <div className="flex-1">
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none outline-none focus:bg-muted/50 px-2 py-1 rounded"
              placeholder="Untitled Project"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap
                className={`w-3 h-3 ${syncStatus === "syncing" ? "animate-pulse text-yellow-500" : syncStatus === "synced" ? "text-green-500" : "text-red-500"}`}
              />
              <span className="capitalize">{syncStatus}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyCode} className="gap-2 bg-transparent">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy Code"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button onClick={handleSaveProject} disabled={isSaving} className="gap-2">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Sidebar - Chat */}
        <div className="w-1/4 border-r bg-muted/30 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="font-semibold">AI Assistant</h2>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                  {message.role === "assistant" && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-card border"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {(isGenerating || isSending) && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-card border rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isGenerating ? "Generating design..." : "Thinking..."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ask me to create something..."
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isSending || isGenerating}
              />
              <Button onClick={handleSendMessage} disabled={isSending || isGenerating || !currentMessage.trim()}>
                {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Content - Preview/Code */}
        <div className="flex-1 flex flex-col">
          {/* Tab Controls */}
          <div className="border-b p-4">
            <Tabs className="flex justify-center" value={activeTab} onValueChange={(value) => setActiveTab(value as "preview" | "code")}>
              <TabsList>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="gap-2">
                  <Code className="w-4 h-4" />
                  Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === "preview" ? (
              <DesignPreview code={currentCode} design={currentDesign} onCodeChange={handleCodeChangeFromPreview} />
            ) : (
              <CodeEditor code={currentCode} onChange={handleCodeChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkspacePage() {
  return (
    <AuthGuard>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        }
      >
        <WorkspaceContent />
      </Suspense>
    </AuthGuard>
  )
}
