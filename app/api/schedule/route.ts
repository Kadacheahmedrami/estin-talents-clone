import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const schedule = {
    week: "13 au 17 Mai 2024",
    days: [
      {
        day: "Lundi",
        slots: [
          {
            time: "08:00 - 09:30",
            course: {
              title: "Cryptographie avancée",
              type: "Cours",
              room: "B204",
              color: "teal",
            },
          },
          {
            time: "09:45 - 11:15",
            course: {
              title: "Cryptographie avancée",
              type: "TD",
              room: "B204",
              color: "teal",
            },
          },
          {
            time: "11:30 - 13:00",
            course: null,
          },
          {
            time: "13:00 - 14:00",
            course: {
              title: "Pause déjeuner",
              type: "Pause",
              room: null,
              color: "gray",
            },
          },
          {
            time: "14:00 - 15:30",
            course: {
              title: "Anglais technique",
              type: "TD",
              room: "A105",
              color: "blue",
            },
          },
          {
            time: "15:45 - 17:15",
            course: null,
          },
        ],
      },
      {
        day: "Mardi",
        slots: [
          {
            time: "08:00 - 09:30",
            course: null,
          },
          {
            time: "09:45 - 11:15",
            course: {
              title: "Sécurité des réseaux",
              type: "Cours",
              room: "C102",
              color: "green",
            },
          },
          {
            time: "11:30 - 13:00",
            course: {
              title: "Sécurité des réseaux",
              type: "TD",
              room: "C102",
              color: "green",
            },
          },
          {
            time: "13:00 - 14:00",
            course: {
              title: "Pause déjeuner",
              type: "Pause",
              room: null,
              color: "gray",
            },
          },
          {
            time: "14:00 - 15:30",
            course: null,
          },
          {
            time: "15:45 - 17:15",
            course: null,
          },
        ],
      },
      {
        day: "Mercredi",
        slots: [
          {
            time: "08:00 - 09:30",
            course: {
              title: "Audit de sécurité",
              type: "Cours",
              room: "A105",
              color: "purple",
            },
          },
          {
            time: "09:45 - 11:15",
            course: {
              title: "Audit de sécurité",
              type: "TD",
              room: "A105",
              color: "purple",
            },
          },
          {
            time: "11:30 - 13:00",
            course: null,
          },
          {
            time: "13:00 - 14:00",
            course: {
              title: "Pause déjeuner",
              type: "Pause",
              room: null,
              color: "gray",
            },
          },
          {
            time: "14:00 - 15:30",
            course: {
              title: "Analyse forensique",
              type: "Cours",
              room: "B101",
              color: "yellow",
            },
          },
          {
            time: "15:45 - 17:15",
            course: null,
          },
        ],
      },
      {
        day: "Jeudi",
        slots: [
          {
            time: "08:00 - 09:30",
            course: null,
          },
          {
            time: "09:45 - 11:15",
            course: null,
          },
          {
            time: "11:30 - 13:00",
            course: {
              title: "Sécurité des applications web",
              type: "Cours",
              room: "C103",
              color: "pink",
            },
          },
          {
            time: "13:00 - 14:00",
            course: {
              title: "Pause déjeuner",
              type: "Pause",
              room: null,
              color: "gray",
            },
          },
          {
            time: "14:00 - 15:30",
            course: {
              title: "Sécurité des applications web",
              type: "TP",
              room: "Labo 2",
              color: "pink",
            },
          },
          {
            time: "15:45 - 17:15",
            course: {
              title: "Sécurité des applications web",
              type: "TP",
              room: "Labo 2",
              color: "pink",
            },
          },
        ],
      },
      {
        day: "Vendredi",
        slots: [
          {
            time: "08:00 - 09:30",
            course: {
              title: "Analyse forensique",
              type: "TP",
              room: "Labo 1",
              color: "yellow",
            },
          },
          {
            time: "09:45 - 11:15",
            course: {
              title: "Analyse forensique",
              type: "TP",
              room: "Labo 1",
              color: "yellow",
            },
          },
          {
            time: "11:30 - 13:00",
            course: null,
          },
          {
            time: "13:00 - 14:00",
            course: {
              title: "Pause déjeuner",
              type: "Pause",
              room: null,
              color: "gray",
            },
          },
          {
            time: "14:00 - 15:30",
            course: {
              title: "Anglais technique",
              type: "TD",
              room: "A105",
              color: "blue",
            },
          },
          {
            time: "15:45 - 17:15",
            course: null,
          },
        ],
      },
    ],
  }

  return NextResponse.json(schedule)
}
