
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const MobileMenu = ({ isOpen, onClose, onLoginClick }: MobileMenuProps) => {
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
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 blur-bg" onClick={onClose} />
      
      <div className="fixed right-0 top-0 h-full w-80 glass-morphism slide-in">
        <div className="flex justify-between items-center p-6 border-b border-border/20">
          <span className="font-sf-pro font-semibold text-xl text-foreground">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-6 space-y-4">
            <Button
              onClick={() => {
                onLoginClick();
                onClose();
              }}
              variant="outline"
              className="w-full"
            >
              Login
            </Button>
            
            <Button className="w-full gradient-purple">
              Get Started
            </Button>

            <div className="flex justify-center pt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
