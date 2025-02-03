'use client'

import DiseasePanel, { Disease } from "@/components/dashboard/DiseasePanel"
import ImageViewer from "@/components/dashboard/ImageViewer"
import { useState } from 'react'

const DashboardPage = () => {
  const diseases:Disease[] = [
    { id: 'root_piece', label: 'Root Piece', count: 0, color: '#a02b5f' },
    { id: 'crown', label: 'Crown', count: 0, color: '#41c8ff' },
    { id: 'root_canal_treatment', label: 'Root Canal Treatment', count: 0, color: '#14c486' },
    { id: 'periapical_lesion', label: 'Periapical lesion', count: 0, color: '#fcc052' },
    { id: 'caries', label: 'Caries', count: 0, color: '#ec0f45' },
    { id: 'filling', label: 'Filling', count: 0, color: '#ee6b3d' },
  ]

  const [selectedDiseases, setSelectedDiseases] = useState<typeof diseases>([])

  return (
    <section className="flex h-[calc(100vh - 48px)] w-full flex-col bg-muted lg:flex-row lg:overflow-hidden">
      <ImageViewer selectedDiseases={selectedDiseases} />
      {/* Right Panel - Options */}
      <DiseasePanel diseases={diseases} setSelectedDiseases={setSelectedDiseases} />
    </section>
  )
}

export default DashboardPage
