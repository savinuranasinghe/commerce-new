import { useState } from "react";

function NewsLetterBox() {
  const [email, setEmail] = useState("");

  function onSubmitHandler(e) {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now and get 20% off
      </p>
      
      <form
        onSubmit={onSubmitHandler}
        className="item-center mx-auto my-6 flex w-full gap-3 border pl-3 sm:w-1/2"
      >
        <input
          className="w-full outline-none sm:flex-1"
          type="email"
          placeholder="Enter your Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-black px-10 py-4 text-xs text-white"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default NewsLetterBox;
