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
        lastName: "Chemssou Ragg",
        firstName: "Lynda",
        grade: "doctor fl7ayat",
        email: "chemssouRagg@estin.dz",
        office: "206",
        photo: null,
        specialization: "Réseaux et Systèmes Distribués",
        publications: 12,
        courses: ["kubernitiz", "Raggg aka AI"],
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
        lastName: "ghiless",
        firstName: "docker",
        grade: "Maître de Conférences D",
        email: "ghiles_docker@estin.dz",
        office: null,
        photo: "/images/teacher2.jpg",
        specialization: "Sécurité Informatique",
        publications: 18,
        courses: ["dcoker", "Azar"],
      },
    ],
  }

  return NextResponse.json(enseignantsData)
}
