import { useContext } from "react";
import Title from "../Title";
import { PlaceOrderContext } from "../../context/PlaceOrderContext";

function DeilverInformation() {
  const { formData, onChangeHandler } = useContext(PlaceOrderContext);
  return (
    <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
      <div className="my-3 text-xl sm:text-2xl">
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />
      </div>

      {/* First & Last name */}
      <div className="flex gap-3">
        <input
          required
          onChange={onChangeHandler}
          name="firstName"
          value={formData.firstName}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          type="text"
          placeholder="First name"
        />
        <input
          required
          onChange={onChangeHandler}
          name="lastName"
          value={formData.lastName}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          type="text"
          placeholder="Last name"
        />
      </div>

      {/* Email Address */}
      <input
        required
        onChange={onChangeHandler}
        name="email"
        value={formData.email}
        className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        type="email"
        placeholder="Email address"
      />

      {/* Address - Street */}
      <input
        required
        onChange={onChangeHandler}
        name="street"
        value={formData.street}
        className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        type="text"
        placeholder="Street"
      />

      {/* Adress - City & State */}
      <div className="flex gap-3">
        <input
          required
          onChange={onChangeHandler}
          name="city"
          value={formData.city}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          type="text"
          placeholder="City"
        />
        <input
          onChange={onChangeHandler}
          name="state"
          value={formData.state}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          type="text"
          placeholder="State"
        />
      </div>

      {/* Zipcode & Country */}
      <div className="flex gap-3">
        <input
          required
          onChange={onChangeHandler}
          name="zipcode"
          value={formData.zipcode}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          type="number"
          placeholder="Zipcode"
        />
        <input
          required
          onChange={onChangeHandler}
          name="country"
          value={formData.country}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          type="text"
          placeholder="Country"
        />
      </div>

      {/* Phone Number */}
      <input
        required
        onChange={onChangeHandler}
        name="phone"
        value={formData.phone}
        className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        type="number"
        placeholder="Phone"
      />
    </div>
  );
}

export default DeilverInformation;
