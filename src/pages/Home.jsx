import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import ServicePage from "../components/home/Service";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <>
      <div className="m-auto">
        <HeroSection />
        <ServicePage />
        <CategorySection />
        <Footer />
      </div>
    </>
  );
};

export default Home;