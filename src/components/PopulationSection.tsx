interface Props {
  population: any;
  setPopulation: (
    value: any
  ) => void;
}

const PopulationSection = ({
  population,
  setPopulation,
}: Props) => {
  const update = (
    path: string[],
    value: number
  ) => {
    const copy =
      structuredClone(
        population
      );

    let current = copy;

    for (
      let i = 0;
      i < path.length - 1;
      i++
    ) {
      current = current[path[i]];
    }

    current[
      path[path.length - 1]
    ] = value;

    setPopulation(copy);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-bold text-xl mb-5">
        Population
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
        <input
          type="number"
          value={
            population.household_count
          }
          onChange={(e) =>
            update(
              [
                "household_count",
              ],
              Number(
                e.target.value
              )
            )
          }
          className="border p-3 rounded w-full pl-20"
          placeholder="Households"
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2">Families:</span>
        </div>

        <div className="relative">
        <input
          type="number"
          value={
            population.gender.male
          }
          onChange={(e) =>
            update(
              [
                "gender",
                "male",
              ],
              Number(
                e.target.value
              )
            )
          }
          className="border p-3 rounded w-full pl-20"
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2">Male:</span>
        </div>

        <div className="relative">
        <input
          type="number"
          value={
            population.gender
              .female
          }
          onChange={(e) =>
            update(
              [
                "gender",
                "female",
              ],
              Number(
                e.target.value
              )
            )
          }
          className="border p-3 rounded w-full pl-20"
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2">Female:</span>
        </div>

        <div className="relative">
        <input
          type="number"
          value={
            population
              .age_groups
              .children
          }
          onChange={(e) =>
            update(
              [
                "age_groups",
                "children",
              ],
              Number(
                e.target.value
              )
            )
          }
          className="border p-3 pl-20 rounded w-full"
        />

        
            <span className="absolute left-2 top-1/2 -translate-y-1/2">Children:</span>
        </div>

        <div className="relative">
        <input
          type="number"
          value={
            population
              .age_groups.youth
          }
          onChange={(e) =>
            update(
              [
                "age_groups",
                "youth",
              ],
              Number(
                e.target.value
              )
            )
          }
          className="border p-3 rounded w-full pl-20"
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2">Youths:</span>
        </div>

          <div className="relative">
        <input
          type="number"
          value={
            population
              .age_groups
              .elderly
          }
          onChange={(e) =>
            update(
              [
                "age_groups",
                "elderly",
              ],
              Number(
                e.target.value
              )
            )
          }
          className="border p-3 rounded w-full pl-20"
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2">Aged:</span>
        </div>
      </div>
    </div>
  );
};

export default PopulationSection;