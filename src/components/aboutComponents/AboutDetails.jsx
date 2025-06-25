import { assets as frontAssets } from "../../assets/frontend_assets/assets";

function AboutDetails() {
  return (
    <div className="my-10 flex flex-col gap-16 md:flex-row">
      <img
        className="w-full md:max-w-[450px]"
        src={frontAssets.about_img}
        alt=""
      />
      <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
        <p>
        Like the seeds that blossom into the lush landscapes of Sri Lanka,
         Sohrel began with a simple idea: to create high-quality, ethically made clothing
          that honors both people and planet. We believe in slow fashion, in creating pieces 
          that are designed to last, not just for a season, but for years to come. 
          We nurture sustainable practices, from sourcing to working with local communities, 
          ensuring that every step of our process reflects our commitment to quality and responsible production. 
          Sohrel is a testament to the power of growth, a brand rooted in Sri Lankan soil and blossoming into a symbol of conscious style.
        </p>
   
        <b className="text-gray-800">Our Mission</b>
        <p>
        Our mission is to design and produce high-quality, ethically sourced clothing 
        that not only looks good but also does good. We are committed to sustainable practices,
        supporting local artisans in Sri Lanka, and providing our customers with garments they can
        feel good about wearing.

        </p>
      </div>
    </div>
  );
}

export default AboutDetails;
