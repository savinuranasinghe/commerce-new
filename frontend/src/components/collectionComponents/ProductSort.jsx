import { useContext } from "react";
import { CollectionContext } from "../../context/CollectionContext";

function ProductSort() {
  const { setSortType } = useContext(CollectionContext);
  return (
    <select
      onChange={(e) => setSortType(e.target.value)}
      className="border-2 border-gray-300 text-sm px-2"
    >
      <option value="relavent">Sort by: Relevent</option>
      <option value="low-high">Sort by: Low to High</option>
      <option value="high-low">Sort by: High to Low</option>
    </select>
  );
}

export default ProductSort;
