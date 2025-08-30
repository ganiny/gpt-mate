"use client"
import { useState, useRef, useEffect } from "react"
import type { ReactNode, MouseEvent, KeyboardEvent } from "react"
import type React from "react"

interface EditableElementProps {
  children: ReactNode
  path: string
  onEdit: (path: string, newValue: string, oldValue: string) => void
  className?: string
  elementType?: keyof React.JSX.IntrinsicElements
  editableProps?: string[]
}

export default function EditableElement({
  children,
  path,
  onEdit,
  className = "",
  elementType = "span",
  editableProps = [],
}: EditableElementProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isStyleEditing, setIsStyleEditing] = useState(false)
  const [text, setText] = useState(String(children || ""))
  const [originalText] = useState(String(children || ""))
  const [styles, setStyles] = useState<Record<string, string>>({})
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const elementRef = useRef<HTMLElement>(null)
  const editingRef = useRef<HTMLElement>(null)

  const saveCursorPosition = () => {
    if (editingRef.current) {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        return {
          startOffset: range.startOffset,
          endOffset: range.endOffset,
          startContainer: range.startContainer,
          endContainer: range.endContainer,
        }
      }
    }
    return null
  }

  const restoreCursorPosition = (position: any) => {
    if (position && editingRef.current) {
      setTimeout(() => {
        try {
          const selection = window.getSelection()
          const range = document.createRange()

          // Find the text node within the editable element
          const textNode = editingRef.current?.firstChild || editingRef.current
          if (textNode) {
            const offset = Math.min(position.startOffset, textNode.textContent?.length || 0)
            range.setStart(textNode, offset)
            range.setEnd(textNode, offset)
            selection?.removeAllRanges()
            selection?.addRange(range)
          }
        } catch (e) {
          // Ignore cursor restoration errors
        }
      }, 0)
    }
  }

  const calculateTooltipPosition = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = rect.top - 80 // Default above element
      let left = rect.left

      // Adjust if tooltip would go off-screen vertically
      if (top < 10) {
        top = rect.bottom + 10 // Position below element
      }

      // Adjust if tooltip would go off-screen horizontally
      const tooltipWidth = 200 // Approximate tooltip width
      if (left + tooltipWidth > viewportWidth - 20) {
        left = viewportWidth - tooltipWidth - 20
      }
      if (left < 10) {
        left = 10
      }

      setTooltipPosition({ top, left })
    }
  }

  useEffect(() => {
    if (isEditing || isStyleEditing) {
      calculateTooltipPosition()
    }
  }, [isEditing, isStyleEditing])

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    if (e.shiftKey && editableProps.length > 0) {
      setIsStyleEditing(true)
    } else {
      setIsEditing(true)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    if (text !== originalText) {
      onEdit(path, text, originalText)
    }
  }

  const handleStyleSave = (property: string, value: string) => {
    setStyles((prev) => ({ ...prev, [property]: value }))
    onEdit(`${path}.style.${property}`, value, styles[property] || "")
    setIsStyleEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === "Escape") {
      setText(originalText)
      setIsEditing(false)
      setIsStyleEditing(false)
    }
  }

  const handleInput = (e: any) => {
    const cursorPos = saveCursorPosition()
    const newText = e.target.textContent || ""
    setText(newText)
    restoreCursorPosition(cursorPos)
  }

  const Element = elementType as any

  if (isStyleEditing) {
    return (
      <div className="relative inline-block">
        <div
          className="fixed bg-gray-900 text-white p-3 rounded-lg shadow-lg z-50 min-w-48"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            maxWidth: "250px",
          }}
        >
          <div className="text-xs font-medium mb-2">Edit Styles (Shift+Click)</div>
          <div className="space-y-2">
            {editableProps.map((prop) => (
              <div key={prop} className="flex items-center gap-2">
                <label className="text-xs w-16 capitalize">{prop.replace(/([A-Z])/g, " $1").toLowerCase()}:</label>
                <input
                  type={prop.includes("color") || prop.includes("Color") ? "color" : "text"}
                  className="flex-1 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded"
                  placeholder={prop.includes("color") ? "#000000" : "value"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleStyleSave(prop, e.currentTarget.value)
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value) {
                      handleStyleSave(prop, e.target.value)
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-2">Press Enter to apply, Esc to cancel</div>
        </div>
        <Element
          ref={elementRef}
          className={`${className} outline outline-2 outline-blue-500 outline-offset-1`}
          style={styles}
        >
          {text}
        </Element>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="relative inline-block" style={{ minWidth: "100px" }}>
        <div
          className="fixed bg-blue-600 text-white px-2 py-1 rounded text-xs z-50 whitespace-nowrap"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          Editing - Enter to save, Esc to cancel
        </div>
        <Element
          ref={(el: HTMLElement) => {
            elementRef.current = el
            editingRef.current = el
          }}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          className={`bg-transparent border-2 border-blue-500 rounded px-1 outline-none ${className}`}
          style={{
            fontSize: "inherit",
            fontWeight: "inherit",
            color: "inherit",
            fontFamily: "inherit",
            minWidth: "100px",
            ...styles,
          }}
        >
          {text}
        </Element>
      </div>
    )
  }

  return (
    <Element
      ref={elementRef}
      onClick={handleClick}
      className={`cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 hover:outline-offset-1 rounded px-1 transition-all ${className}`}
      title={editableProps.length > 0 ? "Click to edit text, Shift+Click to edit styles" : "Click to edit"}
      style={{ minHeight: "1.2em", display: "inline-block", ...styles }}
    >
      {text}
    </Element>
  )
}
