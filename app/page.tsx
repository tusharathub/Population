"use client"
import { useEffect, useRef, useState } from "react";
import PopulationCounter from "./components/PopulationCounter";
import ControlPanel from "./components/ControlPanel";
import EventButtons from "./components/EventButtons";
import ContinentCircle from "./components/ContinentCircle";
import { Github, Pause, Play, RotateCcw } from "lucide-react";

export default function Home() {

  const [population, setPopulation] = useState(8201000000);
  const [birthRate, setBirthRate] = useState(4);
  const [deathRate, setDeathRate] = useState(2);
  const [migrationRate, setMigrationRate] = useState(1);
  const [running, setRunning] = useState(true);

  const lastUpdate = useRef(Date.now());
  const lastBillion = useRef(Math.floor(population / 1e9));

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
    lastBillion.current = 8;
  }

 return (
  <main className="min-h-screen bg-gray-100 text-white overflow-hidden relative">

    <div className="relative z-10 container mx-auto px-4 py-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl mb-8 font-bold bg-clip-text text-transparent bg-gray-900 drop-shadow-lg">
          World Population Simulator
        </h1>
        <p className="mt-3 text-3xl text-gray-800">Real-time demographic simulation</p>
      </header>

      <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* LEFT: Counter + Donut */}
        <div className="space-y-6">
          <div className="glass-backdrop rounded-3xl p-8 shadow-2xl border border-white/10 backdrop-blur-xl">
            <PopulationCounter population={population} />
          </div>

          <ContinentCircle population={population} />
        </div>

        {/* RIGHT: Controls & Events  */}
        <div className="col-span-2 space-y-6">
          <div className="glass-backdrop rounded-3xl p-6 shadow-2xl border border-white/10 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Demographic Controls */}
              <div>
                <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center bg-clip-text ">
                  Demographic Controls
                </h2>
                <ControlPanel
                  birthRate={birthRate}
                  setBirthRate={setBirthRate}
                  deathRate={deathRate}
                  setDeathRate={setDeathRate}
                  migrationRate={migrationRate}
                  setMigrationRate={setMigrationRate}
                />
              </div>

              {/* Global Events */}
              <div>
                <h2 className="text-2xl font-semibold mb-5 text-center bg-clip-text text-gray-900">
                  Global Events
                </h2>
                <EventButtons
                  setBirthRate={setBirthRate}
                  setDeathRate={setDeathRate}
                  setMigrationRate={setMigrationRate}
                  setPopulation={setPopulation}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setRunning(!running)}
              className={"group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gray-200 hover:bg-zinc-300 text-gray-800 font-semibold text-lg transition-all duration-300 shadow-lg"}
            >
              {running ? (
                <>
                  <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Continue
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="group flex items-center gap-3 px-8 py-4 bg-gray-200 hover:bg-zinc-300 text-gray-800 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Reset
            </button>

            <div className="text-gray-600 hover:text-purple-600 transition duration-300 font-medium">
              <a href="https://github.com/tusharathub" target="_blank" >
              <Github className="text-gray-800 w-13 h-11 mt-2 rounded-xl " />
              Connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);
}
