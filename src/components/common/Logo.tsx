
import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", className = "" }) => {
  // Define size classes
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main logo container with gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-700 rounded-lg shadow-lg animate-pulse-subtle"></div>
      
      {/* Central circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-white/90 dark:bg-gray-900/90 rounded-full"></div>
      
      {/* Central dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-primary rounded-full"></div>
      
      {/* Pulsing ring */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-white/50 dark:border-gray-300/30 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>
    </div>
  );
};

export default Logo;
