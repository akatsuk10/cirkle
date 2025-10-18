import Header from "./landing/Header";
import MainContent from "./landing/MainContent";
import TrustedBy from "./landing/TrustedBy";
import Features from "./landing/Features";
import PopularMarkets from "./landing/PopularMarkets";
import FAQ from "./landing/FAQ";
import BrandSection from "./landing/BrandSection";
import Footer from "./landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MainContent />
      <TrustedBy />
      <PopularMarkets />
      <FAQ />
      <BrandSection />
      <Footer />
    </div>
  );
}
