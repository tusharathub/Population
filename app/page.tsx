"use client"
import { useEffect, useRef, useState } from "react";
import PopulationCounter from "./components/PopulationCounter";
import ControlPanel from "./components/ControlPanel";
import EventButtons from "./components/EventButtons";

export default function Home() {

  const [population, setPopulation] = useState(8000000000);
  const [birthRate, setBirthRate] = useState(4);
  const [deathRate, setDeathRate] = useState(2);
  const [migrationRate, setMigrationRate] = useState(1);
  const [running, setRunning] = useState(true);

  const lastUpdate = useRef(Date.now());

  useEffect(() => {
    if(!running) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = (now - lastUpdate.current) / 1000;
      lastUpdate.current = now;
      const delta = (birthRate - deathRate + migrationRate) * elapsedSeconds;
      setPopulation((p) => p + delta);
    })

    return () => clearInterval(interval);
  }, [birthRate, deathRate, running, migrationRate]);

  const handleReset = () => {
    setPopulation(8000000000);
    setBirthRate(4);
    setDeathRate(2);
    setMigrationRate(1);
    setRunning(true);
  }

  return (
   <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white flex flex-col md:flex-row items-center justify-center p-6 gap-8">
    <PopulationCounter population={population}/>
    <div className="flex flex-col gap-6">
    <ControlPanel
    birthRate={birthRate}
    deathRate={deathRate}
    migrationRate={migrationRate}
    setBirthRate={setBirthRate}
    setDeathRate={setDeathRate}
    setMigrationRate={setMigrationRate}
    />
    <EventButtons
    setBirthRate={setBirthRate}
    setDeathRate={setDeathRate}
    setMigrationRate={setMigrationRate}
    setPopulation={setPopulation}
    />
    </div>
    <div className="flex gap-4 justify-center">
      <button 
      onClick={() => setRunning(!running)}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-xl"
      >
        {running ? "Pause" : "Continue"}
      </button>
      <button
      onClick={handleReset}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl"
      >
        Reset
      </button>
    </div>
   </main>
  );
}
