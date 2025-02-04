'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import InfoChart from './InfoChart'

export type Disease = {
  id: string
  label: string
  count: number
  color: string
}

export type ChartData = {
  disease: string
  visitors: number
  fill: string
}

export type ChartConfig = {
  [key: string]: {
    label: string
    color?: string
  }
}
const DiseasePanel = ({
  diseases,
  setSelectedDiseases,
  isLoading,
  hasImage,
  chartData,
  chartConfig,
  resetSelectedDiseases, // Add this prop
  resetDiseasesToInitial, // Add this prop
}: {
  diseases: Disease[]
  setSelectedDiseases: (diseases: Disease[]) => void
  isLoading: boolean
  hasImage: boolean
  chartData: ChartData[]
  chartConfig: ChartConfig
  resetSelectedDiseases: () => void // Add this prop type
  resetDiseasesToInitial: () => void // Add this prop type
}) => {
  const [selectedDiseases, setSelectedDiseasesState] = useState<string[]>([])

  const handleCheckboxChange = (id: string) => {
    const newSelectedDiseases = selectedDiseases.includes(id)
      ? selectedDiseases.filter((disease) => disease !== id)
      : [...selectedDiseases, id]

    setSelectedDiseasesState(newSelectedDiseases)
    const selected = diseases.filter((disease) =>
      newSelectedDiseases.includes(disease.id)
    )
    setSelectedDiseases(selected)
  }

  useEffect(() => {
    resetSelectedDiseases()
    resetDiseasesToInitial()
    setSelectedDiseasesState([]) // Uncheck all checkboxes
  }, []) // Empty dependency array to ensure this runs only once on mount

  return (
    <div className="order-3 w-full flex-col items-start justify-start gap-4 border-l border-secondary bg-gradient-to-l from-neutral-800 to-stone-800 p-4 px-10 text-foreground md:w-64 md:px-4 lg:order-3 lg:flex lg:h-[calc(100vh-64px)]">
      <div className="mb-4">
        <h2 className="text-md font-sora">AI Viewer</h2>
        <p className="text-xs font-noto-sans text-destructive-foreground">Select to highlight the diseases in the image</p>
      </div>
      {diseases.map((disease) => (
        <div
          key={disease.id}
          className="flex flex-row items-start justify-between space-x-3 space-y-0 w-full"
        >
          <div className='space-x-2'>
            <Checkbox
              checked={selectedDiseases.includes(disease.id) && !(isLoading || !hasImage || disease.count === 0)}
              onCheckedChange={() => handleCheckboxChange(disease.id)}
              disabled={isLoading || disease.count === 0}
            />
            <label className={cn("text-sm font-normal font-noto-sans capitalize", isLoading || !hasImage || disease.count === 0 ? 'text-gray-400' : 'text-neutral-100')}>
              {disease.label.split(' ').slice(0, 2).join(' ')}
            </label>
          </div>
          <div className='flex items-center justify-center w-6 p-2 h-6 rounded-full' style={{ backgroundColor: `${disease.color}`, opacity: isLoading || !hasImage || disease.count === 0 ? 0.5 : 1 }}>
            <span className="text-sm font-semibold capitalize">
              {disease.count}
            </span>
          </div>
        </div>
      ))}
      {hasImage && !isLoading && (
        <div>
          <InfoChart chartData={chartData} chartConfig={chartConfig} />
        </div>
      )}
    </div>
  )
}

export default DiseasePanel
