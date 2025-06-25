/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "./LoginContext";

export const ShopContext = createContext();

function ShopContextProvider(props) {
  const currency = "Rs ";
  const deliveryFee = 10;

  const { token, setToken } = useContext(LoginContext);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // Cart items state
  const [cartItems, setCartItems] = useState({});

  // Add to cart function
  async function addToCart(itemId, size) {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    // Updating the databsase
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    toast.success("Item added successfully");
  }

  // Get the count of the cart items
  function getCartCount() {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  }

  // Update Cart Quantity
  async function updateQuantity(itemId, size, quantity) {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    // Updating the database
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }

  // Get the total
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) {
        // console.warn(`Product with ID ${items} not found.`);
        continue; // Skip this item if product info is not found
      }
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.error("Error calculating total amount:", error);
        }
      }
    }
    return totalAmount;
  };

  // Getting products from the backend
  const getProdutsData = useCallback(async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, setProducts]);

  // Getting the user cart fromt the database
  const getUserCart = useCallback(
    async (token) => {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/get",
          {},
          { headers: { token } },
        );
        if (response.data.success) {
          setCartItems(response.data.cartData);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
    [backendUrl, setCartItems],
  );

  useEffect(() => {
    getProdutsData();
  }, [getProdutsData]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
    if (token) {
      getUserCart(token);
    }
  }, [getUserCart, setToken, token]);

  const value = {
    products,
    currency,
    deliveryFee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setCartItems,
  };

  return (
    // Here in the value we need to pass a object and this contains all the values that can be acceseed by the component
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
}

export default ShopContextProvider;
