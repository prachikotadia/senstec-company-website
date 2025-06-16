
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LoginModal from './LoginModal';
import MobileMenu from './MobileMenu';
import LogoModal from './LogoModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Products', href: '#products' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Developers', href: '#developers' },
    { label: 'Resources', href: '#resources' },
    { label: 'Contact Sales', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-morphism border-b border-white/10 backdrop-blur-md' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => setIsLogoModalOpen(true)}
              className="flex items-center space-x-2 hover-float z-10"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-sf-pro font-semibold text-lg sm:text-xl text-foreground">
                Senstec
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium text-sm spotlight-effect whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Login
              </button>
              <ThemeToggle />
              <Button 
                className="hidden sm:inline-flex gradient-purple hover:opacity-90 transition-all duration-300 font-medium hover-float text-sm px-4 py-2"
              >
                Get Started
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <LogoModal isOpen={isLogoModalOpen} onClose={() => setIsLogoModalOpen(false)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onLoginClick={() => setIsLoginOpen(true)}
      />
    </>
  );
};

export default Navbar;
