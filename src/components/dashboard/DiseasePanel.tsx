'use client'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

export type Disease = {
  id: string
  label: string
  count: number
  color: string
}

const DiseasePanel = ({
  diseases,
  setSelectedDiseases,
}: {
  diseases: Disease[]
  setSelectedDiseases: (diseases: Disease[]) => void
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

  return (
    <div className="order-3 w-full flex-col items-start justify-start gap-4 border-l border-secondary bg-gradient-to-l from-neutral-800 to-stone-800 p-4 px-10 text-foreground md:w-64 md:px-4 lg:order-3 lg:flex lg:h-[calc(100vh-64px)]">
      <div className="mb-4">
        <h2 className="text-md font-sora">AI Viewer</h2>
        <p>Select to highlight the diseases in the image</p>
      </div>
      {diseases.map((disease) => (
        <div
          key={disease.id}
          className="flex flex-row items-start justify-between space-x-3 space-y-0 w-full"
        >
          <div className='space-x-2'>
            <Checkbox
              checked={selectedDiseases.includes(disease.id)}
              onCheckedChange={() => handleCheckboxChange(disease.id)}
            />
            <label className="text-sm font-normal font-noto-sans capitalize">
              {disease.label.split(' ').slice(0, 2).join(' ')}
            </label>
          </div>
          <div className='flex items-center justify-center w-6 p-2 h-6 rounded-full' style={{ backgroundColor: `${disease.color}` }}>
            <span className="text-sm font-semibold capitalize">
              {disease.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DiseasePanel
