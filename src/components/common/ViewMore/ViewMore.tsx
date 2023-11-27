import React, { useState, ReactNode } from "react";

type ViewMoreProps = {
  maxHeight: string;
  children: React.ReactNode;
};

const ViewMore: React.FC<ViewMoreProps> = ({ maxHeight, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const contentStyle: React.CSSProperties = {
    maxHeight: isExpanded ? "none" : maxHeight,
    overflow: "hidden",
    transition: "max-height 0.3s ease",
    position: "relative",
  };

  const shadowStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "1.5em",
    background: "linear-gradient(to bottom, transparent, white)",
    pointerEvents: "none",
    display: isExpanded ? "none" : "block",
  };

  return (
    <div className="relative">
      <div style={contentStyle} className="text-gray-700 text-sm">
        {children}
        {!isExpanded && <div style={shadowStyle} />}
      </div>
      <button
        onClick={toggleExpanded}
        className="text-black/90 hover:text-black text-sm mt-2 underline focus:outline-none"
        aria-expanded={isExpanded}
      >
        {isExpanded ? "See less -" : "See more +"}
      </button>
    </div>
  );
};

export default ViewMore;
