
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Shield, Zap, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);

  const scrollToSolutionBuilder = () => {
    const solutionBuilder = document.querySelector('#solution-builder');
    if (solutionBuilder) {
      solutionBuilder.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => {
    scrollToSolutionBuilder();
  };

  const handleWatchDemo = () => {
    const demoSection = document.querySelector('#live-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 pt-20 sm:pt-24"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-accent/20 rounded-full filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sf-pro font-bold mb-6 sm:mb-8 leading-tight">
            <span className="block text-foreground">AI-Powered</span>
            <span className="block text-gradient bg-gradient-purple bg-clip-text text-transparent">
              Infrastructure Monitoring
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            Advanced sensor networks and predictive analytics for bridges, dams, and marine structures. 
            Prevent failures before they happen with real-time monitoring and AI-driven insights.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 p-3 sm:p-4 glass-morphism rounded-xl">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 sm:p-4 glass-morphism rounded-xl">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium">Real-Time Alerts</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 sm:p-4 glass-morphism rounded-xl">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium">Global Coverage</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto gradient-purple hover-float spotlight-effect text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              onClick={handleGetStarted}
            >
              Get Started Today
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto hover-float spotlight-effect text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              onClick={handleWatchDemo}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              Trusted by leading infrastructure companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
              <div className="text-lg sm:text-xl font-bold text-muted-foreground">DOT</div>
              <div className="text-lg sm:text-xl font-bold text-muted-foreground">FHWA</div>
              <div className="text-lg sm:text-xl font-bold text-muted-foreground">ASCE</div>
              <div className="text-lg sm:text-xl font-bold text-muted-foreground">IEEE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
