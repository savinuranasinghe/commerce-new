/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext();

function SearchContextProvider(props) {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Showing the search bar
  const [visible, setVisibile] = useState(false);

  // Storing the location of the page
  const [pageLocation, setPageLocation] = useState("");

  function setOnClick() {
    setShowSearch(!showSearch);
  }

  useEffect(() => {
    if (pageLocation?.pathname?.includes("collection")) {
      setVisibile(true);
    } else {
      setVisibile(false);
    }
  }, [pageLocation]);

  const value = {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setOnClick,
    visible,
    setVisibile,
    pageLocation,
    setPageLocation,
  };

  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
