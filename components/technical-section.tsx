import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Server, Brain, Database } from "lucide-react"

export function TechnicalSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Technical Architecture</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Built on modern, scalable technologies that ensure reliability, performance, and maintainability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-chart-1/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-chart-1" />
              </div>
              <CardTitle className="text-lg">Frontend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                React.js with modern UI components for responsive, accessible interfaces
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-chart-2" />
              </div>
              <CardTitle className="text-lg">Backend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                FastAPI/Node.js for high-performance API services and real-time data processing
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-lg">AI/ML</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                TensorFlow/PyTorch for deep learning models and reinforcement learning algorithms
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-chart-3" />
              </div>
              <CardTitle className="text-lg">Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                SUMO integration for comprehensive traffic simulation and strategy validation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Architecture Diagram Placeholder */}
        <div className="mt-16">
          <Card className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6">System Architecture</h3>
              <div className="bg-muted/50 rounded-lg p-12 min-h-64 flex items-center justify-center">
                <p className="text-muted-foreground text-lg">
                  Interactive Architecture Diagram
                  <br />
                  <span className="text-sm">(Frontend ↔ API Gateway ↔ AI Engine ↔ Traffic Simulation)</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
