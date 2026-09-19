import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function SensorChart({ data, fields, height = 220, yLabel }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#12372A15" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#20252299" }}
            stroke="#12372A30"
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#20252299" }}
            stroke="#12372A30"
            tickLine={false}
            label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "#20252299" } } : undefined}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #12372A20",
              fontSize: 12,
              boxShadow: "0 8px 24px #12372A20",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {fields.map((f) => (
            <Line
              key={f.key}
              type="monotone"
              dataKey={f.key}
              name={f.label}
              stroke={f.color}
              strokeWidth={2.5}
              dot={false}
              animationDuration={400}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}