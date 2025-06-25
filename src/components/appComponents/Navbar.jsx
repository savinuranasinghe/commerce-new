import { Link } from "react-router-dom";
import Logo from "../Logo";
import Navlink from "../Navlink";
import Navlinksm from "../Navlink-sm";
import NavImg from "../NavImg";
import { assets as frontAsset } from "../../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { ShopContext } from "../../context/ShopContext";
import { LoginContext } from "../../context/LoginContext";

function Navbar() {
  const { setOnClick } = useContext(SearchContext);
  const { getCartCount, setCartItems } = useContext(ShopContext);
  const { navigate, token, setToken } = useContext(LoginContext);

  const [visible, setVisible] = useState(false);

  function logOut() {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  }

  function setLogin() {
    return token ? null : navigate("/login");
  }

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Logo />
      <ul className="hidden gap-5 text-sm text-gray-600 sm:flex">
        <Navlink link="home" name="home" />
        {/* <Navlink link="/" name="home" /> */}
        <Navlink link="collection" name="collection" />
        <Navlink link="about" name="About" />
        <Navlink link="contact" name="contact" />
      </ul>
      <div className="flex items-center gap-6">
        <NavImg onClick={setOnClick} name="search_icon" />
        <div className="group relative">
          <NavImg onClick={setLogin} name="profile_icon" />
          {/* Drop down menu */}
          {token && (
            <div className="dropdown-menu absolute right-0 hidden pt-4 group-hover:block">
              <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logOut} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="cart" className="relative">
          <img src={frontAsset.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible((visible) => !visible)}
          src={frontAsset.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* SideBar menu for smaller screen */}
      <div
        className={`absolute bottom-0 right-0 top-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible((visible) => !visible)}
            className="flex cursor-pointer items-center gap-4 p-3"
          >
            <img
              src={frontAsset.dropdown_icon}
              className="h-4 rotate-180"
              alt=""
            />
            <p>Back</p>
          </div>
          <Navlinksm
            visible={visible}
            setVisible={setVisible}
            link="home"
            name="home"
          />
          <Navlinksm link="collection" name="collection" />
          <Navlinksm link="about" name="About" />
          <Navlinksm link="contact" name="contact" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
