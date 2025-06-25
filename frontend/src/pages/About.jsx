import Title from "../components/Title";
import AboutDetails from "../components/aboutComponents/AboutDetails";
import WhyUseDeatails from "../components/aboutComponents/WhyUseDeatails";
import NewsLetterBox from "../components/homeComponents/NewsLetterBox";

function About() {
  return (
    <div>
      <div className="border-t pt-8 text-center text-2xl">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <AboutDetails />
      <div className="py-4 text-xl">
        <Title text1={"WHY"} text2={"CHOOSE US"}></Title>
      </div>
      <WhyUseDeatails />
      <NewsLetterBox />
    </div>
  );
}

export default About;
