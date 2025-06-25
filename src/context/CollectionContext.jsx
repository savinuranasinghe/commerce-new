/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useLocation } from "react-router-dom";
import { ShopContext } from "./ShopContext";
import { SearchContext } from "./SearchContext";

export const CollectionContext = createContext();

function CollectionContextProvider(props) {
  const location = useLocation();
  const { products } = useContext(ShopContext);
  const { search, showSearch } = useContext(SearchContext);

  // State For the Collection page
  const [showFilter, setShowFilter] = useState(false);
  const [filterProdutcs, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  function toggleCategory(e) {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  }

  function toggleSubCategory(e) {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  }

  // Filtering and Sorting Products
  const applyFilter = useCallback(() => {
    let productsCopy = products.slice();

    // If no filters are applied, show all products
    if (
      !showSearch &&
      category.length === 0 &&
      subCategory.length === 0 &&
      sortType === "relevant"
    ) {
      setFilterProducts(productsCopy);
      return;
    }

    // Filtering Products based on the search query
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filtering Products based on the Category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    // Filtering Products based on the SubCategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    // Sorting Products based on sortType
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
  }, [products, showSearch, search, category, subCategory, sortType]);

  // Reset filters when navigating back to the collection page
  useEffect(() => {
    if (location.pathname === "/collection") {
      setCategory([]);
      setSubCategory([]);
      setSortType("relevant");
      setFilterProducts(products);
    }
  }, [location.pathname, products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, sortType, applyFilter]);

  const value = {
    showFilter,
    setShowFilter,
    filterProdutcs,
    setFilterProducts,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    sortType,
    setSortType,
    toggleCategory,
    toggleSubCategory,
    applyFilter,
    search,
    showSearch,
  };

  return (
    <CollectionContext.Provider value={value}>
      {props.children}
    </CollectionContext.Provider>
  );
}

export default CollectionContextProvider;
