interface Props {
  politicalStructure: {
    politicalWards: string;
    administrative_subdivisions: string;
  };
  onChange: (value: any) => void;
}

const PoliticalStructureSection = ({
  politicalStructure,
  onChange,
}: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-5">
        Political Structure
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          value={
            politicalStructure.politicalWards
          }
          onChange={(e) =>
            onChange({
              ...politicalStructure,
              politicalWards:
                e.target.value,
            })
          }
          placeholder="Political Wards"
          className="border rounded-lg p-3"
        />

        <input
          value={
            politicalStructure.administrative_subdivisions
          }
          onChange={(e) =>
            onChange({
              ...politicalStructure,
              administrative_subdivisions:
                e.target.value,
            })
          }
          placeholder="Administrative Subdivisions"
          className="border rounded-lg p-3"
        />
      </div>
    </div>
  );
};

export default PoliticalStructureSection;