"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Clock, MapPin, AlertCircle, CheckCircle, History } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OverrideLog {
  id: string
  node: string
  lane: string
  signalPhase: string
  duration: number
  timestamp: string
  user: string
  status: "active" | "completed"
}

export function ManualOverride() {
  const [selectedNode, setSelectedNode] = useState("")
  const [selectedLane, setSelectedLane] = useState("")
  const [signalPhase, setSignalPhase] = useState("")
  const [duration, setDuration] = useState(30)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [overrideLogs, setOverrideLogs] = useState<OverrideLog[]>([
    {
      id: "override_001",
      node: "MG Road Junction",
      lane: "North",
      signalPhase: "Green",
      duration: 45,
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      user: "Admin User",
      status: "completed",
    },
    {
      id: "override_002",
      node: "Brigade Road Signal",
      lane: "East",
      signalPhase: "Red",
      duration: 60,
      timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
      user: "Admin User",
      status: "active",
    },
  ])
  const { toast } = useToast()

  const trafficNodes = [
    "MG Road Junction",
    "Brigade Road Signal",
    "Commercial Street Cross",
    "Koramangala 5th Block",
    "Indiranagar 100 Feet Road",
    "Whitefield Main Road",
  ]

  const lanes = ["North", "South", "East", "West"]
  const signalPhases = ["Red", "Yellow", "Green"]

  const handleSubmitOverride = async () => {
    if (!selectedNode || !selectedLane || !signalPhase || duration < 10) {
      toast({
        title: "Invalid input",
        description: "Please fill all fields and ensure duration is at least 10 seconds.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newOverride: OverrideLog = {
        id: `override_${Date.now()}`,
        node: selectedNode,
        lane: selectedLane,
        signalPhase,
        duration,
        timestamp: new Date().toISOString(),
        user: "Admin User",
        status: "active",
      }

      setOverrideLogs((prev) => [newOverride, ...prev])

      // Auto-complete after duration
      setTimeout(() => {
        setOverrideLogs((prev) =>
          prev.map((log) => (log.id === newOverride.id ? { ...log, status: "completed" } : log)),
        )
      }, duration * 1000)

      toast({
        title: "Override activated",
        description: `Signal override applied to ${selectedNode} - ${selectedLane} lane for ${duration} seconds.`,
      })

      // Reset form
      setSelectedNode("")
      setSelectedLane("")
      setSignalPhase("")
      setDuration(30)
    } catch (error) {
      toast({
        title: "Override failed",
        description: "Failed to apply signal override. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSignalColor = (phase: string) => {
    switch (phase.toLowerCase()) {
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

  const activeOverrides = overrideLogs.filter((log) => log.status === "active")

  return (
    <div className="space-y-6">
      {/* Manual Override Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Manual Signal Override
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Manual overrides should only be used in emergency situations or for maintenance. All actions are logged
              and audited.
            </AlertDescription>
          </Alert>

          {/* Node Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Traffic Node
            </Label>
            <Select value={selectedNode} onValueChange={setSelectedNode}>
              <SelectTrigger>
                <SelectValue placeholder="Select traffic node" />
              </SelectTrigger>
              <SelectContent>
                {trafficNodes.map((node) => (
                  <SelectItem key={node} value={node}>
                    {node}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lane Selection */}
          <div className="space-y-2">
            <Label>Lane Direction</Label>
            <Select value={selectedLane} onValueChange={setSelectedLane}>
              <SelectTrigger>
                <SelectValue placeholder="Select lane" />
              </SelectTrigger>
              <SelectContent>
                {lanes.map((lane) => (
                  <SelectItem key={lane} value={lane}>
                    {lane}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Signal Phase */}
          <div className="space-y-2">
            <Label>Signal Phase</Label>
            <Select value={signalPhase} onValueChange={setSignalPhase}>
              <SelectTrigger>
                <SelectValue placeholder="Select signal phase" />
              </SelectTrigger>
              <SelectContent>
                {signalPhases.map((phase) => (
                  <SelectItem key={phase} value={phase}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getSignalColor(phase)}`} />
                      {phase}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Duration (seconds)
            </Label>
            <Input
              type="number"
              min="10"
              max="300"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              placeholder="30"
            />
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmitOverride} disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Applying Override..." : "Apply Override"}
          </Button>
        </CardContent>
      </Card>

      {/* Active Overrides */}
      {activeOverrides.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-chart-2" />
              Active Overrides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeOverrides.map((override) => (
              <div key={override.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getSignalColor(override.signalPhase)}`} />
                  <div>
                    <div className="font-medium text-sm">
                      {override.node} - {override.lane}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {override.signalPhase} for {override.duration}s
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Active
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Override History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Override History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {overrideLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-2 border-l-2 border-muted pl-4">
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {log.node} - {log.lane} → {log.signalPhase}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {log.duration}s by {log.user} at {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
                <Badge variant={log.status === "active" ? "default" : "secondary"} className="text-xs">
                  {log.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
