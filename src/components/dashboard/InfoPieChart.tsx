"use client"

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ChartData {
  visitors: number;
  disease: string;
}

export function InfoPieChart({ chartData, chartConfig }: { chartData: ChartData[], chartConfig: ChartConfig }) {
  return (
    <Card className="flex flex-col my-4 border border-border bg-gradient-to-r from-neutral-800 to-stone-800">
      <CardHeader className="items-center pb-0">
        <CardTitle>Diseases</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-w-[400px] h-[220px]"
        >
          <PieChart>
            <Pie 
              data={chartData} 
              dataKey="visitors" 
              cx="50%" 
              cy="50%" 
              innerRadius={35}
              outerRadius={80}
            />
            <ChartTooltip content={<ChartTooltipContent nameKey={'disease'} hideLabel />} />
            <ChartLegend
              content={<ChartLegendContent nameKey="disease" />}
              className="-translate-y-2 flex-wrap gap-2 text-xs"
              verticalAlign="bottom"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
