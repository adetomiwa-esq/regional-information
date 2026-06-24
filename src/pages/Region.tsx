import { useState } from "react";
import { regions } from "../data/regions";
import { useNavigate } from "react-router-dom";

const Regions = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredRegions = regions.filter((region) =>
    region.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-4xl font-bold text-blue-950 mb-8">
        Regional Information System
      </h1>

      <input
        type="text"
        placeholder="Search region..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-lg border mb-8"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filteredRegions.map((region) => (
          <div
            key={region.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h2 className="text-xl font-bold text-blue-950">
              {region.name}
            </h2>

            <p className="text-gray-600 mt-2">
              Population: {region.population.toLocaleString()}
            </p>

            <p>Schools: {region.schools}</p>
            <p>Hospitals: {region.hospitals}</p>

            <button
              onClick={() =>
                navigate(`/regions/${region.id}`)
              }
              className="mt-4 bg-blue-950 text-white px-4 py-2 rounded-lg"
            >
              View Region
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regions;