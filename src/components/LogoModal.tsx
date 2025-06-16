
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface LogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoModal = ({ isOpen, onClose }: LogoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center blur-bg">
      <div className="glass-morphism rounded-3xl p-12 max-w-2xl w-full mx-4 text-center fade-in">
        <div className="flex justify-end mb-6">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-purple flex items-center justify-center mx-auto mb-6 floating-animation">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 text-gradient">
            Senstec Ltd
          </h1>
        </div>

        <div className="space-y-6 text-lg text-muted-foreground">
          <p className="text-2xl font-medium text-foreground">
            "Transforming infrastructure through sensor intelligence."
          </p>
          
          <p className="text-xl">
            "Data you can trust. Insights that last."
          </p>

          <div className="pt-8">
            <p className="text-base">
              We specialize in advanced sensor technologies, AI-powered predictive maintenance, 
              and comprehensive structural monitoring solutions for critical infrastructure worldwide.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="gradient-purple" onClick={onClose}>
            Explore Our Solutions
          </Button>
          <Button variant="outline" onClick={onClose}>
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoModal;
