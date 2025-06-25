import Title from "../components/Title";
import ContactDetails from "../components/contactComponents/ContactDetails";
import NewsLetterBox from "../components/homeComponents/NewsLetterBox";

function Contact() {
  return (
    <div>
      <div className="border-t pt-10 text-center text-2xl">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <ContactDetails />
      <NewsLetterBox />
    </div>
  );
}

export default Contact;
