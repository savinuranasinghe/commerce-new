import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

function CheckoutBtn() {
  const { navigate } = useContext(ShopContext);
  return (
    <div className="w-full text-end">
      <button
        onClick={() => navigate("/placeorder")}
        className="bg-black text-white text-sm my-8 px-8 py-3"
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
}

export default CheckoutBtn;
