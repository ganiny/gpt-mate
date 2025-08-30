"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Download, Maximize2, Save, Undo, Redo } from "lucide-react"

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [history, setHistory] = useState<string[]>([code])
  const [historyIndex, setHistoryIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout>()
  const [internalCode, setInternalCode] = useState(code)

  const handleSave = useCallback(() => {
    onChange(internalCode)
    setHasUnsavedChanges(false)
  }, [internalCode, onChange])

  const debouncedSave = useCallback(
    (newCode: string) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        onChange(newCode)
        setHasUnsavedChanges(false)
      }, 500) // Auto-save after 500ms of no typing
    },
    [onChange],
  )

  const handleCodeChange = useCallback(
    (newCode: string) => {
      setInternalCode(newCode)
      setHasUnsavedChanges(true)

      if (newCode !== history[historyIndex]) {
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(newCode)

        if (newHistory.length > 50) {
          newHistory.shift()
        }

        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
      }

      debouncedSave(newCode)
    },
    [history, historyIndex, debouncedSave],
  )

  useEffect(() => {
    if (code !== internalCode && Math.abs(code.length - internalCode.length) > 10) {
      setInternalCode(code)
      setHistory((prev) => [...prev, code])
      setHistoryIndex((prev) => prev + 1)
      setHasUnsavedChanges(false)
    }
  }, [code, internalCode])

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      const previousCode = history[newIndex]
      setInternalCode(previousCode)
      onChange(previousCode)
      setHasUnsavedChanges(false)
    }
  }, [history, historyIndex, onChange])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      const nextCode = history[newIndex]
      setInternalCode(nextCode)
      onChange(nextCode)
      setHasUnsavedChanges(false)
    }
  }, [history, historyIndex, onChange])

  const handleCursorChange = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const lines = textarea.value.substring(0, textarea.selectionStart).split("\n")
      const line = lines.length
      const column = lines[lines.length - 1].length + 1
      setCursorPosition({ line, column })
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault()
            handleSave()
            break
          case "z":
            if (e.shiftKey) {
              e.preventDefault()
              handleRedo()
            } else {
              e.preventDefault()
              handleUndo()
            }
            break
          case "y":
            e.preventDefault()
            handleRedo()
            break
        }
      }
    },
    [handleSave, handleUndo, handleRedo],
  )

  const handleCopy = async () => {
    await navigator.clipboard.writeText(internalCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([internalCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "component.tsx"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!internalCode) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <Copy className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No code generated yet</h3>
          <p>Ask the AI to create a component and the code will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`h-full flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
      {/* Code Editor Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="outline">React</Badge>
          <span className="text-sm text-muted-foreground">{internalCode.split("\n").length} lines</span>
          {hasUnsavedChanges && (
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              Unsaved
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleUndo} disabled={historyIndex <= 0} title="Undo (Ctrl+Z)">
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSave} disabled={!hasUnsavedChanges} title="Save (Ctrl+S)">
            <Save className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 relative">
        <ScrollArea className="h-full">
          <div className="p-4">
            <textarea
              ref={textareaRef}
              value={internalCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onSelect={handleCursorChange}
              onClick={handleCursorChange}
              className="w-full h-full min-h-[600px] bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed pl-12"
              placeholder="Your generated code will appear here..."
              spellCheck={false}
            />
          </div>
        </ScrollArea>

        {/* Line numbers */}
        <div className="absolute left-0 top-0 p-4 pointer-events-none">
          <div className="font-mono text-sm text-muted-foreground/50 leading-relaxed">
            {internalCode.split("\n").map((_, index) => (
              <div key={index} className="text-right pr-4 select-none">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Stats */}
      <div className="border-t p-2 bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>UTF-8</span>
            <span>
              Ln {cursorPosition.line}, Col {cursorPosition.column}
            </span>
            <span>{internalCode.length} characters</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Auto-save enabled</span>
            {hasUnsavedChanges && <span className="text-orange-600">●</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
