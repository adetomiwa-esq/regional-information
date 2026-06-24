interface School {
  name: string;
  address: string;
}

interface Props {
  title: string;
  schools: School[];
  onChange: (
    schools: School[]
  ) => void;
}

const EditableSchoolList = ({
  title,
  schools,
  onChange,
}: Props) => {
  const updateSchool = (
    index: number,
    key: keyof School,
    value: string
  ) => {
    const updated = [...schools];

    updated[index][key] = value;

    onChange(updated);
  };

  const deleteSchool = (
    index: number
  ) => {
    onChange(
      schools.filter(
        (_, i) => i !== index
      )
    );
  };

  const addSchool = () => {
    onChange([
      ...schools,
      {
        name: "",
        address: "",
      },
    ]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-xl">
          {title}
        </h2>

        <button
          type="button"
          onClick={addSchool}
          className="bg-blue-950 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-4">
        {schools.map(
          (school, index) => (
            <div
              key={index}
              className="border rounded-lg p-4"
            >
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={school.name}
                  onChange={(e) =>
                    updateSchool(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="School Name"
                  className="border rounded p-3"
                />

                <input
                  value={
                    school.address
                  }
                  onChange={(e) =>
                    updateSchool(
                      index,
                      "address",
                      e.target.value
                    )
                  }
                  placeholder="Address"
                  className="border rounded p-3"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  deleteSchool(index)
                }
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EditableSchoolList;