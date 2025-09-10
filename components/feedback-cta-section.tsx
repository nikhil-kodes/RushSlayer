import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MessageCircle, Users, MapPin } from "lucide-react"

export function FeedbackCTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Help Us Improve Your City</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Your feedback is crucial for optimizing traffic management. Report issues, suggest improvements, and be part
            of the solution for better urban mobility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Report Issues</h3>
              <p className="text-muted-foreground text-sm text-pretty">
                Identify traffic problems, signal malfunctions, or congestion hotspots in your area
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-chart-2" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Impact</h3>
              <p className="text-muted-foreground text-sm text-pretty">
                Join thousands of citizens contributing to smarter, more efficient traffic management
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-chart-3" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location-Based</h3>
              <p className="text-muted-foreground text-sm text-pretty">
                Provide precise location data to help us target improvements where they're needed most
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-12 py-6">
            <Link href="/feedback">Submit Your Feedback</Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">Quick and easy - takes less than 2 minutes</p>
        </div>
      </div>
    </section>
  )
}
