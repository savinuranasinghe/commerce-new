import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { assets as frontAssets } from "../../assets/frontend_assets/assets";
import { ShopContext } from "../../context/ShopContext";

function ProdcutInfo() {
  const { productData, sizing, setSizing } = useContext(ProductContext);
  const { currency, addToCart } = useContext(ShopContext);

  return (
    <div className="flex-1">
      <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
      <div className="flex items-center gap-1 mt-2">
        <img className="w-3.5" src={frontAssets.star_icon} alt="" />
        <img className="w-3.5" src={frontAssets.star_icon} alt="" />
        <img className="w-3.5" src={frontAssets.star_icon} alt="" />
        <img className="w-3.5" src={frontAssets.star_icon} alt="" />
        <img className="w-3.5" src={frontAssets.star_dull_icon} alt="" />
        <p className="pl-2">(122)</p>
      </div>
      <p className="mt-5 text-3xl font-medium">
        {currency}
        {productData.price}
      </p>
      <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
      <div className="flex flex-col gap-4 my-8">
        <p>Select Size</p>
        <div className="flex gap-2">
          {productData.sizes.map((size, index) => {
            return (
              <button
                onClick={() => setSizing(size)}
                className={`border py-2 px-4 bg-gray-100 ${size === sizing ? "border-orange-500" : ""}`}
                key={index}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => addToCart(productData._id, sizing)}
        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
      >
        ADD TO CART
      </button>
      <hr className="mt-8 sm:w-4/5" />
      <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
        <p>100% Original Product.</p>
        <p>Cash on delivery is available in this product.</p>
        <p>Easy return and exhange policy within 7 days.</p>
      </div>
    </div>
  );
}

export default ProdcutInfo;
