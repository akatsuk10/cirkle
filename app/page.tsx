import Header from "../components/Header";
import MainContent from "../components/MainContent";
import TrustedBy from "../components/TrustedBy";
import Features from "../components/Features";

export default function Home() {
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
