// import { useState } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Navbar from "./components/appComponents/Navbar";
import Footer from "./components/appComponents/Footer";
import SearchBar from "./components/SearchBar";
import useScrollToTop from "./customHooks/useScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";

function App() {
  useScrollToTop();

  return (
    <div className="sm:px[5vw] px-4 md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route index element={<Navigate replace to="home" />} />
        <Route path="home" element={<Home />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="collection" element={<Collection />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="product/:productId" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="placeorder" element={<PlaceOrder />} />
        <Route path="orders" element={<Orders />} />
        <Route path="verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
