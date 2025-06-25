import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ShopContextProvider from "./context/ShopContext.jsx";
import CollectionContextProvider from "./context/CollectionContext.jsx";
import SearchContextProvider from "./context/SearchContext.jsx";
import ProductContextProvider from "./context/ProductContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import PlaceOrderContextProvider from "./context/PlaceOrderContext.jsx";
import LoginContextProvider from "./context/LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <LoginContextProvider>
        <ShopContextProvider>
          <CartContextProvider>
            <PlaceOrderContextProvider>
              <SearchContextProvider>
                <CollectionContextProvider>
                  <ProductContextProvider>
                    <App />
                  </ProductContextProvider>
                </CollectionContextProvider>
              </SearchContextProvider>
            </PlaceOrderContextProvider>
          </CartContextProvider>
        </ShopContextProvider>
      </LoginContextProvider>
    </StrictMode>
  </BrowserRouter>,
);
