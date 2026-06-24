interface Facility {
  name: string;
  address: string;
}

interface Props {
  title: string;
  facilities: Facility[];
  onChange: (
    facilities: Facility[]
  ) => void;
}

const EditableFacilityList = ({
  title,
  facilities,
  onChange,
}: Props) => {
  const update = (
    index: number,
    key: keyof Facility,
    value: string
  ) => {
    const updated = [
      ...facilities,
    ];

    updated[index][key] = value;

    onChange(updated);
  };

  const add = () => {
    onChange([
      ...facilities,
      {
        name: "",
        address: "",
      },
    ]);
  };

  const remove = (
    index: number
  ) => {
    onChange(
      facilities.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-xl">
          {title}
        </h2>

        <button
          type="button"
          onClick={add}
          className="bg-blue-950 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {facilities.map(
        (facility, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg mb-4"
          >
            <div className="grid md:grid-cols-2 gap-3">
              <input
                value={facility.name}
                onChange={(e) =>
                  update(
                    index,
                    "name",
                    e.target.value
                  )
                }
                className="border p-3 rounded"
              />

              <input
                value={
                  facility.address
                }
                onChange={(e) =>
                  update(
                    index,
                    "address",
                    e.target.value
                  )
                }
                className="border p-3 rounded"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                remove(index)
              }
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default EditableFacilityList;