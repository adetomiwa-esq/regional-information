import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HealthInstitutions = () => {
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

    if(!localStorage.getItem("user")){
      navigate("/")
    }
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 border-2 border-blue-950 border-t-transparent rounded-full animate-spin" />
          <span>Loading health institutions...</span>
        </div>
      </div>
    );
  }

  if (!region) {
    return (
      <div className="h-screen flex items-center justify-center">
        No health institution data found.
      </div>
    );
  }

  const {
    primaryHealthFacilities,
    stateHospitals,
  } = region.healthFacilities;

  const TableSection = ({
    title,
    facilities,
  }: {
    title: string;
    facilities: {
      name: string;
      address: string;
    }[];
  }) => (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="flex items-center justify-between border-b p-5">
        <h2 className="text-xl font-semibold text-blue-950">
          {title}
        </h2>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          {facilities.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">S/N</th>
              <th className="text-left p-4">
                Facility Name
              </th>
              <th className="text-left p-4">
                Address
              </th>
            </tr>
          </thead>

          <tbody>
            {facilities.length > 0 ? (
              facilities.map(
                (facility, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4 font-medium">
                      {facility.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {facility.address}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center p-6 text-gray-500"
                >
                  No facilities available
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

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-950">
          Health Institutions
        </h1>

        <p className="text-gray-500 mt-2">
          View healthcare facilities and
          hospitals within the selected region.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm">
            Primary Health Facilities
          </h3>

          <p className="text-3xl font-bold text-blue-950 mt-2">
            {primaryHealthFacilities.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm">
            State Hospitals
          </h3>

          <p className="text-3xl font-bold text-blue-950 mt-2">
            {stateHospitals.length}
          </p>
        </div>
      </div>

      {/* Tables */}

      <div className="space-y-8">
        <TableSection
          title="Primary Health Facilities"
          facilities={primaryHealthFacilities}
        />

        <TableSection
          title="State Hospitals"
          facilities={stateHospitals}
        />
      </div>
    </div>
  );
};

export default HealthInstitutions;