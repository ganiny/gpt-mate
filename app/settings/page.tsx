"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, User, Bell, Palette, Code, CreditCard, Trash2, Download, Upload } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/lib/auth-context"

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  // Profile settings
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    website: "",
    location: "",
    avatar: user?.avatar || "",
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    projectSharing: true,
    weeklyDigest: false,
    marketingEmails: false,
    securityAlerts: true,
  })

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: "system",
    accentColor: "cyan",
    fontSize: "medium",
    compactMode: false,
    showLineNumbers: true,
    autoSave: true,
  })

  // Code preferences
  const [codePrefs, setCodePrefs] = useState({
    defaultFramework: "react",
    indentSize: "2",
    semicolons: true,
    quotes: "double",
    trailingCommas: true,
    formatOnSave: true,
  })

  const handleSave = () => {
    // Mock save functionality
    console.log("Settings saved:", { profile, notifications, appearance, codePrefs })
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-6">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-2 mr-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2">
                <Palette className="w-4 h-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="code" className="gap-2">
                <Code className="w-4 h-4" />
                Code
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-2">
                <CreditCard className="w-4 h-4" />
                Billing
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white">
                      {profile.name.charAt(0) || "U"}
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Avatar
                      </Button>
                      <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="https://yourwebsite.com"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible and destructive actions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Choose what email notifications you want to receive.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      key: "emailUpdates",
                      label: "Product Updates",
                      description: "Get notified about new features and improvements",
                    },
                    {
                      key: "projectSharing",
                      label: "Project Sharing",
                      description: "When someone shares a project with you",
                    },
                    {
                      key: "weeklyDigest",
                      label: "Weekly Digest",
                      description: "A summary of your activity and trending templates",
                    },
                    {
                      key: "marketingEmails",
                      label: "Marketing Emails",
                      description: "Tips, tutorials, and promotional content",
                    },
                    {
                      key: "securityAlerts",
                      label: "Security Alerts",
                      description: "Important security and account notifications",
                    },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme & Appearance</CardTitle>
                  <CardDescription>Customize how GPT Mate looks and feels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={appearance.theme}
                      onValueChange={(value) => setAppearance({ ...appearance, theme: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex gap-2">
                      {["cyan", "blue", "purple", "pink", "green"].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 ${
                            appearance.accentColor === color ? "border-foreground" : "border-transparent"
                          }`}
                          style={{ backgroundColor: `hsl(var(--${color}))` }}
                          onClick={() => setAppearance({ ...appearance, accentColor: color })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select
                      value={appearance.fontSize}
                      onValueChange={(value) => setAppearance({ ...appearance, fontSize: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Editor Preferences</h4>
                    {[
                      { key: "compactMode", label: "Compact Mode", description: "Reduce spacing in the interface" },
                      {
                        key: "showLineNumbers",
                        label: "Show Line Numbers",
                        description: "Display line numbers in code editor",
                      },
                      { key: "autoSave", label: "Auto Save", description: "Automatically save changes as you type" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch
                          checked={appearance[item.key as keyof typeof appearance] as boolean}
                          onCheckedChange={(checked) => setAppearance({ ...appearance, [item.key]: checked })}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Code Settings */}
            <TabsContent value="code" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Generation Preferences</CardTitle>
                  <CardDescription>Customize how AI generates code for your projects.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Framework</Label>
                      <Select
                        value={codePrefs.defaultFramework}
                        onValueChange={(value) => setCodePrefs({ ...codePrefs, defaultFramework: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="react">React</SelectItem>
                          <SelectItem value="vue">Vue</SelectItem>
                          <SelectItem value="angular">Angular</SelectItem>
                          <SelectItem value="svelte">Svelte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Indent Size</Label>
                      <Select
                        value={codePrefs.indentSize}
                        onValueChange={(value) => setCodePrefs({ ...codePrefs, indentSize: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 spaces</SelectItem>
                          <SelectItem value="4">4 spaces</SelectItem>
                          <SelectItem value="tab">Tab</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        key: "semicolons",
                        label: "Use Semicolons",
                        description: "Add semicolons at the end of statements",
                      },
                      {
                        key: "trailingCommas",
                        label: "Trailing Commas",
                        description: "Add trailing commas in objects and arrays",
                      },
                      {
                        key: "formatOnSave",
                        label: "Format on Save",
                        description: "Automatically format code when saving",
                      },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch
                          checked={codePrefs[item.key as keyof typeof codePrefs] as boolean}
                          onCheckedChange={(checked) => setCodePrefs({ ...codePrefs, [item.key]: checked })}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Quote Style</Label>
                    <Select
                      value={codePrefs.quotes}
                      onValueChange={(value) => setCodePrefs({ ...codePrefs, quotes: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single quotes (')</SelectItem>
                        <SelectItem value="double">Double quotes (")</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Settings */}
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Pro Plan</h3>
                        <Badge>Current</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">$29/month • Unlimited projects • Priority support</p>
                    </div>
                    <Button variant="outline">Manage Plan</Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Usage This Month</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>AI Generations</span>
                        <span>847 / 5,000</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "17%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Projects</span>
                        <span>12 / Unlimited</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Update your payment information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>Download your invoices and view payment history.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "Dec 1, 2024", amount: "$29.00", status: "Paid" },
                      { date: "Nov 1, 2024", amount: "$29.00", status: "Paid" },
                      { date: "Oct 1, 2024", amount: "$29.00", status: "Paid" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-muted-foreground">Pro Plan</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{invoice.amount}</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {invoice.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button onClick={handleSave} className="gap-2">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
