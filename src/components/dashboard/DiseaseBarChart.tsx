"use client"

import { Bar, BarChart, Cell, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import type { ChartData } from "./DiseasePanel";

export function DiseaseBarChart({ chartData, chartConfig }: { chartData: ChartData[], chartConfig: ChartConfig }) {
  // Filter to only show diseases with counts > 0
  const formattedData = chartData
    .filter(item => item.visitors > 0)
    .map(item => ({
      name: chartConfig[item.disease]?.label || item.disease,
      value: item.visitors,
      fill: item.fill,
      disease: item.disease,
    }));

  if (formattedData.length === 0) {
    return <div className="text-center text-gray-500 py-8">No diseases detected with current confidence threshold</div>;
  }

  // Calculate dynamic height based on number of items (min 240px, add 30px per item above 4)
  const chartHeight = Math.max(240, 180 + formattedData.length * 30);

  return (
    <Card className="flex flex-col border border-border bg-gradient-to-r from-neutral-800 to-stone-800">
      <CardContent className="flex-1 pt-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full"
          style={{ height: `${chartHeight}px` }}
        >
          <BarChart 
            data={formattedData} 
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            layout="vertical"
            barGap={4}
            maxBarSize={15}
            width={500}
            height={chartHeight - 20}
          >
            <XAxis 
              dataKey="value"
              type="number"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 'dataMax + 1']}
            />
            <YAxis 
              dataKey="name"
              type="category"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={120}
              tickFormatter={(value) => {
                // Show more of the disease name
                return typeof value === "string" && value.length > 15 ? `${value.substring(0, 15)}...` : value;
              }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#27272a',
                borderColor: '#3f3f46',
                color: '#ffffff',
                fontSize: '12px',
              }}
              formatter={(value) => [`${value} instance${value !== 1 ? 's' : ''}`, 'Count']}
              labelFormatter={(label) => `${label}`}
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Bar 
              dataKey="value"
              radius={[0, 4, 4, 0]}
              barSize={18}
              name="Count"
              minPointSize={2}
              background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
