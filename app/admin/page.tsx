import { LoginForm } from "@/components/login-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Shield, Lock, Eye } from "lucide-react"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-1/4 left-1/4" />
        <div className="absolute w-80 h-80 bg-chart-1/5 rounded-full blur-3xl bottom-1/4 right-1/4" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold text-primary">RUSHSLAYER</h1>
          </Link>
          <h2 className="text-2xl font-semibold mb-2">Admin Access</h2>
          <p className="text-muted-foreground">Secure login for traffic management dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Administrator Login</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        {/* Security Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Encrypted</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Eye className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Monitored</span>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
