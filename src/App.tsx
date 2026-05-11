import { AboutSection } from "./components/AboutSection";
import { DifferentialsSection } from "./components/DifferentialsSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { TrustSection } from "./components/TrustSection";

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DifferentialsSection />
        <TrustSection />
        <TestimonialsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
