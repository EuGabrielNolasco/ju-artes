"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Props = { data: { name: string; total: number }[] }

export function CategoryBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E1C7A4" />
        <XAxis type="number" tick={{ fontSize: 11, fill: "#6B5A4B" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#6B5A4B" }} axisLine={false} tickLine={false} width={110} />
        <Tooltip
          cursor={{ fill: "#F5EBDD" }}
          contentStyle={{ borderRadius: 12, border: "1px solid #E1C7A4", fontSize: 12 }}
          formatter={(v) => [`${v} peças`, "Total"]}
        />
        <Bar dataKey="total" fill="#B5654A" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
