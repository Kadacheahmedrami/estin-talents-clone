import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const teachers = [
    {
      id: 1,
      lastName: "lota",
      firstName: "",
      grade: "Maître de Conférences B",
      email: "lota@estin.dz",
      office: "206",
      image: null,
    },
    {
      id: 2,
      lastName: "Palistro",
      firstName: "",
      grade: "Professeur",
      email: "pali@estin.dz",
      office: null,
      image: "/images/teacher1.jpg",
    },
    {
      id: 3,
      lastName: "hacker",
      firstName: "",
      grade: "Maître de Conférences B",
      email: "hacker@estin.dz",
      office: null,
      image: "/images/teacher2.jpg",
    },
    {
      id: 4,
      lastName: "takie ",
      firstName: "chi3ii",
      grade: "Maître Assistante A",
      email: "chi3i@estin.dz",
      office: "304",
      image: null,
    },
    {
      id: 5,
      lastName: "mokrane",
      firstName: "",
      grade: "Professeur",
      email: "mk@estin.dz",
      office: "201",
      image: null,
    },
  ]

  return NextResponse.json({ teachers })
}
