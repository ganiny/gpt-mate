"use client"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Monitor, Smartphone, Tablet, Maximize2, RefreshCw } from "lucide-react"
import { LivePreviewRenderer } from "./live-preview-renderer"

interface DesignPreviewProps {
  code: string
  design?: any
  onCodeChange?: (code: string) => void
}

export function DesignPreview({ code, design, onCodeChange }: DesignPreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [previewMode, setPreviewMode] = useState<"live" | "static">("live")
  const [previewError, setPreviewError] = useState<string | null>(null)

  const handleCodeChangeFromPreview = useCallback(
    (newCode: string) => {
      onCodeChange?.(newCode)
    },
    [onCodeChange],
  )

  const handlePreviewError = useCallback((error: string) => {
    setPreviewError(error)
  }, [])

  const getViewportClass = () => {
    switch (viewMode) {
      case "mobile":
        return "w-[375px] h-[667px]"
      case "tablet":
        return "w-[768px] h-[1024px]"
      default:
        return "w-full h-full"
    }
  }

  if (!code && !design) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No design to preview</h3>
          <p>Ask the AI to generate a design and it will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`h-full flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-4">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="desktop" className="gap-2">
                <Monitor className="w-4 h-4" />
                Desktop
              </TabsTrigger>
              <TabsTrigger value="tablet" className="gap-2">
                <Tablet className="w-4 h-4" />
                Tablet
              </TabsTrigger>
              <TabsTrigger value="mobile" className="gap-2">
                <Smartphone className="w-4 h-4" />
                Mobile
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {design && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{design.category}</Badge>
              <span className="text-sm text-muted-foreground">
                Generated {new Date(design.generatedAt || Date.now()).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setRefreshKey((prev) => prev + 1)}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {previewError && (
        <div className="bg-destructive/10 border-b border-destructive/20 p-2">
          <p className="text-sm text-destructive">Preview Error: {previewError}</p>
        </div>
      )}

      {/* Preview Content */}
      <div className="flex-1 bg-muted/20 p-4 overflow-auto">
        <div className="h-full flex items-center justify-center">
          <div
            className={`${getViewportClass()} bg-background border rounded-lg shadow-lg overflow-hidden transition-all duration-300`}
          >
            <ScrollArea className="h-full">
              {code ? (
                <LivePreviewRenderer
                  key={refreshKey}
                  code={code}
                  onCodeChange={handleCodeChangeFromPreview}
                  onError={handlePreviewError}
                />
              ) : design?.preview ? (
                <img
                  src={design.preview || "/placeholder.svg"}
                  alt={design.title || "Design Preview"}
                  className="w-full h-auto"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>No preview available</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Preview Footer */}
      <div className="border-t p-2 bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{viewMode === "desktop" ? "1920×1080" : viewMode === "tablet" ? "768×1024" : "375×667"}</span>
          <div className="flex items-center gap-2">
            <span>Live Preview</span>
            <Badge variant="outline" className="text-xs">
              Click elements to edit
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
