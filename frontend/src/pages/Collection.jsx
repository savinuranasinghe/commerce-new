import { useContext } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { CollectionContext } from "../context/CollectionContext";
import CategoryFilter from "../components/collectionComponents/CategoryFilter";
import SubCategoryFilter from "../components/collectionComponents/SubCategoryFilter";
import DropDown from "../components/collectionComponents/DropDown";
import ProductSort from "../components/collectionComponents/ProductSort";

function Collection() {
  const { filterProdutcs } = useContext(CollectionContext);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <DropDown />
        {/* Category Filter */}
        <CategoryFilter />
        {/* SubCategory filter */}
        <SubCategoryFilter />
      </div>

      {/* RightSide */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <ProductSort />
        </div>
        {/* Map product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProdutcs.map((item, index) => {
            return (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Collection;
