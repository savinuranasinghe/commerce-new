import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartProduct from "./CartProduct";

function CartData() {
  const { cartData, products, currency } = useContext(CartContext);
  return (
    <div>
      {cartData.map((item, index) => {
        const productData = products.find(
          (product) => product._id === item._id,
        );

        return (
          <CartProduct
            key={index}
            productImage={productData.image}
            productName={productData.name}
            currency={currency}
            productPrice={productData.price}
            productSize={item.size}
            prodcutQuantity={item.quantity}
            productId={item._id}
          />
        );
      })}
    </div>
  );
}

export default CartData;
