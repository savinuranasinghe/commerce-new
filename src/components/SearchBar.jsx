import { useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { assets as frontAsset } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    visible,
    setPageLocation,
  } = useContext(SearchContext);

  // using this useLocation you can get the path of the route that means the path of the page
  const location = useLocation();

  useEffect(() => {
    setPageLocation(location);
  }, [location, setPageLocation]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={frontAsset.search_icon} alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={frontAsset.cross_icon}
        alt=""
      />
    </div>
  ) : null;
}

export default SearchBar;
