
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Products",
      links: ["Structural Monitoring", "AI Analytics", "Sensor Networks", "Data Platform"]
    },
    {
      title: "Solutions", 
      links: ["Bridge Infrastructure", "Marine Systems", "Smart Buildings", "Industrial IoT"]
    },
    {
      title: "Developers",
      links: ["API Documentation", "SDKs", "Integration Guides", "Developer Portal"]
    },
    {
      title: "Resources",
      links: ["Case Studies", "White Papers", "Blog", "Support Center"]
    }
  ];

  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-sf-pro font-semibold text-xl text-white">Senstec</span>
            </div>
            <p className="text-white/60 font-inter leading-relaxed mb-8 max-w-sm">
              Pioneering the future of infrastructure monitoring with intelligent sensor networks and AI-powered analytics.
            </p>
            <div className="flex space-x-4">
              {['📧', '💼', '🐦', '📱'].map((icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 glass-morphism rounded-full flex items-center justify-center hover:bg-purple-primary/20 transition-all duration-300"
                >
                  <span className="text-white/80">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-sf-pro font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-white/60 hover:text-white transition-colors duration-300 font-inter text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/40 font-inter text-sm mb-4 md:mb-0">
              © {currentYear} Senstec Ltd. All rights reserved.
            </div>
            <div className="flex space-x-8 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-white/40 hover:text-white/60 transition-colors duration-300 font-inter"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
