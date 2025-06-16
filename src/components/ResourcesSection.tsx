
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import ResourcePreview from './ResourcePreview';

const ResourcesSection = () => {
  const [previewResource, setPreviewResource] = useState<any>(null);

  const resources = [
    {
      type: 'Whitepaper',
      title: 'The Future of Infrastructure Monitoring',
      description: 'Comprehensive analysis of emerging trends in sensor technology',
      downloadCount: '2.3k downloads',
      icon: '📄',
      content: 'This whitepaper explores the future of infrastructure monitoring, covering emerging sensor technologies, AI-powered analytics, and predictive maintenance strategies. It includes case studies from major infrastructure projects worldwide.',
      image: '📊'
    },
    {
      type: 'Case Study',
      title: 'Golden Gate Bridge Monitoring Project',
      description: 'How we implemented real-time monitoring on a historic landmark',
      downloadCount: '1.8k downloads',
      icon: '📊',
      content: 'Detailed case study of the Golden Gate Bridge monitoring implementation, including challenges faced, solutions deployed, and results achieved. The project resulted in 99.9% uptime monitoring.',
      image: '🌉'
    },
    {
      type: 'Technical Guide',
      title: 'AI-Powered Predictive Maintenance',
      description: 'Implementation guide for machine learning in infrastructure',
      downloadCount: '3.1k downloads',
      icon: '🔧',
      content: 'Step-by-step guide for implementing AI-powered predictive maintenance systems. Covers data collection, model training, and deployment strategies.',
      image: '🧠'
    },
    {
      type: 'Blog Post',
      title: 'Marine Structure Challenges',
      description: 'Overcoming corrosion and environmental factors in offshore monitoring',
      downloadCount: '950 views',
      icon: '📝',
      content: 'In-depth analysis of the unique challenges faced in marine structure monitoring, including corrosion resistance, extreme weather conditions, and remote connectivity.',
      image: '⚓'
    }
  ];

  const handlePreview = (resource: any) => {
    setPreviewResource(resource);
  };

  const handleDownload = (resource: any) => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${resource.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    link.click();
  };

  return (
    <section id="resources" className="py-32 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight">
            <span className="text-gradient">Resources</span> & Insights
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            Technical documentation, case studies, and industry insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="glass-morphism rounded-3xl p-8 hover-float spotlight-effect"
            >
              <div className="flex items-start space-x-6">
                <div className="text-4xl">{resource.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm px-3 py-1 bg-primary/20 text-primary rounded-full">
                      {resource.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {resource.downloadCount}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-sf-pro font-bold mb-3 text-foreground">
                    {resource.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {resource.description}
                  </p>

                  <div className="flex space-x-3">
                    <Button 
                      className="gradient-purple"
                      onClick={() => handleDownload(resource)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handlePreview(resource)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {previewResource && (
          <ResourcePreview
            resource={previewResource}
            onClose={() => setPreviewResource(null)}
            onDownload={() => handleDownload(previewResource)}
          />
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
