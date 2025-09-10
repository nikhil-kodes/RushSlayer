import { Card, CardContent } from "@/components/ui/card"
import { TrendingDown, Shield, TreePine, Clock } from "lucide-react"

export function ImpactSection() {
  const impacts = [
    {
      icon: TrendingDown,
      title: "Reduced Congestion",
      description: "Up to 40% reduction in traffic congestion through intelligent signal optimization",
      metric: "40%",
      color: "text-chart-2",
    },
    {
      icon: Shield,
      title: "Improved Safety",
      description: "Enhanced road safety through better traffic flow and emergency vehicle prioritization",
      metric: "30%",
      color: "text-primary",
    },
    {
      icon: TreePine,
      title: "Environmental Benefits",
      description: "Lower emissions and fuel consumption through optimized routing and reduced idle time",
      metric: "25%",
      color: "text-chart-2",
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Significant reduction in commute times and improved quality of life for citizens",
      metric: "60s",
      color: "text-chart-3",
    },
  ]

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Measurable Impact on Urban Mobility</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            RUSHSLAYER delivers quantifiable improvements across multiple dimensions of urban transportation, creating
            lasting benefits for cities and citizens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <impact.icon className={`w-8 h-8 ${impact.color}`} />
                </div>
                <div className={`text-3xl font-bold mb-2 ${impact.color}`}>{impact.metric}</div>
                <h3 className="text-lg font-semibold mb-3">{impact.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{impact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
