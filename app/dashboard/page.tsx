import Banner from "@/components/banner"
import SidebarStudent from "@/components/sidebar-student"

export default function DashboardPage() {
  return (
    <div>
      <Banner />
      <div className="flex">
        <SidebarStudent />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Architecture des études</h1>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="relative">
              {/* Cycle préparatoire */}
              <div className="absolute left-0 top-0 bottom-0 w-[60px] bg-teal-700 flex items-center justify-center">
                <div className="text-white transform -rotate-90 whitespace-nowrap text-lg font-medium">
                  Cycle préparatoire
                </div>
              </div>

              <div className="ml-[80px] mr-[20px]">
                <div className="bg-green-100 p-4 rounded-lg mb-8">
                  <div className="mb-4">
                    <div className="bg-white p-2 border border-gray-300 text-center rounded-t-md">
                      <span className="font-medium">
                        1<sup>ère</sup> année CP
                      </span>
                    </div>
                    <div className="bg-teal-500 p-2 text-white text-center rounded-b-md">
                      Cours + TD/TP + Stage ouvrier
                    </div>
                  </div>

                  <div>
                    <div className="bg-white p-2 border border-gray-300 text-center rounded-t-md">
                      <span className="font-medium">
                        2<sup>ème</sup> année CP
                      </span>
                    </div>
                    <div className="bg-teal-500 p-2 text-white text-center rounded-b-md">Cours + TD/TP</div>
                  </div>

                  {/* Concours and External Access */}
                  <div className="flex justify-end mt-4 relative">
                    <div className="absolute right-0 top-[-20px] w-[150px]">
                      <div className="border-dotted border-r-2 border-b-2 border-black h-[40px] w-[100px] absolute right-0"></div>
                      <div className="absolute right-[-75px] top-[40px]">
                        <div className="bg-red-500 text-white px-4 py-1 rounded-md font-bold">Concours</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* External Access */}
                <div className="absolute right-0 top-[100px]">
                  <div className="bg-purple-300 p-4 rounded-lg">
                    <div className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-center">
                      Accès
                      <br />
                      externe
                    </div>
                  </div>
                </div>

                {/* Second Cycle */}
                <div className="absolute left-0 top-[280px] bottom-0 w-[60px] bg-teal-700 flex items-center justify-center">
                  <div className="text-white transform -rotate-90 whitespace-nowrap text-lg font-medium">
                    Second cycle
                  </div>
                </div>

                <div className="mt-[100px] ml-[20px]">
                  <div className="bg-green-100 p-4 rounded-lg relative">
                    {/* S1 + S2 */}
                    <div className="absolute top-[-20px] left-[100px]">
                      <div className="flex items-center">
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          S1
                        </div>
                        <div className="mx-1">+</div>
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          S2
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="bg-white p-2 border border-gray-300 text-center rounded-t-md">
                        <span className="font-medium">
                          1<sup>ère</sup> année (socle commun)
                        </span>
                      </div>
                      <div className="bg-teal-500 p-2 text-white text-center rounded-b-md">
                        Cours + Stage en entreprise
                      </div>
                    </div>

                    {/* S3 + S4 + S5 */}
                    <div className="absolute top-[120px] right-[200px]">
                      <div className="flex items-center">
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          S3
                        </div>
                        <div className="mx-1">+</div>
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          S4
                        </div>
                        <div className="mx-1">+</div>
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          S5
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="bg-white p-2 border border-gray-300 text-center rounded-t-md">
                        <span className="font-medium">
                          2<sup>ème</sup> année + première mi-3<sup>ème</sup> année (spécialisation)
                        </span>
                      </div>
                      <div className="flex justify-center gap-4">
                        <div className="bg-teal-500 p-2 text-white text-center rounded-md w-[250px]">
                          Intelligence artificielle et data science
                        </div>
                        <div className="bg-teal-500 p-2 text-white text-center rounded-md w-[200px]">Cybersécurité</div>
                      </div>
                    </div>

                    {/* S6 */}
                    <div className="absolute top-[250px] left-[100px]">
                      <div className="flex items-center">
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          S6
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="bg-white p-2 border border-gray-300 text-center rounded-t-md">
                        <span className="font-medium">
                          Fin de 3<sup>ème</sup> année (spécialisation)
                        </span>
                      </div>
                      <div className="bg-teal-500 p-2 text-white text-center rounded-b-md">Projet de fin d'études</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
