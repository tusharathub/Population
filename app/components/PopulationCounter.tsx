import { AnimatePresence, motion } from "framer-motion";

export default function PopulationCounter({population}: {population: number;}) {
  const formatted = Math.floor(population).toLocaleString();

  return (
    <div className="text-center space-y-2">
      <AnimatePresence mode="wait">
        <motion.p
          key={formatted}
          initial={{ opacity: 0.4, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 10, y: -1 }}
          transition={{ duration: 0.2 }}
          className="text-3xl font-bold text-gray-700"
        >
          {formatted}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
