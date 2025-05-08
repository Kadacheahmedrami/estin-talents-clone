import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const students = [
    {
      id: 1,
      name: "smart nigga 1",
      image: "/images/student1.jpg",
      promotion: "2023",
      specialization: "IA et Data Science",
      year: "2ème année cycle ingénieur",
      skills: ["Machine Learning", "Python", "Data Analysis"],
    },
    {
      id: 2,
      name: "smart nigga 2",
      image: "/images/student2.jpg",
      promotion: "2022",
      specialization: "IA et Data Science",
      year: "3ème année cycle ingénieur",
      skills: ["Deep Learning", "NLP", "TensorFlow"],
    },
    {
      id: 3,
      name: "dump nigga 1",
      image: "/images/student3.jpg",
      promotion: "2023",
      specialization: "Cybersécurité",
      year: "2ème année cycle ingénieur",
      skills: ["Pentesting", "Cryptographie", "Sécurité réseau"],
    },
    {
      id: 4,
      name: "dump nigga 2",
      image: "/images/student1.jpg",
      promotion: "2022",
      specialization: "Cybersécurité",
      year: "3ème année cycle ingénieur",
      skills: ["Sécurité web", "Forensics", "Audit"],
    },
    {
      id: 5,
      name: "smart nigga 3",
      image: "/images/student2.jpg",
      promotion: "2024",
      specialization: "IA et Data Science",
      year: "1ère année cycle ingénieur",
      skills: ["Programmation", "Algorithmique", "Java"],
    },
    {
      id: 6,
      name: "smart nigga 4",
      image: "/images/student3.jpg",
      promotion: "2024",
      specialization: "Cybersécurité",
      year: "1ère année cycle ingénieur",
      skills: ["Réseaux", "Linux", "C++"],
    },
  ]

  return NextResponse.json({ students })
}
