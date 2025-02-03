'use client'

import DiseasePanel, { Disease } from "@/components/dashboard/DiseasePanel"
import ImageViewer from "@/components/dashboard/ImageViewer"
import { ChartConfig } from "@/components/ui/chart"
import { useState, useEffect } from 'react'

const API_URL = 'http://127.0.0.1:5000'

const DashboardPage = () => {
  const initialDiseases: Disease[] = [
    { id: 'root_piece', label: 'Root Piece', count: 10, color: '#a02b5f' },
    { id: 'crown', label: 'Crown', count: 20, color: '#41c8ff' },
    { id: 'root_canal_treatment', label: 'Root Canal Treatment', count: 0, color: '#14c486' },
    { id: 'periapical_lesion', label: 'Periapical lesion', count: 30, color: '#fcc052' },
    { id: 'caries', label: 'Caries', count: 30, color: '#ec0f45' },
    { id: 'filling', label: 'Filling', count: 120, color: '#ee6b3d' },
  ]

  const [diseases, setDiseases] = useState<Disease[]>(initialDiseases)
  const [selectedDiseases, setSelectedDiseases] = useState<Disease[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [predictions, setPredictions] = useState({})

  const fetchPredictions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      const updatedDiseases = diseases.map(disease => {
        const count = data[disease.label]?.length || 0
        return { ...disease, count }
      })

      setDiseases(updatedDiseases)
      setPredictions(data)
    } catch (error) {
      console.error('Error fetching predictions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (hasImage) {
      fetchPredictions()
    }
  }, [hasImage])

  const chartData = diseases.map(disease => ({
    browser: disease.label,
    visitors: disease.count,
    fill: disease.color,
  }))

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    root_piece: {
      label: "Root Piece",
      color: "#a02b5f",
    },
    crown: {
      label: "Crown",
      color: "#41c8ff",
    },
    root_canal_treatment: {
      label: "Root Canal Treatment",
      color: "#14c486",
    },
    periapical_lesion: {
      label: "Periapical lesion",
      color: "#fcc052",
    },
    caries: {
      label: "Caries",
      color: "#ec0f45",
    },
    filling: {
      label: "Filling",
      color: "#ee6b3d",
    },
  } satisfies ChartConfig

  return (
    <section className="flex h-[calc(100vh - 48px)] w-full flex-col bg-muted lg:flex-row lg:overflow-hidden">
      <ImageViewer selectedDiseases={selectedDiseases} setHasImage={setHasImage} predictions={predictions} />
      {/* Right Panel - Options */}
      <DiseasePanel diseases={diseases} setSelectedDiseases={setSelectedDiseases} isLoading={isLoading} hasImage={hasImage} chartData={chartData} chartConfig={chartConfig} />
    </section>
  )
}

export default DashboardPage
