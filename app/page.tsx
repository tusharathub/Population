"use client";

import { useEffect, useRef, useState } from "react";
import PopulationCounter from "./components/PopulationCounter";
import ContinentCircle from "./components/ContinentCircle";
import ControlPanel from "./components/ControlPanel";
import EventButtons from "./components/EventButtons";
import { Play, Pause, RotateCcw, Radio } from "lucide-react";

export default function Home() {
  const [population, setPopulation] = useState(8201000000);
  const [birthRate, setBirthRate] = useState(4);
  const [deathRate, setDeathRate] = useState(2);
  const [migrationRate, setMigrationRate] = useState(1);
  const [running, setRunning] = useState(true);
  const [isExtinct, setIsExtinct] = useState(false);

  const lastUpdate = useRef(Date.now());

  useEffect(() => {
    if (!running || isExtinct) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = (now - lastUpdate.current) / 1000;
      lastUpdate.current = now;

      const delta = (birthRate - deathRate + migrationRate) * elapsedSeconds;

      setPopulation((p) => {
        const newPopulation = p + delta;

        if (newPopulation <= 0) {
          clearInterval(interval);
          setIsExtinct(true);
          setRunning(false);
          return 0;
        }
        return newPopulation;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [birthRate, deathRate, running, migrationRate, isExtinct]);

  const handleToggleRunning = () => {
    if (!running) {
      lastUpdate.current = Date.now();
    }
    setRunning(!running);
  };

  const handleReset = () => {
    setPopulation(8201000000);
    setBirthRate(4);
    setDeathRate(2);
    setMigrationRate(1);
    setRunning(true);
    setIsExtinct(false);
    lastUpdate.current = Date.now();
  };

  return (
    <main className="min-h-screen text-slate-300 font-hud-text flex flex-col justify-between p-4 md:p-6 max-w-7xl mx-auto space-y-5 select-none">
      
      {/* Header Block */}
      <header className="flex flex-col space-y-1 py-1">
        <h1 className="text-3xl md:text-4.5xl font-bebas tracking-wide text-slate-100 uppercase leading-none font-bold">
          World Population Simulator
        </h1>
        <p className="text-xs md:text-sm font-share-mono text-amber-600 uppercase tracking-widest font-bold">
          Real-Time Demographic Simulation
        </p>
      </header>

      {isExtinct ? (
        /* Extinction HUD Screen */
        <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-6 max-w-lg mx-auto">
          <div className="metal-panel p-8 backdrop-blur-md shadow-2xl space-y-4 border-2 border-red-900/60 w-full relative">
            {/* Rivets */}
            <div className="rivet rivet-tl" />
            <div className="rivet rivet-tr" />
            <div className="rivet rivet-bl" />
            <div className="rivet rivet-br" />
            
            <span className="text-5xl">💀</span>
            <h2 className="text-3xl font-bebas font-extrabold text-red-500 tracking-wider uppercase animate-pulse">
              System Failure: Extinction Detected
            </h2>
            <p className="text-xs font-share-mono text-slate-400 leading-relaxed">
              Global population has crashed to zero. Demographic telemetry is terminated.
            </p>
            <div className="h-[1px] bg-white/5 my-4" />
            <button
              onClick={handleReset}
              className="w-full py-3 btn-rust font-bold text-xs uppercase tracking-widest cursor-pointer"
            >
              Restart Simulation Protocol
            </button>
          </div>
        </div>
      ) : (
        /* Correct grid widths matching columns */
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Column 1 (Width: 5/12) -> Population Counter + Continent Circle */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            {/* Current World Population Box */}
            <div className="metal-panel p-5 relative">
              {/* Rivets */}
              <div className="rivet rivet-tl" />
              <div className="rivet rivet-tr" />
              <div className="rivet rivet-bl" />
              <div className="rivet rivet-br" />
              
              <PopulationCounter
                population={population}
                birthRate={birthRate}
                deathRate={deathRate}
                migrationRate={migrationRate}
              />
            </div>
            
            {/* Continent Circle Card */}
            <div className="flex-grow">
              <ContinentCircle population={population} />
            </div>
          </div>

          {/* Column 2 (Width: 4/12) -> Simulation Controls */}
          <div className="lg:col-span-4 flex flex-col">
            <ControlPanel
              birthRate={birthRate}
              setBirthRate={setBirthRate}
              deathRate={deathRate}
              setDeathRate={setDeathRate}
              migrationRate={migrationRate}
              setMigrationRate={setMigrationRate}
            />
          </div>

          {/* Column 3 (Width: 3/12) -> Global Events */}
          <div className="lg:col-span-3 flex flex-col">
            <EventButtons
              setBirthRate={setBirthRate}
              setDeathRate={setDeathRate}
              setMigrationRate={setMigrationRate}
              setPopulation={setPopulation}
            />
          </div>

        </div>
      )}

      {/* Control Buttons Footer Bar */}
      <footer className="flex items-center space-x-3 pt-3 border-t border-white/5">
        
        {/* Play/Pause Button */}
        {!isExtinct && (
          <button
            onClick={handleToggleRunning}
            className="flex items-center space-x-2 px-8 py-3 btn-rust font-bold text-sm uppercase tracking-wider cursor-pointer"
          >
            {running ? (
              <>
                <Pause className="h-4 w-4 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Continue</span>
              </>
            )}
          </button>
        )}

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-6 py-3 btn-steel font-bold text-sm uppercase tracking-wider cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>

        {/* Connect Button */}
        <a
          href="https://github.com/tusharathub"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-6 py-3 btn-steel font-bold text-sm uppercase tracking-wider cursor-pointer"
        >
          <Radio className="h-4 w-4" />
          <span>Connect</span>
        </a>

      </footer>

    </main>
  );
}
