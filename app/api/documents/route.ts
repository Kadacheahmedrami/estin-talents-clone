import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const documents = {
    general: [
      {
        id: 1,
        title: "Guide de l'étudiant 2023-2024",
        type: "PDF",
        size: "2.4 MB",
        url: "#",
      },
      {
        id: 2,
        title: "Règlement intérieur",
        type: "PDF",
        size: "1.8 MB",
        url: "#",
      },
      {
        id: 3,
        title: "Calendrier académique",
        type: "PDF",
        size: "0.9 MB",
        url: "#",
      },
    ],
    courses: [
      {
        id: 1,
        course: "Cryptographie avancée",
        files: [
          {
            id: 1,
            title: "Cours 1 - Introduction à la cryptographie avancée",
            type: "PDF",
            url: "#",
          },
          {
            id: 2,
            title: "TD 1 - Exercices sur les algorithmes symétriques",
            type: "PDF",
            url: "#",
          },
          {
            id: 3,
            title: "Cours 2 - Cryptographie asymétrique",
            type: "PDF",
            url: "#",
          },
        ],
      },
      {
        id: 2,
        course: "Sécurité des réseaux",
        files: [
          {
            id: 1,
            title: "Syllabus du cours",
            type: "PDF",
            url: "#",
          },
          {
            id: 2,
            title: "Cours 1 - Fondamentaux de la sécurité réseau",
            type: "PDF",
            url: "#",
          },
          {
            id: 3,
            title: "TP 1 - Configuration d'un pare-feu",
            type: "PDF",
            url: "#",
          },
        ],
      },
    ],
  }

  return NextResponse.json(documents)
}
