import { FeedbackForm } from "@/components/feedback-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            RUSHSLAYER
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Submit Traffic Feedback</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Help us improve traffic management in your area. Your insights are valuable for optimizing signal timing
              and reducing congestion.
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Quick Report</p>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <Users className="w-8 h-8 text-chart-2 mx-auto mb-2" />
                <p className="text-sm font-medium">Community Impact</p>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <MapPin className="w-8 h-8 text-chart-3 mx-auto mb-2" />
                <p className="text-sm font-medium">Location-Based</p>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <Clock className="w-8 h-8 text-chart-4 mx-auto mb-2" />
                <p className="text-sm font-medium">Real-time Processing</p>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Traffic Feedback Form</CardTitle>
            </CardHeader>
            <CardContent>
              <FeedbackForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
