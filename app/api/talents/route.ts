import { NextResponse } from "next/server"

export async function GET() {
  const talentsData = {
    filters: [
      { name: "Nom ou prénom", placeholder: "Rechercher par nom ou prénom" },
      { name: "Compétences", placeholder: "Ex: Intelligence artificielle, Cybersécurité" },
      { name: "Promotion", placeholder: "Ex: 2022, 2023" },
    ],
    students: [
      {
        id: 1,
        firstName: "Ahmed",
        lastName: "Rami",
        promotion: "2023",
        specialization: "Cybersécurité",
        photo: "/images/student1.jpg",
        skills: ["Cybersécurité", "Pentesting", "Cryptographie"],
        projects: "Développement d'un outil d'analyse de vulnérabilités pour applications web",
        linkedin: "https://linkedin.com/in/ahmed-rami",
        github: "https://github.com/ahmedrami",
        portfolio: "https://ahmedrami.dev",
      },
      {
        id: 2,
        firstName: "Lina",
        lastName: "Benali",
        promotion: "2023",
        specialization: "IA et Data Science",
        photo: "/images/student2.jpg",
        skills: ["Machine Learning", "Deep Learning", "Python"],
        projects: "Développement d'un système de reconnaissance d'images médicales",
        linkedin: "https://linkedin.com/in/lina-benali",
        github: "https://github.com/linabenali",
        portfolio: "https://linabenali.dev",
      },
      {
        id: 3,
        firstName: "Karim",
        lastName: "Hadj",
        promotion: "2022",
        specialization: "IA et Data Science",
        photo: "/images/student3.jpg",
        skills: ["Big Data", "Data Mining", "NLP"],
        projects: "Analyse prédictive des données de consommation énergétique",
        linkedin: "https://linkedin.com/in/karim-hadj",
        github: "https://github.com/karimhadj",
        portfolio: "https://karimhadj.dev",
      },
    ],
  }

  return NextResponse.json(talentsData)
}
