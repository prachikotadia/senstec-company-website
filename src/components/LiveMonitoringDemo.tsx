
import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Weight, Shield, AlertTriangle } from 'lucide-react';

const LiveMonitoringDemo = () => {
  const [data, setData] = useState({
    temperature: 33,
    load: 85,
    vibration: 2.1,
    status: 'Safe'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        temperature: Math.round((prev.temperature + (Math.random() - 0.5) * 2) * 10) / 10,
        load: Math.max(70, Math.min(95, prev.load + (Math.random() - 0.5) * 5)),
        vibration: Math.round((Math.random() * 3 + 1) * 10) / 10,
        status: Math.random() > 0.9 ? 'Warning' : 'Safe'
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-sf-pro font-bold mb-6 tracking-tight">
            <span className="text-gradient">Live</span> Infrastructure
            <br />Monitoring Demo
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            Real-time sensor data from our Golden Gate Bridge monitoring system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Temperature */}
          <div className="glass-morphism rounded-3xl p-6 hover-float spotlight-effect">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-purple flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-sf-pro font-semibold text-foreground">Temperature</h3>
                <p className="text-sm text-muted-foreground">Structural Core</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gradient mb-2">{data.temperature}°C</div>
            <div className="text-sm text-green-400">Normal Range</div>
          </div>

          {/* Load */}
          <div className="glass-morphism rounded-3xl p-6 hover-float spotlight-effect">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-purple flex items-center justify-center">
                <Weight className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-sf-pro font-semibold text-foreground">Load</h3>
                <p className="text-sm text-muted-foreground">Traffic Density</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gradient mb-2">{Math.round(data.load)}%</div>
            <div className={`text-sm ${data.load > 90 ? 'text-orange-400' : 'text-green-400'}`}>
              {data.load > 90 ? 'High Load' : 'Normal Load'}
            </div>
          </div>

          {/* Vibration */}
          <div className="glass-morphism rounded-3xl p-6 hover-float spotlight-effect">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-purple flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-sf-pro font-semibold text-foreground">Vibration</h3>
                <p className="text-sm text-muted-foreground">Frequency Hz</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gradient mb-2">{data.vibration} Hz</div>
            <div className="text-sm text-green-400">Within Limits</div>
          </div>

          {/* AI Status */}
          <div className="glass-morphism rounded-3xl p-6 hover-float spotlight-effect">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                data.status === 'Safe' ? 'bg-green-500' : 'bg-orange-500'
              }`}>
                {data.status === 'Safe' ? 
                  <Shield className="w-6 h-6 text-white" /> : 
                  <AlertTriangle className="w-6 h-6 text-white" />
                }
              </div>
              <div>
                <h3 className="font-sf-pro font-semibold text-foreground">AI Prediction</h3>
                <p className="text-sm text-muted-foreground">System Status</p>
              </div>
            </div>
            <div className={`text-2xl font-bold mb-2 ${
              data.status === 'Safe' ? 'text-green-400' : 'text-orange-400'
            }`}>
              {data.status}
            </div>
            <div className="text-sm text-muted-foreground">
              {data.status === 'Safe' ? 'All systems nominal' : 'Monitoring closely'}
            </div>
          </div>
        </div>

        {/* Live Chart Placeholder */}
        <div className="mt-16 glass-morphism rounded-3xl p-8">
          <h3 className="text-2xl font-sf-pro font-bold text-foreground mb-6">Real-Time Data Stream</h3>
          <div className="h-40 bg-gradient-to-r from-purple-primary/20 to-purple-light/20 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-purple-primary mx-auto mb-2 animate-pulse" />
              <p className="text-muted-foreground">Live sensor data visualization</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMonitoringDemo;
