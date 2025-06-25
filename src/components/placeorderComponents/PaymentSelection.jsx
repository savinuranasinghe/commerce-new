import PaymentMethod from "./PaymentMethod";

function PaymentSelection() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      {/* STRIPE */}
      <PaymentMethod name="stripe_logo" id="stripe" />
      {/* Cash on Delivery */}
      <PaymentMethod />
    </div>
  );
}

export default PaymentSelection;
