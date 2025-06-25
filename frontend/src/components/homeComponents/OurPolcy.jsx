import { assets as frontAsset } from "../../assets/frontend_assets/assets";

function OurPolcy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 ">
      <div>
        <img
          src={frontAsset.exchange_icon}
          className="w-12 m-auto mb-5"
          alt=""
        />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hazzle free exchange policy</p>
      </div>

      <div>
        <img
          src={frontAsset.quality_icon}
          className="w-12 m-auto mb-5"
          alt=""
        />
        <p className="font-semibold">7 Days return policy</p>
        <p className="text-gray-400">We provide 7 days free retrun policy</p>
      </div>

      <div>
        <img src={frontAsset.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Best Cutomer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
}

export default OurPolcy;
