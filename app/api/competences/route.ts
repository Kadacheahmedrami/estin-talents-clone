import { NextResponse } from "next/server"

export async function GET() {
  const competencesData = {
    elements: {
      description:
        "Utilisez le filtre pour réduire la sélection et construire une matrice de compétences focalisée sur les éléments sélectionnés.",
      competences: [
        {
          courseCode: "ANA1",
          courseTitle: "Analyse mathématique 1",
          code: "C21.3",
          title: "Analyser une fonction réelle à une variable réelle",
          objective:
            "Effectuer un calcul différentiel et intégral sur une fonction réelle à variable réelle. Étude du comportement asymptotique.",
          level: "Base",
        },
        {
          courseCode: "ALG1",
          courseTitle: "Algèbre 1",
          code: "C21.4",
          title: "Identifier et analyser des structures algébriques",
          objective: "—",
          level: "Intermédiaire",
        },
        {
          courseCode: "ALG1",
          courseTitle: "Algèbre 1",
          code: "C21.5",
          title: "Analyser un polynôme à une indéterminée à coefficients dans un anneau",
          objective: "—",
          level: "Intermédiaire",
        },
        {
          courseCode: "PROG1",
          courseTitle: "Programmation 1",
          code: "C11.1",
          title: "Concevoir et implémenter des algorithmes simples",
          objective: "Maîtriser les structures de contrôle et les types de données de base",
          level: "Base",
        },
        {
          courseCode: "PROG1",
          courseTitle: "Programmation 1",
          code: "C11.2",
          title: "Implémenter des structures de données fondamentales",
          objective: "Maîtriser les tableaux, listes chaînées, piles et files",
          level: "Base",
        },
      ],
    },
    filter: {
      fields: [
        { name: "Code", placeholder: "Filtrer par code" },
        { name: "Domaine", placeholder: "Filtrer par domaine" },
        { name: "Mot clé dans Titre", placeholder: "Rechercher dans les titres" },
        { name: "Mot clé dans Description", placeholder: "Rechercher dans les descriptions" },
      ],
    },
    matrix: {
      description: "Visualisez la matrice des compétences pour comprendre les relations entre les différents éléments.",
    },
    base: {
      description: "Consultez la base complète des compétences développées dans nos formations.",
      categories: [
        {
          name: "Compétences techniques",
          skills: [
            "Programmation",
            "Développement web",
            "Intelligence artificielle",
            "Cybersécurité",
            "Réseaux informatiques",
          ],
        },
        {
          name: "Compétences mathématiques",
          skills: [
            "Analyse mathématique",
            "Algèbre",
            "Probabilités et statistiques",
            "Optimisation",
            "Logique mathématique",
          ],
        },
        {
          name: "Compétences transversales",
          skills: [
            "Gestion de projet",
            "Communication",
            "Travail en équipe",
            "Résolution de problèmes",
            "Langues étrangères",
          ],
        },
      ],
    },
  }

  return NextResponse.json(competencesData)
}
