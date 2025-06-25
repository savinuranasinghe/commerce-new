import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

function LoginFooter() {
  const { currentState, setCurrentState } = useContext(LoginContext);
  return (
    <div className="mt-[-8px] flex w-full justify-between text-sm">
      <p className="cursor-pointer">Forgot your password?</p>
      {currentState === "Login" ? (
        <p
          onClick={() => setCurrentState("Sign Up")}
          className="cursor-pointer"
        >
          Create account
        </p>
      ) : (
        <p onClick={() => setCurrentState("Login")} className="cursor-pointer">
          Login Here
        </p>
      )}
    </div>
  );
}

export default LoginFooter;
