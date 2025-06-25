import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { ProductContext } from "../../context/ProductContext";
import Title from "../Title";
import ProductItem from "../ProductItem";

function RelatedProducts() {
  const { category, subCategory } = useContext(ProductContext);
  const { products } = useContext(ShopContext);

  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy
        .filter((item) => category === item.category)
        .filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => {
          return (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
}
export default RelatedProducts;
