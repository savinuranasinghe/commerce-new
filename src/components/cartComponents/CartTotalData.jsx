/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

function CartTotalData({
  title,
  getCartAmount = null,
  deliverFee = null,
  total = false,
}) {
  const { currency } = useContext(ShopContext);

  return total ? (
    <div className="flex justify-between">
      <b>{title}</b>
      <b>
        {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + deliverFee}.00
      </b>
    </div>
  ) : (
    <div className="flex justify-between">
      <p>{title}</p>
      <p>
        {currency} {deliverFee ? deliverFee : getCartAmount()}.00
      </p>
    </div>
  );
}

export default CartTotalData;
