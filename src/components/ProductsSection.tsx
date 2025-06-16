
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProductsSection = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 'sensornet-pro',
      title: 'SensorNet Pro',
      description: 'Advanced wireless sensor networks for real-time structural monitoring',
      features: ['Real-time data', 'Wireless connectivity', 'Weather resistant'],
      image: '🔬'
    
    },
    {
      id: 'ai-predictive-suite',
      title: 'AI Predictive Suite',
      description: 'Machine learning algorithms for predictive maintenance and failure detection',
      features: ['AI-powered insights', 'Predictive analytics', 'Custom alerts'],
      image: '🧠'
    
    },
    {
      id: 'bridge-monitor-x1',
      title: 'Bridge Monitor X1',
      description: 'Specialized monitoring system for bridge infrastructure',
      features: ['Vibration analysis', 'Load monitoring', 'Traffic integration'],
      image: '🌉'
    
    },
    {
      id: 'marine-sensor-array',
      title: 'Marine Sensor Array',
      description: 'Waterproof sensors for marine and offshore structures',
      features: ['Corrosion resistant', 'Deep water rated', 'Satellite connectivity'],
      image: '🌊'
    }
  ];

  const handleLearnMore = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="products" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-purple rounded-full blur-3xl orb-animation"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight">
            Our <span className="text-gradient">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            Cutting-edge sensor technologies and AI-powered analytics for infrastructure monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div 
              key={index}
              className="glass-morphism rounded-3xl p-8 hover-float card-3d spotlight-effect"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-6xl mb-6">{product.image}</div>
              
              <h3 className="text-2xl font-sf-pro font-bold mb-4 text-foreground">
                {product.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>

              <ul className="space-y-2 mb-6">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gradient">{}</span>
                <Button 
                  className="gradient-purple hover-float"
                  onClick={() => handleLearnMore(product.id)}
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
