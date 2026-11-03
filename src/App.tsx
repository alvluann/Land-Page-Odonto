import type { CSSProperties } from "react";
import { AboutSection } from "./components/AboutSection";
import { DifferentialsSection } from "./components/DifferentialsSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { TrustSection } from "./components/TrustSection";
import { assetUrl } from "./lib/assetUrl";

type AppShellStyle = CSSProperties & {
  "--background-organic-url": string;
  "--logo-cro-url": string;
};

function App() {
  const appShellStyle: AppShellStyle = {
    "--background-organic-url": `url("${assetUrl("assets/background-organic.svg")}")`,
    "--logo-cro-url": `url("${assetUrl("assets/logo-cro.jpeg")}")`,
  };

  return (
    <div className="app-shell" style={appShellStyle}>
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
