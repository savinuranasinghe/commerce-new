import CartTotal from "../cartComponents/CartTotal";
import Title from "../Title";
import PaymentSelection from "./PaymentSelection";
import PlaceOrderButton from "./PlaceOrderButton";

function PlaceOrderDetails() {
  return (
    <div className="mt-8">
      <div className="mt-8 min-w-80">
        <CartTotal />
      </div>
      <div className="mt-12">
        <div className="text-2xl">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
        </div>
        {/* PAYMENT METHOD SELECTION */}
        <PaymentSelection />
        <PlaceOrderButton />
      </div>
    </div>
  );
}

export default PlaceOrderDetails;
