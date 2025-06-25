import { assets as frontAsset } from "../../assets/frontend_assets/assets";

function Hero() {
  return (
    <div className="flex flex-col border border-gray-500 sm:flex-row">
      {/* Hero left side */}
      <div className="w-ful flex items-center justify-center py-10 sm:w-1/2 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="h-[2px] w-8 bg-[#414141] md:w-11"></p>
            <p className="text-sm font-medium md:text-base">OUR BESRSELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl leading-relaxed sm:py-3 lg:text-5xl">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold md:text-base">SHOP NOW</p>
            <p className="h-[2px] w-8 bg-[#414141] md:w-11"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img className="w-full sm:w-1/2" src={frontAsset.hero_img} alt="" />
    </div>
  );
}

export default Hero;
