
import React from 'react';

const About = () => {
  const features = [
    {
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms process sensor data in real-time',
      icon: '🧠'
    },
    {
      title: 'Global Infrastructure',
      description: 'Monitoring critical structures across bridges, dams, and marine systems',
      icon: '🌍'
    },
    {
      title: 'Predictive Maintenance',
      description: 'Prevent failures before they happen with intelligent forecasting',
      icon: '⚡'
    },
    {
      title: 'Real-time Insights',
      description: 'Instant notifications and comprehensive data visualization',
      icon: '📊'
    }
  ];

  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-purple rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-purple rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight">
            Building the Future of
            <span className="text-gradient block">Infrastructure Safety</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            We transform raw sensor data into actionable insights that protect critical infrastructure and save lives worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-morphism rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-sf-pro font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-inter leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="glass-morphism rounded-3xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-sf-pro font-bold text-gradient mb-4">10+</div>
              <div className="text-lg text-muted-foreground font-inter">Years of Excellence</div>
            </div>
            <div>
              <div className="text-5xl font-sf-pro font-bold text-gradient mb-4">3</div>
              <div className="text-lg text-muted-foreground font-inter">Continents Served</div>
            </div>
            <div>
              <div className="text-5xl font-sf-pro font-bold text-gradient mb-4">1M+</div>
              <div className="text-lg text-muted-foreground font-inter">AI Training Points</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
