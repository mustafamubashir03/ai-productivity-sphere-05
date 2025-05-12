
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
        {/* Main circular background */}
        <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" />
        
        {/* Central abstract brain/network symbol */}
        <path 
          d="M32 16L44 32L32 48L20 32L32 16Z" 
          fill="#F8F7FF" 
          stroke="#9B87F5" 
          strokeWidth="2" 
        />
        
        {/* Pulse ring */}
        <circle 
          cx="32" 
          cy="32" 
          r="18" 
          stroke="#F8F7FF" 
          strokeWidth="2" 
          strokeDasharray="4 4" 
          className="animate-pulse-subtle"
        >
          <animate attributeName="r" values="18;22;18" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Connection points */}
        <circle cx="32" cy="16" r="4" fill="#F8F7FF" />
        <circle cx="44" cy="32" r="4" fill="#F8F7FF" />
        <circle cx="32" cy="48" r="4" fill="#F8F7FF" />
        <circle cx="20" cy="32" r="4" fill="#F8F7FF" />
        
        {/* Center core */}
        <circle cx="32" cy="32" r="6" fill="#F8F7FF" stroke="#9B87F5" strokeWidth="2" />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
