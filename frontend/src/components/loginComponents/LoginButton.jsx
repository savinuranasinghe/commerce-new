import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

function LoginButton() {
  const { currentState } = useContext(LoginContext);
  return (
    <button className="mt-4 bg-black px-8 py-2 font-light text-white">
      {currentState === "Login" ? "Sign In" : "Sign Up"}
    </button>
  );
}

export default LoginButton;
