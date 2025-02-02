import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const diseases = [
  { id: 'caries', label: 'caries', count: 0, color: 'purple' },
  {
    id: 'periapical_radiolucency',
    label: 'periapical radiolucency',
    count: 0,
    color: 'blue',
  },
  { id: 'calculus', label: 'calculus', count: 0, color: 'green' },
  {
    id: 'notable_margin',
    label: 'notable margin',
    count: 0,
    color: 'violet',
  },
  // Add more diseases as needed
]

export function DiseaseSelect() {
  const [selectedDiseases, setSelectedDiseases] = React.useState<string[]>([])

  const handleSelect = (id: string) => {
    setSelectedDiseases((prev) =>
      prev.includes(id)
        ? prev.filter((disease) => disease !== id)
        : [...prev, id]
    )
  }

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select diseases" />
      </SelectTrigger>
      <SelectContent className="border-border">
        <SelectGroup>
          <SelectLabel>Diseases</SelectLabel>
          {diseases.map((disease) => (
            <SelectItem
              key={disease.id}
              value={disease.id}
              onClick={() => handleSelect(disease.id)}
            >
              <input
                type="checkbox"
                checked={selectedDiseases.includes(disease.id)}
                readOnly
                className="mr-2"
              />
              {disease.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
