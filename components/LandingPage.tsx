import Header from "./landing/Header";
import MainContent from "./landing/MainContent";
import TrustedBy from "./landing/TrustedBy";
import Features from "./landing/Features";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MainContent />
      <TrustedBy />
      <Features />
      {/* Footer spacer */}
      <div className="h-96"></div>
    </div>
  );
}
