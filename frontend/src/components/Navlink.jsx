/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

function Navlink({ link, name }) {
  const newName = name.toUpperCase();
  return (
    <NavLink to={link} className="flex flex-col items-center gap-1">
      <p>{newName}</p>
      <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
    </NavLink>
  );
}

export default Navlink;
