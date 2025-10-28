"use client"
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [population, setPopulation] = useState(8_000_000_000);
  const [birthRate, setBirthRate] = useState(5);
  const [deathRate, setDeathRate] = useState(2);
  const [migration, setMigration] = useState(1);
  const [running, setRunning] = useState(true);

  const lastUpdate = useRef(Date.now());

  useEffect(() => {
    if(!running) return;

    const interval = setInterval(() => {
      const now = Date.now();

    })

    return () => clearInterval(interval);
  }, [birthRate, deathRate, running, migration]);



  return (
   <div>
    <button>
      Pause
    </button>
   </div>
  );
}
