import { NextResponse } from "next/server"

export async function GET() {
  const enseignantsData = {
    notice: "N'apparaîtront ici que les enseignants ayant choisi de rendre leur profil public.",
    filters: [
      { name: "Nom et/ou prénom(s)", placeholder: "Rechercher par nom ou prénom" },
      { name: "Grade", placeholder: "Filtrer par grade" },
      { name: "Situation", placeholder: "Filtrer par situation" },
      { name: "Statut", placeholder: "Filtrer par statut" },
    ],
    teachers: [
      {
        id: 1,
        lastName: "Alkama",
        firstName: "Lynda",
        grade: "Maître de Conférences B",
        email: "alkama@estin.dz",
        office: "206",
        photo: null,
        specialization: "Réseaux et Systèmes Distribués",
        publications: 12,
        courses: ["Réseaux", "Systèmes Distribués"],
      },
      {
        id: 2,
        lastName: "AZOUAOU",
        firstName: "Faical",
        grade: "Professeur",
        email: "azouaou@estin.dz",
        office: null,
        photo: "/images/teacher1.jpg",
        specialization: "Intelligence Artificielle",
        publications: 45,
        courses: ["Intelligence Artificielle", "Apprentissage Automatique"],
      },
      {
        id: 3,
        lastName: "BERBAGUE",
        firstName: "Chemseddine",
        grade: "Maître de Conférences B",
        email: "berbague@estin.dz",
        office: null,
        photo: "/images/teacher2.jpg",
        specialization: "Sécurité Informatique",
        publications: 18,
        courses: ["Cryptographie", "Sécurité des Réseaux"],
      },
    ],
  }

  return NextResponse.json(enseignantsData)
}
