import { AnimatePresence, motion } from "framer-motion";

export default function PopulationCounter({population}: {population: number;}) {
  const formatted = Math.floor(population).toLocaleString();

  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold">World Population Manipulator</h1>
      <AnimatePresence mode="wait">
        <motion.p
          key={formatted}
          initial={{ opacity: 0.4, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-3xl font-bold text-green-600"
        >
          {formatted}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
