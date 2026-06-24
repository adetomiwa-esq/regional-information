import { useEffect, useState } from "react";
import {
  getRegion,
  updateRegion,
} from "../services/regionService";

import PopulationSection from "../components/PopulationSection";
import EditableFacilityList from "../components/EditableFacilityList";
import EditableSchoolList from "../components/EditableSchoolList";
import GeographySection from "../components/GeographySection";
import PoliticalStructureSection from "../components/PoliticalStructureSection";

const EditRegion = () => {
  const [region, setRegion] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [success, setSuccess] =
    useState(false);

  const fetchData =
    async () => {
      try {
        const data =
          await getRegion();

        setRegion(data);
      } finally {
        setPageLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await updateRegion(
          region._id,
          region
        );

        setSuccess(true);

        await fetchData();

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

  if (pageLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg">
          Region Updated Successfully
        </div>
      )}

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-6"
      >
        <PopulationSection
          population={
            region.population
          }
          setPopulation={(
            value
          ) =>
            setRegion({
              ...region,
              population:
                value,
            })
          }
        />

        <EditableFacilityList
          title="Primary Health Facilities"
          facilities={
            region
              .healthFacilities
              .primaryHealthFacilities
          }
          onChange={(
            facilities
          ) =>
            setRegion({
              ...region,
              healthFacilities:
                {
                  ...region.healthFacilities,
                  primaryHealthFacilities:
                    facilities,
                },
            })
          }
        />

        <EditableFacilityList
          title="State Hospitals"
          facilities={
            region
              .healthFacilities
              .stateHospitals
          }
          onChange={(
            facilities
          ) =>
            setRegion({
              ...region,
              healthFacilities:
                {
                  ...region.healthFacilities,
                  stateHospitals:
                    facilities,
                },
            })
          }
        />

        <EditableSchoolList
          title="Public Primary Schools"
          schools={
            region
              .educationInfrastructure
              .publicPrimary
              .schools
          }
          onChange={(
            schools
          ) =>
            setRegion({
              ...region,
              educationInfrastructure:
                {
                  ...region.educationInfrastructure,
                  publicPrimary:
                    {
                      ...region.educationInfrastructure.publicPrimary,
                      schools,
                    },
                },
            })
          }
        />

        <EditableSchoolList
  title="Private Primary Schools"
  schools={
    region
      .educationInfrastructure
      .privatePrimary
      .schools
  }
  onChange={(schools) =>
    setRegion({
      ...region,
      educationInfrastructure: {
        ...region.educationInfrastructure,

        privatePrimary: {
          ...region
            .educationInfrastructure
            .privatePrimary,

          schools,
        },
      },
    })
  }
/>

<EditableSchoolList
  title="Public Secondary Schools"
  schools={
    region
      .educationInfrastructure
      .publicSecondary
      .schools
  }
  onChange={(schools) =>
    setRegion({
      ...region,
      educationInfrastructure: {
        ...region.educationInfrastructure,

        publicSecondary: {
          ...region
            .educationInfrastructure
            .publicSecondary,

          schools,
        },
      },
    })
  }
/>

<EditableSchoolList
  title="Higher Institutions"
  schools={
    region
      .educationInfrastructure
      .HigherInstitutions
      .schools
  }
  onChange={(schools) =>
    setRegion({
      ...region,
      educationInfrastructure: {
        ...region.educationInfrastructure,

        HigherInstitutions: {
          ...region
            .educationInfrastructure
            .HigherInstitutions,

          schools,
        },
      },
    })
  }
/>

<EditableSchoolList
  title="Colleges Of Health"
  schools={
    region
      .educationInfrastructure
      .collegesOfHealth
      .schools
  }
  onChange={(schools) =>
    setRegion({
      ...region,
      educationInfrastructure: {
        ...region.educationInfrastructure,

        collegesOfHealth: {
          ...region
            .educationInfrastructure
            .collegesOfHealth,

          schools,
        },
      },
    })
  }
/>

        <GeographySection
  geography={region.geography}
  onChange={(geography) =>
    setRegion({
      ...region,
      geography,
    })
  }
/>

        <PoliticalStructureSection
  politicalStructure={
    region.politicalStructure
  }
  onChange={(
    politicalStructure
  ) =>
    setRegion({
      ...region,
      politicalStructure,
    })
  }
/>

        <button
          disabled={
            loading
          }
          className="bg-blue-950 text-white px-8 py-3 rounded-lg"
        >
          {loading
            ? "Updating..."
            : "Update Region"}
        </button>
      </form>
    </div>
  );
};

export default EditRegion;