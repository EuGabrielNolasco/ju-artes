"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

type Props = { available: number; unavailable: number }

export function StockDonutChart({ available, unavailable }: Props) {
  const data = [
    { name: "Disponíveis", value: available },
    { name: "Indisponíveis", value: unavailable },
  ]
  const COLORS = ["#B5654A", "#D4B8AA"]

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #E1C7A4", fontSize: 12 }}
          formatter={(v, name) => [`${v} peças`, name]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
