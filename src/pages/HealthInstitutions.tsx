import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Stethoscope,
} from "lucide-react";

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

    if(!localStorage.getItem("role")){
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
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between bg-slate-50 px-6 py-5 border-b">
        <h2 className="text-2xl font-bold text-blue-950">
          {title}
        </h2>

        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
          {facilities.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="text-left p-5 font-semibold tracking-wide">S/N</th>
              <th className="text-left p-5 font-semibold tracking-wide">
                Facility Name
              </th>
              <th className="text-left p-5 font-semibold tracking-wide">
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
  onClick={() =>
    navigate(
      `/health-institution/${encodeURIComponent(
        facility.name
      )}`,
      {
        state: {
          institution: facility,
          category: title,
        },
      }
    )
  }
  className="border-b odd:bg-white even:bg-slate-50 hover:bg-green-50 cursor-pointer transition-all duration-200"
>
  <td className="p-4">{index + 1}</td>

  <td className="p-5">
  <div className="flex items-center gap-4">

    <div className="bg-green-100 p-3 rounded-xl">
      <Stethoscope
        className="text-green-700"
        size={20}
      />
    </div>

    <div>
      <p className="font-semibold text-blue-950">
        {facility.name}
      </p>

      <p className="text-sm text-gray-500">
        Click to view information
      </p>
    </div>

  </div>
</td>

  <td className="p-5 text-gray-500">
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

      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-green-700 rounded-2xl text-white p-8 mb-8 shadow-lg">
  <h1 className="text-4xl font-bold">
    Health Institutions
  </h1>

  <p className="mt-3 text-blue-100 max-w-3xl">
    Explore healthcare facilities within the selected region.
    Click any facility to view detailed staffing,
    infrastructure and operational information.
  </p>
</div>

<div className="bg-white rounded-2xl shadow p-6 mb-8 flex items-center justify-between">

  <div>

    <h2 className="text-2xl font-bold text-blue-950">
      Healthcare Overview
    </h2>

    <p className="text-gray-500 mt-2">
      Access detailed information about hospitals,
      staffing and healthcare infrastructure.
    </p>

  </div>

  <Building2
    size={70}
    className="text-green-600"
  />

</div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

  <div className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-green-600 hover:shadow-xl transition">
    <p className="text-gray-500">
      Primary Health Facilities
    </p>

    <h2 className="text-5xl font-bold text-blue-950 mt-3">
      {primaryHealthFacilities.length}
    </h2>

    <p className="text-green-600 mt-2">
      Community health centres
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-blue-950 hover:shadow-xl transition">
    <p className="text-gray-500">
      State Hospitals
    </p>

    <h2 className="text-5xl font-bold text-blue-950 mt-3">
      {stateHospitals.length}
    </h2>

    <p className="text-blue-800 mt-2">
      Government hospitals
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