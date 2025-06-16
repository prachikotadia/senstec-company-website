
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Play } from 'lucide-react';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const productDetails = {
    'sensornet-pro': {
      title: 'SensorNet Pro',
      description: 'Advanced wireless sensor networks for real-time structural monitoring',
      fullDescription: 'SensorNet Pro is our flagship wireless sensor network solution designed for comprehensive structural health monitoring. The system provides real-time data collection, advanced analytics, and predictive maintenance capabilities.',
      features: [
        'Real-time data collection with 1ms precision',
        'Wireless mesh networking with 10km range',
        'Weather resistant IP67 rated enclosures',
        'Battery life up to 5 years',
        'AI-powered anomaly detection',
        'Cloud-based dashboard and mobile app'
      ],
      specifications: {
        'Sensor Types': 'Accelerometer, Strain gauge, Temperature, Humidity',
        'Data Rate': 'Up to 1000 Hz per channel',
        'Wireless Range': 'Up to 10km line of sight',
        'Power': 'Solar + Battery backup',
        'Operating Temperature': '-40°C to +85°C'
      },
      images: ['🔬', '📡', '⚡'],
      videos: ['Demo Video', 'Installation Guide'],
      pdfs: ['Technical Datasheet', 'Installation Manual']
    }
  };

  const product = productDetails[productId as keyof typeof productDetails];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-sf-pro font-bold mb-6">{product.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{product.fullDescription}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {product.images.map((img, index) => (
                <div key={index} className="text-6xl text-center p-8 glass-morphism rounded-2xl">
                  {img}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Downloads & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.pdfs.map((pdf, index) => (
                  <Button key={index} variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    {pdf}
                  </Button>
                ))}
                {product.videos.map((video, index) => (
                  <Button key={index} variant="outline" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    {video}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
