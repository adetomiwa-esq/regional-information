import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IwoMap from "../components/IwoMap";

const GeographyPopulation = () => {
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
      console.log(error);
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
          <span>Loading population data...</span>
        </div>
      </div>
    );
  }

  if (!region) {
    return (
      <div className="h-screen flex items-center justify-center">
        No data available
      </div>
    );
  }

  const population = region.population;

  const totalPopulation =
    population.gender.male +
    population.gender.female;

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
          Geography & Population
        </h1>

        <p className="text-gray-500 mt-2">
          Population distribution and geographical information.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm">
            Total Population
          </h3>

          <p className="text-3xl font-bold text-blue-950 mt-2">
            {totalPopulation.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm">
            Households
          </h3>

          <p className="text-3xl font-bold text-blue-950 mt-2">
            {population.household_count.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm">
            Land Area
          </h3>

          <p className="text-3xl font-bold text-blue-950 mt-2">
            {region.geography.total_land_area}
          </p>
        </div>
      </div>

      <IwoMap />
    </div>
  );
};

export default GeographyPopulation;