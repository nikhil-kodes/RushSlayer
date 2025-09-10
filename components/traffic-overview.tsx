"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Car, Clock, MapPin, Gauge, Wifi, WifiOff } from "lucide-react"

interface TrafficNode {
  id: string
  name: string
  lanes: {
    id: string
    direction: string
    vehicleCount: number
    queueLength: number
    signalStatus: "red" | "yellow" | "green"
    timeLeft: number
  }[]
  aqi: number
  lastUpdated: string
}

export function TrafficOverview() {
  const [nodes, setNodes] = useState<TrafficNode[]>([])
  const [isConnected, setIsConnected] = useState(true)
  const [simulatorMode, setSimulatorMode] = useState(true)

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = (): TrafficNode[] => {
      const nodeNames = [
        "MG Road Junction",
        "Brigade Road Signal",
        "Commercial Street Cross",
        "Koramangala 5th Block",
        "Indiranagar 100 Feet Road",
        "Whitefield Main Road",
      ]

      return nodeNames.map((name, index) => ({
        id: `node_${index + 1}`,
        name,
        lanes: [
          {
            id: `${index + 1}_north`,
            direction: "North",
            vehicleCount: Math.floor(Math.random() * 25) + 5,
            queueLength: Math.floor(Math.random() * 100) + 10,
            signalStatus: ["red", "yellow", "green"][Math.floor(Math.random() * 3)] as "red" | "yellow" | "green",
            timeLeft: Math.floor(Math.random() * 60) + 10,
          },
          {
            id: `${index + 1}_south`,
            direction: "South",
            vehicleCount: Math.floor(Math.random() * 25) + 5,
            queueLength: Math.floor(Math.random() * 100) + 10,
            signalStatus: ["red", "yellow", "green"][Math.floor(Math.random() * 3)] as "red" | "yellow" | "green",
            timeLeft: Math.floor(Math.random() * 60) + 10,
          },
          {
            id: `${index + 1}_east`,
            direction: "East",
            vehicleCount: Math.floor(Math.random() * 25) + 5,
            queueLength: Math.floor(Math.random() * 100) + 10,
            signalStatus: ["red", "yellow", "green"][Math.floor(Math.random() * 3)] as "red" | "yellow" | "green",
            timeLeft: Math.floor(Math.random() * 60) + 10,
          },
          {
            id: `${index + 1}_west`,
            direction: "West",
            vehicleCount: Math.floor(Math.random() * 25) + 5,
            queueLength: Math.floor(Math.random() * 100) + 10,
            signalStatus: ["red", "yellow", "green"][Math.floor(Math.random() * 3)] as "red" | "yellow" | "green",
            timeLeft: Math.floor(Math.random() * 60) + 10,
          },
        ],
        aqi: Math.floor(Math.random() * 200) + 50,
        lastUpdated: new Date().toISOString(),
      }))
    }

    // Initial data
    setNodes(generateMockData())

    // Simulate real-time updates every 3 seconds
    const interval = setInterval(() => {
      if (simulatorMode) {
        setNodes(generateMockData())
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [simulatorMode])

  const getSignalColor = (status: string) => {
    switch (status) {
      case "red":
        return "bg-destructive"
      case "yellow":
        return "bg-yellow-500"
      case "green":
        return "bg-chart-2"
      default:
        return "bg-muted"
    }
  }

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "bg-chart-2" }
    if (aqi <= 100) return { label: "Moderate", color: "bg-yellow-500" }
    if (aqi <= 150) return { label: "Unhealthy for Sensitive", color: "bg-orange-500" }
    if (aqi <= 200) return { label: "Unhealthy", color: "bg-destructive" }
    return { label: "Very Unhealthy", color: "bg-purple-600" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Traffic Overview</h2>
          <p className="text-muted-foreground">Real-time traffic node monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isConnected ? <Wifi className="w-4 h-4 text-chart-2" /> : <WifiOff className="w-4 h-4 text-destructive" />}
            <span className="text-sm text-muted-foreground">{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
          <Button
            variant={simulatorMode ? "default" : "outline"}
            size="sm"
            onClick={() => setSimulatorMode(!simulatorMode)}
          >
            {simulatorMode ? "Simulator ON" : "Simulator OFF"}
          </Button>
        </div>
      </div>

      {/* Traffic Nodes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map((node) => (
          <Card key={node.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {node.name}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {node.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* AQI */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  <span className="text-sm font-medium">AQI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getAQIStatus(node.aqi).color}`} />
                  <span className="text-sm font-bold">{node.aqi}</span>
                  <span className="text-xs text-muted-foreground">{getAQIStatus(node.aqi).label}</span>
                </div>
              </div>

              {/* Lanes */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Lane Status</h4>
                {node.lanes.map((lane) => (
                  <div key={lane.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getSignalColor(lane.signalStatus)}`} />
                      <span className="text-sm font-medium">{lane.direction}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Car className="w-3 h-3" />
                        <span>{lane.vehicleCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{lane.timeLeft}s</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Queue Length Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Avg Queue Length</span>
                  <span>
                    {Math.round(node.lanes.reduce((acc, lane) => acc + lane.queueLength, 0) / node.lanes.length)}m
                  </span>
                </div>
                <Progress
                  value={Math.min(
                    node.lanes.reduce((acc, lane) => acc + lane.queueLength, 0) / node.lanes.length / 2,
                    100,
                  )}
                  className="h-2"
                />
              </div>

              {/* Last Updated */}
              <div className="text-xs text-muted-foreground">
                Updated: {new Date(node.lastUpdated).toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
