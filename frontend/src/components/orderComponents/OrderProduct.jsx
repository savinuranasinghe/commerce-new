/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

function OrderProduct({ index, item, loadOrderData }) {
  const { currency } = useContext(ShopContext);

  return (
    <div
      key={index}
      className="botrder-t flex flex-col gap-4 border-b py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-start gap-6 text-sm">
        <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
        <div>
          <p className="font-medium sm:text-base">{item.name}</p>
          <div className="mt-1 flex items-center gap-3 text-base text-gray-700">
            <p>
              {currency}
              {item.price}
            </p>
            <p>Quantity: {item.quantity}</p>
            <p>Size: {item.size}</p>
          </div>
          <p className="mt-1">
            Date:
            <span className="text-gray-400">
              {new Date(item.date).toDateString()}
            </span>
          </p>
          <p className="mt-1">
            Payment:
            <span className="text-gray-400">{item.paymentMethod}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between md:w-1/2">
        <div className="flex items-center gap-2">
          <p className="h-2 min-w-2 rounded-full bg-green-500"></p>
          <p className="text-sm md:text-base">{item.status}</p>
        </div>
        <button
          onClick={loadOrderData}
          className="rounded-sm border px-4 py-2 text-sm font-medium"
        >
          Track Order
        </button>
      </div>
    </div>
  );
}

export default OrderProduct;
