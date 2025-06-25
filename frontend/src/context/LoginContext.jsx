/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

function LoginContextProvider(props) {
  const [currentState, setCurrentState] = useState("Login");

  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  const value = {
    currentState,
    setCurrentState,
    token,
    setToken,
    backendUrl,
    name,
    setName,
    password,
    setPasword,
    email,
    setEmail,
    navigate,
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
