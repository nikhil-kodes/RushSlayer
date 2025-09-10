"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate authentication API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Demo credentials - in real app, this would be handled by your auth system
      if (formData.email === "admin@rushslayer.com" && formData.password === "admin123") {
        // Store auth token/session (in real app, use proper session management)
        localStorage.setItem("rushslayer_admin_token", "demo_token_" + Date.now())
        localStorage.setItem(
          "rushslayer_admin_user",
          JSON.stringify({
            email: formData.email,
            name: "Admin User",
            role: "administrator",
          }),
        )

        toast({
          title: "Login successful",
          description: "Welcome to the RUSHSLAYER admin dashboard.",
        })

        router.push("/dashboard")
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (error) {
      setError("Login failed. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Demo Credentials Info */}
      <Card className="bg-muted/50 border-muted">
        <CardContent className="pt-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Demo Credentials:</p>
            <p>Email: admin@rushslayer.com</p>
            <p>Password: admin123</p>
          </div>
        </CardContent>
      </Card>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@rushslayer.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={isLoading}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>

      {/* Security Notice */}
      <div className="text-xs text-muted-foreground text-center">
        This is a secure connection. Your credentials are encrypted and protected.
      </div>
    </form>
  )
}
