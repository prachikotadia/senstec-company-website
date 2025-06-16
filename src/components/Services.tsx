
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: 'Structural Health Monitoring',
      description: 'Real-time monitoring of bridges, buildings, and critical infrastructure with advanced sensor networks.',
      features: ['24/7 Monitoring', 'Wireless Sensors', 'Cloud Analytics', 'Alert Systems']
    },
    {
      title: 'AI Predictive Maintenance',
      description: 'Machine learning algorithms that predict equipment failures before they occur, saving costs and preventing downtime.',
      features: ['ML Algorithms', 'Failure Prediction', 'Cost Optimization', 'Automated Reports']
    },
    {
      title: 'Materials Consultancy',
      description: 'Expert analysis of structural materials and recommendations for optimal performance and longevity.',
      features: ['Expert Analysis', 'Material Testing', 'Performance Reports', 'Recommendations']
    },
    {
      title: 'Advanced Testing',
      description: 'Comprehensive testing services for structural integrity and performance validation.',
      features: ['Load Testing', 'Vibration Analysis', 'Stress Testing', 'Compliance Reports']
    }
  ];

  return (
    <section id="services" className="py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-gradient-purple opacity-10 rounded-full blur-3xl transform -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight text-white">
            Our
            <span className="text-gradient"> Solutions</span>
          </h2>
          <p className="text-xl text-white/70 font-inter leading-relaxed">
            Comprehensive infrastructure monitoring and analytics solutions designed for mission-critical applications.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Service List */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`glass-morphism rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeService === index ? 'border-purple-primary/50 bg-purple-primary/10' : 'hover:bg-white/5'
                }`}
                onClick={() => setActiveService(index)}
              >
                <h3 className="text-xl font-sf-pro font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/60 font-inter leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Active Service Details */}
          <div className="glass-morphism rounded-3xl p-8">
            <h3 className="text-2xl font-sf-pro font-bold text-white mb-6">
              {services[activeService].title}
            </h3>
            <p className="text-white/70 font-inter leading-relaxed mb-8">
              {services[activeService].description}
            </p>
            
            <div className="space-y-4 mb-8">
              <h4 className="text-lg font-sf-pro font-semibold text-white">Key Features:</h4>
              <div className="grid grid-cols-2 gap-4">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-purple rounded-full"></div>
                    <span className="text-white/80 font-inter text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="bg-gradient-purple hover:opacity-90 transition-all duration-300 font-sf-pro font-semibold px-8 py-3 rounded-full">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
