/* eslint-disable react/prop-types */
import { useContext } from "react";
import { assets as frontAssets } from "../../assets/frontend_assets/assets";
import { PlaceOrderContext } from "../../context/PlaceOrderContext";

function PaymentMethod({ name = "cod", id = "cod" }) {
  const { setMethod, method } = useContext(PlaceOrderContext);

  return (
    <div className="flex cursor-pointer items-center gap-3 border p-2 px-3">
      {name !== "cod" && id !== "cod" ? (
        <>
          <p
            onClick={() => {
              setMethod(id);
            }}
            className={`h-3.5 min-w-3.5 rounded-full border border-gray-500 ${method === id ? "bg-green-400" : ""}`}
          ></p>
          <img className="mx-4 h-5" src={frontAssets[name]} alt="" />
        </>
      ) : (
        <>
          <p
            onClick={() => {
              setMethod(id);
            }}
            className={`h-3.5 min-w-3.5 rounded-full border border-gray-500 ${method === id ? "bg-green-400" : ""}`}
          ></p>
          <p className="mx-4 text-sm font-medium text-gray-500">
            CASH ON DELIVERY
          </p>
        </>
      )}
    </div>
  );
}

export default PaymentMethod;
