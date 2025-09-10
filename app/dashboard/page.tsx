"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { TrafficOverview } from "@/components/traffic-overview"
import { AlertsSection } from "@/components/alerts-section"
import { ManualOverride } from "@/components/manual-override"
import { AnalyticsSection } from "@/components/analytics-section"

interface AdminUser {
  email: string
  name: string
  role: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("rushslayer_admin_token")
    const userData = localStorage.getItem("rushslayer_admin_user")

    if (!token || !userData) {
      router.push("/admin")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error("Invalid user data:", error)
      router.push("/admin")
      return
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("rushslayer_admin_token")
    localStorage.removeItem("rushslayer_admin_user")
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <main className="p-6 space-y-6">
        <div className="max-w-7xl mx-auto">
          <TrafficOverview />
          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <AlertsSection />
            </div>
            <div>
              <ManualOverride />
            </div>
          </div>
          <div className="mt-6">
            <AnalyticsSection />
          </div>
        </div>
      </main>
    </div>
  )
}
