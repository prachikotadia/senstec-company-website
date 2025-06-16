
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, Building, Waves, Construction, Factory, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SolutionBuilder = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: '',
    infrastructure: '',
    challenges: '',
    budget: '',
    timeline: '',
    contactInfo: {
      name: '',
      email: '',
      company: '',
      phone: ''
    }
  });

  const { toast } = useToast();

  const industries = [
    { value: 'bridge', label: 'Bridge Infrastructure', icon: Construction },
    { value: 'marine', label: 'Marine Structures', icon: Waves },
    { value: 'building', label: 'Building & Construction', icon: Building },
    { value: 'industrial', label: 'Industrial Facilities', icon: Factory }
  ];

  const challenges = [
    'Structural Health Monitoring',
    'Predictive Maintenance',
    'Real-time Alerts',
    'Remote Monitoring',
    'Data Analytics',
    'Compliance Reporting',
    'Cost Reduction',
    'Safety Enhancement'
  ];

  const budgetRanges = [
    '$10K - $50K',
    '$50K - $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M+'
  ];

  const timelineOptions = [
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '12+ months'
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Solution Request Submitted",
      description: "Our team will contact you within 24 hours with a customized solution proposal.",
    });
    
    // Reset form
    setStep(1);
    setFormData({
      industry: '',
      infrastructure: '',
      challenges: '',
      budget: '',
      timeline: '',
      contactInfo: {
        name: '',
        email: '',
        company: '',
        phone: ''
      }
    });
  };

  const progress = (step / 4) * 100;

  return (
    <section id="solution-builder" className="py-20 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sf-pro font-bold mb-6 text-gradient">
            Build Your Custom Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get a personalized infrastructure monitoring solution tailored to your specific needs. 
            Our experts will design a comprehensive system that fits your requirements and budget.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Step {step} of 4
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {step === 1 && "Select Your Industry"}
                {step === 2 && "Define Your Challenges"}
                {step === 3 && "Project Scope"}
                {step === 4 && "Contact Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <p className="text-center text-muted-foreground">
                    Choose the industry that best describes your infrastructure monitoring needs
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {industries.map((industry) => {
                      const IconComponent = industry.icon;
                      return (
                        <Card
                          key={industry.value}
                          className={`cursor-pointer transition-all hover:shadow-lg ${
                            formData.industry === industry.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, industry: industry.value }))}
                        >
                          <CardContent className="p-6 text-center">
                            <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-semibold text-lg">{industry.label}</h3>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  <Textarea
                    placeholder="Describe your specific infrastructure type (e.g., suspension bridge, offshore platform, high-rise building)..."
                    value={formData.infrastructure}
                    onChange={(e) => setFormData(prev => ({ ...prev, infrastructure: e.target.value }))}
                    rows={3}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <p className="text-center text-muted-foreground">
                    Select the monitoring challenges you want to address
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {challenges.map((challenge) => (
                      <Badge
                        key={challenge}
                        variant={formData.challenges.includes(challenge) ? "default" : "outline"}
                        className="cursor-pointer p-3 text-center justify-center hover:bg-primary/20"
                        onClick={() => {
                          const currentChallenges = formData.challenges.split(',').filter(Boolean);
                          if (currentChallenges.includes(challenge)) {
                            setFormData(prev => ({
                              ...prev,
                              challenges: currentChallenges.filter(c => c !== challenge).join(',')
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              challenges: [...currentChallenges, challenge].join(',')
                            }));
                          }
                        }}
                      >
                        {challenge}
                      </Badge>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Describe any additional specific monitoring requirements or pain points..."
                    rows={4}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Budget Range</label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Expected Timeline</label>
                      <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Any additional project requirements, constraints, or specific features needed..."
                    rows={4}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      placeholder="Full Name *"
                      value={formData.contactInfo.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, name: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Email Address *"
                      type="email"
                      value={formData.contactInfo.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, email: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Company/Organization *"
                      value={formData.contactInfo.company}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, company: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Phone Number"
                      value={formData.contactInfo.phone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, phone: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-accent/10 rounded-lg p-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      What happens next?
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Our solution architect will review your requirements</li>
                      <li>• You'll receive a detailed proposal within 24 hours</li>
                      <li>• We'll schedule a consultation to discuss your custom solution</li>
                      <li>• Get a complete implementation roadmap and pricing</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={step === 1}
                >
                  Previous
                </Button>
                {step < 4 ? (
                  <Button
                    onClick={handleNext}
                    className="gradient-purple"
                    disabled={
                      (step === 1 && !formData.industry) ||
                      (step === 4 && (!formData.contactInfo.name || !formData.contactInfo.email))
                    }
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="gradient-purple"
                    disabled={!formData.contactInfo.name || !formData.contactInfo.email}
                  >
                    Submit Request
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SolutionBuilder;
