
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const SolutionWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    structureType: '',
    services: [] as string[],
    timeline: '',
    budget: ''
  });

  const steps = [
    {
      title: 'Structure Type',
      question: 'What type of infrastructure needs monitoring?',
      options: [
        { id: 'bridge', label: 'Bridge', icon: '🌉', description: 'Highways, railways, pedestrian bridges' },
        { id: 'marine', label: 'Marine Structure', icon: '🛳️', description: 'Ports, offshore platforms, seawalls' },
        { id: 'dam', label: 'Dam', icon: '🌊', description: 'Hydroelectric, flood control, irrigation' },
        { id: 'building', label: 'Building', icon: '🏢', description: 'High-rise, industrial, commercial' }
      ]
    },
    {
      title: 'Services Needed',
      question: 'Which services are you interested in?',
      options: [
        { id: 'monitoring', label: 'Real-time Monitoring', icon: '📊', description: 'Continuous sensor data collection' },
        { id: 'ai', label: 'AI Predictive Maintenance', icon: '🤖', description: 'Machine learning insights' },
        { id: 'consulting', label: 'Materials Consultancy', icon: '🔬', description: 'Expert engineering advice' },
        { id: 'installation', label: 'Sensor Installation', icon: '🛠️', description: 'Professional deployment' }
      ]
    },
    {
      title: 'Timeline',
      question: 'What is your project timeline?',
      options: [
        { id: 'urgent', label: 'Urgent (< 1 month)', icon: '⚡', description: 'Emergency or critical needs' },
        { id: 'normal', label: 'Normal (1-3 months)', icon: '📅', description: 'Standard project timeline' },
        { id: 'planned', label: 'Planned (3-6 months)', icon: '🗓️', description: 'Strategic implementation' },
        { id: 'future', label: 'Future (6+ months)', icon: '🔮', description: 'Long-term planning' }
      ]
    }
  ];

  const handleOptionSelect = (optionId: string) => {
    if (currentStep === 1) {
      // Multiple selection for services
      setSelections(prev => ({
        ...prev,
        services: prev.services.includes(optionId)
          ? prev.services.filter(id => id !== optionId)
          : [...prev.services, optionId]
      }));
    } else {
      // Single selection for other steps
      const key = currentStep === 0 ? 'structureType' : 'timeline';
      setSelections(prev => ({ ...prev, [key]: optionId }));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Create email with selections
    const subject = 'Solution Wizard - Project Inquiry';
    const body = `Structure Type: ${selections.structureType}%0D%0A` +
                `Services: ${selections.services.join(', ')}%0D%0A` +
                `Timeline: ${selections.timeline}%0D%0A`;
    
    const mailtoLink = `mailto:contact@senstec.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const canProceed = () => {
    if (currentStep === 0) return selections.structureType;
    if (currentStep === 1) return selections.services.length > 0;
    if (currentStep === 2) return selections.timeline;
    return false;
  };

  return (
    <section className="py-32 bg-secondary relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight">
            Build Your <span className="text-gradient">Solution</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            Let us help you find the perfect monitoring solution for your infrastructure
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 ${
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    index < currentStep
                      ? 'bg-primary border-primary text-white'
                      : index === currentStep
                      ? 'border-primary text-primary'
                      : 'border-muted-foreground'
                  }`}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className="font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-purple h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="glass-morphism rounded-3xl p-8 mb-8">
          <h3 className="text-2xl font-sf-pro font-bold text-foreground mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            {steps[currentStep].question}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps[currentStep].options.map((option) => {
              const isSelected = currentStep === 1
                ? selections.services.includes(option.id)
                : (currentStep === 0 ? selections.structureType : selections.timeline) === option.id;

              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover-float ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{option.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-sf-pro font-semibold text-foreground mb-1">
                        {option.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className="px-8"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gradient-purple px-8"
          >
            {currentStep === steps.length - 1 ? 'Get Quote' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionWizard;
