import { Link } from "react-router-dom";
import { assets as frontAsset } from "../assets/frontend_assets/assets";

function Logo() {
  return (
    // <Link to="/">
    <Link to="home">
      <img src={frontAsset.logo} className="w-36" alt="" />
    </Link>
  );
}

export default Logo;
