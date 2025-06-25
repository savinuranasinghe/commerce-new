/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ShopContext } from "./ShopContext";

export const ProductContext = createContext();

function ProductContextProvider(props) {
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

  // storing the product ID coming from params (react-router)
  const [pageProdcutId, setPageProductId] = useState("");

  // Sizing state for the ProdcutInfo component
  const [sizing, setSizing] = useState("");

  // Data for the relatedProduct Component
  const category = productData.category;
  const subCategory = productData.subCategory;

  // Fetching prodcut data based on the Product id that comes from the params of react router
  const fetchProductData = useCallback(async () => {
    products.map((item) => {
      if (item._id === pageProdcutId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  }, [products, pageProdcutId, setProductData, setImage]);

  useEffect(() => {
    fetchProductData();
  }, [pageProdcutId, products, fetchProductData]);

  const value = {
    products,
    productData,
    setProductData,
    image,
    setImage,
    sizing,
    setSizing,
    category,
    subCategory,
    pageProdcutId,
    setPageProductId,
  };

  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
