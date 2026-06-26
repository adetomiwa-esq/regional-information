import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { School2 } from "lucide-react";

const Institutions = () => {
  const navigate = useNavigate();

  const [region, setRegion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchRegion = async () => {
    try {
      const response = await axios.get(
        "https://regional-info-api.onrender.com/api/region/get-regions"
      );

      setRegion(response.data.regions[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegion();
  }, []);


  useEffect(() => {

    if(!localStorage.getItem("role")){
      navigate("/")
    }
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 border-2 border-blue-950 border-t-transparent rounded-full animate-spin" />
          <span>Loading institutions...</span>
        </div>
      </div>
    );
  }

  if (!region) {
    return (
      <div className="h-screen flex items-center justify-center">
        No data found
      </div>
    );
  }

  const {
    publicPrimary,
    privatePrimary,
    publicSecondary,
    HigherInstitutions,
    collegesOfHealth,
  } = region.educationInfrastructure;

  const TableSection = ({
    title,
    schools,
  }: {
    title: string;
    schools: {
      name: string;
      address: string;
    }[];
  }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
      <div className="flex items-center justify-between px-6 py-5 bg-slate-50 border-b">
        <h2 className="text-2xl font-bold text-blue-950">
          {title}
        </h2>

        <span className="bg-blue-950 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {schools.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-950 text-white sticky top-0">
            <tr>
              <th className="text-left p-5 font-semibold">S/N</th>
              <th className="text-left p-5 font-semibold">
                Institution Name
              </th>
              <th className="text-left p-5 font-semibold">
                Address
              </th>
            </tr>
          </thead>

          <tbody>
            {schools.length > 0 ? (
              schools.map((school, index) => (
                <tr
  key={index}
  onClick={() =>
    navigate(`/institution/${encodeURIComponent(school.name)}`, {
      state: {
        institution: school,
        category: title,
      },
    })
  }
  className="border-b odd:bg-white even:bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all duration-200"
>
  <td className="p-4">{index + 1}</td>

  <td className="p-5">
  <div className="flex items-center gap-3">
    <div className="bg-blue-100 p-2 rounded-lg">
      <School2
        size={18}
        className="text-blue-900"
      />
    </div>

    <div>
      <p className="font-semibold text-blue-950">
        {school.name}
      </p>

      <p className="text-sm text-gray-500">
        Click to view details
      </p>
    </div>
  </div>
</td>

  <td className="p-5 text-gray-500">
    {school.address}
  </td>
</tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center p-6 text-gray-500"
                >
                  No institutions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-950 font-medium mb-6 hover:underline"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Page Header */}

      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl text-white p-8 mb-8 shadow-lg">
  <h1 className="text-4xl font-bold">
    Educational Institutions
  </h1>

  <p className="mt-3 text-blue-100 max-w-2xl">
    Explore schools and higher institutions within the selected
    region. Click any institution to view additional information.
  </p>
</div>


<div className="grid md:grid-cols-5 gap-5 mb-10">
  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">
      Public Primary
    </p>

    <h2 className="text-3xl font-bold text-blue-950 mt-2">
      {publicPrimary.schools.length}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">
      Private Primary
    </p>

    <h2 className="text-3xl font-bold text-green-700 mt-2">
      {privatePrimary.schools.length}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">
      Secondary
    </p>

    <h2 className="text-3xl font-bold text-orange-600 mt-2">
      {publicSecondary.schools.length}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">
      Universities
    </p>

    <h2 className="text-3xl font-bold text-purple-700 mt-2">
      {HigherInstitutions.schools.length}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">
      Colleges of Health
    </p>

    <h2 className="text-3xl font-bold text-pink-700 mt-2">
      {collegesOfHealth.schools.length}
    </h2>
  </div>
</div>

      {/* Tables */}

      <div className="space-y-8">
        <div className="transition duration-300 hover:-translate-y-1 hover:shadow-2xl"><TableSection
          title="Public Primary Schools"
          schools={publicPrimary.schools}
        /></div>

        <div className="transition duration-300 hover:-translate-y-1 hover:shadow-2xl"><TableSection
          title="Private Primary Schools"
          schools={privatePrimary.schools}
        /></div>

        <div className="transition duration-300 hover:-translate-y-1 hover:shadow-2xl"><TableSection
          title="Public Secondary Schools"
          schools={publicSecondary.schools}
        /></div>

        <div className="transition duration-300 hover:-translate-y-1 hover:shadow-2xl"><TableSection
          title="Higher Institutions"
          schools={HigherInstitutions.schools}
        /></div>

        <div className="transition duration-300 hover:-translate-y-1 hover:shadow-2xl"><TableSection
          title="Colleges of Health"
          schools={collegesOfHealth.schools}
        /></div>
      </div>
    </div>
  );
};

export default Institutions;