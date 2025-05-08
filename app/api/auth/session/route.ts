import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // In a real app, you would validate the session token from cookies or headers
    // For this demo, we'll check if the Authorization header exists and return a mock user

    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Mock user data
    const email = "a_kadache@estin.dz" // Default user for demo

    const user = {
      id: "user_123456789",
      email,
      name: "Ahmed Kadache",
      role: "student",
      authenticated: true,
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Session validation error:", error)
    return NextResponse.json({ authenticated: false, error: "Internal server error" }, { status: 500 })
  }
}
