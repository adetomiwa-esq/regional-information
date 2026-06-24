import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  School,
  Hospital,
  Home,
  FileText,
  LogOut,
  Edit,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-950 text-white flex flex-col">
        <div className="p-6 border-b border-blue-900">
          <h1 className="text-2xl font-bold">
            RIS Admin
          </h1>

          <p className="text-sm text-slate-300 mt-1">
            Regional Information System
          </p>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition"
              >
                <Home size={18} />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/population"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition"
              >
                <Users size={18} />
                Population
              </Link>
            </li>

            <li>
              <Link
                to="/schools"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition"
              >
                <School size={18} />
                Schools
              </Link>
            </li>

            <li>
              <Link
                to="/hospitals"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition"
              >
                <Hospital size={18} />
                Hospitals
              </Link>
            </li>

            <li>
              <Link
                to="/reports"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition"
              >
                <FileText size={18} />
                Reports
              </Link>
            </li>

            <li>
              <Link
                to="/edit-region"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition"
              >
                <Edit size={18} />
                Edit Region Data
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-900">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-medium transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-950">
            Dashboard
          </h2>

          <p className="text-gray-500">
            Welcome back, Administrator
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">
              Population
            </p>

            <h3 className="text-3xl font-bold text-blue-950 mt-2">
              12,100
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">
              Schools
            </p>

            <h3 className="text-3xl font-bold text-blue-950 mt-2">
              5
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">
              Hospitals
            </p>

            <h3 className="text-3xl font-bold text-blue-950 mt-2">
              3
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">
              Households
            </p>

            <h3 className="text-3xl font-bold text-blue-950 mt-2">
              2,450
            </h3>
          </div>
        </div>

        {/* Recent Data */}
        <div className="bg-white rounded-xl shadow mt-8">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-lg">
              Recent Regions
            </h3>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4">Region</th>
                <th className="p-4">Population</th>
                <th className="p-4">Schools</th>
                <th className="p-4">Hospitals</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-4">Odo-Ori</td>
                <td className="p-4">12,100</td>
                <td className="p-4">5</td>
                <td className="p-4">3</td>
              </tr>

              <tr>
                <td className="p-4">Oke-Adan</td>
                <td className="p-4">10,400</td>
                <td className="p-4">4</td>
                <td className="p-4">2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;