import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

function FormTitle() {
  const { currentState } = useContext(LoginContext);
  return (
    <div className="mb-2 mt-10 inline-flex items-center gap-2">
      <p className="prata-regular text-3xl">{currentState}</p>
      <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
    </div>
  );
}

export default FormTitle;
