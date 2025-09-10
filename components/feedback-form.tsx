"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, User, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FeedbackData {
  name: string
  phone: string
  location: string
  feedbackText: string
}

export function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    phone: "",
    location: "",
    feedbackText: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  // Sample traffic nodes - in real app, this would come from API
  const trafficNodes = [
    "MG Road Junction",
    "Brigade Road Signal",
    "Commercial Street Cross",
    "Koramangala 5th Block",
    "Indiranagar 100 Feet Road",
    "Whitefield Main Road",
    "Electronic City Phase 1",
    "Bannerghatta Road Junction",
    "Hebbal Flyover",
    "Silk Board Junction",
    "KR Puram Railway Station",
    "Marathahalli Bridge",
  ]

  const handleInputChange = (field: keyof FeedbackData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In real app, you would reverse geocode these coordinates
          // For demo, we'll just show a mock location
          const mockLocation = trafficNodes[Math.floor(Math.random() * trafficNodes.length)]
          setFormData((prev) => ({ ...prev, location: mockLocation }))
          toast({
            title: "Location detected",
            description: `Set to nearest traffic node: ${mockLocation}`,
          })
        },
        (error) => {
          toast({
            title: "Location access denied",
            description: "Please select your location manually from the dropdown.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Please select your location manually from the dropdown.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.phone || !formData.location || !formData.feedbackText) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real app, you would send to your backend API:
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      console.log("Feedback submitted:", formData)

      setIsSubmitted(true)
      toast({
        title: "Feedback submitted successfully!",
        description: "Thank you for helping improve traffic management.",
      })
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="text-center p-8 bg-chart-2/5 border-chart-2/20">
        <CardContent className="pt-6">
          <CheckCircle className="w-16 h-16 text-chart-2 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-4 text-chart-2">Feedback Submitted!</h3>
          <p className="text-muted-foreground mb-6 text-pretty">
            Thank you for your valuable feedback. Our AI system will analyze your input to improve traffic management in
            your area.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Reference ID:</strong> FB-{Date.now().toString().slice(-6)}
            </p>
            <p>
              <strong>Location:</strong> {formData.location}
            </p>
            <p>
              <strong>Status:</strong> Under Review
            </p>
          </div>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({ name: "", phone: "", location: "", feedbackText: "" })
            }}
            className="mt-6"
          >
            Submit Another Feedback
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name *
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Phone Number *
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
        />
      </div>

      {/* Location Field */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Traffic Location *
        </Label>
        <div className="flex gap-2">
          <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select traffic node/junction" />
            </SelectTrigger>
            <SelectContent>
              {trafficNodes.map((node) => (
                <SelectItem key={node} value={node}>
                  {node}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" variant="outline" size="icon" onClick={detectLocation} title="Detect current location">
            <MapPin className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Feedback Text */}
      <div className="space-y-2">
        <Label htmlFor="feedback" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Traffic Issue Description *
        </Label>
        <Textarea
          id="feedback"
          placeholder="Describe the traffic issue you've observed (e.g., long signal wait times, congestion patterns, signal malfunctions, etc.)"
          value={formData.feedbackText}
          onChange={(e) => handleInputChange("feedbackText", e.target.value)}
          rows={4}
          required
        />
      </div>

      {/* Info Card */}
      <Card className="bg-muted/50 border-muted">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Your privacy is protected</p>
              <p>
                Your personal information is used only for feedback processing and will not be shared with third
                parties. Location data helps us target improvements effectively.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" className="w-full text-lg py-6" disabled={isSubmitting}>
        {isSubmitting ? "Submitting Feedback..." : "Submit Feedback"}
      </Button>
    </form>
  )
}
