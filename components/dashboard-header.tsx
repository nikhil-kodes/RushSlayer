"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Settings, Bell, User, BarChart3 } from "lucide-react"
import Link from "next/link"

interface AdminUser {
  email: string
  name: string
  role: string
}

interface DashboardHeaderProps {
  user: AdminUser
  onLogout: () => void
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            RUSHSLAYER
          </Link>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Admin Dashboard
          </Badge>
        </div>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse"></div>
          <span className="text-muted-foreground">System Online</span>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            onClick={() => {
              document.getElementById("analytics-section")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>

          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Bell className="w-4 h-4 mr-2" />
            Alerts
          </Button>

          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
          </div>

          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
