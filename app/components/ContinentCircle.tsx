"use client";

import React, { useMemo, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const CONTINENTS = [
  { name: "ASIA", share: 59.1, color: "#6d28d9" },
  { name: "AFRICA", share: 17.8, color: "#166534" },
  { name: "EUROPE", share: 9.6, color: "#1d4ed8" },
  { name: "NORTH AMERICA", share: 7.5, color: "#c2410c" },
  { name: "SOUTH AMERICA", share: 5.2, color: "#d97706" },
  { name: "OCEANIA", share: 0.8, color: "#0891b2" },
];

export default function ContinentCircle({ population }: { population: number }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const data = useMemo(() => {
    return CONTINENTS.map((c) => ({
      ...c,
      value: Math.round((population * c.share) / 100),
      percent: c.share,
    }));
  }, [population]);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  // Constants for donut drawing
  const size = 180;
  const center = size / 2;
  const outerR = 80;
  const innerR = 50;

  let currentAngle = -90; // Start at the top

  const segments = data.map((d) => {
    const angle = (d.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = startAngle + angle;
    currentAngle = endAngle;

    const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
      const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
      return {
        x: cx + r * Math.cos(angleRad),
        y: cy + r * Math.sin(angleRad),
      };
    };

    const p1 = polarToCartesian(center, center, outerR, startAngle);
    const p2 = polarToCartesian(center, center, outerR, endAngle);
    const p3 = polarToCartesian(center, center, innerR, endAngle);
    const p4 = polarToCartesian(center, center, innerR, startAngle);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${p1.x} ${p1.y}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${p2.x} ${p2.y}`,
      `L ${p3.x} ${p3.y}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${p4.x} ${p4.y}`,
      "Z"
    ].join(" ");

    return {
      ...d,
      pathData,
    };
  });

  return (
    <div className="metal-panel p-5 flex flex-col justify-between h-full space-y-4 relative">
      {/* Rivets */}
      <div className="rivet rivet-tl" />
      <div className="rivet rivet-tr" />
      <div className="rivet rivet-bl" />
      <div className="rivet rivet-br" />

      {/* Title block */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center space-x-2 text-slate-300">
          <Globe className="h-4 w-4 text-slate-500" />
          <span className="font-bebas tracking-wider text-base uppercase">
            Population by Continents
          </span>
        </div>
        
        {/* Dropdown indicator */}
        <div className="flex items-center space-x-1 bg-slate-900/60 border border-slate-700/40 rounded px-2 py-0.5 text-[9px] text-slate-400 font-share-mono uppercase cursor-pointer hover:text-slate-200 transition">
          <span>View by Population</span>
          <ChevronDown className="h-3 w-3" />
        </div>
      </div>

      {/* Main chart & legend container */}
      <div className="flex items-center justify-between gap-4 py-2 flex-1">
        {/* SVG Donut */}
        <div className="relative w-[180px] h-[180px] flex-shrink-0 flex items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Draw segments */}
            {segments.map((seg) => {
              const isHovered = hovered === seg.name;
              return (
                <path
                  key={seg.name}
                  d={seg.pathData}
                  fill={seg.color}
                  opacity={hovered && !isHovered ? 0.4 : 1}
                  onMouseEnter={() => setHovered(seg.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer transition-all duration-150"
                  style={{
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                    transformOrigin: `${center}px ${center}px`,
                  }}
                />
              );
            })}
          </svg>
          
          {/* Inner Circle Texture Overlay */}
          <div
            className="absolute rounded-full border border-slate-800/40 pointer-events-none"
            style={{
              width: innerR * 2,
              height: innerR * 2,
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.85)",
            }}
          />
        </div>

        {/* Legend listing */}
        <div className="flex-1 flex flex-col space-y-1">
          {data.map((item) => {
            const isHovered = hovered === item.name;
            return (
              <div
                key={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center justify-between text-[11px] font-share-mono py-1 px-1.5 rounded transition ${
                  isHovered ? "bg-slate-800/50" : "transparent"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-400 font-medium">{item.name}</span>
                </div>
                <span className="text-slate-300 text-right">{item.share}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer live status bar */}
      <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-share-mono border-t border-white/5 pt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-pulse-dot" />
        <span className="uppercase tracking-wider">Live Data • Updates every second</span>
      </div>
    </div>
  );
}
