import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface HospitalForm {
  numberOfDoctors: number;
  medicalDoctors: string;
  numberOfNurses: number;
  numberOfNursesMidwives: number;
  numberOfOtherStaff: number;
  labScientistsPharmacists: string;
  bedCapacity: number;
  numberOfBeds: number;
  dailyPatientLoad: number;
  averagePatientsPerDay: number;
}

const defaultData: HospitalForm = {
  numberOfDoctors: 8,
  medicalDoctors:
    "Dr. James Adeyemi, Dr. Musa Ibrahim, Dr. Grace Adebayo",
  numberOfNurses: 15,
  numberOfNursesMidwives: 7,
  numberOfOtherStaff: 12,
  labScientistsPharmacists:
    "2 Laboratory Scientists, 1 Pharmacist",
  bedCapacity: 80,
  numberOfBeds: 65,
  dailyPatientLoad: 90,
  averagePatientsPerDay: 75,
};

const HealthInstitutionDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const institution = state?.institution;
  const category = state?.category;

  const isAdmin =
    localStorage.getItem("role") === "admin";

  const [saved, setSaved] = useState(false);

  const [form, setForm] =
    useState<HospitalForm>(defaultData);

  useEffect(() => {
    if (!institution) return;

    const storageKey = `hospital-${encodeURIComponent(
      institution.name
    )}`;

    const existing =
      localStorage.getItem(storageKey);

    if (existing) {
      setForm(JSON.parse(existing));
    } else {
      localStorage.setItem(
        storageKey,
        JSON.stringify(defaultData)
      );
    }
  }, [institution]);

  if (!institution) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-semibold">
          Hospital not found
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-950 text-white px-6 py-3 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const storageKey = `hospital-${encodeURIComponent(
    institution.name
  )}`;

  const handleChange = (
    key: keyof HospitalForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]:
        typeof prev[key] === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(form)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const Input = ({
  label,
  field,
  type = "text",
}: {
  label: string;
  field: keyof HospitalForm;
  type?: string;
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>

    <input
      type={type}
      value={form[field]}
      disabled={!isAdmin}
      onChange={(e) =>
        handleChange(field, e.target.value)
      }
      className={`w-full rounded-lg border px-4 py-3 outline-none ${
        isAdmin
          ? "border-gray-300 focus:border-blue-950"
          : "bg-gray-100 border-gray-200 cursor-not-allowed"
      }`}
    />
  </div>
);

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-950 font-medium hover:underline mb-8"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Header */}

      <div className="bg-white rounded-xl shadow p-8 mb-8">
        <h1 className="text-3xl font-bold text-blue-950">
          {institution.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {category}
        </p>

        <p className="mt-5 text-gray-600">
          View and manage staffing,
          infrastructure and operational
          statistics for this health
          institution.
        </p>
      </div>

      {saved && (
        <div className="mb-6 rounded-lg bg-green-100 border border-green-300 text-green-700 px-5 py-4">
          Changes saved successfully.
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-8">
        <div className="grid md:grid-cols-2 gap-6">

                  <Input
            label="Number of Doctors"
            field="numberOfDoctors"
            type="number"
          />

          <Input
            label="Medical Doctors (Names)"
            field="medicalDoctors"
          />

          <Input
            label="Number of Nurses"
            field="numberOfNurses"
            type="number"
          />

          <Input
            label="Number of Nurses / Midwives"
            field="numberOfNursesMidwives"
            type="number"
          />

          <Input
            label="Number of Other Staff"
            field="numberOfOtherStaff"
            type="number"
          />

          <Input
            label="Laboratory Scientists / Pharmacists"
            field="labScientistsPharmacists"
          />

          <Input
            label="Bed Capacity"
            field="bedCapacity"
            type="number"
          />

          <Input
            label="Number of Beds"
            field="numberOfBeds"
            type="number"
          />

          <Input
            label="Daily Patient Load"
            field="dailyPatientLoad"
            type="number"
          />

          <Input
            label="Average Patients Per Day"
            field="averagePatientsPerDay"
            type="number"
          />
        </div>

        <div className="mt-10 grid lg:grid-cols-4 gap-6">
          <div className="rounded-xl bg-blue-50 p-5 border">
            <p className="text-sm text-gray-500">
              Doctors
            </p>

            <h2 className="text-3xl font-bold text-blue-950 mt-2">
              {form.numberOfDoctors}
            </h2>
          </div>

          <div className="rounded-xl bg-green-50 p-5 border">
            <p className="text-sm text-gray-500">
              Nurses
            </p>

            <h2 className="text-3xl font-bold text-green-700 mt-2">
              {form.numberOfNurses}
            </h2>
          </div>

          <div className="rounded-xl bg-yellow-50 p-5 border">
            <p className="text-sm text-gray-500">
              Bed Capacity
            </p>

            <h2 className="text-3xl font-bold text-yellow-700 mt-2">
              {form.bedCapacity}
            </h2>
          </div>

          <div className="rounded-xl bg-purple-50 p-5 border">
            <p className="text-sm text-gray-500">
              Daily Patients
            </p>

            <h2 className="text-3xl font-bold text-purple-700 mt-2">
              {form.dailyPatientLoad}
            </h2>
          </div>
        </div>

        <div className="mt-10 border-t pt-8">
          <h2 className="text-xl font-semibold text-blue-950 mb-4">
            Institution Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Facility Name
              </label>

              <input
                disabled
                value={institution.name}
                className="w-full rounded-lg border bg-gray-100 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Category
              </label>

              <input
                disabled
                value={category}
                className="w-full rounded-lg border bg-gray-100 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-500 mb-1">
                Address
              </label>

              <textarea
                disabled
                value={institution.address}
                className="w-full rounded-lg border bg-gray-100 px-4 py-3"
                rows={3}
              />
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-950 hover:bg-blue-900 transition text-white px-8 py-3 rounded-lg font-semibold"
            >
              Save Changes
            </button>
          </div>
        )}

        {!isAdmin && (
          <div className="mt-8 rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-yellow-800">
            You are viewing this information in read-only mode.
            Only administrators can edit hospital records.
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthInstitutionDetails;