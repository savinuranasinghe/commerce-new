import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

function LoginInputs() {
  const { currentState, name, setName, password, setPasword, email, setEmail } =
    useContext(LoginContext);

  return (
    <>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full border border-gray-800 px-3 py-2"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full border border-gray-800 px-3 py-2"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPasword(e.target.value)}
        value={password}
        type="password"
        className="w-full border border-gray-800 px-3 py-2"
        placeholder="Password"
        required
      />
    </>
  );
}

export default LoginInputs;
