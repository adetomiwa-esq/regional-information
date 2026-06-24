import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="flex items-center justify-between border-b p-5">
        <h2 className="text-xl font-semibold text-blue-950">
          {title}
        </h2>

        <span className="bg-blue-100 text-blue-950 px-3 py-1 rounded-full text-sm font-medium">
          {schools.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">S/N</th>
              <th className="text-left p-4">
                Institution Name
              </th>
              <th className="text-left p-4">
                Address
              </th>
            </tr>
          </thead>

          <tbody>
            {schools.length > 0 ? (
              schools.map((school, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4 font-medium">
                    {school.name}
                  </td>

                  <td className="p-4 text-gray-600">
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-950">
          Educational Institutions
        </h1>

        <p className="text-gray-500 mt-2">
          View educational infrastructure
          within the selected region.
        </p>
      </div>

      {/* Tables */}

      <div className="space-y-8">
        <TableSection
          title="Public Primary Schools"
          schools={publicPrimary.schools}
        />

        <TableSection
          title="Private Primary Schools"
          schools={privatePrimary.schools}
        />

        <TableSection
          title="Public Secondary Schools"
          schools={publicSecondary.schools}
        />

        <TableSection
          title="Higher Institutions"
          schools={HigherInstitutions.schools}
        />

        <TableSection
          title="Colleges of Health"
          schools={collegesOfHealth.schools}
        />
      </div>
    </div>
  );
};

export default Institutions;