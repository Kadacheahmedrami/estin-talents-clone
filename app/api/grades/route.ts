import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const grades = {
    currentSemester: {
      name: "S4",
      modules: [
        {
          id: 1,
          name: "Cryptographie avancée",
          code: "CSE4101",
          credits: 4,
          continuousAssessment: 16.5,
          practicalWork: 15,
          exam: null,
          average: 15.75,
          status: "En cours",
        },
        {
          id: 2,
          name: "Sécurité des réseaux",
          code: "CSE4102",
          credits: 4,
          continuousAssessment: 18,
          practicalWork: 17.5,
          exam: null,
          average: 17.75,
          status: "En cours",
        },
        {
          id: 3,
          name: "Audit de sécurité",
          code: "CSE4103",
          credits: 3,
          continuousAssessment: 14,
          practicalWork: null,
          exam: null,
          average: 14,
          status: "En cours",
        },
        {
          id: 4,
          name: "Sécurité des applications web",
          code: "CSE4104",
          credits: 3,
          continuousAssessment: 15.5,
          practicalWork: 16,
          exam: null,
          average: 15.75,
          status: "En cours",
        },
        {
          id: 5,
          name: "Analyse forensique",
          code: "CSE4105",
          credits: 3,
          continuousAssessment: 13,
          practicalWork: null,
          exam: null,
          average: 13,
          status: "En cours",
        },
        {
          id: 6,
          name: "Anglais technique",
          code: "LNG4101",
          credits: 2,
          continuousAssessment: 17,
          practicalWork: null,
          exam: null,
          average: 17,
          status: "En cours",
        },
      ],
    },
    history: [
      {
        id: 1,
        name: "S3",
        average: 15.82,
        credits: 30,
        totalCredits: 30,
        status: "Validé",
      },
      {
        id: 2,
        name: "S2",
        average: 16.25,
        credits: 30,
        totalCredits: 30,
        status: "Validé",
      },
      {
        id: 3,
        name: "S1",
        average: 15.45,
        credits: 30,
        totalCredits: 30,
        status: "Validé",
      },
    ],
  }

  return NextResponse.json(grades)
}
