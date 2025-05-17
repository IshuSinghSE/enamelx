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
import { DiseaseBarChart } from './DiseaseBarChart';
import type { ChartConfig, ChartData } from './DiseasePanel';

interface ChartProps {
  chartData: ChartData[];
  chartConfig: ChartConfig;
}

const InfoChart: React.FC<ChartProps> = ({ chartData, chartConfig }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-secondary-foreground text-muted shadow hover:bg-primary/90 px-4 rounded-sm font-semibold text-md py-1 font-noto-sans">View Info</div>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar pr-6 pb-8">
          <SheetHeader className="sticky top-0 pt-4 pb-2 bg-background z-10">
            <SheetTitle>Distribution of Detected Conditions</SheetTitle>
            <SheetDescription className='my-2'>
              This chart shows the distribution of detected conditions based on the analysis.
            </SheetDescription>
          </SheetHeader>
          
          <InfoPieChart chartData={chartData} chartConfig={chartConfig} />
        
          {/* Bar chart showing disease counts */}
          <div className="mt-6 pb-8">
            <h3 className="text-lg font-medium mb-2">Disease Detection Count</h3>
            <p className="text-xs text-gray-400 mb-2">Number of detections for each disease filtered by confidence threshold</p>
            <DiseaseBarChart chartData={chartData} chartConfig={chartConfig} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default InfoChart
