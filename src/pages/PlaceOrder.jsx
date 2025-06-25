import { useContext } from "react";
import DeilverInformation from "../components/placeorderComponents/DeilverInformation";
import PlaceOrderDetails from "../components/placeorderComponents/PlaceOrderDetails";
import { PlaceOrderContext } from "../context/PlaceOrderContext";

function PlaceOrder() {
  const { onSubmitHandler } = useContext(PlaceOrderContext);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-14"
    >
      {/* --------------------- LEFT SIDE - Delivery Information -------------------- */}
      <DeilverInformation />
      {/* --------------------- RIGHT SIDE - Cart Details -------------------- */}
      <PlaceOrderDetails />
    </form>
  );
}

export default PlaceOrder;
