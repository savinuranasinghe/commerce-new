import { assets as frontAssets } from "../../assets/frontend_assets/assets";

function ContactDetails() {
  return (
    <div className="my-10 mb-28 flex flex-col justify-center gap-10 md:flex-row">
      <img
        className="w-full md:max-w-[480px]"
        src={frontAssets.contact_img}
        alt=""
      />
      <div className="flex flex-col items-start justify-center gap-6">
        <p className="text-xl font-semibold text-gray-600">Our Store</p>
        <p className="text-gray-500">
          123 flower road, <br /> colombo 07
        </p>
        <p className="text-gray-500">
          Tel: 1234567890 <br />
          Email: sohrelinfo@gmail.com
        </p>
      </div>
    </div>
  );
}

export default ContactDetails;
