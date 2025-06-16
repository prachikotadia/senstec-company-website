
import React from 'react';

const FloatingSensor = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-senstec-cyan/20 to-senstec-teal/20 animate-pulse-glow"></div>
      
      {/* Middle Ring */}
      <div className="absolute inset-4 rounded-full border-2 border-senstec-cyan/30 animate-spin" style={{ animationDuration: '20s' }}>
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-senstec-cyan rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-senstec-cyan rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute left-0 top-1/2 w-2 h-2 bg-senstec-cyan rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 w-2 h-2 bg-senstec-cyan rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main Sensor Body */}
      <div className="relative w-40 h-40 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl shadow-2xl floating-animation">
        {/* Top Surface */}
        <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-r from-senstec-teal to-senstec-cyan rounded-lg opacity-80">
          <div className="absolute top-1 left-1 right-1 bottom-1 bg-gradient-to-r from-white/20 to-transparent rounded-md"></div>
        </div>

        {/* Side Panels */}
        <div className="absolute top-12 left-2 w-8 h-16 bg-slate-600 rounded-md shadow-inner">
          <div className="w-full h-2 bg-senstec-cyan/60 rounded-t-md"></div>
          <div className="w-full h-2 bg-red-400/60 mt-1"></div>
          <div className="w-full h-2 bg-green-400/60 mt-1"></div>
        </div>

        <div className="absolute top-12 right-2 w-8 h-16 bg-slate-600 rounded-md shadow-inner">
          <div className="w-full h-2 bg-blue-400/60 rounded-t-md"></div>
          <div className="w-full h-2 bg-yellow-400/60 mt-1"></div>
          <div className="w-full h-2 bg-purple-400/60 mt-1"></div>
        </div>

        {/* Central Display */}
        <div className="absolute top-12 left-12 right-12 bottom-12 bg-black rounded-lg border border-senstec-cyan/30">
          <div className="w-full h-full bg-gradient-to-br from-senstec-cyan/10 to-transparent rounded-lg flex items-center justify-center">
            <div className="text-senstec-cyan text-xs font-mono animate-pulse">
              <div>SYS OK</div>
              <div className="text-center mt-1">●●●</div>
            </div>
          </div>
        </div>

        {/* Bottom Connectors */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-slate-800 rounded-full flex space-x-1 items-center justify-center">
          <div className="w-2 h-2 bg-senstec-cyan rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-senstec-cyan rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-2 h-2 bg-senstec-cyan rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* Antenna */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-slate-600 rounded-full">
          <div className="absolute top-0 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 animate-pulse"></div>
        </div>
      </div>

      {/* Data Streams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-16 h-0.5 bg-gradient-to-r from-senstec-cyan to-transparent opacity-60 animate-pulse"></div>
        <div className="absolute top-24 right-8 w-20 h-0.5 bg-gradient-to-l from-senstec-cyan to-transparent opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-16 left-12 w-12 h-0.5 bg-gradient-to-r from-senstec-cyan to-transparent opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default FloatingSensor;
