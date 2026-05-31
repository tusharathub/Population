"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface PopulationCounterProps {
  population: number;
  birthRate: number;
  deathRate: number;
  migrationRate: number;
}

export default function PopulationCounter({
  population,
  birthRate,
  deathRate,
  migrationRate,
}: PopulationCounterProps) {
  const formatted = Math.floor(population).toLocaleString();
  
  // Calculate daily growth projection based on net rate
  const netRate = birthRate - deathRate + migrationRate;
  const dailyRate = Math.round(netRate * 86400);

  return (
    <div className="flex flex-col space-y-2 select-text">
      {/* Label header */}
      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-share-mono">
        Current World Population
      </span>

      {/* Large distressed digits */}
      <div className="relative">
        <span
          className="text-4xl sm:text-5xl font-bold font-share-mono tracking-wide amber-glow tabular-nums"
          style={{
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatted}
        </span>
      </div>

      {/* Sub status tag */}
      <div className="flex items-center space-x-1.5 text-xs text-amber-600/90 font-share-mono font-medium">
        <Users className="h-3.5 w-3.5" />
        <span>
          {dailyRate >= 0 ? "+" : "-"}
          {Math.abs(dailyRate).toLocaleString()} TODAY
        </span>
      </div>
    </div>
  );
}
