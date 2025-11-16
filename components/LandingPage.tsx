import Header from "./landing/Header";
import BrandSection from "./landing/BrandSection";
import TrustedBy from "./landing/TrustedBy";
import Features from "./landing/Features";
import MainContent from "./landing/MainContent";
import PopularMarkets from "./landing/PopularMarkets";
import FAQ from "./landing/FAQ";
import Footer from "./landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <MainContent />
        <TrustedBy />
        <Features />
        <PopularMarkets />
        <FAQ />
      </main>
              <BrandSection />
      <Footer />
    </div>
  );
}
