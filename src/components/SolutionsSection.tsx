
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const SolutionsSection = () => {
  const solutions = [
    {
      title: 'Bridge Monitoring',
      description: 'Comprehensive health monitoring for bridge infrastructure',
      icon: '🌉',
      features: ['Load analysis', 'Vibration monitoring', 'Traffic integration', 'Weather correlation'],
      details: 'Our bridge monitoring solutions provide real-time structural health assessment using advanced sensor networks. We monitor critical parameters including load distribution, vibration patterns, and environmental factors.',
      caseStudy: 'Golden Gate Bridge - 99.9% uptime with early warning system'
    },
    {
      title: 'Marine Structures',
      description: 'Specialized solutions for offshore and marine environments',
      icon: '⚓',
      features: ['Corrosion tracking', 'Wave analysis', 'Underwater sensors', 'Remote monitoring'],
      details: 'Harsh marine environments require specialized monitoring solutions. Our systems are designed to withstand extreme conditions while providing accurate data.',
      caseStudy: 'North Sea Platform - 40% reduction in maintenance costs'
    },
    {
      title: 'Dam Safety',
      description: 'Critical monitoring systems for dam and reservoir safety',
      icon: '🏔️',
      features: ['Seepage detection', 'Structural integrity', 'Water level monitoring', 'Emergency alerts'],
      details: 'Dam safety requires continuous monitoring of structural integrity, water levels, and seepage patterns. Our systems provide 24/7 surveillance.',
      caseStudy: 'Hoover Dam - Enhanced safety with predictive maintenance'
    },
    {
      title: 'Smart Cities',
      description: 'Integrated monitoring for urban infrastructure',
      icon: '🏙️',
      features: ['Multi-structure monitoring', 'IoT integration', 'Data visualization', 'Predictive maintenance'],
      details: 'Smart city infrastructure requires integrated monitoring across multiple structures and systems. Our platform provides unified dashboards and analytics.',
      caseStudy: 'Singapore Smart Nation - City-wide infrastructure monitoring'
    }
  ];

  const handleMoreDetails = (solutionTitle: string) => {
    const subject = `Request for more details about ${solutionTitle}`;
    const body = `Dear Senstec Team,

I am interested in learning more about your ${solutionTitle} solution. Please provide detailed information including:

- Technical specifications
- Implementation timeline
- Pricing information
- Case studies and references
- Custom configuration options

I would also like to schedule a consultation to discuss our specific requirements.

Best regards,`;

    const mailtoLink = `mailto:sales@senstec.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="solutions" className="py-32 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight">
            Industry <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            Tailored monitoring solutions for every infrastructure challenge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="glass-morphism rounded-3xl p-8 text-center hover-float spotlight-effect fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-5xl mb-6 floating-animation" style={{ animationDelay: `${index * 0.5}s` }}>
                {solution.icon}
              </div>
              
              <h3 className="text-xl font-sf-pro font-bold mb-4 text-foreground">
                {solution.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {solution.description}
              </p>

              <ul className="space-y-2 mb-6 text-sm">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="text-muted-foreground">
                    • {feature}
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  {solution.details}
                </p>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-xs font-medium text-primary">
                    {solution.caseStudy}
                  </p>
                </div>
                <Button 
                  className="w-full gradient-purple"
                  onClick={() => handleMoreDetails(solution.title)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
