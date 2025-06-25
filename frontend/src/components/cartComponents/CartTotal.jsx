import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../Title";
import CartTotalData from "./CartTotalData";

function CartTotal() {
  const { deliveryFee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>
      <div className="mt-2 flex flex-col gap-2 text-sm">
        <CartTotalData title={"Subtotal"} getCartAmount={getCartAmount} />
        <hr />
        <CartTotalData title={"Shipping Fee"} deliverFee={deliveryFee} />
        <hr />
        <CartTotalData
          title={"Total"}
          deliverFee={deliveryFee}
          getCartAmount={getCartAmount}
          total={true}
        />
        <hr />
      </div>
    </div>
  );
}

export default CartTotal;
