import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real application, you would validate credentials against a database
    // For this demo, we'll accept any @estin.dz email with any password
    if (!email.endsWith("@estin.dz")) {
      return NextResponse.json({ error: "Invalid credentials. Email must be an ESTIN email." }, { status: 401 })
    }

    // Create a mock user session
    const user = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0].replace("_", " ").replace(".", " "),
      role: email.startsWith("a_") ? "student" : email.startsWith("p_") ? "professor" : "admin",
      token: "jwt_" + Math.random().toString(36).substr(2, 16),
    }

    // In a real app, you would set a secure HTTP-only cookie with a JWT token
    // For this demo, we'll just return the user object
    return NextResponse.json({
      success: true,
      user,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
