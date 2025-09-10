import { type NextRequest, NextResponse } from "next/server"

interface LoginRequest {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Hash the password and compare with stored hash
    // 2. Use a proper authentication library (NextAuth.js, Auth0, etc.)
    // 3. Generate secure JWT tokens
    // 4. Implement rate limiting
    // 5. Log authentication attempts

    // Demo authentication - DO NOT use in production
    const validCredentials = {
      email: "admin@rushslayer.com",
      password: "admin123", // In real app, this would be hashed
    }

    if (email === validCredentials.email && password === validCredentials.password) {
      // Generate session token (in real app, use proper JWT)
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      const user = {
        id: "admin_001",
        email: email,
        name: "Admin User",
        role: "administrator",
      }

      return NextResponse.json({
        success: true,
        token: sessionToken,
        user: user,
        expiresIn: "24h",
      })
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Authentication API endpoint",
    endpoints: {
      POST: "/api/auth/login - Authenticate user",
    },
  })
}
