/* eslint-disable no-case-declarations */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { ShopContext } from "./ShopContext";
import { LoginContext } from "./LoginContext";
import axios from "axios";
import { toast } from "react-toastify";
export const PlaceOrderContext = createContext();

function PlaceOrderContextProvider(props) {
  const [method, setMethod] = useState("cod");

  const { backendUrl, token } = useContext(LoginContext);

  const {
    navigate,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // On change handler
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        // API Calls for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } },
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } },
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        // case "razorpay":
        //   const responseRazorpay = await axios.post(
        //     backendUrl + "/api/order/razorpay",
        //     orderData,
        //     { headers: { token } },
        //   );
        //   if (responseRazorpay.data.success) {
        //     initPay(responseRazorpay.data.order);
        //   }

        // break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    method,
    setMethod,
    formData,
    setFormData,
    onChangeHandler,
    onSubmitHandler,
  };
  return (
    <PlaceOrderContext.Provider value={value}>
      {props.children}
    </PlaceOrderContext.Provider>
  );
}

export default PlaceOrderContextProvider;
