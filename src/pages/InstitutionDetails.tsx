import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const InstitutionDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const institution = state?.institution;
  const category = state?.category;

  if (!institution) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">
          Institution not found
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-950 text-white px-6 py-3 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  /**
   * Mock data
   */

  const details = {
    principal: "Mr. Samuel Adeyemi",
    founded: "1998",
    students: 1348,
    teachers: 52,
    classrooms: 34,
    laboratories: 4,
    library: "Available",
    sportsFacilities: [
      "Football Field",
      "Basketball Court",
      "Volleyball Court",
    ],
    internetAccess: "Yes",
    electricity: "Stable",
    waterSupply: "Borehole",
    accreditation: "Government Approved",
    contact: "+234 803 123 4567",
    email: "info@institution.gov.ng",
    description:
      "This institution is one of the leading educational establishments in the region, providing quality education and community development services.",
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Back */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-950 font-medium mb-8 hover:underline"
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

        <p className="mt-6 text-gray-700">
          {details.description}
        </p>
      </div>

      {/* Overview */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">
            Students
          </p>

          <h2 className="text-3xl font-bold text-blue-950 mt-2">
            {details.students}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">
            Teachers
          </p>

          <h2 className="text-3xl font-bold text-blue-950 mt-2">
            {details.teachers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">
            Classrooms
          </p>

          <h2 className="text-3xl font-bold text-blue-950 mt-2">
            {details.classrooms}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">
            Laboratories
          </p>

          <h2 className="text-3xl font-bold text-blue-950 mt-2">
            {details.laboratories}
          </h2>
        </div>

      </div>

      {/* Information */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6 text-blue-950">
            Institution Information
          </h2>

          <div className="space-y-5">

            <Info
              title="Address"
              value={institution.address}
            />

            <Info
              title="Principal"
              value={details.principal}
            />

            <Info
              title="Founded"
              value={details.founded}
            />

            <Info
              title="Accreditation"
              value={details.accreditation}
            />

            <Info
              title="Internet"
              value={details.internetAccess}
            />

            <Info
              title="Electricity"
              value={details.electricity}
            />

            <Info
              title="Water Supply"
              value={details.waterSupply}
            />

            <Info
              title="Contact"
              value={details.contact}
            />

            <Info
              title="Email"
              value={details.email}
            />

          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6 text-blue-950">
            Sports Facilities
          </h2>

          <ul className="space-y-3">

            {details.sportsFacilities.map(
              (sport, index) => (
                <li
                  key={index}
                  className="bg-slate-100 rounded-lg p-3"
                >
                  {sport}
                </li>
              )
            )}

          </ul>

        </div>

      </div>

    </div>
  );
};

const Info = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="flex justify-between border-b pb-3">
    <span className="text-gray-500">{title}</span>

    <span className="font-medium text-blue-950">
      {value}
    </span>
  </div>
);

export default InstitutionDetails;