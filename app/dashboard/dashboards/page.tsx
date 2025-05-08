import Banner from "@/components/banner"
import SidebarStudent from "@/components/sidebar-student"

export default function DashboardsPage() {
  return (
    <div>
      <Banner />
      <div className="flex">
        <SidebarStudent />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboards</h1>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Progression académique</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Semestre en cours</span>
                      <span className="font-medium">S4</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "67%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Crédits validés</span>
                      <span className="font-medium">120/180</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "67%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Compétences acquises</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Techniques</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Transversales</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Activités récentes</h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Cours</span>
                    <span>Devoir Cryptographie remis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">Note</span>
                    <span>18/20 en Sécurité des réseaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">Stage</span>
                    <span>Candidature acceptée chez Sonatrach</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
