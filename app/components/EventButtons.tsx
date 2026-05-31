"use client";

import { Baby, Biohazard, Rocket, AlertTriangle, ChevronRight } from "lucide-react";

interface Props {
  setBirthRate: (v: (prev: number) => number) => void;
  setDeathRate: (v: (prev: number) => number) => void;
  setMigrationRate: (v: (prev: number) => number) => void;
  setPopulation: (v: (prev: number) => number) => void;
  onTriggerEvent?: (name: string, details: string, type: "success" | "danger" | "info" | "warn") => void;
}

export default function EventButtons({
  setBirthRate,
  setDeathRate,
  setMigrationRate,
  setPopulation,
  onTriggerEvent,
}: Props) {

  const handleBabyBoom = () => {
    setBirthRate((p) => p + 100000);
    onTriggerEvent?.(
      "Baby Boom",
      "Global fertility spike registered. Birth rate increased by +100k/s.",
      "success"
    );
  };

  const handlePandemic = () => {
    setDeathRate((d) => d + 10000);
    onTriggerEvent?.(
      "Viral Outbreak",
      "A new respiratory pathogen strains spreads. Death rate increased by +10k/s.",
      "danger"
    );
  };

  const handleColonizeMars = () => {
    setMigrationRate((m) => m - 100000);
    onTriggerEvent?.(
      "Mars Colonization",
      "SpaceX launch armada departs for Mars. Migration rate drops by -100k/s.",
      "info"
    );
  };

  const handleDisaster = () => {
    setPopulation((p) => p * 0.9);
    onTriggerEvent?.(
      "Global Cataclysm",
      "A massive asteroid impact wiped out 10% of Earth's population.",
      "warn"
    );
  };

  const events = [
    {
      title: "Boom the babies",
      icon: <Baby className="h-4.5 w-4.5 text-purple-400" />,
      bgIcon: "bg-purple-950/40 border-purple-500/20",
      action: handleBabyBoom,
    },
    {
      title: "Make a pandemic",
      icon: <Biohazard className="h-4.5 w-4.5 text-red-500 animate-pulse" />,
      bgIcon: "bg-red-950/40 border-red-500/20",
      action: handlePandemic,
    },
    {
      title: "Colonie the mars",
      icon: <Rocket className="h-4.5 w-4.5 text-amber-500" />,
      bgIcon: "bg-amber-955/40 border-amber-500/20",
      action: handleColonizeMars,
    },
    {
      title: "A huge disaster",
      icon: <AlertTriangle className="h-4.5 w-4.5 text-yellow-500" />,
      bgIcon: "bg-yellow-955/40 border-yellow-500/20",
      action: handleDisaster,
    },
  ];

  return (
    <div className="metal-panel p-5 flex flex-col justify-between h-full space-y-4 relative">
      {/* Rivets */}
      <div className="rivet rivet-tl" />
      <div className="rivet rivet-tr" />
      <div className="rivet rivet-bl" />
      <div className="rivet rivet-br" />

      {/* Header */}
      <div className="flex items-center space-x-2 text-slate-300 border-b border-white/5 pb-2">
        <Biohazard className="h-4 w-4 text-slate-500" />
        <div className="flex flex-col">
          <span className="font-bebas tracking-wider text-base uppercase leading-none">
            Global Events
          </span>
          <span className="text-[9px] text-slate-500 font-share-mono uppercase tracking-wide mt-0.5">
            Trigger world-changing events
          </span>
        </div>
      </div>

      {/* Button list */}
      <div className="space-y-2.5 flex-1 py-1">
        {events.map((ev, idx) => (
          <button
            key={idx}
            onClick={ev.action}
            className="w-full flex items-center justify-between p-2.5 bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 rounded transition cursor-pointer text-left hover:bg-slate-800/20 hover:scale-[1.01]"
          >
            <div className="flex items-center space-x-3">
              {/* Icon container */}
              <div className={`p-1.5 rounded border ${ev.bgIcon}`}>
                {ev.icon}
              </div>
              
              {/* Title */}
              <span className="text-xs uppercase font-share-mono tracking-wider font-bold text-slate-300">
                {ev.title}
              </span>
            </div>
            
            {/* Chevron Right */}
            <ChevronRight className="h-3.5 w-3.5 text-slate-600 hover:text-slate-400" />
          </button>
        ))}
      </div>
    </div>
  );
}