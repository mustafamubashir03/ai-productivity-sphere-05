
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
        {/* Simple circular background */}
        <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" />
        
        {/* Abstract minimalist shape */}
        <path 
          d="M20 32C20 25.4 25.4 20 32 20C38.6 20 44 25.4 44 32C44 38.6 38.6 44 32 44" 
          stroke="#FFFFFF" 
          strokeWidth="5" 
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle cx="32" cy="32" r="4" fill="#FFFFFF" />
        
        {/* Simple pulsing ring */}
        <circle 
          cx="32" 
          cy="32" 
          r="16" 
          stroke="#FFFFFF" 
          strokeWidth="2"
          strokeOpacity="0.7"
          fill="none"
        >
          <animate attributeName="r" values="16;18;16" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        
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
