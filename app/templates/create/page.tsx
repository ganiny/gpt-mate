"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

export default function CreateTemplatePage() {
  const router = useRouter()
  const [template, setTemplate] = useState({
    title: "",
    description: "",
    category: "",
    tags: [] as string[],
    thumbnail: "",
    code: "",
    isPublic: true,
  })
  const [newTag, setNewTag] = useState("")

  const categories = [
    { value: "landing-page", label: "Landing Page" },
    { value: "dashboard", label: "Dashboard" },
    { value: "portfolio", label: "Portfolio" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "blog", label: "Blog" },
    { value: "other", label: "Other" },
  ]

  const addTag = () => {
    if (newTag.trim() && !template.tags.includes(newTag.trim())) {
      setTemplate({ ...template, tags: [...template.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTemplate({ ...template, tags: template.tags.filter((tag) => tag !== tagToRemove) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock template creation
    console.log("Creating template:", template)
    router.push("/templates")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-6">
            <Button variant="ghost" size="sm" onClick={() => router.push("/templates")} className="gap-2 mr-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Templates
            </Button>
            <h1 className="text-xl font-semibold">Create Template</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide basic details about your template.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Template Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter template title..."
                    value={template.title}
                    onChange={(e) => setTemplate({ ...template, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this template does and when to use it..."
                    value={template.description}
                    onChange={(e) => setTemplate({ ...template, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={template.category}
                    onValueChange={(value) => setTemplate({ ...template, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>Add tags to help users discover your template.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {template.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Thumbnail */}
            <Card>
              <CardHeader>
                <CardTitle>Thumbnail</CardTitle>
                <CardDescription>Upload a preview image for your template.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Upload thumbnail</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    PNG, JPG or GIF up to 2MB. Recommended size: 800x600px
                  </p>
                  <Button type="button" variant="outline">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Code */}
            <Card>
              <CardHeader>
                <CardTitle>Template Code</CardTitle>
                <CardDescription>Paste or write the code for your template.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your React component code here..."
                  value={template.code}
                  onChange={(e) => setTemplate({ ...template, code: e.target.value })}
                  className="min-h-[300px] font-mono text-sm"
                  required
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/templates")}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit">Publish Template</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  )
}
