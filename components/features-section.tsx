import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Ambulance, Route, Leaf, MessageSquare, PlayCircle } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "AI + Reinforcement Learning",
      description:
        "Adaptive signal control that learns from traffic patterns and continuously optimizes timing for peak efficiency.",
      color: "text-primary",
    },
    {
      icon: Ambulance,
      title: "Emergency Vehicle Priority",
      description: "Automatic detection and prioritization of emergency vehicles with real-time signal preemption.",
      color: "text-destructive",
    },
    {
      icon: Route,
      title: "Dynamic Lane Allocation",
      description: "Smart lane management that adapts to traffic flow patterns and peak hour demands.",
      color: "text-chart-1",
    },
    {
      icon: Leaf,
      title: "Pollution-Aware Routing",
      description: "Environmental optimization that considers air quality and promotes eco-friendly route suggestions.",
      color: "text-chart-2",
    },
    {
      icon: MessageSquare,
      title: "Crowdsourced Feedback",
      description:
        "Citizen reporting system that provides real-world validation and identifies emerging traffic issues.",
      color: "text-chart-4",
    },
    {
      icon: PlayCircle,
      title: "Simulation Sandbox",
      description: "Advanced traffic simulation environment for testing and validating optimization strategies.",
      color: "text-chart-5",
    },
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Comprehensive Traffic Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Our platform integrates multiple advanced technologies to create a holistic approach to urban traffic
            management and optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
