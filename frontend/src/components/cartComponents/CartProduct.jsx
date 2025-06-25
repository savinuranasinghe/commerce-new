import { useContext } from "react";
import { assets as frontAssets } from "../../assets/frontend_assets/assets";
import { ShopContext } from "../../context/ShopContext";

/* eslint-disable react/prop-types */
function CartProduct({
  productImage,
  productName,
  currency,
  productPrice,
  productSize,
  prodcutQuantity,
  productId,
}) {
  const { updateQuantity } = useContext(ShopContext);

  return (
    <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
      <div className="flex items-start gap-6">
        <img className="w-16 sm:w-20" src={productImage[0]} alt="" />
        <div>
          <p className="text-xs sm:text-lg font-medium">{productName}</p>
          <div className="flex items-center gap-5 mt-2">
            <p>
              {currency}
              {productPrice}
            </p>
            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
              {productSize}
            </p>
          </div>
        </div>
      </div>
      <input
        onChange={(e) =>
          e.target.value === "" || e.target.value === "0"
            ? null
            : updateQuantity(productId, productSize, +e.target.value)
        }
        className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
        type="number"
        min={1}
        defaultValue={prodcutQuantity}
      />
      <img
        onClick={() => updateQuantity(productId, productSize, 0)}
        className="w-4 mr-4 sm:w-5 cursor-pointer"
        src={frontAssets.bin_icon}
        alt=""
      />
    </div>
  );
}

export default CartProduct;
