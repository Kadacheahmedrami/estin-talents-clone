// Simple client-side auth utilities

// Check if user is authenticated
export function isAuthenticated() {
  if (typeof window === "undefined") return false

  try {
    const user = localStorage.getItem("user")
    return !!user
  } catch (error) {
    return false
  }
}

// Get current user
export function getCurrentUser() {
  if (typeof window === "undefined") return null

  try {
    const userStr = localStorage.getItem("user")
    if (!userStr) return null
    return JSON.parse(userStr)
  } catch (error) {
    return null
  }
}

// Logout user
export async function logout() {
  if (typeof window === "undefined") return

  try {
    // Call logout API
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Remove user from localStorage
    localStorage.removeItem("user")
  } catch (error) {
    console.error("Logout error:", error)
  }
}

// Get auth token
export function getAuthToken() {
  if (typeof window === "undefined") return null

  try {
    const userStr = localStorage.getItem("user")
    if (!userStr) return null

    const user = JSON.parse(userStr)
    return user.token
  } catch (error) {
    return null
  }
}
