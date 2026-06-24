interface Props {
  geography: {
    total_land_area: string;
    major_traditional_quarters: string;
  };
  onChange: (value: any) => void;
}

const GeographySection = ({
  geography,
  onChange,
}: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-5">
        Geography
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          value={geography.total_land_area}
          onChange={(e) =>
            onChange({
              ...geography,
              total_land_area:
                e.target.value,
            })
          }
          placeholder="Total Land Area"
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          value={
            geography.major_traditional_quarters
          }
          onChange={(e) =>
            onChange({
              ...geography,
              major_traditional_quarters:
                e.target.value,
            })
          }
          placeholder="Major Traditional Quarters"
          className="border rounded-lg p-3"
        />
      </div>
    </div>
  );
};

export default GeographySection;