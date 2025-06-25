import BestSeller from "../components/homeComponents/BestSeller";
import Hero from "../components/homeComponents/Hero";
import LatesetCollection from "../components/homeComponents/LatesetCollection";
import NewsLetterBox from "../components/homeComponents/NewsLetterBox";
import OurPolcy from "../components/homeComponents/OurPolcy";

function home() {
  return (
    <div>
      <Hero />
      <LatesetCollection />
      <BestSeller />
      <OurPolcy />
      <NewsLetterBox />
    </div>
  );
}

export default home;
