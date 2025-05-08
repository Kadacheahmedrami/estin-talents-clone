import { NextResponse } from "next/server"

export async function GET() {
  const programmesData = {
    catalogue: {
      description:
        "Ceci est le catalogue des matières enseignées à l'établissement. Vous pouvez utiliser le filtre pour restreindre la sélection, par ex. par palier, spécialité, domaine de connaissance ou mot clé. La répartition des crédits sur les domaines de connaissance se fera en conséquence.",
      filters: ["Code", "Domaine", "Mot clé dans Titre", "Mot clé dans Description", "Programme"],
      courses: [
        {
          code: "—",
          precision: "—",
          title: "Séminaire",
          domain: "—",
          credit: 0,
          coefficient: 1,
          edition: "—",
          lectureHours: "—",
          tutorialHours: "—",
          practicalHours: "—",
        },
        {
          code: "ANA1",
          precision: "S1",
          title: "Analyse mathématique 1",
          domain: "Mathématiques",
          credit: 6,
          coefficient: 3,
          edition: "2022",
          lectureHours: "42h",
          tutorialHours: "21h",
          practicalHours: "—",
        },
        {
          code: "ALG1",
          precision: "S1",
          title: "Algèbre 1",
          domain: "Mathématiques",
          credit: 5,
          coefficient: 3,
          edition: "2022",
          lectureHours: "42h",
          tutorialHours: "21h",
          practicalHours: "—",
        },
      ],
    },
    repartition: {
      byDomain: [
        { name: "Informatique fondamentale", credits: 30, percentage: 30 },
        { name: "Mathématiques", credits: 24, percentage: 24 },
        { name: "Développement et applications", credits: 18, percentage: 18 },
        { name: "Sciences de l'ingénieur", credits: 12, percentage: 12 },
        { name: "Langues et communication", credits: 10, percentage: 10 },
        { name: "Projets et stages", credits: 6, percentage: 6 },
      ],
      bySemester: [
        { name: "Semestre 1", credits: 30, percentage: 100 },
        { name: "Semestre 2", credits: 30, percentage: 100 },
        { name: "Semestre 3", credits: 30, percentage: 100 },
        { name: "Semestre 4", credits: 30, percentage: 100 },
        { name: "Semestre 5", credits: 30, percentage: 100 },
        { name: "Semestre 6", credits: 30, percentage: 100 },
      ],
    },
    programmes: [
      {
        title: "Cycle préparatoire",
        description:
          "Le cycle préparatoire s'étend sur deux années et permet d'acquérir les bases fondamentales en informatique et mathématiques.",
        link: "#",
      },
      {
        title: "Cycle ingénieur - Tronc commun",
        description: "La première année du cycle ingénieur constitue un socle commun pour tous les étudiants.",
        link: "#",
      },
      {
        title: "Spécialisation Intelligence artificielle et data science",
        description: "Cette spécialisation forme des ingénieurs experts en IA, machine learning et analyse de données.",
        link: "#",
      },
      {
        title: "Spécialisation Cybersécurité",
        description:
          "Cette spécialisation forme des ingénieurs experts en sécurité informatique et protection des systèmes.",
        link: "#",
      },
    ],
  }

  return NextResponse.json(programmesData)
}
