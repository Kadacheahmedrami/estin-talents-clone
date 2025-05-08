import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const courses = [
    {
      id: 1,
      title: "Cryptographie avancée",
      code: "CSE4101",
      credits: 4,
      teacher: "Dr. BERBAGUE Chemseddine",
      progress: {
        completed: 8,
        total: 12,
        percentage: 67,
      },
      color: "teal",
    },
    {
      id: 2,
      title: "Sécurité des réseaux",
      code: "CSE4102",
      credits: 4,
      teacher: "Dr. ALKAMA Lynda",
      progress: {
        completed: 6,
        total: 12,
        percentage: 50,
      },
      color: "teal",
    },
    {
      id: 3,
      title: "Audit de sécurité",
      code: "CSE4103",
      credits: 3,
      teacher: "Dr. AZOUAOU Faical",
      progress: {
        completed: 5,
        total: 10,
        percentage: 50,
      },
      color: "teal",
    },
    {
      id: 4,
      title: "Sécurité des applications web",
      code: "CSE4104",
      credits: 3,
      teacher: "Dr. BERBAGUE Chemseddine",
      progress: {
        completed: 7,
        total: 10,
        percentage: 70,
      },
      color: "teal",
    },
    {
      id: 5,
      title: "Analyse forensique",
      code: "CSE4105",
      credits: 3,
      teacher: "Dr. ALKAMA Lynda",
      progress: {
        completed: 4,
        total: 10,
        percentage: 40,
      },
      color: "teal",
    },
    {
      id: 6,
      title: "Anglais technique",
      code: "LNG4101",
      credits: 2,
      teacher: "Mme. RAHAL Sarah",
      progress: {
        completed: 6,
        total: 8,
        percentage: 75,
      },
      color: "teal",
    },
  ]

  return NextResponse.json({ courses })
}
