import { useState } from "react";
import axios from "axios";

interface School {
  name: string;
  ownership: string;
  address: string;
}

interface Hospital {
  name: string;
  ownership: string;
  address: string;
}

const CreateRegion = () => {
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    household_count: "",
    male: "",
    female: "",
    children: "",
    youth: "",
    elderly: "",
  });

  const [schools, setSchools] = useState<School[]>([
    {
      name: "",
      ownership: "",
      address: "",
    },
  ]);

  const [hospitals, setHospitals] = useState<Hospital[]>([
    {
      name: "",
      ownership: "",
      address: "",
    },
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSchool = () => {
    setSchools([
      ...schools,
      {
        name: "",
        ownership: "",
        address: ""
      },
    ]);
  };

  const addHospital = () => {
    setHospitals([
      ...hospitals,
      {
        name: "",
        ownership: "",
        address: "",
      },
    ]);
  };

  const updateSchool = (
    index: number,
    field: keyof School,
    value: string
  ) => {
    const updated = [...schools];

    updated[index][field] = value;

    setSchools(updated);
  };

  const updateHospital = (
    index: number,
    field: keyof Hospital,
    value: string
  ) => {
    const updated = [...hospitals];

    updated[index][field] = value;

    setHospitals(updated);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: formData.name,

        population: {
          household_count: Number(
            formData.household_count
          ),

          gender: {
            male: Number(formData.male),
            female: Number(formData.female),
          },

          age_groups: {
            children: Number(
              formData.children
            ),

            youth: Number(formData.youth),

            elderly: Number(
              formData.elderly
            ),
          },
        },

        public_facilities: {
          schools,
          hospitals,
        },
      };

      await axios.post(
        "https://regional-info-api.onrender.com/api/region/create-region",
        payload
      );

      setSuccessMessage(
        "Region created successfully!"
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create region. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-950 mb-8">
          Create Region
        </h1>

        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Region Name */}

          <div>
            <label className="font-medium">
              Region Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Odo-Ori"
              required
            />
          </div>

          {/* Population */}

          <div>
            <h2 className="text-xl font-semibold text-blue-950 mb-4">
              Population Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                [
                  "household_count",
                  "Household Count",
                ],
                ["male", "Male Population"],
                [
                  "female",
                  "Female Population",
                ],
                ["children", "Children"],
                ["youth", "Youth"],
                ["elderly", "Elderly"],
              ].map(([name, label]) => (
                <input
                  key={name}
                  type="number"
                  name={name}
                  placeholder={label}
                  value={
                    formData[
                      name as keyof typeof formData
                    ]
                  }
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />
              ))}
            </div>
          </div>

          {/* Schools */}

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-950">
                Schools
              </h2>

              <button
                type="button"
                onClick={addSchool}
                className="bg-blue-950 text-white px-4 py-2 rounded-lg"
              >
                Add School
              </button>
            </div>

            {schools.map((school, index) => (
              <div
                key={index}
                className="grid md:grid-cols-3 gap-4 mb-4 border p-4 rounded-lg"
              >
                <input
                  type="text"
                  placeholder="School Name"
                  value={school.name}
                  onChange={(e) =>
                    updateSchool(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3"
                  required
                />

                <select
                  value={school.ownership}
                  onChange={(e) =>
                    updateSchool(
                      index,
                      "ownership",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3"
                  required
                >
                  <option value="">
                    Ownership
                  </option>

                  <option value="Government">
                    Government
                  </option>

                  <option value="Private">
                    Private
                  </option>
                </select>

                <input
                  type="text"
                  placeholder="Address"
                  value={school.address}
                  onChange={(e) =>
                    updateSchool(
                      index,
                      "address",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3"
                  required
                />
              </div>
            ))}
          </div>

          {/* Hospitals */}

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-950">
                Hospitals
              </h2>

              <button
                type="button"
                onClick={addHospital}
                className="bg-blue-950 text-white px-4 py-2 rounded-lg"
              >
                Add Hospital
              </button>
            </div>

            {hospitals.map((hospital, index) => (
              <div
                key={index}
                className="grid md:grid-cols-3 gap-4 mb-4 border p-4 rounded-lg"
              >
                <input
                  type="text"
                  placeholder="Hospital Name"
                  value={hospital.name}
                  onChange={(e) =>
                    updateHospital(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3"
                  required
                />

                <select
                  value={hospital.ownership}
                  onChange={(e) =>
                    updateHospital(
                      index,
                      "ownership",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3"
                  required
                >
                  <option value="">
                    Ownership
                  </option>

                  <option value="Government">
                    Government
                  </option>

                  <option value="Private">
                    Private
                  </option>
                </select>

                <input
                  type="text"
                  placeholder="Address"
                  value={hospital.address}
                  onChange={(e) =>
                    updateHospital(
                      index,
                      "address",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3"
                  required
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Region...
              </>
            ) : (
              "Create Region"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRegion;