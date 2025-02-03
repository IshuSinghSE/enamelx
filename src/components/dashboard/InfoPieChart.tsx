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

interface ChartData {
  visitors: number;
  browser: string;
}

// Remove the redefinition of ChartConfig

export function InfoPieChart({ chartData, chartConfig }: { chartData: ChartData[], chartConfig: ChartConfig }) {
  return (
    <Card className="flex flex-col my-4 border border-border bg-gradient-to-r from-neutral-800 to-stone-800">
      <CardHeader className="items-center pb-0">
        <CardTitle>Disease Chart</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
