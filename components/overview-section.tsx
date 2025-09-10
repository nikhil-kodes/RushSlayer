import { Card, CardContent } from "@/components/ui/card"
import { Brain, Users, MapPin } from "lucide-react"

export function OverviewSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Smart Traffic Management for Modern Cities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            RUSHSLAYER combines artificial intelligence, reinforcement learning, and citizen feedback to create an
            adaptive traffic management ecosystem that responds to real-time conditions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Intelligence</h3>
              <p className="text-muted-foreground text-pretty">
                Advanced machine learning algorithms analyze traffic patterns and optimize signal timing in real-time
                for maximum efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-chart-2" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Citizen Engagement</h3>
              <p className="text-muted-foreground text-pretty">
                Crowdsourced feedback from citizens helps identify problem areas and validate AI-driven solutions with
                real-world insights.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Urban Optimization</h3>
              <p className="text-muted-foreground text-pretty">
                Comprehensive approach to urban mobility that addresses congestion, safety, and environmental impact
                simultaneously.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
