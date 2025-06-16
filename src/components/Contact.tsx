
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const { addContactMessage } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    'Sales Inquiry',
    'Technical Support',
    'Partnership',
    'General Question',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    addContactMessage(formData);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after showing success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-morphism rounded-3xl p-12 fade-in">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-sf-pro font-bold text-foreground mb-4">
              Message Sent Successfully!
            </h3>
            <p className="text-muted-foreground">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            Ready to transform your infrastructure monitoring? Let's discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-morphism rounded-3xl p-8">
              <h3 className="text-2xl font-sf-pro font-bold text-foreground mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">j.i.ahuirtorres@senstec.net</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      Solihull, England<br />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-morphism rounded-3xl p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-morphism rounded-3xl p-8">
            <h3 className="text-2xl font-sf-pro font-bold text-foreground mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Inquiry Type *</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-2 border border-input bg-background rounded-md"
                    required
                  >
                    <option value="">Select type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your project or question..."
                  rows={5}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-purple hover-float"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
