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
        firstName: "ghiless",
        lastName: "docker",
        promotion: "2023",
        specialization: "Azzar specialist",
        photo: "/images/student1.jpg",
        skills: ["Azaar", "docker", "DDos"],
        projects: "Développement d'un outil d'analyse de vulnérabilités pour applications web",
        linkedin: "https://linkedin.com/in/ahmed-rami",
        github: "https://github.com/ahmedrami",
        portfolio: "https://ahmedrami.dev",
      },
      {
        id: 2,
        firstName: "chemssou ragg",
        lastName: "kafka",
        promotion: "2023",
        specialization: "IA et Data Science",
        photo: "/images/student2.jpg",
        skills: ["kubernitiz", "kafka", "AI"],
        projects: "Développement d'un système de reconnaissance d'images médicales",
        linkedin: "https://linkedin.com/in/lina-benali",
        github: "https://github.com/linabenali",
        portfolio: "https://linabenali.dev",
      },
      {
        id: 3,
        firstName: "mortada",
        lastName: "",
        promotion: "2022",
        specialization: "Code craft winner",
        photo: "/images/student3.jpg",
        skills: ["winner in code craft", "cyberien 5atiiir","experte at data base management"],
        projects: "Analyse prédictive des données de consommation énergétique",
        linkedin: "https://linkedin.com/in/karim-hadj",
        github: "https://github.com/karimhadj",
        portfolio: "https://karimhadj.dev",
      },
      {
        id: 3,
        firstName: "rami",
        lastName: "",
        promotion: "2022",
        specialization: "vibe coding",
        photo: "/images/student3.jpg",
        skills: ["v0","cursor","claude","chat gpt" ,"iot"],
        projects: "Analyse prédictive des données de consommation énergétique",
        linkedin: "https://linkedin.com/in/karim-hadj",
        github: "https://github.com/kadacheahmedrami",
        portfolio: "https://karimhadj.dev",
      },
    ],
  }

  return NextResponse.json(talentsData)
}
