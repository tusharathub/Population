import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CONTINENTS = [
  { name: "Oceania", share: 0.6, color: "#ef4444" },
  { name: "Europe", share: 9, color: "#3b82f6" },
  { name: "Africa", share: 18.8, color: "#10b981" },
  { name: "Americas", share:12.8 , color: "#f59e0b" },
  { name: "Asia", share: 59.4, color: "#8b5cf6" },
];

export default function ContinentCircle({ population }: { population: number }) {
  const data = useMemo(() => {
    return CONTINENTS.map((c) => ({
      name: c.name,
      value: Math.round(population * c.share),
      color: c.color,
    }));
  }, [population]);

  return (
    <div className="glass-backdrop rounded-3xl p-6 shadow-2xl border border-white/10 backdrop-blur-xl">
      <h3 className="text-xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
        Population by Continent
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelStyle={{ fontSize: "12px", fill: "#fff" }}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number) => v.toLocaleString()}
            contentStyle={{
              background: "rgba(0,0,0,0.7)",
              border: "none",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
