import { useContext } from "react";
import { CollectionContext } from "../../context/CollectionContext";

function CategoryFilter() {
  const { showFilter, toggleCategory } = useContext(CollectionContext);
  return (
    <div
      className={`border border-gray-300 pl-5 py-3  mt-6 ${showFilter ? "" : "hidden"} sm:block`}
    >
      <p className="mb-3 text-sm font-medium">CATEGORIES</p>
      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        <p className="flex gap-2">
          <input
            className="w-3"
            type="checkbox"
            value={"Men"}
            onChange={toggleCategory}
          />{" "}
          Men
        </p>

        <p className="flex gap-2">
          <input
            className="w-3"
            type="checkbox"
            value={"Women"}
            onChange={toggleCategory}
          />{" "}
          Women
        </p>

        <p className="flex gap-2">
          <input
            className="w-3"
            type="checkbox"
            value={"Kids"}
            onChange={toggleCategory}
          />{" "}
          Kids
        </p>
      </div>
    </div>
  );
}

export default CategoryFilter;
