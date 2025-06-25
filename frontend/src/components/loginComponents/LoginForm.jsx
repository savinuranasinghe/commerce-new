import { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import axios from "axios";
import { toast } from "react-toastify";
import FormTitle from "./FormTitle";
import LoginInputs from "./LoginInputs";
import LoginFooter from "./LoginFooter";
import LoginButton from "./LoginButton";

function Form() {
  const {
    currentState,
    token,
    setToken,
    backendUrl,
    name,
    setName,
    password,
    setPasword,
    email,
    navigate,
  } = useContext(LoginContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);

          // Clear input fields
          setName("");
          setPasword("");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96"
    >
      <FormTitle />

      {/* Inputs for login and signup */}
      <LoginInputs />

      {/* Forget password and other */}
      <LoginFooter />

      {/* login and signup button */}
      <LoginButton />
    </form>
  );
}

export default Form;
