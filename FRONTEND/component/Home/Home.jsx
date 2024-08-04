import Navbar from "../Navbar";
import Hero from "./Hero";
import FeaturesSection from "./Features";
import Aboutus from "./Aboutus";
import FAQ from "./FAQ";
import Example from "./Example";
import Footer from "../Footer";

const Home = () => {
  return (
    <>
      <Navbar whatToDisplay={"Get Started"} />
      <Hero />
      <FeaturesSection />
      <Aboutus />
      <FAQ />
      <Example />
      <Footer />
    </>
  );
};

export default Home;
