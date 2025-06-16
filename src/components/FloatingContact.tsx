
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactOptions = [
    { icon: "📞", label: "Call", action: () => window.open('tel:+442071234567') },
    { icon: "✉️", label: "Email", action: () => window.open('mailto:info@senstec.com') },
    { icon: "💬", label: "Chat", action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Options */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3">
          {contactOptions.map((option, index) => (
            <Button
              key={option.label}
              onClick={option.action}
              className="glass-morphism hover:bg-purple-primary/20 text-foreground w-32 justify-start transition-all duration-300 rounded-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </Button>
          ))}
        </div>
      )}

      {/* Main Contact Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-gradient-purple hover:opacity-90 hover:scale-110 transition-all duration-300 shadow-2xl glow-purple"
      >
        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
          {isExpanded ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </div>
      </Button>
    </div>
  );
};

export default FloatingContact;
