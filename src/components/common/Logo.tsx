
import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", className = "" }) => {
  // Set the dimensions based on the size prop
  const dimensions = {
    small: { width: 40, height: 40 },
    medium: { width: 64, height: 64 },
    large: { width: 80, height: 80 },
  };

  const { width, height } = dimensions[size];
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        {/* Outer circle gradient */}
        <circle cx="32" cy="32" r="30" fill="url(#circleGradient)" />
        
        {/* Inner network node connectors */}
        <path d="M32 15L46 25V40L32 50L18 40V25L32 15Z" stroke="#D6BCFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Connection lines */}
        <line x1="32" y1="15" x2="32" y2="50" stroke="#D6BCFA" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="18" y1="25" x2="46" y2="25" stroke="#D6BCFA" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="18" y1="40" x2="46" y2="40" stroke="#D6BCFA" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        
        {/* Center brain node */}
        <circle cx="32" cy="32" r="8" fill="#9B87F5" />
        
        {/* Satellite nodes */}
        <circle cx="32" cy="15" r="4" fill="#7E69AB" />
        <circle cx="46" cy="25" r="4" fill="#6E59A5" />
        <circle cx="46" cy="40" r="4" fill="#7E69AB" />
        <circle cx="32" cy="50" r="4" fill="#9B87F5" />
        <circle cx="18" cy="40" r="4" fill="#6E59A5" />
        <circle cx="18" cy="25" r="4" fill="#9B87F5" />
        
        {/* Pulse animation */}
        <circle cx="32" cy="32" r="16" stroke="#9B87F5" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse-subtle">
          <animate attributeName="r" values="16;20;16" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="circleGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9B87F5" />
            <stop offset="1" stopColor="#6E59A5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
