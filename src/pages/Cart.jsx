import { useContext } from "react";
import Title from "../components/Title";
import CartData from "../components/cartComponents/CartData";
import CartTotal from "../components/cartComponents/CartTotal";
import CheckoutBtn from "../components/cartComponents/CheckoutBtn";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartData } = useContext(CartContext);

  return cartData.length > 0 ? (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <CartData />
      <div className="my-20 flex justify-end">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <CheckoutBtn />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex h-screen items-center">
      <div className="m-auto text-3xl">
        <Title text1={"CART"} text2={"EMPTY"} />
      </div>
    </div>
  );
}

export default Cart;
