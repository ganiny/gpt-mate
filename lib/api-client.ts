// API client utilities for frontend components

export interface GenerateDesignResponse {
  success: boolean
  design: {
    id: string
    title: string
    description: string
    preview: string
    category: string
    prompt: string
    generatedAt: string
  }
  code: string
}

export interface GenerateCodeResponse {
  success: boolean
  code: string
  prompt: string
  generatedAt: string
  modifications?: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  code: string
  prompt: string
  createdAt: string
  updatedAt: string
  isStarred: boolean
  category: string
}

export interface ProjectsResponse {
  success: boolean
  projects: Project[]
  total: number
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export class ApiClient {
  private baseUrl = "/api"

  async generateDesign(prompt: string): Promise<GenerateDesignResponse> {
    const response = await fetch(`${this.baseUrl}/generate-design`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate design")
    }

    return response.json()
  }

  async generateCode(prompt: string, currentCode?: string): Promise<GenerateCodeResponse> {
    const response = await fetch(`${this.baseUrl}/generate-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, currentCode }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate code")
    }

    return response.json()
  }

  async getProjects(params?: {
    search?: string
    category?: string
    starred?: boolean
  }): Promise<ProjectsResponse> {
    const searchParams = new URLSearchParams()
    if (params?.search) searchParams.set("search", params.search)
    if (params?.category) searchParams.set("category", params.category)
    if (params?.starred) searchParams.set("starred", "true")

    const response = await fetch(`${this.baseUrl}/projects?${searchParams}`)

    if (!response.ok) {
      throw new Error("Failed to fetch projects")
    }

    return response.json()
  }

  async getProject(id: string): Promise<{ success: boolean; project: Project }> {
    const response = await fetch(`${this.baseUrl}/projects/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch project")
    }

    return response.json()
  }

  async createProject(project: {
    title: string
    description?: string
    code: string
    prompt?: string
    thumbnail?: string
    category?: string
  }): Promise<{ success: boolean; project: Project }> {
    const response = await fetch(`${this.baseUrl}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })

    if (!response.ok) {
      throw new Error("Failed to create project")
    }

    return response.json()
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<{ success: boolean; project: Project }> {
    const response = await fetch(`${this.baseUrl}/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error("Failed to update project")
    }

    return response.json()
  }

  async deleteProject(id: string): Promise<{ success: boolean; project: Project }> {
    const response = await fetch(`${this.baseUrl}/projects/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete project")
    }

    return response.json()
  }

  async sendChatMessage(message: string, history?: ChatMessage[]): Promise<{ success: boolean; message: ChatMessage }> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    })

    if (!response.ok) {
      throw new Error("Failed to send chat message")
    }

    return response.json()
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
