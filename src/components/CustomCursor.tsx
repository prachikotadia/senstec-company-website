
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailId++ }];
        return newTrail.slice(-12); // Keep last 12 points for more visible trail
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, .spotlight-effect, .hover-float, input, textarea, select, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, .spotlight-effect, .hover-float, input, textarea, select, [role="button"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Enhanced Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            width: 6,
            height: 6,
            background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))`,
            opacity: (index + 1) / trail.length * 0.7,
            transform: `scale(${(index + 1) / trail.length})`,
            transition: 'opacity 0.2s ease, transform 0.2s ease'
          }}
        />
      ))}

      {/* Main cursor */}
      <div 
        className={`fixed pointer-events-none z-[9999] rounded-full transition-all duration-150 ${
          isClicking ? 'scale-75' : isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 12,
          top: position.y - 12,
          width: 24,
          height: 24,
          background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))`,
          mixBlendMode: 'difference',
          boxShadow: isHovering ? '0 0 30px hsl(var(--purple-primary))' : '0 0 15px hsl(var(--purple-primary))',
          border: isClicking ? '2px solid hsl(var(--purple-light))' : 'none'
        }}
      />

      {/* Enhanced Spotlight effect */}
      <div
        className="fixed pointer-events-none z-[9997] rounded-full transition-all duration-300"
        style={{
          left: position.x - 150,
          top: position.y - 150,
          width: 300,
          height: 300,
          background: `radial-gradient(circle, hsl(var(--purple-primary)) 0%, transparent 70%)`,
          opacity: isHovering ? 0.15 : 0.05,
          transform: isClicking ? 'scale(1.2)' : 'scale(1)'
        }}
      />

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9996] rounded-full animate-ping"
          style={{
            left: position.x - 20,
            top: position.y - 20,
            width: 40,
            height: 40,
            background: `hsl(var(--purple-primary))`,
            opacity: 0.3
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
