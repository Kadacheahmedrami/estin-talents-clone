import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const teachers = [
    {
      id: 1,
      lastName: "Alkama",
      firstName: "Lynda",
      grade: "Maître de Conférences B",
      email: "alkama@estin.dz",
      office: "206",
      image: null,
    },
    {
      id: 2,
      lastName: "AZOUAOU",
      firstName: "Faical",
      grade: "Professeur",
      email: "azouaou@estin.dz",
      office: null,
      image: "/images/teacher1.jpg",
    },
    {
      id: 3,
      lastName: "BERBAGUE",
      firstName: "Chemseddine",
      grade: "Maître de Conférences B",
      email: "berbague@estin.dz",
      office: null,
      image: "/images/teacher2.jpg",
    },
    {
      id: 4,
      lastName: "RAHAL",
      firstName: "Sarah",
      grade: "Maître Assistante A",
      email: "rahal@estin.dz",
      office: "304",
      image: null,
    },
    {
      id: 5,
      lastName: "MEZIANI",
      firstName: "Kamel",
      grade: "Professeur",
      email: "meziani@estin.dz",
      office: "201",
      image: null,
    },
  ]

  return NextResponse.json({ teachers })
}
