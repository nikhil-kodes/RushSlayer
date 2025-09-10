import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Eye, BarChart3, Users2, Target, Beaker } from "lucide-react"

export function InnovationSection() {
  const innovations = [
    {
      icon: Cpu,
      title: "AI + Computer Vision",
      description: "Advanced neural networks combined with real-time computer vision for traffic analysis",
      tags: ["Machine Learning", "Computer Vision"],
    },
    {
      icon: BarChart3,
      title: "Reinforcement Learning",
      description: "Self-improving algorithms that adapt to changing traffic patterns over time",
      tags: ["RL Algorithms", "Adaptive Systems"],
    },
    {
      icon: Users2,
      title: "Citizen Integration",
      description: "Unique crowdsourcing approach that validates AI decisions with human insights",
      tags: ["Crowdsourcing", "Validation"],
    },
    {
      icon: Target,
      title: "SDG Alignment",
      description: "Direct contribution to UN Sustainable Development Goals for sustainable cities",
      tags: ["SDG 11", "Sustainability"],
    },
    {
      icon: Beaker,
      title: "Simulation-Based Planning",
      description: "Advanced SUMO integration for testing strategies before real-world deployment",
      tags: ["SUMO", "Testing"],
    },
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "Comprehensive monitoring system with predictive analytics and anomaly detection",
      tags: ["Monitoring", "Analytics"],
    },
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Innovation & Uniqueness</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            RUSHSLAYER represents a breakthrough in traffic management technology, combining cutting-edge AI with
            human-centered design principles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((innovation, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <innovation.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{innovation.title}</h3>
                <p className="text-muted-foreground mb-4 text-pretty leading-relaxed">{innovation.description}</p>
                <div className="flex flex-wrap gap-2">
                  {innovation.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
