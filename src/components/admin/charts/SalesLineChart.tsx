"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Props = { data: { month: string; total: number; count: number }[] }

export function SalesLineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E1C7A4" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B5A4B" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#6B5A4B" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `R$${v}`} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #E1C7A4", fontSize: 12 }}
          formatter={(v) => [`R$ ${Number(v).toFixed(2)}`, "Receita"]}
        />
        <Line type="monotone" dataKey="total" stroke="#B5654A" strokeWidth={2} dot={{ fill: "#B5654A", r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
