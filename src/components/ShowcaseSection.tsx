
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, X } from 'lucide-react';

const ShowcaseSection = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const showcaseItems = [
    {
      type: 'video',
      title: 'Golden Gate Bridge Monitoring',
      thumbnail: '🌉',
      description: 'See how our sensors monitor one of the world\'s most iconic bridges'
    },
    {
      type: 'image',
      title: 'Offshore Platform Installation',
      thumbnail: '⚓',
      description: 'Underwater sensor deployment in harsh marine environments'
    },
    {
      type: 'video',
      title: 'AI Predictive Analytics Demo',
      thumbnail: '🧠',
      description: 'Watch our AI algorithms predict maintenance needs in real-time'
    },
    {
      type: 'image',
      title: 'Dam Safety Monitoring',
      thumbnail: '🏔️',
      description: 'Critical infrastructure protection through advanced monitoring'
    }
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight">
            See Our Work in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            Real projects, real results - explore our case studies and technology demos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {showcaseItems.map((item, index) => (
            <Card 
              key={index} 
              className="glass-morphism hover-float spotlight-effect cursor-pointer"
              onClick={() => setSelectedMedia(item.title)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-purple/20 rounded-t-2xl flex items-center justify-center">
                  <div className="text-6xl">{item.thumbnail}</div>
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-sf-pro font-bold mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Media Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="glass-morphism rounded-3xl p-8 max-w-4xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-sf-pro font-bold">{selectedMedia}</h3>
                <Button variant="ghost" onClick={() => setSelectedMedia(null)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <div className="aspect-video bg-black rounded-2xl flex items-center justify-center">
                <p className="text-white">Media content would play here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowcaseSection;
