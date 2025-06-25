/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

function Navlinksm({ link, name, visible, setVisible }) {
  const newName = name.toUpperCase();
  return (
    <NavLink
      onClick={() => setVisible(!visible)}
      to={link}
      className="border py-2 pl-6"
    >
      {newName}
    </NavLink>
  );
}

export default Navlinksm;
