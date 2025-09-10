"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Ambulance, Truck, AlertTriangle, Volume2, VolumeX, Clock } from "lucide-react"

interface EmergencyAlert {
  id: string
  type: "ambulance" | "fire_truck" | "police"
  location: string
  priority: "high" | "medium" | "low"
  timestamp: string
  status: "active" | "resolved"
  estimatedArrival: number
}

export function AlertsSection() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([])
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [lastAlertTime, setLastAlertTime] = useState<number>(0)

  // Simulate emergency vehicle alerts
  useEffect(() => {
    const generateRandomAlert = (): EmergencyAlert => {
      const types: ("ambulance" | "fire_truck" | "police")[] = ["ambulance", "fire_truck", "police"]
      const locations = [
        "MG Road Junction",
        "Brigade Road Signal",
        "Commercial Street Cross",
        "Koramangala 5th Block",
        "Indiranagar 100 Feet Road",
        "Whitefield Main Road",
      ]
      const priorities: ("high" | "medium" | "low")[] = ["high", "medium", "low"]

      return {
        id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        type: types[Math.floor(Math.random() * types.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        timestamp: new Date().toISOString(),
        status: "active",
        estimatedArrival: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
      }
    }

    // Generate initial alerts
    const initialAlerts = Array.from({ length: 2 }, generateRandomAlert)
    setAlerts(initialAlerts)

    // Simulate new alerts every 15-45 seconds
    const alertInterval = setInterval(
      () => {
        if (Math.random() < 0.3) {
          // 30% chance of new alert
          const newAlert = generateRandomAlert()
          setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]) // Keep only 5 most recent
          setLastAlertTime(Date.now())

          // Play audio alert if enabled
          if (audioEnabled && newAlert.priority === "high") {
            // In a real app, you would play an actual audio file
            console.log("🚨 AUDIO ALERT: High priority emergency vehicle detected!")
          }
        }
      },
      Math.random() * 30000 + 15000,
    ) // 15-45 seconds

    // Auto-resolve alerts after some time
    const resolveInterval = setInterval(() => {
      setAlerts((prev) =>
        prev.map((alert) => {
          const alertAge = Date.now() - new Date(alert.timestamp).getTime()
          if (alertAge > 120000 && alert.status === "active") {
            // Resolve after 2 minutes
            return { ...alert, status: "resolved" }
          }
          return alert
        }),
      )
    }, 10000)

    return () => {
      clearInterval(alertInterval)
      clearInterval(resolveInterval)
    }
  }, [audioEnabled])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "ambulance":
        return <Ambulance className="w-5 h-5" />
      case "fire_truck":
        return <Truck className="w-5 h-5" />
      case "police":
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <AlertTriangle className="w-5 h-5" />
    }
  }

  const getAlertColor = (priority: string, status: string) => {
    if (status === "resolved") return "text-muted-foreground"
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-chart-1"
      default:
        return "text-muted-foreground"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium Priority</Badge>
      case "low":
        return <Badge variant="secondary">Low Priority</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const activeAlerts = alerts.filter((alert) => alert.status === "active")
  const resolvedAlerts = alerts.filter((alert) => alert.status === "resolved")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Emergency Vehicle Alerts
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="flex items-center gap-2"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {audioEnabled ? "Audio On" : "Audio Off"}
            </Button>
            <Badge variant="outline">{activeAlerts.length} Active</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Active Alerts */}
        {activeAlerts.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Active Alerts</h4>
            {activeAlerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-destructive">
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={getAlertColor(alert.priority, alert.status)}>{getAlertIcon(alert.type)}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium capitalize">
                            {alert.type.replace("_", " ")} at {alert.location}
                          </span>
                          {getPriorityBadge(alert.priority)}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              ETA: {Math.floor(alert.estimatedArrival / 60)}m {alert.estimatedArrival % 60}s
                            </span>
                          </div>
                          <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setAlerts((prev) =>
                          prev.map((a) => (a.id === alert.id ? { ...a, status: "resolved" as const } : a)),
                        )
                      }
                    >
                      Resolve
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No active emergency alerts</p>
          </div>
        )}

        {/* Recent Resolved Alerts */}
        {resolvedAlerts.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-muted-foreground">Recently Resolved</h4>
            {resolvedAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
                <div className="text-muted-foreground">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">
                    {alert.type.replace("_", " ")} at {alert.location}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Resolved at {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Resolved
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
