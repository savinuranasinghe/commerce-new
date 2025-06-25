import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import ProductImages from "../components/productComponents/ProductImages";
import ProdcutInfo from "../components/productComponents/ProdcutInfo";
import DescriptionReview from "../components/productComponents/DescriptionReview";
import RelatedProducts from "../components/productComponents/RelatedProducts";

function Product() {
  const { productId } = useParams();
  const { productData, setPageProductId } = useContext(ProductContext);

  useEffect(() => {
    setPageProductId(productId);
  }, [productId, setPageProductId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* --------------------Product Data-------------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* ------------------Product Images------------------- */}
        <ProductImages />
        {/* ----------------Product Info--------------- */}
        <ProdcutInfo />
      </div>
      {/* --------------Description & review Section------------- */}
      <DescriptionReview />

      {/* Display Related Products */}
      <RelatedProducts />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
