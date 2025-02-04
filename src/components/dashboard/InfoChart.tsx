import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React from 'react';
import { InfoPieChart } from './InfoPieChart';
import type { ChartConfig, ChartData } from './DiseasePanel';

interface ChartProps {
  chartData: ChartData[]; // Replace 'any' with the appropriate type
  chartConfig: ChartConfig; // Replace 'any' with the appropriate type
}

const InfoChart: React.FC<ChartProps> = ({ chartData, chartConfig }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-secondary-foreground text-muted shadow hover:bg-primary/90 px-4 rounded-sm font-semibold text-md py-1 font-noto-sans">View Info</div>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Distribution of Detected Conditions</SheetTitle>
          <SheetDescription className='my-2'>
            This chart shows the distribution of detected conditions based on the analysis.
          </SheetDescription>
        </SheetHeader>
        <InfoPieChart chartData={chartData} chartConfig={chartConfig} />
      </SheetContent>
    </Sheet>
  )
}

export default InfoChart
