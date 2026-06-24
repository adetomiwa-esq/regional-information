import { useParams } from "react-router-dom";
import { regions } from "../data/regions";

const RegionDetails = () => {
  const { id } = useParams();

  const region = regions.find(
    (item) => item.id === Number(id)
  );

  if (!region) {
    return <h1>Region Not Found</h1>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-4xl font-bold text-blue-950">
        {region.name}
      </h1>

      <p className="mt-3 text-gray-600">
        {region.description}
      </p>

      <div className="grid md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-gray-500">Population</h3>
          <p className="text-2xl font-bold">
            {region.population.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-gray-500">Schools</h3>
          <p className="text-2xl font-bold">
            {region.schools}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-gray-500">Hospitals</h3>
          <p className="text-2xl font-bold">
            {region.hospitals}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-gray-500">Markets</h3>
          <p className="text-2xl font-bold">
            {region.markets}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegionDetails;