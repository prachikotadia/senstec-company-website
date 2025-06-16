
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Download, ExternalLink } from 'lucide-react';

const DevelopersSection = () => {
  const navigate = useNavigate();

  const resources = [
    {
      title: 'REST API',
      description: 'Access sensor data and analytics through our comprehensive API',
      icon: '🔌',
      action: 'View Docs',
      type: 'docs',
      route: 'rest-api'
    },
    {
      title: 'SDK Downloads',
      description: 'Development kits for Python, JavaScript, and C++',
      icon: '📦',
      action: 'Download',
      type: 'download',
      route: 'sdk-downloads'
    },
    {
      title: 'Integration Guides',
      description: 'Step-by-step guides for platform integration',
      icon: '📚',
      action: 'Read More',
      type: 'guide',
      route: 'integration-guides'
    },
    {
      title: 'Code Examples',
      description: 'Sample code and implementation examples',
      icon: '💻',
      action: 'Browse',
      type: 'examples',
      route: 'code-examples'
    }
  ];

  const handleResourceClick = (resource: any) => {
    if (resource.type === 'download') {
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${resource.title.toLowerCase().replace(/\s+/g, '-')}.zip`;
      link.click();
    } else {
      navigate(`/developers/${resource.route}`);
    }
  };

  const handleExampleClick = () => {
    navigate('/developers/quick-start');
  };

  return (
    <section id="developers" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight">
            For <span className="text-gradient">Developers</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            Build powerful applications with our sensor data and analytics APIs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="glass-morphism rounded-3xl p-8 hover-float spotlight-effect"
            >
              <div className="flex items-start space-x-6">
                <div className="text-4xl">{resource.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-sf-pro font-bold mb-2 text-foreground">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="hover-float"
                    onClick={() => handleResourceClick(resource)}
                  >
                    {resource.type === 'download' && <Download className="w-4 h-4 mr-2" />}
                    {resource.type === 'examples' && <ExternalLink className="w-4 h-4 mr-2" />}
                    {resource.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Code Example */}
        <div className="glass-morphism rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-sf-pro font-bold text-foreground">
              Quick Start Example
            </h3>
            <Button 
              variant="outline"
              onClick={handleExampleClick}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Guide
            </Button>
          </div>
          
          <div className="bg-black/50 rounded-2xl p-6 font-mono text-sm overflow-x-auto mb-6">
            <pre className="text-green-400">
{`// Initialize Senstec SDK
import { SenstecAPI } from '@senstec/sdk';

const api = new SenstecAPI({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Get real-time sensor data
const sensorData = await api.sensors.getRealTimeData({
  sensorId: 'bridge-001',
  metrics: ['vibration', 'temperature', 'strain']
});

// Set up real-time monitoring
api.sensors.subscribe('bridge-001', (data) => {
  console.log('Live data:', data);
  
  // Check for anomalies
  if (data.vibration > threshold) {
    api.alerts.trigger('high-vibration', data);
  }
});

console.log(sensorData);`}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-muted/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Real-time Data</h4>
              <p className="text-muted-foreground">Stream live sensor data with sub-second latency</p>
            </div>
            <div className="bg-muted/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">AI Analytics</h4>
              <p className="text-muted-foreground">Built-in anomaly detection and predictive algorithms</p>
            </div>
            <div className="bg-muted/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Easy Integration</h4>
              <p className="text-muted-foreground">Simple APIs with comprehensive documentation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopersSection;
