import { useContext } from "react";
import { CollectionContext } from "../../context/CollectionContext";
import { assets as frontAsset } from "../../assets/frontend_assets/assets";

function DropDown() {
  const { setShowFilter, showFilter } = useContext(CollectionContext);
  return (
    <p
      onClick={() => setShowFilter(!showFilter)}
      className="my-2 text-xl flex items-center cursor-pointer gap-2"
    >
      Filters
      <img
        className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
        src={frontAsset.dropdown_icon}
        alt=""
      />
    </p>
  );
}

export default DropDown;
