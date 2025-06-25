import { useContext } from "react";
import { CollectionContext } from "../../context/CollectionContext";

function SubCategoryFilter() {
  const { showFilter, toggleSubCategory } = useContext(CollectionContext);
  return (
    <div
      className={`border border-gray-300 pl-5 py-3  my-5 ${showFilter ? "" : "hidden"} sm:block`}
    >
      <p className="mb-3 text-sm font-medium">TYPE</p>
      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        <p className="flex gap-2">
          <input
            className="w-3"
            type="checkbox"
            value={"Topwear"}
            onChange={toggleSubCategory}
          />
          Topwear
        </p>

        <p className="flex gap-2">
          <input
            className="w-3"
            type="checkbox"
            value={"Bottomwear"}
            onChange={toggleSubCategory}
          />
          Bottomwear
        </p>

        <p className="flex gap-2">
          <input
            className="w-3"
            type="checkbox"
            value={"Winterwear"}
            onChange={toggleSubCategory}
          />
          Winterwear
        </p>
      </div>
    </div>
  );
}

export default SubCategoryFilter;
