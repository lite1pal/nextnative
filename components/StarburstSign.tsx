"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
function StarburstSign({
  position = "top-left",
  rotation = 0,
  children,
  className,
  svgClassName,
  size = "large",
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  rotation?: number;
  children: React.ReactNode;
  className?: string;
  svgClassName?: string;
  size?: "large" | "small";
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return children;

  return (
    <div className={cn("relative group", className)}>
      <div
        className={cn(
          "w-fit absolute",
          position === "top-left" && "top-[-45px] left-[-45px]",
          position === "top-right" && "top-[-45px] right-[-45px]",
          position === "bottom-left" && "bottom-[-45px] left-[-45px]",
          position === "bottom-right" && "bottom-[-45px] right-[-45px]",
          svgClassName
        )}
      >
        <svg
          style={{ transform: `rotate(${rotation}deg)` }}
          width={size === "large" || isMobile ? "51" : "30"}
          height={size === "large" || isMobile ? "50" : "30"}
          viewBox="0 0 51 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.10018 34.6862C5.55199 34.0961 3.81853 34.8727 3.22839 36.4209C2.63825 37.9691 3.4149 39.7026 4.9631 40.2927L7.10018 34.6862ZM28.5471 42.8614L7.10018 34.6862L4.9631 40.2927L26.41 48.4679L28.5471 42.8614Z"
            fill="#06B300"
          />
          <path
            d="M43.0839 5.57302C42.4735 4.03268 40.7301 3.27877 39.1897 3.88911C37.6494 4.49945 36.8955 6.24293 37.5058 7.78326L43.0839 5.57302ZM50.9326 25.381L43.0839 5.57302L37.5058 7.78326L45.3545 27.5912L50.9326 25.381Z"
            fill="#06B300"
          />
          <path
            d="M9.20558 5.48537C7.96096 4.39171 6.06541 4.5141 4.97176 5.75872C3.8781 7.00334 4.00049 8.89889 5.24511 9.99255L9.20558 5.48537ZM36.7136 29.6567L9.20558 5.48537L5.24511 9.99255L32.7532 34.1639L36.7136 29.6567Z"
            fill="#06B300"
          />
        </svg>
      </div>
      {children}
    </div>
  );
}

export default StarburstSign;
