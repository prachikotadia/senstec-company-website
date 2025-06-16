
import React, { useEffect, useState } from 'react';

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => setStage(3), 2500);
    const timer4 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Welcome Text */}
      <div className={`relative z-10 mb-12 transition-all duration-1000 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-sf-pro font-light text-purple-300 tracking-[0.3em] text-center">
          WELCOME
        </h1>
      </div>

      {/* Logo Container */}
      <div className={`relative z-10 mb-12 transition-all duration-1000 ${stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <div className="relative">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-600 animate-spin opacity-30 blur-sm"></div>
          
          {/* Logo Background Circle */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center shadow-2xl">
            {/* S Logo Design */}
            <div className="relative">
              {/* Main S Shape */}
              <svg 
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white"
                viewBox="0 0 100 100" 
                fill="none"
              >
                {/* Left Curve */}
                <path
                  d="M25 30 Q35 15 50 25 Q65 35 55 50 Q45 65 30 55 Q15 45 25 30"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className={`transition-all duration-1000 ${stage >= 2 ? 'stroke-dasharray-0' : 'stroke-dasharray-100'}`}
                />
                {/* Right Curve */}
                <path
                  d="M75 70 Q65 85 50 75 Q35 65 45 50 Q55 35 70 45 Q85 55 75 70"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className={`transition-all duration-1000 ${stage >= 2 ? 'stroke-dasharray-0' : 'stroke-dasharray-100'}`}
                  style={{animationDelay: '0.3s'}}
                />
                {/* Connection Dots */}
                <circle cx="25" cy="30" r="2" fill="currentColor" className={`transition-opacity duration-500 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`} />
                <circle cx="75" cy="70" r="2" fill="currentColor" className={`transition-opacity duration-500 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`} />
              </svg>
              
              {/* Sensor Pulse Animation */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full transition-all duration-1000 ${stage >= 3 ? 'animate-ping' : 'opacity-0'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Name */}
      <div className={`relative z-10 transition-all duration-1000 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sf-pro font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-100 to-indigo-300 text-center tracking-wider">
          SENSTEC LTD
        </h2>
        <div className="mt-4 h-0.5 w-32 md:w-40 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"></div>
      </div>

      {/* Loading Animation */}
      <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default CinematicIntro;
