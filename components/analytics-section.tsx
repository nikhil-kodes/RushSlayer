"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingDown, TrendingUp, Download, Camera, BarChart3, Activity, Gauge } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TrafficData {
  time: string
  congestion: number
  avgSpeed: number
  vehicleCount: number
  aqi: number
}

interface NodeCongestion {
  node: string
  congestion: number
  improvement: number
}

export function AnalyticsSection() {
  const [timeRange, setTimeRange] = useState("24h")
  const [trafficData, setTrafficData] = useState<TrafficData[]>([])
  const [nodeCongestion, setNodeCongestion] = useState<NodeCongestion[]>([])
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  // Generate mock analytics data
  useEffect(() => {
    const generateTrafficData = () => {
      const hours = timeRange === "24h" ? 24 : timeRange === "7d" ? 168 : 720
      const interval = timeRange === "24h" ? 1 : timeRange === "7d" ? 6 : 24

      const data: TrafficData[] = []
      for (let i = 0; i < hours; i += interval) {
        const baseTime = new Date()
        baseTime.setHours(baseTime.getHours() - (hours - i))

        // Simulate traffic patterns (higher congestion during peak hours)
        const hour = baseTime.getHours()
        const isPeakHour = (hour >= 7 && hour <= 10) || (hour >= 17 && hour <= 20)
        const baseCongestion = isPeakHour ? 70 + Math.random() * 25 : 30 + Math.random() * 30

        data.push({
          time:
            timeRange === "24h"
              ? baseTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : baseTime.toLocaleDateString(),
          congestion: Math.round(baseCongestion),
          avgSpeed: Math.round(60 - baseCongestion * 0.4 + Math.random() * 10),
          vehicleCount: Math.round(baseCongestion * 2 + Math.random() * 50),
          aqi: Math.round(50 + baseCongestion * 0.8 + Math.random() * 30),
        })
      }
      return data
    }

    const generateNodeData = (): NodeCongestion[] => {
      const nodes = [
        "MG Road Junction",
        "Brigade Road Signal",
        "Commercial Street Cross",
        "Koramangala 5th Block",
        "Indiranagar 100 Feet Road",
        "Whitefield Main Road",
      ]

      return nodes.map((node) => ({
        node,
        congestion: Math.round(Math.random() * 100),
        improvement: Math.round((Math.random() - 0.5) * 40), // -20 to +20
      }))
    }

    setTrafficData(generateTrafficData())
    setNodeCongestion(generateNodeData())
  }, [timeRange])

  const exportToCSV = async () => {
    setIsExporting(true)
    try {
      // Simulate export delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const csvContent = [
        "Time,Congestion Level,Average Speed,Vehicle Count,AQI",
        ...trafficData.map((row) => `${row.time},${row.congestion},${row.avgSpeed},${row.vehicleCount},${row.aqi}`),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `traffic-analytics-${timeRange}-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export successful",
        description: `Traffic data exported for ${timeRange} period.`,
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const captureSnapshot = async () => {
    try {
      // In a real app, you would use html2canvas or similar library
      toast({
        title: "Snapshot captured",
        description: "Dashboard snapshot saved to downloads.",
      })
    } catch (error) {
      toast({
        title: "Snapshot failed",
        description: "Failed to capture snapshot. Please try again.",
        variant: "destructive",
      })
    }
  }

  const avgCongestion = Math.round(trafficData.reduce((acc, curr) => acc + curr.congestion, 0) / trafficData.length)
  const avgAQI = Math.round(trafficData.reduce((acc, curr) => acc + curr.aqi, 0) / trafficData.length)
  const congestionTrend =
    trafficData.length > 1 ? trafficData[trafficData.length - 1].congestion - trafficData[0].congestion : 0

  const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  return (
    <div className="space-y-6" id="analytics-section">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Traffic Analytics</h2>
          <p className="text-muted-foreground">Comprehensive traffic insights and trends</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={captureSnapshot}>
            <Camera className="w-4 h-4 mr-2" />
            Snapshot
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCSV} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : "Export CSV"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Congestion</p>
                <p className="text-2xl font-bold">{avgCongestion}%</p>
              </div>
              <div className="flex items-center gap-1">
                {congestionTrend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-destructive" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-chart-2" />
                )}
                <span className={`text-sm ${congestionTrend > 0 ? "text-destructive" : "text-chart-2"}`}>
                  {Math.abs(congestionTrend)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg AQI</p>
                <p className="text-2xl font-bold">{avgAQI}</p>
              </div>
              <Gauge className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Nodes</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <Activity className="w-8 h-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Congestion Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Congestion Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="congestion" stroke="#8b5cf6" strokeWidth={2} name="Congestion %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AQI Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Air Quality Index</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="aqi" stroke="#10b981" strokeWidth={2} name="AQI" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Count */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Count Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vehicleCount" fill="#06b6d4" name="Vehicle Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Node Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Node Congestion Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nodeCongestion}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ node, congestion }) => `${node.split(" ")[0]}: ${congestion}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="congestion"
                >
                  {nodeCongestion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Node Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Node Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nodeCongestion.map((node, index) => (
              <div key={node.node} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="font-medium">{node.node}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{node.congestion}% congestion</div>
                    <div className={`text-xs ${node.improvement > 0 ? "text-chart-2" : "text-destructive"}`}>
                      {node.improvement > 0 ? "+" : ""}
                      {node.improvement}% vs last period
                    </div>
                  </div>
                  <Badge
                    variant={node.congestion > 70 ? "destructive" : node.congestion > 40 ? "secondary" : "default"}
                  >
                    {node.congestion > 70 ? "High" : node.congestion > 40 ? "Medium" : "Low"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
