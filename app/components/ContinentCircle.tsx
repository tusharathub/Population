"use client";

import React, { useMemo, useState } from "react";

const CONTINENTS = [
  { name: "Africa", share: 17.2, color: "#10b981" },
  { name: "Australia/Oceania", share: 0.5, color: "#ef4444" },
  { name: "Europe", share: 9.6, color: "#3b82f6" },
  { name: "North America", share: 7.4, color: "#f59e0b" },
  { name: "Asia", share: 59.7, color: "#8b5cf6" },
  { name: "South America", share: 5.4, color: "#f59e0b" },
];

export default function ContinentCircle({ population }: { population: number }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const data = useMemo(() => {
    return CONTINENTS.map((c) => ({
      ...c,
      value: Math.round(population * c.share),
      percent: c.share,
    }));
  }, [population]);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  let startAngle = 0;

  return (
    <div className="relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg border border-white/10 backdrop-blur-md bg-white/40">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Population by Continents
      </h3>

      <svg width="250" height="250" viewBox="0 0 250 250">
        <circle cx="125" cy="125" r="80" fill="#f3f4f6" />
        {data.map((d, i) => {
          const angle = (d.value / total) * 360;
          const endAngle = startAngle + angle;

          const largeArc = angle > 180 ? 1 : 0;
          const outerR = 100;
          const innerR = 60;

          const x1 = 125 + outerR * Math.cos((Math.PI * startAngle) / 180);
          const y1 = 125 + outerR * Math.sin((Math.PI * startAngle) / 180);
          const x2 = 125 + outerR * Math.cos((Math.PI * endAngle) / 180);
          const y2 = 125 + outerR * Math.sin((Math.PI * endAngle) / 180);

          const x3 = 125 + innerR * Math.cos((Math.PI * endAngle) / 180);
          const y3 = 125 + innerR * Math.sin((Math.PI * endAngle) / 180);
          const x4 = 125 + innerR * Math.cos((Math.PI * startAngle) / 180);
          const y4 = 125 + innerR * Math.sin((Math.PI * startAngle) / 180);

          const pathData = `
            M ${x1} ${y1}
            A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}
            L ${x3} ${y3}
            A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4}
            Z
          `;

          const currentAngle = startAngle + angle / 2;
          startAngle += angle;

          return (
            <path
              key={i}
              d={pathData}
              fill={d.color}
              stroke="#fff"
              strokeWidth="2"
              onMouseEnter={() => setHovered(d.name)}
              onMouseLeave={() => setHovered(null)}
              className="transition-transform duration-200 hover:scale-105 cursor-pointer"
            />
          );
        })}
      </svg>

      {hovered && (
        <div className="absolute bottom-6 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-md">
          {hovered}:{" "}
          {data
            .find((d) => d.name === hovered)
            ?.value.toLocaleString()}{" "}
          people
        </div>
      )}
    </div>
  );
}
