"use client"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Grid3X3, Star, Calendar, Folder, Settings, HelpCircle, Sparkles } from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const navigation = [
    {
      name: "All Projects",
      href: "/dashboard",
      icon: Grid3X3,
      current: pathname === "/dashboard",
    },
    {
      name: "Starred",
      href: "/dashboard?filter=starred",
      icon: Star,
      current: pathname === "/dashboard" && false, // TODO: implement filter logic
    },
    {
      name: "Recent",
      href: "/dashboard?filter=recent",
      icon: Calendar,
      current: pathname === "/dashboard" && false, // TODO: implement filter logic
    },
    {
      name: "Templates",
      href: "/templates",
      icon: Folder,
      current: pathname === "/templates",
    },
  ]

  const secondaryNavigation = [
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      name: "Help & Support",
      href: "/help",
      icon: HelpCircle,
    },
  ]

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">GPT Mate</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={item.current ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => router.push(item.href)}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Button>
        ))}

        <div className="pt-6 mt-6 border-t">
          <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Categories</h3>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
              Landing Pages
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
              Dashboards
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
              Mobile Apps
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
              Portfolios
            </Button>
          </div>
        </div>
      </nav>

      <div className="px-4 py-6 border-t">
        <div className="space-y-1 mb-4">
          {secondaryNavigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3"
              onClick={() => router.push(item.href)}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Button>
          ))}
        </div>

        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h3 className="font-medium mb-2">Upgrade to Pro</h3>
          <p className="text-sm text-muted-foreground mb-3">Get unlimited projects and advanced AI features</p>
          <Button size="sm" className="w-full">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  )
}
