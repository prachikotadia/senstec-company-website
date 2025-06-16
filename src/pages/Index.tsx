
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ProductsSection from '@/components/ProductsSection';
import SolutionsSection from '@/components/SolutionsSection';
import DevelopersSection from '@/components/DevelopersSection';
import ResourcesSection from '@/components/ResourcesSection';
import TeamSection from '@/components/TeamSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import ChatWidget from '@/components/ChatWidget';
import CustomCursor from '@/components/CustomCursor';
import CinematicIntro from '@/components/CinematicIntro';
import LiveMonitoringDemo from '@/components/LiveMonitoringDemo';
import SolutionWizard from '@/components/SolutionWizard';
import SolutionBuilder from '@/components/SolutionBuilder';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleOpenLogin = () => {
      console.log('Opening login from hero button');
    };

    window.addEventListener('openLogin', handleOpenLogin);
    return () => window.removeEventListener('openLogin', handleOpenLogin);
  }, []);

  return (
    <div className="min-h-screen">
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <>
          <CustomCursor />
          <Navbar />
          <main className="scroll-smooth">
            <Hero />
            <About />
            <LiveMonitoringDemo />
            <ProductsSection />
            <SolutionsSection />
            <SolutionWizard />
            <SolutionBuilder />
            <DevelopersSection />
            <ResourcesSection />
            <TeamSection />
            <ShowcaseSection />
            <Services />
            <Contact />
          </main>
          <Footer />
          <FloatingContact />
          <ChatWidget />
        </>
      )}
    </div>
  );
};

export default Index;
