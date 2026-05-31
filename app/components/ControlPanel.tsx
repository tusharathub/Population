"use client";

import { Settings, Baby, Skull, Users, ChevronRight } from "lucide-react";

interface Props {
  birthRate: number;
  deathRate: number;
  migrationRate: number;
  setBirthRate: (v: number) => void;
  setDeathRate: (v: number) => void;
  setMigrationRate: (v: number) => void;
}

export default function ControlPanel({
  birthRate,
  deathRate,
  migrationRate,
  setBirthRate,
  setDeathRate,
  setMigrationRate,
}: Props) {

  // Format values to match mockup (e.g. 4.0, 2.0, 1.0)
  const formatValue = (val: number) => {
    return val.toFixed(1);
  };

  return (
    <div className="metal-panel p-5 flex flex-col justify-between h-full space-y-4 relative">
      {/* Rivets */}
      <div className="rivet rivet-tl" />
      <div className="rivet rivet-tr" />
      <div className="rivet rivet-bl" />
      <div className="rivet rivet-br" />

      {/* Title block */}
      <div className="flex items-center space-x-2 text-slate-300 border-b border-white/5 pb-2">
        <Settings className="h-4 w-4 text-slate-500" />
        <div className="flex flex-col">
          <span className="font-bebas tracking-wider text-base uppercase leading-none">
            Simulation Controls
          </span>
          <span className="text-[9px] text-slate-500 font-share-mono uppercase tracking-wide mt-0.5">
            Adjust demographic parameters
          </span>
        </div>
      </div>

      {/* Inputs List */}
      <div className="space-y-4 flex-1 py-1">
        
        {/* Birth Rate Slider */}
        <div className="flex items-center justify-between gap-4">
          {/* Icon */}
          <div className="bg-purple-950/40 p-2.5 rounded-full border border-purple-500/25 text-purple-400">
            <Baby className="h-4 w-4" />
          </div>
          
          {/* Label + Slider */}
          <div className="flex-1 flex flex-col space-y-1">
            <span className="text-[10px] text-slate-400 font-share-mono uppercase font-bold tracking-wider">
              Birth Rate
            </span>
            <input
              type="range"
              min={0}
              max={250000}
              step={1}
              value={birthRate}
              onChange={(e) => setBirthRate(Number(e.target.value))}
              className="hud-slider w-full cursor-pointer"
              style={{ "--slider-color": "#8b5cf6" } as React.CSSProperties}
            />
          </div>

          {/* Value Box on Right */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 w-16">
            <div className="hud-input-box w-full py-1 text-center font-share-mono text-slate-200 text-xs font-bold">
              {formatValue(birthRate)}
            </div>
            <span className="text-[7.5px] text-slate-500 uppercase font-share-mono mt-1 text-center">
              per 1,000 people
            </span>
          </div>
        </div>

        {/* Death Rate Slider */}
        <div className="flex items-center justify-between gap-4">
          {/* Icon */}
          <div className="bg-emerald-950/40 p-2.5 rounded-full border border-emerald-500/25 text-emerald-400">
            <Skull className="h-4 w-4" />
          </div>

          {/* Label + Slider */}
          <div className="flex-1 flex flex-col space-y-1">
            <span className="text-[10px] text-slate-400 font-share-mono uppercase font-bold tracking-wider">
              Death Rate
            </span>
            <input
              type="range"
              min={0}
              max={250000}
              step={1}
              value={deathRate}
              onChange={(e) => setDeathRate(Number(e.target.value))}
              className="hud-slider w-full cursor-pointer"
              style={{ "--slider-color": "#10b981" } as React.CSSProperties}
            />
          </div>

          {/* Value Box on Right */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 w-16">
            <div className="hud-input-box w-full py-1 text-center font-share-mono text-slate-200 text-xs font-bold">
              {formatValue(deathRate)}
            </div>
            <span className="text-[7.5px] text-slate-500 uppercase font-share-mono mt-1 text-center">
              per 1,000 people
            </span>
          </div>
        </div>

        {/* Migration Rate Slider */}
        <div className="flex items-center justify-between gap-4">
          {/* Icon */}
          <div className="bg-blue-955/40 p-2.5 rounded-full border border-blue-500/25 text-blue-400">
            <Users className="h-4 w-4" />
          </div>

          {/* Label + Slider */}
          <div className="flex-1 flex flex-col space-y-1">
            <span className="text-[10px] text-slate-400 font-share-mono uppercase font-bold tracking-wider">
              Migration Rate
            </span>
            <input
              type="range"
              min={-250000}
              max={250000}
              step={1}
              value={migrationRate}
              onChange={(e) => setMigrationRate(Number(e.target.value))}
              className="hud-slider w-full cursor-pointer"
              style={{ "--slider-color": "#3b82f6" } as React.CSSProperties}
            />
          </div>

          {/* Value Box on Right */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 w-16">
            <div className="hud-input-box w-full py-1 text-center font-share-mono text-slate-200 text-xs font-bold">
              {formatValue(migrationRate)}
            </div>
            <span className="text-[7.5px] text-slate-500 uppercase font-share-mono mt-1 text-center">
              per 1,000 people
            </span>
          </div>
        </div>

      </div>

      {/* Advanced Settings Footer */}
      <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[10px] text-slate-500 font-share-mono uppercase hover:text-slate-300 transition cursor-pointer">
        <span>Advanced Settings</span>
        <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  );
}