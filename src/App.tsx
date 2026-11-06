import { lazy, Suspense, useRef } from "react";
import type { CSSProperties } from "react";
import { AboutSection } from "./components/AboutSection";
import { DifferentialsSection } from "./components/DifferentialsSection";
import { ExperienceFilmSection } from "./components/ExperienceFilmSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { TrustSection } from "./components/TrustSection";
import { useCinematicMotion } from "./hooks/useCinematicMotion";
import { usePointerInteractions } from "./hooks/usePointerInteractions";
import { assetUrl } from "./lib/assetUrl";

type AppShellStyle = CSSProperties & {
  "--background-organic-url": string;
  "--logo-cro-url": string;
};

const ConfirmationPage = lazy(() =>
  import("./components/ConfirmationPage").then((module) => ({
    default: module.ConfirmationPage,
  })),
);

function LandingPage() {
  const appRef = useRef<HTMLDivElement>(null);
  useCinematicMotion(appRef);
  usePointerInteractions(appRef);

  const appShellStyle: AppShellStyle = {
    "--background-organic-url": `url("${assetUrl("assets/background-organic.svg")}")`,
    "--logo-cro-url": `url("${assetUrl("assets/logo-cro.jpeg")}")`,
  };

  return (
    <div ref={appRef} className="app-shell" style={appShellStyle}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DifferentialsSection />
        <ExperienceFilmSection />
        <TrustSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

  if (currentPath === "/confirmacao") {
    return (
      <Suspense fallback={<div className="confirmation-loading" aria-label="Carregando confirmação" />}>
        <ConfirmationPage />
      </Suspense>
    );
  }

  return <LandingPage />;
}

export default App;
