/* eslint-disable react/prop-types */
import { assets as frontAsset } from "../assets/frontend_assets/assets";

function NavImg({ name, onClick = null }) {
  const val = frontAsset[name];
  return (
    <img
      src={val}
      className="w-5 cursor-pointer"
      alt="search"
      onClick={onClick}
    />
  );
}

export default NavImg;
