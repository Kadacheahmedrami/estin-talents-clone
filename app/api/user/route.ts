import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = {
    id: 1,
    firstName: "Smart Niggas",
    lastName: "RANKIHA intern",
    email: "rankiha@estin.dz",
    role: "student",
    specialization: "Cybersécurité",
    year: "2ème année cycle ingénieur",
    promotion: "2023",
    profileImage: "/images/student1.jpg",
    notifications: [
      {
        id: 1,
        type: "message",
        content: "Nouveau message de Dr. BERBAGUE",
        read: false,
        date: "2024-05-08T10:30:00",
      },
      {
        id: 2,
        type: "grade",
        content: "Nouvelle note en Cryptographie avancée",
        read: true,
        date: "2024-05-07T14:15:00",
      },
      {
        id: 3,
        type: "application",
        content: "Votre candidature chez Sonatrach a été acceptée",
        read: true,
        date: "2024-05-05T09:45:00",
      },
    ],
  }

  return NextResponse.json(user)
}
